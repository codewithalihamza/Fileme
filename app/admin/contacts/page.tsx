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
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowLeft,
  Calendar,
  Download,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

export default function AdminContactsPage() {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Contact Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage and track all contact form submissions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
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

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
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

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="rounded-lg bg-green-100 p-2">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
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
        <div className="px-4 sm:px-0">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
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
    </div>
  );
}
