"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({
  isCollapsed = false,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, isLoading } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
      description: "Overview and analytics",
    },
    {
      name: "Contacts",
      href: "/admin/contacts",
      icon: MessageSquare,
      description: "Manage contact submissions",
    },
    {
      name: "Referrals",
      href: "/admin/referrals",
      icon: Users2,
      description: "Track referrals and earnings",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      description: "User management",
    },
    {
      name: "Requests",
      href: "/admin/requests",
      icon: Calendar,
      description: "Manage service requests",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      description: "Detailed reports",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System configuration",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div
      className={`relative flex h-full flex-col bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <span className="text-lg font-bold text-gray-900">Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                  active
                    ? "border-r-2 border-blue-600 bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    active
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                )}
                {isCollapsed && isHovered && (
                  <div className="absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-90">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-300">{item.description}</div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@fileme.com</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
