"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useRequests } from "@/hooks/use-requests";
import { getRequestsStatusBadge } from "@/lib/color-constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency } from "@/lib/utils";
import { RequestStatus, requestStatusNames, servicesNames } from "@/types";
import {
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Request {
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
    email?: string;
    phone: string;
  };
  assignee: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
}

export default function RequestsPage() {
  const { loading, updatingId, fetchRequests, updateRequest } = useRequests();

  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [paidAmountModal, setPaidAmountModal] = useState<{
    isOpen: boolean;
    requestId: string | null;
    currentAmount: string | null;
    requestName: string;
  }>({
    isOpen: false,
    requestId: null,
    currentAmount: null,
    requestName: "",
  });
  const [paidAmountValue, setPaidAmountValue] = useState<string>("");

  const router = useRouter();

  const loadRequests = useCallback(async () => {
    try {
      const data = await fetchRequests(
        page,
        10,
        search,
        statusFilter,
        serviceFilter
      );
      if (data) {
        setRequests(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalRequests(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, [fetchRequests, page, search, statusFilter, serviceFilter]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleDeleteRequest = async (requestId: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      const response = await fetch(`/api/dashboard/requests`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: requestId }),
      });

      if (response.ok) {
        toast.success("Request deleted successfully");
        loadRequests();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete request");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
    }
  };

  const handleRowClick = (requestId: string) => {
    router.push(`${ROUTES_CONSTANT.REQUESTS}/${requestId}`);
  };

  const handleStatusChange = async (
    requestId: string,
    newStatus: string,
    requestName: string
  ) => {
    await updateRequest(requestId, {
      status: newStatus as RequestStatus,
    });
    // Refresh the data after update
    loadRequests();
  };

  const handlePaidAmountChange = async (
    requestId: string,
    newAmount: string | null
  ) => {
    await updateRequest(requestId, {
      paidAmount: newAmount,
    });
    // Refresh the data after update
    loadRequests();
    // Close modal
    setPaidAmountModal({
      isOpen: false,
      requestId: null,
      currentAmount: null,
      requestName: "",
    });
    setPaidAmountValue("");
  };

  const openPaidAmountModal = (
    requestId: string,
    currentAmount: string | null,
    requestName: string
  ) => {
    setPaidAmountModal({
      isOpen: true,
      requestId,
      currentAmount,
      requestName,
    });
    setPaidAmountValue(currentAmount || "");
  };

  const closePaidAmountModal = () => {
    setPaidAmountModal({
      isOpen: false,
      requestId: null,
      currentAmount: null,
      requestName: "",
    });
    setPaidAmountValue("");
  };

  const handleSavePaidAmount = () => {
    if (paidAmountModal.requestId) {
      const stringValue = paidAmountValue === "" ? null : paidAmountValue;
      handlePaidAmountChange(paidAmountModal.requestId, stringValue);
    }
  };

  const handleQuickAction = (action: string, requestId: string) => {
    switch (action) {
      case "view":
        router.push(`${ROUTES_CONSTANT.REQUESTS}/${requestId}`);
        break;
      case "edit":
        router.push(`${ROUTES_CONSTANT.REQUESTS}/${requestId}/edit`);
        break;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadRequests();
    } catch (error) {
      toast.error("Failed to refresh requests");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="Request Management"
        description="Manage all service requests"
      />

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-5">
        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalRequests}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    requests.filter((r) => r.status === RequestStatus.PENDING)
                      .length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    requests.filter(
                      (r) => r.status === RequestStatus.IN_PROGRESS
                    ).length
                  }
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    requests.filter((r) => r.status === RequestStatus.COMPLETED)
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-0 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-sm flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing || loading}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {servicesNames.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {requestStatusNames.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild>
                <Link href={ROUTES_CONSTANT.NEW_REQUEST}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Request
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="border-0 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead className="min-w-[130px]">Paid Amount</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableSkeleton rows={5} columns={7} />
                ) : requests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-gray-500"
                    >
                      No requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleRowClick(request.id)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.user.name}</div>
                          <div className="text-sm text-gray-500">
                            {request.user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {
                          servicesNames.find(
                            (service) => service.value === request.service
                          )?.label
                        }
                      </TableCell>
                      <TableCell>
                        {getRequestsStatusBadge(request.status)}
                      </TableCell>
                      <TableCell>
                        {request.assignee ? (
                          <div>
                            <div className="font-medium">
                              {request.assignee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.assignee.phone}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {updatingId === request.id ? (
                          <div className="flex items-center justify-center">
                            <Skeleton className="h-8 w-[100px] rounded-md" />
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              openPaidAmountModal(
                                request.id,
                                request.paidAmount?.toString() || null,
                                request.user.name
                              );
                            }}
                            className="h-8 w-[100px] text-xs"
                          >
                            {request.paidAmount
                              ? `${formatCurrency(Number(request.paidAmount))}`
                              : "Set Amount"}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>
                        {updatingId === request.id ? (
                          <div className="flex items-center justify-center">
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {/* Quick Status Update */}
                            <div
                              onClick={(e: React.MouseEvent) =>
                                e.stopPropagation()
                              }
                            >
                              <Select
                                value={request.status}
                                onValueChange={(value) =>
                                  handleStatusChange(
                                    request.id,
                                    value,
                                    request.user.name
                                  )
                                }
                                disabled={updatingId === request.id}
                              >
                                <SelectTrigger className="h-8 w-[120px] text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {requestStatusNames.map((status) => (
                                    <SelectItem
                                      key={status.value}
                                      value={status.value}
                                    >
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Actions Dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                onClick={(e: React.MouseEvent) =>
                                  e.stopPropagation()
                                }
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction("view", request.id);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction("edit", request.id);
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Request
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteRequest(request.id);
                                  }}
                                  className="text-red-600"
                                >
                                  Delete Request
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paid Amount Modal */}
      <Modal
        isOpen={paidAmountModal.isOpen}
        onClose={closePaidAmountModal}
        title="Update Paid Amount"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="paidAmount" className="text-sm font-medium">
              Paid Amount for {paidAmountModal.requestName}
            </Label>
            <Input
              id="paidAmount"
              type="number"
              step="0.01"
              placeholder="0"
              value={paidAmountValue}
              onChange={(e) => setPaidAmountValue(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to clear the paid amount
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closePaidAmountModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSavePaidAmount}
              disabled={updatingId === paidAmountModal.requestId}
            >
              {updatingId === paidAmountModal.requestId
                ? "Saving..."
                : "Save Amount"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
