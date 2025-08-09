"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { servicesNames } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter && statusFilter !== "all" && { status: statusFilter }),
        ...(serviceFilter &&
          serviceFilter !== "all" && { service: serviceFilter }),
      });

      const response = await fetch(`/api/dashboard/requests?${params}`);
      const data = await response.json();

      if (response.ok) {
        setRequests(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalRequests(data.pagination.total);
      } else {
        toast.error("Failed to fetch requests");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, search, statusFilter, serviceFilter]);

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
        fetchRequests();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete request");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
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
                  {requests.filter((r) => r.status === "pending").length}
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
                  {requests.filter((r) => r.status === "in_progress").length}
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
                  {requests.filter((r) => r.status === "completed").length}
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
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    requests.reduce((sum, r) => sum + (r.paidAmount || 0), 0)
                  )}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-0 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search by service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Services" />
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
            </div>
            <Button asChild>
              <Link href={ROUTES_CONSTANT.NEW_REQUEST}>
                <Plus className="mr-2 h-4 w-4" />
                Add Request
              </Link>
            </Button>
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
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        <span className="ml-2">Loading requests...</span>
                      </div>
                    </TableCell>
                  </TableRow>
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
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.user.name}</div>
                          <div className="text-sm text-gray-500">
                            {request.user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getServiceLabel(request.service)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        {request.assignee ? (
                          <div>
                            <div className="font-medium">
                              {request.assignee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.assignee.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {request.paidAmount
                          ? formatCurrency(request.paidAmount)
                          : "Not paid"}
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`${ROUTES_CONSTANT.REQUESTS}/${request.id}`}
                              >
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`${ROUTES_CONSTANT.REQUESTS}/${request.id}/edit`}
                              >
                                Edit Request
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRequest(request.id)}
                              className="text-red-600"
                            >
                              Delete Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
    </div>
  );
}
