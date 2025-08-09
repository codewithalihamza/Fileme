"use client";

import { RequestForm } from "@/components/dashboard/requests/request-form";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function NewRequestPage() {
  const searchParams = useSearchParams();
  const contactId = searchParams.get("contactId");
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

  return (
    <RequestForm
      onSubmit={handleSubmit}
      isEditing={false}
      title="Create New Request"
      description={
        contactId
          ? "Create a new service request from contact"
          : "Add a new service request"
      }
      contactId={contactId}
    />
  );
}
