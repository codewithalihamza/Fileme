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
import { useContacts } from "@/hooks/use-contacts";
import { ChevronLeft, ChevronRight, Edit, Eye, Search } from "lucide-react";
import Link from "next/link";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableRow key={contact.id}>
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
                    {contact.paidAmount ? `$${contact.paidAmount}` : "-"}
                  </TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell>
                    {updatingId === contact.id ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                        <Skeleton className="h-10 w-[140px]" />
                        <Skeleton className="h-10 w-[140px]" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/contacts/${contact.id}`}>
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
                          value={contact.status}
                          onValueChange={(value) =>
                            updateContact(contact.id, {
                              status: value as
                                | "pending"
                                | "in-progress"
                                | "completed"
                                | "unpaid"
                                | "paid",
                            })
                          }
                          disabled={updatingId === contact.id}
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
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Paid amount"
                          type="number"
                          step="0.01"
                          className="w-[140px]"
                          defaultValue={contact.paidAmount || ""}
                          onBlur={(e) => {
                            const value = e.target.value;
                            if (value) {
                              updateContact(contact.id, { paidAmount: value });
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
