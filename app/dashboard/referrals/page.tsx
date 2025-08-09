"use client";

import { ReferralsTable } from "@/components/dashboard/referrals-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { useReferralStats } from "@/hooks/use-referrals";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Gift, Users2 } from "lucide-react";

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

export default function AdminReferralsPage() {
  const { stats, loading } = useReferralStats();

  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="Referral Management"
        description="Track referrals and manage earnings from the referral program"
      />
      {/* Stats Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {loading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            <>
              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-green-100 p-2">
                      <Users2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Referrals
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
                    <div className="rounded-lg bg-blue-100 p-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Earnings
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(stats.totalEarnings)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Paid Out
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(stats.totalPaidOut)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Referrals Table */}
      <div>
        <Card className="border-0 bg-white shadow-lg">
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
    </div>
  );
}
