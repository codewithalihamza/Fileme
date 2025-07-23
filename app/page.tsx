import { Experts } from "@/components/experts";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                <Clock className="mr-2 h-4 w-4" />⏰ Last Date to File Tax
                Return: 31st September
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
                Get Your Tax Return Filed Before{" "}
                <span className="text-blue-600">31st September!</span>
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Professional tax return filing and audit services. Secure, fast,
                and hassle-free.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="px-8 py-3 text-lg">
                  <Link href="/contact">File Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Secure & Confidential
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Expert Team
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Fast Processing
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-white p-8 shadow-2xl">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                  <div className="text-center text-white">
                    <FileText className="mx-auto mb-4 h-24 w-24" />
                    <h3 className="mb-2 text-2xl font-bold">
                      Tax Filing Made Easy
                    </h3>
                    <p className="text-blue-100">
                      Professional expertise at your fingertips
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-4 -top-4 rounded-full bg-green-500 p-3 text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-full bg-orange-500 p-3 text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Our Professional Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Comprehensive tax solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Tax Return Filing
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                Professional tax return preparation and filing services. We
                ensure accuracy, maximize deductions, and meet all deadlines.
                Our experts handle individual and business tax returns with
                precision.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Individual Tax Returns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Business Tax Returns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Maximize Deductions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Electronic Filing
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-600">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Audit Services
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                Comprehensive audit services to ensure compliance and identify
                potential issues before they become problems. Our audit team
                provides thorough financial reviews and recommendations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Financial Audits
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Compliance Reviews
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Risk Assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Expert Consultation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <Experts />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
            Don&apos;t Miss the Deadline!
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Time is running out! Get your tax return filed before September 31st
            to avoid penalties and ensure a smooth tax season.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="px-8 py-3 text-lg"
          >
            <Link href="/contact">Start Filing Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
