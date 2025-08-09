"use client";

import { RequestForm } from "@/components/dashboard/requests/request-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequests } from "@/hooks/use-requests";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { RequestStatus } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface RequestData {
  id: string;
  status: RequestStatus;
  paidAmount: string | null;
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
  const [request, setRequest] = useState<RequestData | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { loading, fetchRequest, updateRequest } = useRequests();
  const router = useRouter();

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
    }
  }, [requestId, fetchRequest]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  const handleSubmit = async (formData: any) => {
    if (!request) return;

    const updatedRequest = await updateRequest(request.id, formData);
    if (updatedRequest) {
      setRequest(updatedRequest);
      toast.success("Request updated successfully!");
      router.push(`${ROUTES_CONSTANT.REQUESTS}/${request.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto p-4 sm:p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <div className="mt-8">
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto p-4 sm:p-6">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Request Not Found
            </h1>
            <p className="mb-6 text-gray-600">
              The request you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RequestForm
      initialData={{
        service: request.service,
        status: request.status,
        paidAmount: request.paidAmount,
        userId: request.userId,
        assigneeId: request.assigneeId,
      }}
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={true}
      title="Edit Request"
      description="Update request information and details"
    />
  );
}
