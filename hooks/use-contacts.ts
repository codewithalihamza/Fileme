import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  message: string;
  status: "pending" | "in-progress" | "completed" | "unpaid" | "paid";
  paidAmount: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ContactsResponse {
  data: Contact[];
  pagination: Pagination;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
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
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(statusFilter && statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch contacts");
      }

      setContacts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch contacts";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, debouncedSearch, statusFilter, pagination.limit]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const createContact = async (contactData: {
    name: string;
    email?: string;
    phone: string;
    service: string;
    message: string;
  }) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create contact");
      }

      const data = await response.json();
      toast.success("Contact submitted successfully");
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create contact";
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      setUpdatingId(id);
      const response = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update contact");
      }

      toast.success("Contact updated successfully");
      fetchContacts();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update contact";
      toast.error(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const getContact = async (id: string): Promise<Contact | null> => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch contact");

      const data = await response.json();
      return data.contact;
    } catch (error) {
      toast.error("Failed to fetch contact");
      return null;
    }
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return {
    contacts,
    pagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    updatingId,
    createContact,
    updateContact,
    getContact,
    setPage,
    setLimit,
    refetch: fetchContacts,
  };
}
