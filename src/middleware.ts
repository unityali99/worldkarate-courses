import { cookieKey } from "@/constants/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import UserType from "./schemas/UserType";
import { isAdmin } from "./utils/authHelpers";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  getLocaleConfig,
  isContentRoute,
  isLocale,
  localizePath,
  parseLocale,
} from "@/lib/i18n/config";

/**
 * Keep the locale preference cookie and the URL in lockstep.
 *
 * The cookie is the single source of truth for the user's language, but the URL
 * must never contradict it — otherwise SSR copy, hydration and redirects could
 * each pick a different language. Two cases, content routes only:
 *
 *  1. The URL is prefixed (`/en/...`): the user is now browsing that language,
 *     so the URL locale is written to the cookie.
 *  2. The URL is unprefixed: that is the default locale (Persian at "/"), which
 *     cannot express any other language. If the cookie asks for one, redirect
 *     (307, cookie-dependent) to its prefixed twin.
 *
 * Locale-agnostic app routes (`/auth`, `/payment`, `/profile`) are never
 * redirected: they have no locale in the URL by design and read the cookie
 * server-side. Crawlers send no cookie, so they always receive the canonical
 * unprefixed URL and no redirect.
 */
function syncLocaleWithUrl(request: NextRequest): NextResponse | undefined {
  const path = request.nextUrl.pathname;
  const { locale: urlLocale, neutralPath } = parseLocale(path);
  const { prefix } = getLocaleConfig(urlLocale);
  const urlHasLocalePrefix =
    prefix !== "" && (path === prefix || path.startsWith(`${prefix}/`));

  const isDocumentRequest =
    request.method === "GET" || request.method === "HEAD";

  if (isContentRoute(path) && isDocumentRequest) {
    if (urlHasLocalePrefix) {
      const response = NextResponse.next();
      response.cookies.set({
        name: LOCALE_COOKIE,
        value: urlLocale,
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
      return response;
    }

    const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
    if (isLocale(preferred) && preferred !== defaultLocale) {
      const target = new URL(localizePath(preferred, neutralPath), request.url);
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 307);
    }
  }

  return undefined;
}

export function middleware(request: NextRequest) {
  const localeResponse = syncLocaleWithUrl(request);
  if (localeResponse) return localeResponse;

  const authToken = request.cookies.get(cookieKey)?.value;
  const path = request.nextUrl.pathname;
  // Auth/profile/payment are locale-agnostic app routes (single source), so we
  // only need the locale-neutral path to gate them; redirects use plain paths.
  const { neutralPath: normalizedPath } = parseLocale(path);
  const loginPath = "/auth/login";
  const profilePath = "/profile";

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
    "/",
    "/courses",
    "/courses/:path*",
    "/en",
    "/en/:path*",
    "/profile/:path*",
    "/auth/:path*",
    "/payment/:path*",
  ],
};
