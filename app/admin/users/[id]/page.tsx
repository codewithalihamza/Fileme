"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Edit, Mail, Phone, Shield, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useUsers } from "@/hooks/use-users";

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
          <div className="grid gap-6 lg:grid-cols-2 mt-8">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">The user you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
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
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
              <p className="text-gray-600 mt-1">View user information</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/admin/users/${user.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
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
              <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
              <p className="text-gray-900">{user.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Email Address</p>
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
              <p className="text-sm font-medium text-gray-700 mb-1">Phone Number</p>
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
              <p className="text-sm font-medium text-gray-700 mb-1">Role</p>
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
              <p className="text-sm font-medium text-gray-700 mb-1">User ID</p>
              <p className="text-sm text-gray-600 font-mono">{user.id}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Created At</p>
              <p className="text-gray-900">{formatDate(user.createdAt)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Last Updated</p>
              <p className="text-gray-900">{formatDate(user.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    