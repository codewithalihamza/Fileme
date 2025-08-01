"use client";

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
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Users2,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back! Here&apos;s what&apos;s happening with your
                business today.
              </p>
            </div>
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

        {/* Quick Stats */}
        <div className="mb-8 px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Contacts
                </CardTitle>
                <div className="rounded-lg bg-blue-100 p-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="mt-1 text-xs text-gray-500">
                  Contact form submissions
                </p>
                <div className="mt-2 flex items-center">
                  <Activity className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    +0% from last month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Referrals
                </CardTitle>
                <div className="rounded-lg bg-green-100 p-2">
                  <Users2 className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="mt-1 text-xs text-gray-500">
                  Referral submissions
                </p>
                <div className="mt-2 flex items-center">
                  <Activity className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    +0% from last month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pending Contacts
                </CardTitle>
                <div className="rounded-lg bg-yellow-100 p-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="mt-1 text-xs text-gray-500">Awaiting response</p>
                <div className="mt-2 flex items-center">
                  <AlertCircle className="mr-1 h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-yellow-600">
                    Requires attention
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Earnings
                </CardTitle>
                <div className="rounded-lg bg-purple-100 p-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">$0.00</div>
                <p className="mt-1 text-xs text-gray-500">From referrals</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    +0% from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 px-4 sm:px-0">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/contacts">
              <Card className="group cursor-pointer border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        Manage Contacts
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        View and manage all contact submissions
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/referrals">
              <Card className="group cursor-pointer border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-600">
                        Manage Referrals
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Track referrals and manage earnings
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card className="group cursor-pointer border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                        View Analytics
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Detailed reports and insights
                      </p>
                    </div>
                    <BarChart3 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 sm:px-0">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest actions and updates in your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3">
                  <div className="rounded-full bg-green-100 p-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      System initialized
                    </p>
                    <p className="text-xs text-gray-600">
                      Admin dashboard is ready for use
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>

                <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Database connected
                    </p>
                    <p className="text-xs text-gray-600">
                      Ready to store contacts and referrals
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
