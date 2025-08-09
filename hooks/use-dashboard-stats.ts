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

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/dashboard/stats");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch dashboard stats");
      }

      const data = await response.json();
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
    refetch: fetchStats,
  };
}
