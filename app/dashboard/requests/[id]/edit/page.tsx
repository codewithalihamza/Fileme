"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { useRequests } from "@/hooks/use-requests";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { ArrowLeft, FileText, Save } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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

export default function EditRequestPage({ params }: PageProps) {
  const [request, setRequest] = useState<Request | null>(null);
  const [formData, setFormData] = useState<Partial<Request>>({});
  const [errors, setErrors] = useState<Partial<Request>>({});
  const [requestId, setRequestId] = useState<string | null>(null);
  const { loading, fetchRequest, updateRequest } = useRequests();

  const getParams = async () => {
    const resolvedParams = await params;
    setRequestId(resolvedParams.id);
  };

  useEffect(() => {
    getParams();
  }, [params]);

  const loadRequest = useCallback(async () => {
    if (!requestId) return;
    const requestData = await fetchRequest(requestId);
    if (requestData) {
      setRequest(requestData);
      setFormData(requestData);
    }
  }, [requestId, fetchRequest]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Request> = {};

    if (!formData.service?.trim()) {
      newErrors.service = "Service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!request) return;

    const updatedRequest = await updateRequest(request.id, formData);
    if (updatedRequest) {
      setRequest(updatedRequest);
      setFormData(updatedRequest);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Request]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href={ROUTES_CONSTANT.REQUESTS}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Request</h1>
            <p className="mt-1 text-gray-600">Update request information</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Request Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="service"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Service <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="service"
                    name="service"
                    type="text"
                    value={formData.service || ""}
                    onChange={handleInputChange}
                    placeholder="Enter service name"
                    className={errors.service ? "border-red-500" : ""}
                  />
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Status
                  </Label>
                  <Select
                    value={formData.status || "pending"}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value as any,
                      }));
                      if (errors.status) {
                        setErrors((prev) => ({ ...prev, status: undefined }));
                      }
                    }}
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
                </div>

                <div>
                  <Label
                    htmlFor="paidAmount"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Paid Amount
                  </Label>
                  <Input
                    id="paidAmount"
                    name="paidAmount"
                    type="number"
                    step="0.01"
                    value={formData.paidAmount || ""}
                    onChange={handleInputChange}
                    placeholder="Enter paid amount"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? (
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={`${ROUTES_CONSTANT.REQUESTS}/${request.id}`}>
                      Cancel
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Client Name
                </p>
                <p className="text-gray-900">{request.user.name}</p>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{request.user.email}</p>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900">{request.user.phone}</p>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Request ID
                </p>
                <p className="font-mono text-sm text-gray-600">{request.id}</p>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Created At
                </p>
                <p className="text-gray-900">
                  {new Date(request.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
