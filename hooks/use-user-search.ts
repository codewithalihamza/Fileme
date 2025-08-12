import { cachedGet, invalidateCacheByPrefix } from "@/lib/cache";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  role: string;
}

interface CheckOrCreateUserResponse {
  user: User;
  isNew: boolean;
  message: string;
}

export function useUserSearch() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const searchUsers = useCallback(async (search: string, role?: string) => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: search.trim(),
        limit: "10",
      });

      if (role) {
        params.append("role", role);
      }

      const { data } = await cachedGet<{ data: User[] }>(
        `/api/dashboard/users/search?${params}`
      );
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkOrCreateUser = useCallback(
    async (
      name: string,
      phone: string,
      email?: string
    ): Promise<CheckOrCreateUserResponse | null> => {
      setLoading(true);
      try {
        const response = await fetch("/api/dashboard/users/check-or-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone, email }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.isNew) {
            toast.success("New user created successfully");
          } else {
            toast.success("Existing user found");
          }
          invalidateCacheByPrefix("/api/dashboard/users");
          invalidateCacheByPrefix("/api/dashboard/users/stats");
          invalidateCacheByPrefix("/api/dashboard/stats");
          return data;
        } else {
          toast.error(data.error || "Failed to check/create user");
          return null;
        }
      } catch (error) {
        console.error("Error checking/creating user:", error);
        toast.error("Failed to check/create user");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    searchUsers,
    checkOrCreateUser,
    searchResults,
    loading,
  };
}
