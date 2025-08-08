"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Save,
  User,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Request {
  id: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
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
  };
  assignee: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RequestDetailPage({ params }: PageProps) {
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Request>>({});
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
      const response = await fetch(`/api/admin/requests/${requestId}`);
      const data = await response.json();

      if (response.ok) {
        setRequest(data.data);
        setEditData(data.data);
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

  const updateRequest = async () => {
    if (!request) return;

    try {
      const response = await fetch(`/api/admin/requests`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: request.id,
          ...editData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Request updated successfully");
        setRequest(data.data);
        setEditData(data.data);
        setEditing(false);
      } else {
        toast.error(data.error || "Failed to update request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-500 text-white",
      in_progress: "bg-blue-500 text-white",
      completed: "bg-green-500 text-white",
      cancelled: "bg-red-500 text-white",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("_", " ").charAt(0).toUpperCase() +
          status.replace("_", " ").slice(1)}
      </Badge>
    );
  };

  const getServiceLabel = (service: string) => {
    const services = {
      tax: "Tax Filing",
      accounting: "Accounting",
      audit: "Audit",
      consultation: "Consultation",
    };
    return services[service as keyof typeof services] || service;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "in_progress":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
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
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">Loading request...</span>
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
            <Link href="/admin/requests">
              <ArrowLeft className="mr-2 h-4 w-4" />
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
            <Button variant="ghost" asChild>
              <Link href="/admin/requests">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Requests
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Request Details
              </h1>
              <p className="mt-1 text-gray-600">
                View and manage request information
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {editing ? (
              <>
                <Button onClick={updateRequest}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Request
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Service
              </Label>
              {editing ? (
                <Select
                  value={editData.service || request.service}
                  onValueChange={(value) =>
                    setEditData({ ...editData, service: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Tax Filing</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900">
                  {getServiceLabel(request.service)}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </Label>
              {editing ? (
                <Select
                  value={editData.status || request.status}
                  onValueChange={(value) =>
                    setEditData({ ...editData, status: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  {getStatusIcon(request.status)}
                  {getStatusBadge(request.status)}
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Paid Amount
              </Label>
              {editing ? (
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={editData.paidAmount || request.paidAmount || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      paidAmount: e.target.value
                        ? parseFloat(e.target.value)
                        : null,
                    })
                  }
                />
              ) : (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">
                    {request.paidAmount
                      ? formatCurrency(request.paidAmount)
                      : "Not paid"}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Client Name
              </Label>
              <p className="text-gray-900">{request.user.name}</p>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </Label>
              <a
                href={`mailto:${request.user.email}`}
                className="text-blue-600 hover:underline"
              >
                {request.user.email}
              </a>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </Label>
              <a
                href={`tel:${request.user.phone}`}
                className="text-blue-600 hover:underline"
              >
                {request.user.phone}
              </a>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Assigned To
              </Label>
              {editing ? (
                <Select
                  value={
                    editData.assigneeId || request.assigneeId || "unassigned"
                  }
                  onValueChange={(value) =>
                    setEditData({
                      ...editData,
                      assigneeId: value === "unassigned" ? null : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {/* This would need to be populated with available employees */}
                    <SelectItem value="employee1">Employee 1</SelectItem>
                    <SelectItem value="employee2">Employee 2</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900">
                  {request.assignee ? request.assignee.name : "Unassigned"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  Request ID
                </Label>
                <p className="font-mono text-sm text-gray-600">{request.id}</p>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  Created At
                </Label>
                <p className="text-gray-900">{formatDate(request.createdAt)}</p>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Updated
                </Label>
                <p className="text-gray-900">{formatDate(request.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
