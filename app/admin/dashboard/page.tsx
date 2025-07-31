"use client";

import { ContactsTable } from "@/components/admin/contacts-table";
import { ReferralsTable } from "@/components/admin/referrals-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { FileText, MessageSquare, TrendingUp, Users2 } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
  const { logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "contacts" | "referrals"
  >("overview");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage contacts, referrals, and system overview
              </p>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                  activeTab === "contacts"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Contact Submissions
              </button>
              <button
                onClick={() => setActiveTab("referrals")}
                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                  activeTab === "referrals"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Referrals
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-4 py-6 sm:px-0">
          {activeTab === "overview" && (
            <>
              {/* Stats Cards */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Contacts
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      Contact form submissions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Referrals
                    </CardTitle>
                    <Users2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      Referral submissions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Contacts
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting response
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Earnings
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$0.00</div>
                    <p className="text-xs text-muted-foreground">
                      From referrals
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Admin logged in</p>
                        <p className="text-xs text-gray-600">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Dashboard accessed
                        </p>
                        <p className="text-xs text-gray-600">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "contacts" && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>
                  Manage and track contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactsTable />
              </CardContent>
            </Card>
          )}

          {activeTab === "referrals" && (
            <Card>
              <CardHeader>
                <CardTitle>Referral Management</CardTitle>
                <CardDescription>
                  Manage referral submissions and track earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReferralsTable />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
