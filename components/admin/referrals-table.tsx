"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Referral {
  id: string;
  friendName: string;
  friendEmail: string | null;
  friendPhone: string;
  referrerName: string;
  referrerEmail: string | null;
  referrerPhone: string;
  service: string;
  accountDetails: string;
  status: "pending" | "in-progress" | "completed" | "paid";
  totalEarned: string;
  amountSent: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function ReferralsTable() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(statusFilter && statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/referrals?${params}`);
      if (!response.ok) throw new Error("Failed to fetch referrals");

      const data = await response.json();
      setReferrals(data.data);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Failed to fetch referrals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [pagination.page, search, statusFilter]);

  const updateReferral = async (id: string, updates: any) => {
    try {
      setUpdatingId(id);
      const response = await fetch("/api/admin/referrals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!response.ok) throw new Error("Failed to update referral");

      toast.success("Referral updated successfully");
      fetchReferrals();
    } catch (error) {
      toast.error("Failed to update referral");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      paid: "bg-green-100 text-green-800",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return amount ? `$${parseFloat(amount).toFixed(2)}` : "$0.00";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading referrals...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-sm flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Friend Details</TableHead>
              <TableHead>Referrer Details</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Amount Sent</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{referral.friendName}</div>
                    <div className="text-sm text-gray-500">
                      {referral.friendPhone}
                    </div>
                    {referral.friendEmail && (
                      <div className="text-sm text-gray-500">
                        {referral.friendEmail}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{referral.referrerName}</div>
                    <div className="text-sm text-gray-500">
                      {referral.referrerPhone}
                    </div>
                    {referral.referrerEmail && (
                      <div className="text-sm text-gray-500">
                        {referral.referrerEmail}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{referral.service}</TableCell>
                <TableCell>{getStatusBadge(referral.status)}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(referral.totalEarned)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(referral.amountSent)}
                </TableCell>
                <TableCell>{formatDate(referral.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={referral.status}
                      onValueChange={(value) =>
                        updateReferral(referral.id, { status: value })
                      }
                      disabled={updatingId === referral.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Total earned"
                      type="number"
                      step="0.01"
                      className="w-[140px]"
                      defaultValue={referral.totalEarned || ""}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value) {
                          updateReferral(referral.id, { totalEarned: value });
                        }
                      }}
                    />
                    <Input
                      placeholder="Amount sent"
                      type="number"
                      step="0.01"
                      className="w-[140px]"
                      defaultValue={referral.amountSent || ""}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value) {
                          updateReferral(referral.id, { amountSent: value });
                        }
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={pagination.page === pagination.totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
