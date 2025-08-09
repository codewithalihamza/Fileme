"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReferrals } from "@/hooks/use-referrals";
import { getReferralStatusBadge } from "@/lib/color-constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency, formatDate } from "@/lib/utils";
import { servicesNames } from "@/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Gift,
  Mail,
  Phone,
  TrendingUp,
  User,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

export default function ReferralDetailPage({ params }: PageProps) {
  const { getReferral } = useReferrals();
  const [referral, setReferral] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referralId, setReferralId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setReferralId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const fetchReferral = useCallback(async () => {
    if (!referralId) return;

    try {
      setLoading(true);
      const referralData = await getReferral(referralId);
      if (referralData) {
        setReferral(referralData);
      } else {
        toast.error("Referral not found");
      }
    } catch (error) {
      toast.error("Failed to fetch referral details");
    } finally {
      setLoading(false);
    }
  }, [referralId, getReferral]);

  useEffect(() => {
    fetchReferral();
  }, [fetchReferral]);

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

  if (!referral) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href={ROUTES_CONSTANT.REFERRALS}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to Referrals
          </Link>
        </div>
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold">Referral not found</div>
          <p className="text-gray-600">
            The referral you&apos;re looking for doesn&apos;t exist.
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
          <h1 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
            Referral Details
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            View referral details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              const url = `${ROUTES_CONSTANT.REQUESTS}/new?referralId=${referralId}`;
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
          {/* Referred Friend Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Referred Friend Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-gray-900">{referral.friendName}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-gray-400" />
                    <p className="text-gray-900">{referral.friendPhone}</p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  {referral.friendEmail ? (
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-gray-400" />
                      <a
                        href={`mailto:${referral.friendEmail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {referral.friendEmail}
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500">Not provided</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Required
                  </label>
                  <p className="text-gray-900">
                    {
                      servicesNames.find(
                        (option) => option.value === referral.service
                      )?.label
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referrer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 className="size-5" />
                Referrer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Referrer Name
                  </label>
                  <p className="text-gray-900">{referral.referrerName}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-gray-400" />
                    <p className="text-gray-900">{referral.referrerPhone}</p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  {referral.referrerEmail ? (
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-gray-400" />
                      <a
                        href={`mailto:${referral.referrerEmail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {referral.referrerEmail}
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500">Not provided</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5" />
                Earnings Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Total Earned
                  </label>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-gray-400" />
                    <p className="text-gray-900">
                      {formatCurrency(parseFloat(referral.totalEarned || "0"))}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Amount Sent
                  </label>
                  <div className="flex items-center gap-2">
                    <Gift className="size-4 text-gray-400" />
                    <p className="text-gray-900">
                      {formatCurrency(parseFloat(referral.amountSent || "0"))}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Pending Amount
                  </label>
                  <p className="text-gray-900">
                    {formatCurrency(
                      parseFloat(referral.totalEarned || "0") -
                        parseFloat(referral.amountSent || "0")
                    )}
                  </p>
                </div>
              </div>
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
                {getReferralStatusBadge(referral.status)}
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
                    {formatDate(referral.createdAt)}
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
                    {formatDate(referral.updatedAt)}
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
