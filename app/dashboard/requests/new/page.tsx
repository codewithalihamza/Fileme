"use client";

import { RequestForm } from "@/components/dashboard/requests/request-form";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

function NewRequestContent() {
  const searchParams = useSearchParams();
  const contactId = searchParams.get("contactId");
  const referralId = searchParams.get("referralId");
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/dashboard/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Request created successfully!");
        router.push(ROUTES_CONSTANT.REQUESTS);
      } else {
        toast.error(data.error || "Failed to create request");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request");
    }
  };

  const getDescription = () => {
    if (referralId) {
      return "Create a new service request from referral";
    }
    if (contactId) {
      return "Create a new service request from contact";
    }
    return "Add a new service request";
  };

  return (
    <RequestForm
      onSubmit={handleSubmit}
      isEditing={false}
      title="Create New Request"
      description={getDescription()}
      contactId={contactId}
      referralId={referralId}
    />
  );
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewRequestContent />
    </Suspense>
  );
}
