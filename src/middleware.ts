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
  const loginPath = isEn ? "/en/auth/login" : "/auth/login";
  const profilePath = isEn ? "/en/profile" : "/profile";

  const normalizedPath = isEn ? path.replace(/^\/en/, "") || "/" : path;

  if (normalizedPath.startsWith("/profile")) {
    if (!authToken)
      return NextResponse.redirect(new URL(loginPath, request.url));
    if (normalizedPath.startsWith("/profile/admin")) {
      const user: UserType = jwtDecode(authToken);
      if (!isAdmin(user))
        return NextResponse.redirect(new URL(profilePath, request.url));
    }
  }

  if (normalizedPath.startsWith("/auth")) {
    if (authToken)
      return NextResponse.redirect(new URL(profilePath, request.url));
  }

  if (normalizedPath.startsWith("/payment")) {
    if (!authToken)
      return NextResponse.redirect(new URL(loginPath, request.url));
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
