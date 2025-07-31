"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { ServiceDropdown } from "@/components/ui/service-dropdown";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { validatePhoneNumber } from "@/lib/utils";
import { useState } from "react";

interface ReferralFormData {
  // Friend details
  friendName: string;
  friendEmail: string;
  friendPhone: string;

  // Referrer details
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  service: string;

  // Account details
  accountDetails: string;
}

export default function ReferPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReferralFormData>({
    friendName: "",
    friendEmail: "",
    friendPhone: "",
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    service: "tax",
    accountDetails: "",
  });

  const [errors, setErrors] = useState<Partial<ReferralFormData>>({});

  const handleInputChange = (field: keyof ReferralFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ReferralFormData> = {};

    // Required fields validation
    if (!formData.friendName.trim()) {
      newErrors.friendName = "Friend's name is required";
    }
    if (!formData.friendPhone.trim()) {
      newErrors.friendPhone = "Friend's phone number is required";
    } else if (!validatePhoneNumber(formData.friendPhone)) {
      newErrors.friendPhone = "Phone number must be 11 digits";
    }
    if (!formData.referrerName.trim()) {
      newErrors.referrerName = "Your name is required";
    }
    if (!formData.referrerPhone.trim()) {
      newErrors.referrerPhone = "Your phone number is required";
    } else if (!validatePhoneNumber(formData.referrerPhone)) {
      newErrors.referrerPhone = "Phone number must be 11 digits";
    }
    if (!formData.service.trim()) {
      newErrors.service = "Please select a service";
    }
    if (!formData.accountDetails.trim()) {
      newErrors.accountDetails = "Account details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/refer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success message
        toast({
          title: "Referral Submitted!",
          description:
            "Thank you for your referral. We'll contact you soon with updates.",
        });

        // Reset form
        setFormData({
          friendName: "",
          friendEmail: "",
          friendPhone: "",
          referrerName: "",
          referrerEmail: "",
          referrerPhone: "",
          service: "tax",
          accountDetails: "",
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description:
            errorData.error || "Failed to submit referral. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit referral. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Refer & Earn <span className="text-green-600">15%</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Help your friends discover our services and earn 15% of the amount
              when they subscribe to our services.
            </p>
          </div>

          {/* How it works section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                How the Referral Program Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-lg font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Refer a Friend
                  </h3>
                  <p className="text-sm text-gray-600">
                    Share your friend&apos;s details with us using the form
                    below
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-lg font-bold text-green-600">2</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    They Subscribe
                  </h3>
                  <p className="text-sm text-gray-600">
                    We&apos;ll reach out to your friend and help them get
                    started
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-purple-100">
                    <span className="text-lg font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    You Earn 15%
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive 15% of their service amount directly to your account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Referral Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Referral Form
              </CardTitle>
              <CardDescription>
                Fill in the details below to refer your friend and start earning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Friend Details Section */}
                <div>
                  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
                    Friend&apos;s Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="friendName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="friendName"
                        type="text"
                        value={formData.friendName}
                        onChange={(e) =>
                          handleInputChange("friendName", e.target.value)
                        }
                        className={`mt-1 ${errors.friendName ? "border-red-500" : ""}`}
                        placeholder="Enter friend's full name"
                      />
                      {errors.friendName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.friendName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="friendEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email (Optional)
                      </Label>
                      <Input
                        id="friendEmail"
                        type="email"
                        value={formData.friendEmail}
                        onChange={(e) =>
                          handleInputChange("friendEmail", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter friend's email"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="friendPhone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="friendPhone"
                        type="tel"
                        value={formData.friendPhone}
                        onChange={(e) =>
                          handleInputChange("friendPhone", e.target.value)
                        }
                        className={`mt-1 ${errors.friendPhone ? "border-red-500" : ""}`}
                        placeholder="03XXXXXXXXX (11 digits)"
                        maxLength={11}
                      />
                      {errors.friendPhone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.friendPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Selection Section */}
                <div>
                  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
                    Service Required
                  </h3>
                  <div>
                    <ServiceDropdown
                      value={formData.service}
                      onValueChange={(value) => {
                        setFormData((prev) => ({ ...prev, service: value }));
                        if (errors.service) {
                          setErrors((prev) => ({ ...prev, service: "" }));
                        }
                      }}
                      error={errors.service}
                      placeholder="Select a service your friend needs"
                    />
                  </div>
                </div>

                {/* Referrer Details Section */}
                <div>
                  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
                    Your Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="referrerName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="referrerName"
                        type="text"
                        value={formData.referrerName}
                        onChange={(e) =>
                          handleInputChange("referrerName", e.target.value)
                        }
                        className={`mt-1 ${errors.referrerName ? "border-red-500" : ""}`}
                        placeholder="Enter your full name"
                      />
                      {errors.referrerName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.referrerName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="referrerEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email (Optional)
                      </Label>
                      <Input
                        id="referrerEmail"
                        type="email"
                        value={formData.referrerEmail}
                        onChange={(e) =>
                          handleInputChange("referrerEmail", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="referrerPhone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="referrerPhone"
                        type="tel"
                        value={formData.referrerPhone}
                        onChange={(e) =>
                          handleInputChange("referrerPhone", e.target.value)
                        }
                        className={`mt-1 ${errors.referrerPhone ? "border-red-500" : ""}`}
                        placeholder="03XXXXXXXXX (11 digits)"
                        maxLength={11}
                      />
                      {errors.referrerPhone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.referrerPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Details Section */}
                <div>
                  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
                    Payment Details
                  </h3>
                  <div>
                    <Label
                      htmlFor="accountDetails"
                      className="text-sm font-medium text-gray-700"
                    >
                      Account Details <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="accountDetails"
                      value={formData.accountDetails}
                      onChange={(e) =>
                        handleInputChange("accountDetails", e.target.value)
                      }
                      className={`mt-1 min-h-[100px] ${errors.accountDetails ? "border-red-500" : ""}`}
                      placeholder="Enter your bank account number, IBAN, or preferred payment method where we can send your referral earnings"
                    />
                    {errors.accountDetails && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.accountDetails}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Provide your bank account details, IBAN, or preferred
                      payment method for receiving referral earnings.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-green-600 px-8 py-3 text-lg font-semibold text-white hover:bg-green-700"
                  >
                    Submit Referral
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
