import type { Language } from "@/lang";

/**
 * Centralized I18N configuration.
 *
 * Routing convention (matches the app structure):
 *  - The default locale (Persian / "fa") is served WITHOUT a prefix, i.e. "/".
 *  - Every other locale is served under its own prefix, e.g. "/en", "/ar", ...
 *  - A new language only requires: adding a dictionary in `src/lang`, adding a
 *    route folder, and registering it in `localeConfig` below. Nothing else.
 *
 * This module is intentionally dependency-light (type-only imports) so it is
 * safe to use from `middleware.ts` (edge runtime) as well as server/client code.
 */

/** All supported locales. Derived from the language dictionaries. */
export type Locale = Language;

/** Ordered list of supported locales; first entry is treated as the default. */
export const locales: Locale[] = ["fa", "en"];

export const defaultLocale: Locale = "fa";

/**
 * Name of the cookie that persists the user's chosen language. This is the
 * SINGLE source of truth for the preference: it is the only store readable by
 * both the browser and the server, so it is what keeps SSR HTML, hydration and
 * the redirected URL in agreement. Nothing else (e.g. `localStorage`) persists
 * a locale.
 */
export const LOCALE_COOKIE = "language";

/** One year, the lifetime shared by every writer of the locale cookie. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Narrow an arbitrary cookie/local value to a supported locale. */
export function isLocale(value?: string | null): value is Locale {
  return !!value && (locales as string[]).includes(value);
}

/**
 * `document.cookie` assignment for the locale preference. Deliberately NOT
 * HttpOnly: the client store mirrors the cookie on hydration, so it must stay
 * readable by JS. Keep the attributes here so client, server and middleware
 * cannot drift apart.
 */
export function localeCookie(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}

export interface LocaleConfig {
  code: Locale;
  /**
   * URL prefix for this locale. The default locale uses an empty prefix so it
   * is served at "/", while all others are prefixed (e.g. "/en").
   */
  prefix: string;
  /** Text direction, applied to <html dir>. */
  dir: "rtl" | "ltr";
  /** Value used for <html lang> and hreflang alternates. */
  hreflang: string;
  /** OpenGraph locale tag, e.g. "fa_IR" / "en_US". */
  ogLocale: string;
  /** Localized site name (used for OG siteName and structured data). */
  siteName: string;
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  fa: {
    code: "fa",
    prefix: "",
    dir: "rtl",
    hreflang: "fa",
    ogLocale: "fa_IR",
    siteName: "آکادمی کاراته سنسی امیر یاری",
  },
  en: {
    code: "en",
    prefix: "/en",
    dir: "ltr",
    hreflang: "en",
    ogLocale: "en_US",
    siteName: "Sensei Amir Yari Karate Academy",
  },
};

/** All locale configs as a list. */
export const allLocales: LocaleConfig[] = locales.map(
  (code) => localeConfig[code],
);

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return localeConfig[locale] ?? localeConfig[defaultLocale];
}

/** Absolute site URL without a trailing slash. */
export function siteUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://worldkarate.ir";
  return base.replace(/\/+$/, "");
}

/** Normalize a locale-neutral path to start with "/" and have no trailing "/". */
function normalizePath(path = "/"): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

/**
 * Build a locale-specific path from a neutral path.
 * localizePath("fa", "/courses/5") -> "/courses/5"
 * localizePath("en", "/courses/5") -> "/en/courses/5"
 * localizePath("en", "/")          -> "/en"
 */
export function localizePath(locale: Locale, path = "/"): string {
  const neutral = normalizePath(path);
  const { prefix } = getLocaleConfig(locale);
  if (!prefix) return neutral;
  return neutral === "/" ? prefix : `${prefix}${neutral}`;
}

/**
 * Resolve a request pathname into its locale and the locale-neutral path.
 * parseLocale("/en/courses/5") -> { locale: "en", neutralPath: "/courses/5" }
 * parseLocale("/courses/5")    -> { locale: "fa", neutralPath: "/courses/5" }
 */
export function parseLocale(pathname = "/"): {
  locale: Locale;
  neutralPath: string;
} {
  for (const cfg of allLocales) {
    if (!cfg.prefix) continue;
    if (pathname === cfg.prefix || pathname.startsWith(`${cfg.prefix}/`)) {
      const rest = pathname.slice(cfg.prefix.length) || "/";
      return { locale: cfg.code, neutralPath: normalizePath(rest) };
    }
  }
  return { locale: defaultLocale, neutralPath: normalizePath(pathname) };
}

/** Absolute URL for a locale + neutral path. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${siteUrl()}${localizePath(locale, path)}`;
}

/** The next locale in the list, used by the language switcher to cycle. */
export function nextLocale(current: Locale): Locale {
  const idx = locales.indexOf(current);
  return locales[(idx + 1) % locales.length] ?? defaultLocale;
}

/**
 * Locale-neutral path prefixes that have per-locale, server-rendered variants
 * (the SEO/content pages). Only these are safe to re-point with `localizePath`
 * in the language switcher. Everything else (auth, payment, profile, admin) is a
 * single, locale-agnostic source driven by client state and has no `/en/...`
 * twin, so the switcher must flip the store there instead of navigating.
 */
const contentRoutePrefixes = ["/", "/courses"];

export function isContentRoute(pathname = "/"): boolean {
  const { neutralPath } = parseLocale(pathname);
  return contentRoutePrefixes.some(
    (p) => neutralPath === p || (p !== "/" && neutralPath.startsWith(`${p}/`)),
  );
}

/**
 * hreflang alternates map for a page that exists in `availableLocales`.
 * x-default always points to the default locale. Pass a narrower `availableLocales`
 * for pages that are not yet localized so hreflang stays reciprocal and valid.
 */
export function hreflangAlternates(
  path = "/",
  availableLocales: Locale[] = locales,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const code of availableLocales) {
    languages[getLocaleConfig(code).hreflang] = localizePath(code, path);
  }
  languages["x-default"] = localizePath(defaultLocale, path);
  return languages;
}
