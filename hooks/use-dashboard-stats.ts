import { cachedGet } from "@/lib/cache";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface DashboardStats {
  pendingContacts: number;
  pendingReferrals: number;
  pendingRequests: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingContacts: 0,
    pendingReferrals: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (force?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await cachedGet<{ data: DashboardStats }>(
        "/api/dashboard/stats",
        { revalidate: force ? "force" : undefined }
      );
      setStats(data.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard stats";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: () => fetchStats(true),
  };
}
