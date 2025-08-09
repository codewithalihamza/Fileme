"use client";

import { UserForm } from "@/components/dashboard/users/user-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-users";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "employees" | "customer";
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: PageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { loading, fetchUser, updateUser } = useUsers();

  const getParams = async () => {
    const resolvedParams = await params;
    setUserId(resolvedParams.id);
  };

  useEffect(() => {
    getParams();
  }, [params]);

  const loadUser = useCallback(async () => {
    if (!userId) return;
    const userData = await fetchUser(userId);
    if (userData) {
      setUser(userData);
    }
  }, [userId, fetchUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleSubmit = async (formData: any) => {
    if (!user) return;

    const updatedUser = await updateUser(user.id, formData);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto p-4 sm:p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto p-4 sm:p-6">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              User Not Found
            </h1>
            <p className="mb-6 text-gray-600">
              The user you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={ROUTES_CONSTANT.USERS}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UserForm
      initialData={user}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={true}
      title="Edit User"
      description="Update user information and permissions"
    />
  );
}
