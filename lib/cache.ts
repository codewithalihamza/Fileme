/*
  Simple in-memory cache with stale-while-revalidate semantics for client-side usage.
  This is intentionally lightweight to avoid pulling in extra libraries.

  Usage:
  - Use cachedGet(url, { ttlMs, revalidate, onUpdate }) for idempotent GET endpoints
  - Call invalidateCacheByPrefix('/api/dashboard/users') after any mutations
*/

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cacheStore: Map<string, CacheEntry<unknown>> = new Map();

export function buildCacheKey(url: string): string {
  return url;
}

export function getCached<T>(key: string): T | null {
  const entry = cacheStore.get(key) as CacheEntry<T> | undefined;
  return entry ? entry.data : null;
}

export function setCached<T>(key: string, data: T): void {
  cacheStore.set(key, { data, timestamp: Date.now() });
}

export function invalidateCacheByKey(key: string): void {
  cacheStore.delete(key);
}

export function invalidateCacheByPrefix(prefix: string): void {
  const keysToDelete: string[] = [];
  for (const key of cacheStore.keys()) {
    if (key.startsWith(prefix)) keysToDelete.push(key);
  }
  for (const key of keysToDelete) cacheStore.delete(key);
}

export interface CachedGetOptions<T> {
  ttlMs?: number; // default 1 hour
  revalidate?: "never" | "stale-while-revalidate" | "force"; // default SWR
  onUpdate?: (data: T) => void; // called when background revalidation retrieves fresher data
  fetchInit?: RequestInit;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const json = await response.json();
  if (!response.ok) {
    const errorMessage =
      (json && (json.error || json.message)) || "Request failed";
    throw new Error(String(errorMessage));
  }
  return json as T;
}

export async function cachedGet<T = unknown>(
  url: string,
  options?: CachedGetOptions<T>
): Promise<{ data: T; fromCache: boolean }> {
  const ttlMs = options?.ttlMs ?? 3_600_000; // 1 hour
  const revalidate = options?.revalidate ?? "stale-while-revalidate";
  const key = buildCacheKey(url);
  const now = Date.now();
  const entry = cacheStore.get(key) as CacheEntry<T> | undefined;

  const isFresh = (timestamp: number) => now - timestamp <= ttlMs;

  async function networkFetchAndUpdateCache(): Promise<T> {
    const fresh = await fetchJson<T>(url, options?.fetchInit);
    setCached<T>(key, fresh);
    return fresh;
  }

  if (!entry) {
    const fresh = await networkFetchAndUpdateCache();
    return { data: fresh, fromCache: false };
  }

  if (revalidate === "force") {
    const fresh = await networkFetchAndUpdateCache();
    return { data: fresh, fromCache: false };
  }

  if (isFresh(entry.timestamp)) {
    if (revalidate === "stale-while-revalidate") {
      // Fire-and-forget background revalidation
      void (async () => {
        try {
          const fresh = await networkFetchAndUpdateCache();
          if (options?.onUpdate) options.onUpdate(fresh);
        } catch {
          // Ignore background errors
        }
      })();
    }
    return { data: entry.data, fromCache: true };
  }

  // Stale entry: fetch fresh data
  const fresh = await networkFetchAndUpdateCache();
  return { data: fresh, fromCache: false };
}
