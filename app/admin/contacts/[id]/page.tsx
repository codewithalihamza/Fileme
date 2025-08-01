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
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Contact {
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

export default function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { logout, isLoading } = useAuth();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Contact>>({});

  useEffect(() => {
    fetchContact();
  }, [params.id]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      // This would be replaced with actual API call
      // const response = await fetch(`/api/admin/contacts/${params.id}`);
      // const data = await response.json();
      // setContact(data);

      // Mock data for now
      setContact({
        id: params.id,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "03000000000",
        service: "tax",
        message:
          "I need help with my tax filing for the current year. I have multiple income sources and need professional assistance.",
        status: "pending",
        paidAmount: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      toast.error("Failed to fetch contact details");
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async () => {
    try {
      // This would be replaced with actual API call
      // const response = await fetch(`/api/admin/contacts/${params.id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(editData),
      // });

      toast.success("Contact updated successfully");
      setEditing(false);
      fetchContact();
    } catch (error) {
      toast.error("Failed to update contact");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      unpaid: "bg-red-100 text-red-800",
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-lg">Loading contact details...</div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-lg">Contact not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/contacts">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Contacts
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Contact Details
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  View and manage contact information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {editing ? (
                <>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={updateContact}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 sm:px-0">
          {/* Contact Information */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <User className="mr-2 h-4 w-4" />
                    Full Name
                  </label>
                  {editing ? (
                    <Input
                      value={editData.name || contact.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {contact.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </label>
                  {editing ? (
                    <Input
                      value={editData.phone || contact.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {contact.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </label>
                  {editing ? (
                    <Input
                      value={editData.email || contact.email || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {contact.email || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <FileText className="mr-2 h-4 w-4" />
                    Service Required
                  </label>
                  {editing ? (
                    <Select
                      value={editData.service || contact.service}
                      onValueChange={(value) =>
                        setEditData({ ...editData, service: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax">Tax Services</SelectItem>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 text-lg font-medium capitalize text-gray-900">
                      {contact.service}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </label>
                {editing ? (
                  <textarea
                    value={editData.message || contact.message}
                    onChange={(e) =>
                      setEditData({ ...editData, message: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                ) : (
                  <p className="mt-1 rounded-lg bg-gray-50 p-3 text-gray-700">
                    {contact.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status and Payment */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Status & Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Current Status
                  </label>
                  {editing ? (
                    <Select
                      value={editData.status || contact.status}
                      onValueChange={(value) =>
                        setEditData({ ...editData, status: value as any })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1">{getStatusBadge(contact.status)}</div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Paid Amount
                  </label>
                  {editing ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={editData.paidAmount || contact.paidAmount || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, paidAmount: e.target.value })
                      }
                      className="mt-1"
                      placeholder="Enter amount"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {contact.paidAmount
                        ? `$${contact.paidAmount}`
                        : "Not paid"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Submitted
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(contact.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Contact
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
