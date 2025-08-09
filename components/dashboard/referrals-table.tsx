"use client";

import { Button } from "@/components/ui/button";
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
import { getReferralStatusBadge } from "@/lib/color-constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ReferralStatus, referralStatusNames, servicesNames } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Eye,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    refetch,
  } = useReferrals();

  const router = useRouter();

  const [earningsModal, setEarningsModal] = useState<{
    isOpen: boolean;
    referralId: string | null;
    currentAmount: string | null;
    referralName: string;
    field: "totalEarned" | "amountSent";
  }>({
    isOpen: false,
    referralId: null,
    currentAmount: null,
    referralName: "",
    field: "totalEarned",
  });

  const [modalValue, setModalValue] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const openEarningsModal = (
    referralId: string,
    currentAmount: string | null,
    referralName: string,
    field: "totalEarned" | "amountSent"
  ) => {
    setEarningsModal({
      isOpen: true,
      referralId,
      currentAmount,
      referralName,
      field,
    });
    setModalValue(currentAmount || "");
  };

  const closeEarningsModal = () => {
    setEarningsModal({
      isOpen: false,
      referralId: null,
      currentAmount: null,
      referralName: "",
      field: "totalEarned",
    });
    setModalValue("");
  };

  const handleSaveEarnings = async () => {
    if (earningsModal.referralId) {
      const stringValue = modalValue === "" ? null : modalValue;
      await updateReferral(earningsModal.referralId, {
        [earningsModal.field]: stringValue,
      });
      closeEarningsModal();
    }
  };

  const handleQuickAction = (action: string, referralId: string) => {
    switch (action) {
      case "view":
        router.push(`${ROUTES_CONSTANT.REFERRALS}/${referralId}`);
        break;
      case "create-request":
        router.push(`${ROUTES_CONSTANT.REQUESTS}/new?referralId=${referralId}`);
        break;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {referralStatusNames.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              <TableHead className="w-[100px]">Actions</TableHead>
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
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{referral.referrerName}</div>
                      <div className="text-sm text-gray-500">
                        {referral.referrerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {
                      servicesNames.find(
                        (service: { value: string; label: string }) =>
                          service.value === referral.service
                      )?.label
                    }
                  </TableCell>
                  <TableCell>
                    {getReferralStatusBadge(referral.status)}
                  </TableCell>
                  <TableCell>
                    {updatingId === referral.id ? (
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-8 w-full rounded-md" />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          openEarningsModal(
                            referral.id,
                            referral.totalEarned,
                            referral.friendName,
                            "totalEarned"
                          )
                        }
                        className="text-xs"
                      >
                        {referral.totalEarned
                          ? formatCurrency(parseFloat(referral.totalEarned))
                          : "Set Earnings"}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {updatingId === referral.id ? (
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-8 w-full rounded-md" />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          openEarningsModal(
                            referral.id,
                            referral.amountSent,
                            referral.referrerName,
                            "amountSent"
                          )
                        }
                        className="text-xs"
                      >
                        {referral.amountSent
                          ? formatCurrency(parseFloat(referral.amountSent))
                          : "Set Amount"}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(referral.createdAt)}</TableCell>
                  <TableCell>
                    {updatingId === referral.id ? (
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {/* Quick Status Update */}
                        <div>
                          <Select
                            value={referral.status}
                            onValueChange={(value) =>
                              updateReferral(referral.id, {
                                status: value as ReferralStatus,
                              })
                            }
                            disabled={updatingId === referral.id}
                          >
                            <SelectTrigger className="h-8 w-[120px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {referralStatusNames.map((status) => (
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
                          <DropdownMenuTrigger asChild>
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
                              onClick={() =>
                                handleQuickAction("view", referral.id)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleQuickAction("create-request", referral.id)
                              }
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Create Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                openEarningsModal(
                                  referral.id,
                                  referral.totalEarned,
                                  referral.friendName,
                                  "totalEarned"
                                )
                              }
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Update Earnings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                openEarningsModal(
                                  referral.id,
                                  referral.amountSent,
                                  referral.referrerName,
                                  "amountSent"
                                )
                              }
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Update Amount Sent
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

      {/* Earnings Modal */}
      <Modal
        isOpen={earningsModal.isOpen}
        onClose={closeEarningsModal}
        title={`Update ${earningsModal.field === "totalEarned" ? "Earnings" : "Amount Sent"}`}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="earningsAmount" className="text-sm font-medium">
              {earningsModal.field === "totalEarned"
                ? "Total Earned"
                : "Amount Sent"}{" "}
              for {earningsModal.referralName}
            </Label>
            <Input
              id="earningsAmount"
              type="number"
              step="0.01"
              placeholder="0"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to clear the amount
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeEarningsModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEarnings}
              disabled={updatingId === earningsModal.referralId}
            >
              {updatingId === earningsModal.referralId
                ? "Saving..."
                : "Save Amount"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
