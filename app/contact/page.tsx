"use client";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setFormData({ name: "", email: "", message: "" });
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
      <Navigation />

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
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your tax filing needs..."
                    rows={6}
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-5 w-5" />
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
                  Our team of tax professionals is here to help you with all
                  your tax filing and audit needs. Reach out to us for
                  personalized assistance.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-blue-600 p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-gray-600">info@fileme.com</p>
                    <p className="text-sm text-gray-500">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-green-600 p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-orange-600 p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Office
                    </h3>
                    <p className="text-gray-600">123 Tax Street, Suite 100</p>
                    <p className="text-gray-600">New York, NY 10001</p>
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
                    <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                    Expert tax professionals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                    Secure and confidential
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                    Fast turnaround time
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                    Competitive pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
