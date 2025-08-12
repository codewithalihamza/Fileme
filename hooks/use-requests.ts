import { cachedGet, invalidateCacheByPrefix } from "@/lib/cache";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { RequestStatus } from "@/types";

interface Request {
  id: string;
  status: RequestStatus;
  paidAmount: string | null;
  service: string;
  userId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  assignee: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
}

interface RequestsResponse {
  data: Request[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
export interface RequestStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalRevenue: number;
}
interface RequestResponse {
  data: Request;
}

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch all requests with pagination and filters
  const fetchRequests = useCallback(
    async (
      page: number = 1,
      limit: number = 10,
      search?: string,
      status?: string,
      service?: string,
      force?: boolean
    ): Promise<RequestsResponse | null> => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(status && status !== "all" && { status }),
          ...(service && service !== "all" && { service }),
        });

        const { data } = await cachedGet<RequestsResponse>(
          `/api/dashboard/requests?${params}`,
          { revalidate: force ? "force" : undefined }
        );
        return data;
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to fetch requests");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch single request by ID
  const fetchRequest = useCallback(
    async (id: string, force?: boolean): Promise<Request | null> => {
      try {
        setLoading(true);
        const { data } = await cachedGet<RequestResponse>(
          `/api/dashboard/requests/${id}`,
          { revalidate: force ? "force" : undefined }
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching request:", error);
        toast.error("Failed to fetch request");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create new request
  const createRequest = useCallback(
    async (requestData: {
      service: string;
      status: "pending" | "in_progress" | "completed" | "cancelled";
      paidAmount: number | null;
      userId: string;
      assigneeId: string | null;
    }): Promise<Request | null> => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Request created successfully!");
          invalidateCacheByPrefix("/api/dashboard/requests");
          invalidateCacheByPrefix("/api/dashboard/requests/stats");
          invalidateCacheByPrefix("/api/dashboard/stats");
          return data.data;
        } else {
          toast.error(data.error || "Failed to create request");
          return null;
        }
      } catch (error) {
        console.error("Error creating request:", error);
        toast.error("Failed to create request");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update request
  const updateRequest = useCallback(
    async (
      id: string,
      requestData: Partial<Request>
    ): Promise<Request | null> => {
      try {
        setUpdatingId(id);
        const response = await fetch(`/api/dashboard/requests/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Request updated successfully!");
          invalidateCacheByPrefix("/api/dashboard/requests");
          invalidateCacheByPrefix("/api/dashboard/requests/stats");
          invalidateCacheByPrefix("/api/dashboard/stats");
          return data.data;
        } else {
          toast.error(data.error || "Failed to update request");
          return null;
        }
      } catch (error) {
        console.error("Error updating request:", error);
        toast.error("Failed to update request");
        return null;
      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  // Delete request
  const deleteRequest = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard/requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Request deleted successfully");
        invalidateCacheByPrefix("/api/dashboard/requests");
        invalidateCacheByPrefix("/api/dashboard/requests/stats");
        invalidateCacheByPrefix("/api/dashboard/stats");
        return true;
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete request");
        return false;
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    updatingId,
    fetchRequests,
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest,
  };
};

export function useRequestStats() {
  const [stats, setStats] = useState<RequestStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (force?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await cachedGet<{ data: RequestStats }>(
        "/api/dashboard/requests/stats",
        { revalidate: force ? "force" : undefined }
      );
      setStats(data.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch request stats";
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
