"use client";

import { getStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { TableEmpty } from "@/components/ui/table-empty";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useReferrals } from "@/hooks/use-referrals";
import { ChevronLeft, ChevronRight, Edit, Eye, Search } from "lucide-react";
import Link from "next/link";

export function ReferralsTable() {
  const {
    referrals,
    pagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    updatingId,
    updateReferral,
    setPage,
  } = useReferrals();

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
            {loading ? (
              <TableSkeleton rows={5} columns={8} />
            ) : referrals.length === 0 ? (
              <TableEmpty
                message="No referrals found"
                description="No referral submissions match your current filters"
                icon="inbox"
                columns={8}
              />
            ) : (
              referrals.map((referral) => (
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
                  <TableCell className="capitalize">
                    {referral.service}
                  </TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(referral.totalEarned)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(referral.amountSent)}
                  </TableCell>
                  <TableCell>{formatDate(referral.createdAt)}</TableCell>
                  <TableCell>
                    {updatingId === referral.id ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                        <Skeleton className="h-10 w-[140px]" />
                        <Skeleton className="h-10 w-[140px]" />
                        <Skeleton className="h-10 w-[140px]" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/referrals/${referral.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <Select
                          value={referral.status}
                          onValueChange={(value) =>
                            updateReferral(referral.id, {
                              status: value as
                                | "pending"
                                | "in-progress"
                                | "completed"
                                | "paid",
                            })
                          }
                          disabled={updatingId === referral.id}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
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
                              updateReferral(referral.id, {
                                totalEarned: value,
                              });
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
                              updateReferral(referral.id, {
                                amountSent: value,
                              });
                            }
                          }}
                        />
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
              onClick={() => setPage(pagination.page - 1)}
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
              onClick={() => setPage(pagination.page + 1)}
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
