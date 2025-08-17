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
import { getRoleDescription } from "@/lib/constants";
import { validateEmail, validatePhoneNumber } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Lock,
  Mail,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "employees" | "customer";
}

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
  isEditing?: boolean;
  title: string;
  description: string;
}

export function UserForm({
  initialData,
  onSubmit,
  loading = false,
  isEditing = false,
  title,
  description,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    password: isEditing ? initialData?.password || "" : "12345678",
    role: initialData?.role || "customer",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits starting with 03";
    }
    if (!isEditing && !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // For editing, only include password if it's not empty
      const submitData = isEditing
        ? { ...formData, password: formData.password.trim() || undefined }
        : formData;

      await onSubmit(submitData);
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
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto p-4 sm:p-6">
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
                  <User className="size-5 sm:size-6" />
                </div>
                <span className="hidden sm:inline">User Information</span>
                <span className="sm:hidden">User Info</span>
              </CardTitle>
              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Fill in the details below to {isEditing ? "update" : "create"} a
                user account
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <User className="size-4 text-blue-600 sm:size-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <User className="size-4 text-gray-500" />
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className={`transition-all duration-200 ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : "focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="size-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="role"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <Shield className="size-4 text-gray-500" />
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            role: value as any,
                          }));
                          if (errors.role) {
                            setErrors((prev) => ({ ...prev, role: undefined }));
                          }
                        }}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${
                            errors.role
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "focus:border-blue-500 focus:ring-blue-200"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="admin"
                            className="flex items-center gap-2"
                          >
                            Admin
                          </SelectItem>
                          <SelectItem
                            value="employees"
                            className="flex items-center gap-2"
                          >
                            Employees
                          </SelectItem>
                          <SelectItem
                            value="customer"
                            className="flex items-center gap-2"
                          >
                            Customer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.role && (
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                          <CheckCircle className="size-4 text-green-500" />
                          {getRoleDescription(formData.role)}
                        </p>
                      )}
                      {errors.role && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="size-4" />
                          {errors.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <Mail className="size-4 text-blue-600 sm:size-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <Mail className="size-4 text-gray-500" />
                        Email Address{" "}
                        <span className="text-xs text-gray-400">
                          (Optional)
                        </span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address (optional)"
                        className={`transition-all duration-200 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : "focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="size-4" />
                          {errors.email}
                        </p>
                      )}
                      {!errors.email && formData.email && (
                        <p className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="size-4" />
                          Valid email format
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <Phone className="size-4 text-gray-500" />
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="03XXXXXXXXX (11 digits)"
                        maxLength={11}
                        className={`transition-all duration-200 ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : "focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                      {errors.phone && (
                        <p className="flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="size-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <Lock className="size-4 text-blue-600 sm:size-5" />
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                      Security
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <Lock className="size-4 text-gray-500" />
                      Password{" "}
                      {!isEditing && <span className="text-red-500">*</span>}
                      {isEditing && (
                        <span className="text-xs text-gray-400">
                          (Leave blank to keep current)
                        </span>
                      )}
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={
                        isEditing
                          ? "Enter new password (optional)"
                          : "Enter password (min 6 characters)"
                      }
                      className={`transition-all duration-200 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />
                    {formData.password && formData.password.length >= 6 && (
                      <p className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="size-4" />
                        Password meets requirements
                      </p>
                    )}
                    {errors.password && (
                      <p className="flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="size-4" />
                        {errors.password}
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
                        <div className="mr-2 size-4 animate-spin rounded-full border-b-2 border-white"></div>
                        <span>{isEditing ? "Updating..." : "Creating..."}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Save className="mr-2 size-4" />
                        <span>{isEditing ? "Update" : "Create"}</span>
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
