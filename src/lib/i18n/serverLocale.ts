import { cookies } from "next/headers";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "./config";

/**
 * Resolve the active locale on the server from the persisted language cookie.
 *
 * Use this on routes that have NO locale in the URL — the locale-agnostic `(app)`
 * pages (auth/profile/payment) and the root fallback pages — so their server
 * output follows the user's chosen language instead of a hardcoded default. The
 * only fallback is the single configured `defaultLocale`, not a scattered literal.
 *
 * Server-only: imports `next/headers`, so never use it from client modules or the
 * edge middleware.
 */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const raw = store.get(LOCALE_COOKIE)?.value;
  return isLocale(raw) ? raw : defaultLocale;
}
