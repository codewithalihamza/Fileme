import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { ROUTES_CONSTANT } from "./lib/routes.constant";
import { UserRole } from "./types";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle login page redirect for authenticated users
  if (pathname === ROUTES_CONSTANT.LOGIN) {
    const token = request.cookies.get("admin-token")?.value;

    if (token) {
      // Verify the token
      const user = await verifyToken(token);

      if (user && user.role === UserRole.ADMIN) {
        // User is already logged in, redirect to dashboard
        return NextResponse.redirect(
          new URL(ROUTES_CONSTANT.DASHBOARD, request.url)
        );
      }
    }

    // No valid token, allow access to login page
    return NextResponse.next();
  }

  // Protect other admin routes
  if (pathname.startsWith(ROUTES_CONSTANT.DASHBOARD)) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      // No token found, redirect to login
      return NextResponse.redirect(new URL(ROUTES_CONSTANT.LOGIN, request.url));
    }

    // Verify the token
    const user = await verifyToken(token);

    if (!user || user.role !== UserRole.ADMIN) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(
        new URL(ROUTES_CONSTANT.LOGIN, request.url)
      );
      response.cookies.delete("admin-token");
      return response;
    }

    // Token is valid, allow access to admin routes
    return NextResponse.next();
  }

  // For non-admin routes, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
