"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getRequestsStatusBadge,
  getRequestsStatusIcon,
  getRoleBadge,
} from "@/lib/color-constants";
import { getRoleDescription } from "@/lib/constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RequestStatus, servicesNames, UserRole } from "@/types";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  FileText,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Request {
  id: string;
  status: RequestStatus;
  paidAmount: number | null;
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
    role?: UserRole;
  };
  assignee: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role?: UserRole;
  } | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RequestDetailPage({ params }: PageProps) {
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState<string | null>(null);

  const getParams = async () => {
    const resolvedParams = await params;
    setRequestId(resolvedParams.id);
  };

  useEffect(() => {
    getParams();
  }, [params]);

  const fetchRequest = useCallback(async () => {
    if (!requestId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/dashboard/requests/${requestId}`);
      const data = await response.json();

      if (response.ok) {
        setRequest(data.data);
      } else {
        toast.error("Failed to fetch request");
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      toast.error("Failed to fetch request");
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Skeleton className="mb-2 h-8 w-64" />
                <Skeleton className="h-4 w-96" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Information Card Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-6 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Client Information Card Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-6 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-5 w-56" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-5 w-36" />
              </div>
            </CardContent>
          </Card>

          {/* Timestamps Card Skeleton */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Skeleton className="mb-2 h-4 w-20" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <div>
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div>
                  <Skeleton className="mb-2 h-4 w-28" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Request Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The request you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href={ROUTES_CONSTANT.REQUESTS}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Requests
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
            <div className="flex-1">
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                Request Details
              </h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                View request information and details
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={`${ROUTES_CONSTANT.REQUESTS}/${request.id}/edit`}>
              <Edit className="mr-2 size-4" />
              Edit Request
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Service</p>
              <p className="text-gray-900">
                {
                  servicesNames.find(
                    (service) => service.value === request.service
                  )?.label
                }
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Status</p>
              <div className="flex items-center gap-2">
                {getRequestsStatusIcon(request.status)}
                {getRequestsStatusBadge(request.status)}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Paid Amount
              </p>
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-gray-400" />
                <span className="text-gray-900">
                  {request.paidAmount
                    ? formatCurrency(request.paidAmount)
                    : "Not paid"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Client Name
              </p>
              <p className="text-gray-900">{request.user.name}</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Email</p>
              <a
                href={`mailto:${request.user.email}`}
                className="text-blue-600 hover:underline"
              >
                {request.user.email}
              </a>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Phone</p>
              <a
                href={`tel:${request.user.phone}`}
                className="text-blue-600 hover:underline"
              >
                {request.user.phone}
              </a>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Role</p>
              <div className="flex items-center gap-2">
                {getRoleBadge(request.user.role || "")}
                <span className="text-sm text-gray-600">
                  {request.user.role
                    ? getRoleDescription(request.user.role)
                    : "Role not specified"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignee Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Assignee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {request.assignee ? (
              <>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Assignee Name
                  </p>
                  <p className="text-gray-900">{request.assignee.name}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Email
                  </p>
                  <a
                    href={`mailto:${request.assignee.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {request.assignee.email}
                  </a>
                </div>

                {request.assignee.phone && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Phone
                    </p>
                    <a
                      href={`tel:${request.assignee.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {request.assignee.phone}
                    </a>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">Role</p>
                  <div className="flex items-center gap-2">
                    {getRoleBadge(request.assignee.role || "")}
                    <span className="text-sm text-gray-600">
                      {request.assignee.role
                        ? getRoleDescription(request.assignee.role)
                        : "Role not specified"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <Users className="mx-auto mb-4 size-12 text-gray-300" />
                <p className="font-medium text-gray-500">No Assignee</p>
                <p className="mt-1 text-sm text-gray-400">
                  This request has not been assigned yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Request ID
                </p>
                <p className="font-mono text-sm text-gray-600">{request.id}</p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Created At
                </p>
                <p className="text-gray-900">{formatDate(request.createdAt)}</p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Last Updated
                </p>
                <p className="text-gray-900">{formatDate(request.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
