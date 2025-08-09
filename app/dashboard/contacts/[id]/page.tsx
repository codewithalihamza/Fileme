"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact, useContacts } from "@/hooks/use-contacts";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import {
  contactStatusNames,
  heardFromNames,
  servicesNames
} from "@/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  Mail,
  MessageSquare,
  Save,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ContactDetailPage({ params }: PageProps) {
  const { getContact, updateContact, updatingId } = useContacts();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Contact>>({});
  const [contactId, setContactId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setContactId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!contactId) return;

    const fetchContact = async () => {
      try {
        setLoading(true);
        const contactData = await getContact(contactId);
        if (contactData) {
          setContact(contactData);
        } else {
          toast.error("Contact not found");
        }
      } catch (error) {
        toast.error("Failed to fetch contact details");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactId, getContact]);

  const handleUpdateContact = useCallback(async () => {
    if (!contactId) return;

    try {
      await updateContact(contactId, editData);
      setEditing(false);
      setEditData({});
      // Refetch the contact data after update
      const contactData = await getContact(contactId);
      if (contactData) {
        setContact(contactData);
      }
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [contactId, editData, updateContact, getContact]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-500 text-white",
      in_progress: "bg-blue-500 text-white",
      contacted: "bg-green-500 text-white",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("_", " ").charAt(0).toUpperCase() +
          status.replace("_", " ").slice(1).toLowerCase()}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href={ROUTES_CONSTANT.CONTACTS}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>
        </div>
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href={ROUTES_CONSTANT.CONTACTS}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>
        </div>
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold">Contact not found</div>
          <p className="text-gray-600">
            The contact you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={ROUTES_CONSTANT.CONTACTS}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editing ? "Edit Contact" : "Contact Details"}
            </h1>
            <p className="text-gray-600">
              {editing
                ? "Update contact information"
                : "View and manage contact information"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setEditData({});
                }}
                className="flex items-center gap-2"
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button
                onClick={handleUpdateContact}
                disabled={updatingId === contactId}
                className="flex items-center gap-2"
              >
                <Save className="size-4" />
                {updatingId === contactId ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setEditing(true)}
                disabled={updatingId === contactId}
                className="flex items-center gap-2"
              >
                <Edit className="size-4" />
                Edit Contact
              </Button>
              <Button
                onClick={() => {
                  const url = `${ROUTES_CONSTANT.REQUESTS}/new?contactId=${contactId}`;
                  window.location.href = url;
                }}
                className="flex items-center gap-2"
              >
                <FileText className="size-4" />
                Create Request
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  {editing ? (
                    <Input
                      value={editData.name || contact.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900">{contact.name}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  {editing ? (
                    <Input
                      type="email"
                      value={editData.email || contact.email || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    <>
                      {contact.email ? (
                        <div className="flex items-center gap-2">
                          <Mail className="size-4 text-gray-400" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {contact.email}
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-500">Not provided</p>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  {editing ? (
                    <Input
                      type="tel"
                      value={editData.phone || contact.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900">{contact.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Service Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Required
                  </label>
                  {editing ? (
                    <Select
                      value={editData.service || contact.service}
                      onValueChange={(value) =>
                        setEditData({ ...editData, service: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesNames.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-900">
                      {
                        servicesNames.find(
                          (option) => option.value === contact.service
                        )?.label
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Heard From
                  </label>
                  {editing ? (
                    <Select
                      value={editData.heardFrom || contact.heardFrom}
                      onValueChange={(value) =>
                        setEditData({ ...editData, heardFrom: value as any })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {heardFromNames.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-900">
                      {
                        heardFromNames.find(
                          (option) => option.value === contact.heardFrom
                        )?.label
                      }
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="size-5" />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <textarea
                  value={editData.message || contact.message}
                  onChange={(e) =>
                    setEditData({ ...editData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="whitespace-pre-wrap text-gray-700">
                  {contact.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="size-5" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <Select
                  value={editData.status || contact.status}
                  onValueChange={(value) =>
                    setEditData({ ...editData, status: value as any })
                  }
                >
                  <SelectTrigger>
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
              ) : (
                <div className="flex items-center gap-2">
                  {getStatusBadge(contact.status)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Created
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Updated
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {formatDate(contact.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
