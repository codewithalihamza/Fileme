"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { email: string; role: string } | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    // Check if admin token exists on mount
    const token = cookies.get("admin-token");
    if (token) {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: { email: "admin", role: "admin" }, // Simplified for demo
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: { email, role: "admin" },
        });
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear auth state regardless of API response
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      cookies.remove("admin-token");
      router.push("/");
    }
  };

  return {
    ...authState,
    login,
    logout,
  };
}
