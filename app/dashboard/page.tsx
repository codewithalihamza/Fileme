"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency } from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Users2,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business today."
      />

      {/* Quick Stats */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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

          <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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
              <p className="mt-1 text-xs text-gray-500">Referral submissions</p>
              <div className="mt-2 flex items-center">
                <Activity className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">
                  +0% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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

          <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Earnings
              </CardTitle>
              <div className="rounded-lg bg-purple-100 p-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(0)}
              </div>
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
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href={ROUTES_CONSTANT.USERS}>
            <Card className="group cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                      Users Management
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage users and their roles
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={ROUTES_CONSTANT.CONTACTS}>
            <Card className="group cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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

          <Link href={ROUTES_CONSTANT.REFERRALS}>
            <Card className="group cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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
          <Link href={ROUTES_CONSTANT.REQUESTS}>
            <Card className="group cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                      Requests Management
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage requests and their status
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
