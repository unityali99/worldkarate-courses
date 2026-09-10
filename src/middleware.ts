import { cookieKey } from "@/constants/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import UserType from "./schemas/UserType";
import { isAdmin } from "./utils/authHelpers";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(cookieKey)?.value;
  const path = request.nextUrl.pathname;
  const isEn = path.startsWith("/en");
  // Default to main /auth/login to avoid 404 on uncreated language routes
  const loginPath = "/auth/login";
  const profilePath = isEn ? "/en/profile" : "/profile";

  const normalizedPath = isEn ? path.replace(/^\/en/, "") || "/" : path;

  const createLoginRedirect = () => {
    const url = new URL(loginPath, request.url);
    const returnPath = path + (request.nextUrl.search || "");
    url.searchParams.set("redirect", returnPath);
    return NextResponse.redirect(url);
  };

  if (normalizedPath.startsWith("/profile")) {
    if (!authToken) return createLoginRedirect();
    if (normalizedPath.startsWith("/profile/admin")) {
      try {
        const user: UserType = jwtDecode(authToken);
        if (!isAdmin(user))
          return NextResponse.redirect(new URL(profilePath, request.url));
      } catch {
        const response = createLoginRedirect();
        response.cookies.delete(cookieKey);
        return response;
      }
    }
  }

  if (normalizedPath.startsWith("/auth")) {
    if (authToken)
      return NextResponse.redirect(new URL(profilePath, request.url));
  }

  if (normalizedPath.startsWith("/payment")) {
    if (!authToken) return createLoginRedirect();
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth/:path*",
    "/payment/:path*",
    "/en/profile/:path*",
    "/en/auth/:path*",
    "/en/payment/:path*",
  ],
};
