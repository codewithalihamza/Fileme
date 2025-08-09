"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, useContacts } from "@/hooks/use-contacts";
import { getContactsStatusBadge } from "@/lib/color-constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatDate } from "@/lib/utils";
import { heardFromNames, servicesNames } from "@/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Skeleton components
const SkeletonCard = () => (
  <div className="rounded-lg border bg-white p-6 shadow-sm">
    <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
    <div className="space-y-4">
      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
    </div>
  </div>
);

const SkeletonHeader = () => (
  <div className="mb-6 flex items-center justify-between">
    <div className="flex-1">
      <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
      <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
    </div>
  </div>
);

export default function ContactDetailPage({ params }: PageProps) {
  const { getContact } = useContacts();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonHeader />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
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
        <div className="flex-1">
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
            Contact Details
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            View contact details
          </p>
        </div>
        <div className="flex items-center gap-2">
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
                  <p className="text-gray-900">{contact.name}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
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
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{contact.phone}</p>
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
                  <p className="text-gray-900">
                    {
                      servicesNames.find(
                        (option) => option.value === contact.service
                      )?.label
                    }
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Heard From
                  </label>
                  <p className="text-gray-900">
                    {
                      heardFromNames.find(
                        (option) => option.value === contact.heardFrom
                      )?.label
                    }
                  </p>
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
              <p className="whitespace-pre-wrap text-gray-700">
                {contact.message}
              </p>
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
              <div className="flex items-center gap-2">
                {getContactsStatusBadge(contact.status)}
              </div>
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
