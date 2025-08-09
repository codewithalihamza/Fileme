"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-users";
import { getRoleBadge } from "@/lib/color-constants";
import { getRoleDescription } from "@/lib/constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";
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

export default function UserDetailPage({ params }: PageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { loading, fetchUser } = useUsers();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            User Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href={ROUTES_CONSTANT.USERS}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Users
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
              User Details
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Complete user details and account information
            </p>
          </div>
          <Button asChild>
            <Link href={`${ROUTES_CONSTANT.USERS}/${user.id}/edit`}>
              <Edit className="mr-2 size-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Full Name
              </p>
              <p className="text-gray-900">{user.name}</p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Email Address
              </p>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gray-400" />
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.email}
                </a>
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </p>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-gray-400" />
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.phone}
                </a>
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Role</p>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-gray-400" />
                {getRoleBadge(user.role)}
                <span className="text-sm text-gray-600">
                  {getRoleDescription(user.role)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">User ID</p>
              <p className="font-mono text-sm text-gray-600">{user.id}</p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Created At
              </p>
              <p className="text-gray-900">{formatDate(user.createdAt)}</p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Last Updated
              </p>
              <p className="text-gray-900">{formatDate(user.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
