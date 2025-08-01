import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Referral {
  id: string;
  friendName: string;
  friendEmail: string | null;
  friendPhone: string;
  referrerName: string;
  referrerEmail: string | null;
  referrerPhone: string;
  service: string;
  accountDetails: string;
  status: "pending" | "in-progress" | "completed" | "paid";
  totalEarned: string;
  amountSent: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ReferralsResponse {
  data: Referral[];
  pagination: Pagination;
}

export function useReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchReferrals = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(statusFilter && statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/referrals?${params}`);
      if (!response.ok) throw new Error("Failed to fetch referrals");

      const data: ReferralsResponse = await response.json();
      setReferrals(data.data);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Failed to fetch referrals");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, debouncedSearch, statusFilter, pagination.limit]);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  const createReferral = async (referralData: {
    friendName: string;
    friendEmail?: string;
    friendPhone: string;
    referrerName: string;
    referrerEmail?: string;
    referrerPhone: string;
    service: string;
    accountDetails: string;
  }) => {
    try {
      const response = await fetch("/api/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(referralData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create referral");
      }

      const data = await response.json();
      toast.success("Referral submitted successfully");
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create referral";
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateReferral = async (id: string, updates: Partial<Referral>) => {
    try {
      setUpdatingId(id);
      const response = await fetch("/api/admin/referrals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!response.ok) throw new Error("Failed to update referral");

      toast.success("Referral updated successfully");
      fetchReferrals();
    } catch (error) {
      toast.error("Failed to update referral");
    } finally {
      setUpdatingId(null);
    }
  };

  const getReferral = async (id: string): Promise<Referral | null> => {
    try {
      const response = await fetch(`/api/admin/referrals/${id}`);
      if (!response.ok) throw new Error("Failed to fetch referral");

      const data = await response.json();
      return data.referral;
    } catch (error) {
      toast.error("Failed to fetch referral");
      return null;
    }
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return {
    referrals,
    pagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    updatingId,
    createReferral,
    updateReferral,
    getReferral,
    setPage,
    setLimit,
    refetch: fetchReferrals,
  };
}
