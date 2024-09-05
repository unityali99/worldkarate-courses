import { cookieKey } from "@/stores/authStore";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(cookieKey)?.value;
  if (!authToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/profile"],
};
