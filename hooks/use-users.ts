import { useCallback, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
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

  // Fetch all users with pagination and filters
  const fetchUsers = useCallback(
    async (
      page: number = 1,
      limit: number = 10,
      search?: string,
      role?: string
    ): Promise<UsersResponse | null> => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(role && role !== "all" && { role }),
        });

        const response = await fetch(`/api/dashboard/users?${params}`);
        const data = await response.json();

        if (response.ok) {
          return data;
        } else {
          toast.error("Failed to fetch users");
          return null;
        }
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
  const fetchUser = useCallback(async (id: string): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await fetch(`/api/dashboard/users/${id}`);
      const data: UserResponse = await response.json();

      if (response.ok) {
        return data.data;
      } else {
        toast.error("Failed to fetch user");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

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
        setLoading(true);
        const response = await fetch("/api/dashboard/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            ...userData,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("User updated successfully!");
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
        setLoading(false);
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
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
