import { cookieKey } from "@/stores/authStore";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import UserType from "./schemas/UserType";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(cookieKey)?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/profile")) {
    if (!authToken)
      return NextResponse.redirect(new URL("/auth/login", request.url));
    if (path.startsWith("/profile/admin")) {
      const user: UserType = jwtDecode(authToken);
      if (!user.isAdmin)
        return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  if (path.startsWith("/auth")) {
    if (authToken)
      return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
