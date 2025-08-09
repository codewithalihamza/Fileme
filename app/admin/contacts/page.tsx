"use client";

import { ContactsTable } from "@/components/admin/contacts-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Calendar, Download, MessageSquare, Phone, User } from "lucide-react";

export default function AdminContactsPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="Contact Management"
        description="Manage and track all contact form submissions"
      >
        <Button variant="outline" size="sm" className="bg-white shadow-sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      {/* Stats Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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
                  <p className="text-2xl font-bold text-gray-900">0</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
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
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
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
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
