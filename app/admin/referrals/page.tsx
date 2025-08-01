"use client";

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
import { useReferrals } from "@/hooks/use-referrals";
import {
  ArrowLeft,
  BarChart3,
  DollarSign,
  Download,
  Filter,
  Gift,
  Mail,
  Plus,
  Search,
  TrendingUp,
  Users2,
} from "lucide-react";
import Link from "next/link";

export default function AdminReferralsPage() {
  const { logout, isLoading } = useAuth();
  const { search, setSearch } = useReferrals();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
                  Referral Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Track referrals and manage earnings from the referral program
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
                  <div className="rounded-lg bg-green-100 p-2">
                    <Users2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Referrals
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$0.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Gift className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Paid Out
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$0.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 px-4 sm:px-0">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="max-w-md flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search referrals by name, phone, or email..."
                      className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-green-500"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Referral
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referrals Table */}
        <div className="px-4 sm:px-0">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Referral Submissions
              </CardTitle>
              <CardDescription>
                View and manage all referral submissions with earnings tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReferralsTable />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 px-4 sm:px-0">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Referral Program Insights
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Track performance and optimize your referral program
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-3 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
