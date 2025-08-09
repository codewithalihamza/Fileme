"use client";

import { getStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatDate } from "@/lib/utils";
import { ContactStatus, contactStatusNames, servicesNames } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  MoreHorizontal,
  RefreshCw,
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
    serviceFilter,
    setServiceFilter,
    loading,
    updatingId,
    updateContact,
    setPage,
    refetch,
  } = useContacts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const handleRowClick = (contactId: string) => {
    router.push(`${ROUTES_CONSTANT.CONTACTS}/${contactId}`);
  };

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    await updateContact(contactId, {
      status: newStatus as ContactStatus,
    });
  };

  const handleQuickAction = (action: string, contactId: string) => {
    switch (action) {
      case "view":
        router.push(`${ROUTES_CONSTANT.CONTACTS}/${contactId}`);
        break;
      case "edit":
        router.push(`${ROUTES_CONSTANT.CONTACTS}/${contactId}`);
        break;
      case "create-request":
        router.push(`${ROUTES_CONSTANT.REQUESTS}/new?contactId=${contactId}`);
        break;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      toast.error("Failed to refresh contacts");
    } finally {
      setIsRefreshing(false);
    }
  };

  const getHeardFromLabel = (heardFrom: string) => {
    const labels: Record<string, string> = {
      linkedin: "LinkedIn",
      website: "Website",
      instagram: "Instagram",
      facebook: "Facebook",
      others: "Others",
    };
    return labels[heardFrom] || heardFrom;
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
              {contactStatusNames.map((status) => (
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
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Heard From</TableHead>
              <TableHead>Status</TableHead>
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
                    <div className="font-medium">{contact.name}</div>
                  </TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell className="capitalize">
                    {
                      servicesNames.find(
                        (service) => service.value === contact.service
                      )?.label
                    }
                  </TableCell>
                  <TableCell className="capitalize">
                    {getHeardFromLabel(contact.heardFrom)}
                  </TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
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
                              handleStatusChange(contact.id, value)
                            }
                            disabled={updatingId === contact.id}
                          >
                            <SelectTrigger className="h-8 w-[120px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {contactStatusNames.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
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
                              onClick={() =>
                                handleQuickAction("view", contact.id)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleQuickAction("create-request", contact.id)
                              }
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Create Request
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
    </div>
  );
}
