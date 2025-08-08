"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-users";
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

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-500 text-white",
      employees: "bg-blue-500 text-white",
      customer: "bg-gray-500 text-white",
    };
    return (
      <Badge className={variants[role as keyof typeof variants]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

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
            <Link href="/admin/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/admin/users">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Users
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
              <p className="mt-1 text-gray-600">View user information</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/admin/users/${user.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
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
              <User className="h-5 w-5" />
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
                <Mail className="h-4 w-4 text-gray-400" />
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
                <Phone className="h-4 w-4 text-gray-400" />
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
                <Shield className="h-4 w-4 text-gray-400" />
                {getRoleBadge(user.role)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
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
