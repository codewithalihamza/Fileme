import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 lg:text-[12rem]">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Page Not Found
            </h2>
            <p className="mx-auto max-w-md text-lg text-gray-600">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
            >
              <Link href="/" className="flex items-center">
                <Home className="mr-2 size-5" />
                Go to Homepage
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Link href="/contact" className="flex items-center">
                <ArrowLeft className="mr-2 size-5" />
                Contact Support
              </Link>
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="mt-12">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                Contact
              </Link>
              <Link
                href="/refer"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                Refer & Earn
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
