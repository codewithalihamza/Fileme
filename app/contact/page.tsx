"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceDropdown } from "@/components/ui/service-dropdown";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { contactInfo, validatePhoneNumber } from "@/lib/utils";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "tax",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits";
    }
    if (!formData.service.trim()) {
      newErrors.service = "Please select a service";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "tax",
          message: "",
        });
        setErrors({});
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Ready to file your tax return? Contact us today for professional
              assistance and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03XXXXXXXXX (11 digits)"
                    maxLength={11}
                    className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

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
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your professional services needs..."
                    rows={6}
                    className={`w-full resize-none rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 size-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 size-5" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Contact Information
                </h2>
                <p className="mb-8 text-gray-600">
                  Our team of professionals is here to help you with all your
                  tax services and accounting needs. Reach out to us for
                  personalized assistance.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-blue-600 p-3">
                    <Mail className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-gray-600">{contactInfo.Email}</p>
                    <p className="text-sm text-gray-500">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-green-600 p-3">
                    <Phone className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                    <p className="text-gray-600">{contactInfo.Phone}</p>
                    <p className="text-sm text-gray-500">{contactInfo.Hours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-orange-600 p-3">
                    <MapPin className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Office
                    </h3>
                    <p className="text-gray-600">{contactInfo.Address}</p>
                    <p className="text-sm text-gray-500">By appointment only</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Why Choose Fileme?
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Expert professionals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Secure and confidential
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Fast turnaround time
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Competitive pricing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Personalized service
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 size-2 rounded-full bg-blue-600"></span>
                    Free consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={contactInfo.Phone} />
    </div>
  );
}
