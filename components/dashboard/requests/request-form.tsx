"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSearchDropdown } from "@/components/ui/user-search-dropdown";
import { useUserSearch } from "@/hooks/use-user-search";
import { formatCurrency } from "@/lib/utils";
import {
  RequestStatus,
  requestStatusNames,
  servicesNames,
  UserRole,
} from "@/types";
import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  Save,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface RequestFormData {
  service: string;
  status: RequestStatus;
  paidAmount: number | null;
  userId: string;
  assigneeId: string | null;
}

interface RequestFormProps {
  initialData?: Partial<RequestFormData>;
  onSubmit: (data: RequestFormData) => Promise<void>;
  loading?: boolean;
  isEditing?: boolean;
  title: string;
  description: string;
  contactId?: string | null;
}

export function RequestForm({
  initialData,
  onSubmit,
  loading = false,
  isEditing = false,
  title,
  description,
  contactId,
}: RequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    service: initialData?.service || "tax",
    status: initialData?.status || RequestStatus.PENDING,
    paidAmount: initialData?.paidAmount || null,
    userId: initialData?.userId || "",
    assigneeId: initialData?.assigneeId || null,
  });
  const [errors, setErrors] = useState<Partial<RequestFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { checkOrCreateUser } = useUserSearch();
  const [contactData, setContactData] = useState<any>(null);
  const [loadingContact, setLoadingContact] = useState(false);
  const router = useRouter();

  // Memoize the fetch function to prevent infinite re-renders
  const fetchContactAndCreateUser = useCallback(async () => {
    if (!contactId) return;

    setLoadingContact(true);
    try {
      // Fetch contact data
      const contactResponse = await fetch(
        `/api/dashboard/contacts/${contactId}`
      );
      if (contactResponse.ok) {
        const response = await contactResponse.json();
        const contact = response.contact;
        setContactData(contact);

        // Pre-fill service
        setFormData((prev) => ({
          ...prev,
          service: contact.service,
        }));

        // Check if user exists or create new user
        const userResult = await checkOrCreateUser(
          contact.name,
          contact.phone,
          contact.email
        );

        if (userResult) {
          setFormData((prev) => ({
            ...prev,
            userId: userResult.user.id,
          }));
          toast.success(
            `Client ${userResult.isNew ? "created and " : ""}selected: ${userResult.user.name}`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      toast.error("Failed to load contact data");
    } finally {
      setLoadingContact(false);
    }
  }, [contactId, checkOrCreateUser]);

  // Fetch contact data and pre-fill form if contactId is provided
  useEffect(() => {
    if (contactId) {
      fetchContactAndCreateUser();
    }
  }, [fetchContactAndCreateUser]);

  const validateForm = (): boolean => {
    const newErrors: Partial<RequestFormData> = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "Client is required";
    }
    if (!formData.service.trim()) {
      newErrors.service = "Service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof RequestFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2 text-lg sm:gap-3 sm:text-xl">
                <div className="rounded-lg bg-white/20 p-1.5 sm:p-2">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="hidden sm:inline">Request Information</span>
                <span className="sm:hidden">Request Info</span>
              </CardTitle>
              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Fill in the details below to {isEditing ? "update" : "create"} a
                service request
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {loadingContact && (
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Loading contact data and creating user...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <FileText className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Service Information
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="service"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                        Service <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, service: value }));
                          if (errors.service) {
                            setErrors((prev) => ({ ...prev, service: "" }));
                          }
                        }}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${
                            errors.service
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "focus:border-blue-500 focus:ring-blue-200"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {servicesNames.map((service) => (
                            <SelectItem
                              key={service.value}
                              value={service.value}
                            >
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="status"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            status: value as RequestStatus,
                          }));
                          if (errors.status) {
                            setErrors((prev) => ({
                              ...prev,
                              status: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${
                            errors.status
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "focus:border-blue-500 focus:ring-blue-200"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {requestStatusNames.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.status && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <User className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Client Information
                    </h3>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="userId"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        Client <span className="text-red-500">*</span>
                      </Label>
                      <UserSearchDropdown
                        value={formData.userId}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, userId: value }));
                          if (errors.userId) {
                            setErrors((prev) => ({ ...prev, userId: "" }));
                          }
                        }}
                        placeholder="Search and select client"
                        className={`transition-all duration-200 ${
                          errors.userId
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : "focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                      {errors.userId && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          {errors.userId}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="assigneeId"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <Users className="h-4 w-4 text-gray-500" />
                        Assignee
                        <span className="text-xs text-gray-400">
                          (Optional)
                        </span>
                      </Label>
                      <UserSearchDropdown
                        value={formData.assigneeId || ""}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            assigneeId: value || null,
                          }));
                        }}
                        placeholder="Search and select assignee (optional)"
                        role={[UserRole.EMPLOYEES, UserRole.ADMIN]}
                        className="transition-all duration-200 focus:border-blue-500 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <DollarSign className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Financial Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="paidAmount"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      Paid Amount
                      <span className="text-xs text-gray-400">(Optional)</span>
                    </Label>
                    <Input
                      id="paidAmount"
                      name="paidAmount"
                      type="number"
                      step="0.01"
                      value={formData.paidAmount || ""}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      className="transition-all duration-200 focus:border-blue-500 focus:ring-blue-200"
                    />
                    {formData.paidAmount && formData.paidAmount > 0 && (
                      <p className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Amount entered: {formatCurrency(formData.paidAmount)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row justify-end gap-3 border-t border-gray-200 pt-4 sm:gap-4 sm:pt-6">
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="flex-1 transform bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  >
                    {loading || isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        <span>{isEditing ? "Updating..." : "Creating..."}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Save className="mr-2 h-4 w-4" />
                        <span>{isEditing ? "Update" : "Create"} Request</span>
                      </div>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="transition-all duration-200 hover:bg-gray-50"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
