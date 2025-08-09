"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  items?: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems =
    items ||
    (() => {
      const segments = pathname.split("/").filter(Boolean);
      const result = [];

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const href = "/" + segments.slice(0, i + 1).join("/");
        // Format the label
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Handle special cases
        if (segment === "dashboard") label = "Dashboard";
        if (segment === "contacts") label = "Contacts";
        if (segment === "referrals") label = "Referrals";
        if (segment === "users") label = "Users";
        if (segment === "requests") label = "Requests";
        if (segment === "new") label = "New";
        if (segment === "edit") label = "Edit";

        result.push({ label, href });
      }

      return result;
    })();

  // Show only last 2 items on mobile, all items on desktop
  const visibleItems =
    breadcrumbItems.length > 2 ? breadcrumbItems.slice(-2) : breadcrumbItems;

  return (
    <nav className="flex items-center overflow-hidden" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 sm:space-x-2">
        {/* Home icon */}
        <li className="flex-shrink-0">
          <Link
            href="/dashboard"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 sm:h-8 sm:w-8"
            aria-label="Go to Dashboard"
          >
            <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </li>

        {/* Breadcrumb items */}
        {visibleItems.map((item, index) => (
          <li key={index} className="flex flex-shrink-0 items-center">
            <ChevronRight className="mx-1 h-3.5 w-3.5 text-gray-400 sm:mx-2 sm:h-4 sm:w-4" />
            {item.href && index < visibleItems.length - 1 ? (
              <Link
                href={item.href}
                className="max-w-[100px] truncate rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 sm:max-w-[150px] sm:px-3 sm:py-1.5 sm:text-sm"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="max-w-[100px] truncate rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-gray-900 sm:max-w-[150px] sm:px-3 sm:py-1.5 sm:text-sm"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
