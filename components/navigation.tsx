"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={closeMobileMenu}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Fileme</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white shadow-lg md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
