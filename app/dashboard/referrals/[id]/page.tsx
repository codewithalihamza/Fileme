"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  Gift,
  Mail,
  Phone,
  Save,
  TrendingUp,
  User,
  Users2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Referral {
  id: string;
  friendName: string;
  friendEmail: string;
  friendPhone: string;
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  service: string;
  status: "pending" | "in_progress" | "completed" | "paid";
  totalEarned: string;
  amountSent: string;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ReferralDetailPage({ params }: PageProps) {
  const { logout, isLoading } = useAuth();
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Referral>>({});
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
      // This would be replaced with actual API call
      // const response = await fetch(`/api/dashboard/referrals/${referralId}`);
      // const data = await response.json();
      // setReferral(data);

      // Mock data for now
      setReferral({
        id: referralId,
        friendName: "Jane Smith",
        friendEmail: "jane.smith@example.com",
        friendPhone: "03000000001",
        referrerName: "John Doe",
        referrerEmail: "john.doe@example.com",
        referrerPhone: "03000000000",
        service: "tax",
        status: "pending",
        totalEarned: "150.00",
        amountSent: "0.00",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      toast.error("Failed to fetch referral details");
    } finally {
      setLoading(false);
    }
  }, [referralId]);

  useEffect(() => {
    fetchReferral();
  }, [fetchReferral]);

  const updateReferral = async () => {
    try {
      // This would be replaced with actual API call
      // const response = await fetch(`/api/dashboard/referrals/${params.id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(editData),
      // });

      toast.success("Referral updated successfully");
      setEditing(false);
      fetchReferral();
    } catch (error) {
      toast.error("Failed to update referral");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      paid: "bg-green-100 text-green-800",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        <div className="text-lg">Loading referral details...</div>
      </div>
    );
  }

  if (!referral) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        <div className="text-lg">Referral not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={ROUTES_CONSTANT.REFERRALS}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Referrals
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Referral Details
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  View and manage referral information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {editing ? (
                <>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={updateReferral}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 sm:px-0">
          {/* Referred Friend Information */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                <User className="mr-2 h-5 w-5" />
                Referred Friend Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  {editing ? (
                    <Input
                      value={editData.friendName || referral.friendName}
                      onChange={(e) =>
                        setEditData({ ...editData, friendName: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.friendName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </label>
                  {editing ? (
                    <Input
                      value={editData.friendPhone || referral.friendPhone}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          friendPhone: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.friendPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </label>
                  {editing ? (
                    <Input
                      value={editData.friendEmail || referral.friendEmail || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          friendEmail: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.friendEmail || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <FileText className="mr-2 h-4 w-4" />
                    Service Required
                  </label>
                  {editing ? (
                    <Select
                      value={editData.service || referral.service}
                      onValueChange={(value) =>
                        setEditData({ ...editData, service: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax">Tax Services</SelectItem>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 text-lg font-medium capitalize text-gray-900">
                      {referral.service}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referrer Information */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                <Users2 className="mr-2 h-5 w-5" />
                Referrer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Referrer Name
                  </label>
                  {editing ? (
                    <Input
                      value={editData.referrerName || referral.referrerName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          referrerName: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.referrerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </label>
                  {editing ? (
                    <Input
                      value={editData.referrerPhone || referral.referrerPhone}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          referrerPhone: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.referrerPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </label>
                  {editing ? (
                    <Input
                      value={
                        editData.referrerEmail || referral.referrerEmail || ""
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          referrerEmail: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {referral.referrerEmail || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status and Earnings */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Status & Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Current Status
                  </label>
                  {editing ? (
                    <Select
                      value={editData.status || referral.status}
                      onValueChange={(value) =>
                        setEditData({ ...editData, status: value as any })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1">
                      {getStatusBadge(referral.status)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Total Earned
                  </label>
                  {editing ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={editData.totalEarned || referral.totalEarned || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          totalEarned: e.target.value,
                        })
                      }
                      className="mt-1"
                      placeholder="Enter amount"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {formatCurrency(parseFloat(referral.totalEarned))}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-600">
                    <Gift className="mr-2 h-4 w-4" />
                    Amount Sent
                  </label>
                  {editing ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={editData.amountSent || referral.amountSent || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, amountSent: e.target.value })
                      }
                      className="mt-1"
                      placeholder="Enter amount"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {formatCurrency(parseFloat(referral.amountSent))}
                    </p>
                  )}
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-900">
                  Earnings Summary
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div>
                    <span className="text-gray-600">Total Earned:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {formatCurrency(parseFloat(referral.totalEarned))}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount Sent:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {formatCurrency(parseFloat(referral.amountSent))}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Pending:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {formatCurrency(
                        parseFloat(referral.totalEarned) -
                          parseFloat(referral.amountSent)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Referral Submitted
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(referral.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(referral.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Referrer
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Friend
                </Button>
                <Button variant="outline" size="sm">
                  <Gift className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
