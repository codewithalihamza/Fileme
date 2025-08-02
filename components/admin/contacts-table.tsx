"use client";

import { getStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { useContacts } from "@/hooks/use-contacts";
import { formatDate } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ContactsTable() {
  const {
    contacts,
    pagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    updatingId,
    updateContact,
    setPage,
  } = useContacts();

  const router = useRouter();
  const [paidModal, setPaidModal] = useState<{
    isOpen: boolean;
    contactId: string;
    contactName: string;
    currentAmount?: string | null;
    phone: string;
  }>({
    isOpen: false,
    contactId: "",
    contactName: "",
    currentAmount: null,
    phone: "",
  });

  const handleRowClick = (contactId: string) => {
    router.push(`/admin/contacts/${contactId}`);
  };

  const handleStatusChange = async (
    contactId: string,
    newStatus: string,
    contactName: string,
    phone: string,
    currentAmount?: string | null
  ) => {
    if (newStatus === "paid") {
      setPaidModal({
        isOpen: true,
        contactId,
        contactName,
        currentAmount,
        phone,
      });
    } else {
      await updateContact(contactId, {
        status: newStatus as
          | "pending"
          | "in-progress"
          | "completed"
          | "unpaid"
          | "paid",
      });
    }
  };

  const handlePaidAmountSave = async (amount: string) => {
    try {
      await updateContact(paidModal.contactId, {
        status: "paid",
        paidAmount: amount,
      });
      toast.success("Payment recorded successfully");
    } catch (error) {
      toast.error("Failed to record payment");
    }
  };

  const handleQuickAction = (action: string, contactId: string) => {
    switch (action) {
      case "view":
        router.push(`/admin/contacts/${contactId}`);
        break;
      case "edit":
        router.push(`/admin/contacts/${contactId}`);
        break;
    }
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
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={7} />
            ) : contacts.length === 0 ? (
              <TableEmpty
                message="No contacts found"
                description="No contact submissions match your current filters"
                icon="inbox"
                columns={7}
              />
            ) : (
              contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                  onClick={() => handleRowClick(contact.id)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      {contact.email && (
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell className="capitalize">
                    {contact.service}
                  </TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    {contact.paidAmount ? `PKR ${contact.paidAmount}` : "-"}
                  </TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell>
                    {updatingId === contact.id ? (
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {/* Quick Status Update */}
                        <div
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <Select
                            value={contact.status}
                            onValueChange={(value) =>
                              handleStatusChange(
                                contact.id,
                                value,
                                contact.name,
                                contact.phone,
                                contact?.paidAmount
                              )
                            }
                            disabled={updatingId === contact.id}
                          >
                            <SelectTrigger className="h-8 w-[120px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="unpaid">Unpaid</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
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
                              onClick={() =>
                                handleQuickAction("view", contact.id)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleQuickAction("edit", contact.id)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Contact
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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

      {/* Paid Amount Modal */}
      <PaidAmountModal
        isOpen={paidModal.isOpen}
        onClose={() =>
          setPaidModal({
            isOpen: false,
            contactId: "",
            contactName: "",
            currentAmount: null,
            phone: "",
          })
        }
        onSave={handlePaidAmountSave}
        contactName={paidModal.contactName}
        currentAmount={paidModal.currentAmount}
        phone={paidModal.phone}
      />
    </div>
  );
}

interface PaidAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: string) => void;
  contactName: string;
  currentAmount?: string | null;
  phone: string;
}

function PaidAmountModal({
  isOpen,
  onClose,
  onSave,
  contactName,
  currentAmount,
  phone,
}: PaidAmountModalProps) {
  const [amount, setAmount] = useState(currentAmount || "");

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    onSave(amount);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enter Paid Amount"
      size="md"
      footer={
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <label className="float-left text-sm font-medium text-gray-700">
            Contact: {contactName}
          </label>
          <label className="float-right text-sm font-medium text-gray-700">
            Phone: {phone}
          </label>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Paid Amount (PKR)
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
}
