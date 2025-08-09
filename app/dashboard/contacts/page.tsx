"use client";

import { ContactsTable } from "@/components/dashboard/contacts-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { useContactStats } from "@/hooks/use-contacts";
import { Calendar, MessageSquare, Phone, User } from "lucide-react";

// Skeleton component for stats cards
const StatsCardSkeleton = () => (
  <Card className="border-0 bg-white shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="ml-4 flex-1">
          <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-8 w-12 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AdminContactsPage() {
  const { stats, loading } = useContactStats();

  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="Contact Management"
        description="Manage and track all contact form submissions"
      />

      {/* Stats Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {loading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            <>
              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Contacts
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-yellow-100 p-2">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.pending}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-green-100 p-2">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.completed}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <Phone className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Contacted
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.contacted}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Contacts Table */}
      <div>
        <Card className="border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Contact Submissions
            </CardTitle>
            <CardDescription>
              View and manage all contact form submissions with detailed
              information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
