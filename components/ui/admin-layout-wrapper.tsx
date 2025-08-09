"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isAdminRoute && <Navigation />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
