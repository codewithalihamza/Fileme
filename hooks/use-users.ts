import { cachedGet, invalidateCacheByPrefix } from "@/lib/cache";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface UserStats {
  total: number;
  admins: number;
  employees: number;
  customers: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role: "admin" | "employees" | "customer";
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  data: User[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface UserResponse {
  data: User;
}

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch all users with pagination and filters
  const fetchUsers = useCallback(
    async (
      page: number = 1,
      limit: number = 10,
      search?: string,
      role?: string,
      force?: boolean
    ): Promise<UsersResponse | null> => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(role && role !== "all" && { role }),
        });

        const { data } = await cachedGet<UsersResponse>(
          `/api/dashboard/users?${params}`,
          { revalidate: force ? "force" : undefined }
        );
        return data;
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch single user by ID
  const fetchUser = useCallback(
    async (id: string, force?: boolean): Promise<User | null> => {
      try {
        setLoading(true);
        const { data } = await cachedGet<UserResponse>(
          `/api/dashboard/users/${id}`,
          { revalidate: force ? "force" : undefined }
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create new user
  const createUser = useCallback(
    async (userData: {
      name: string;
      email: string;
      phone: string;
      password: string;
      role: "admin" | "employees" | "customer";
    }): Promise<User | null> => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("User created successfully!");
          invalidateCacheByPrefix("/api/dashboard/users");
          invalidateCacheByPrefix("/api/dashboard/users/stats");
          invalidateCacheByPrefix("/api/dashboard/stats");
          return data.data;
        } else {
          toast.error(data.error || "Failed to create user");
          return null;
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Failed to create user");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update user
  const updateUser = useCallback(
    async (id: string, userData: Partial<User>): Promise<User | null> => {
      try {
        setUpdatingId(id);
        const response = await fetch(`/api/dashboard/users/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("User updated successfully!");
          invalidateCacheByPrefix("/api/dashboard/users");
          invalidateCacheByPrefix("/api/dashboard/users/stats");
          invalidateCacheByPrefix("/api/dashboard/stats");
          return data.data;
        } else {
          toast.error(data.error || "Failed to update user");
          return null;
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
        return null;
      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  // Delete user
  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        invalidateCacheByPrefix("/api/dashboard/users");
        invalidateCacheByPrefix("/api/dashboard/users/stats");
        invalidateCacheByPrefix("/api/dashboard/stats");
        return true;
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete user");
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    updatingId,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    admins: 0,
    employees: 0,
    customers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (force?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await cachedGet<{ data: UserStats }>(
        "/api/dashboard/users/stats",
        { revalidate: force ? "force" : undefined }
      );
      setStats(data.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user stats";
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
