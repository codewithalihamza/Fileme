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
import { ArrowLeft, FileText, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface NewRequestData {
    service: string;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    paidAmount: number | null;
    userId: string;
    assigneeId: string | null;
}

export default function NewRequestPage() {
    const [formData, setFormData] = useState<NewRequestData>({
        service: "tax",
        status: "pending",
        paidAmount: null,
        userId: "",
        assigneeId: null,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<NewRequestData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<NewRequestData> = {};

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

        setLoading(true);

        try {
            const response = await fetch("/api/admin/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Request created successfully!");
                // Reset form
                setFormData({
                    service: "tax",
                    status: "pending",
                    paidAmount: null,
                    userId: "",
                    assigneeId: null,
                });
                setErrors({});
            } else {
                toast.error(data.error || "Failed to create request");
            }
        } catch (error) {
            console.error("Error creating request:", error);
            toast.error("Failed to create request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/admin/requests">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Requests
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create New Request</h1>
                        <p className="text-gray-600 mt-1">Add a new service request</p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Request Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-700">
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
                                        <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tax">Tax Filing</SelectItem>
                                            <SelectItem value="accounting">Accounting</SelectItem>
                                            <SelectItem value="audit">Audit</SelectItem>
                                            <SelectItem value="consultation">Consultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.service && (
                                        <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700">
                                        Status <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => {
                                            setFormData((prev) => ({ ...prev, status: value as any }));
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="userId" className="mb-2 block text-sm font-medium text-gray-700">
                                        Client <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="userId"
                                        name="userId"
                                        type="text"
                                        value={formData.userId}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, userId: e.target.value }));
                                            if (errors.userId) {
                                                setErrors((prev) => ({ ...prev, userId: "" }));
                                            }
                                        }}
                                        placeholder="Enter client ID"
                                        className={errors.userId ? "border-red-500" : ""}
                                    />
                                    {errors.userId && (
                                        <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="paidAmount" className="mb-2 block text-sm font-medium text-gray-700">
                                        Paid Amount
                                    </Label>
                                    <Input
                                        id="paidAmount"
                                        name="paidAmount"
                                        type="number"
                                        value={formData.paidAmount || ""}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                paidAmount: e.target.value ? parseFloat(e.target.value) : null,
                                            }));
                                        }}
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="assigneeId" className="mb-2 block text-sm font-medium text-gray-700">
                                    Assignee
                                </Label>
                                <Select
                                    value={formData.assigneeId || "unassigned"}
                                    onValueChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            assigneeId: value === "unassigned" ? null : value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                        {/* This would need to be populated with available employees */}
                                        <SelectItem value="employee1">Employee 1</SelectItem>
                                        <SelectItem value="employee2">Employee 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                            Creating...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Request
                                        </div>
                                    )}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/requests">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
