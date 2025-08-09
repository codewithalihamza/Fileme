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

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      <Link
        href="/dashboard"
        className="flex items-center transition-colors hover:text-gray-700"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-gray-700"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
