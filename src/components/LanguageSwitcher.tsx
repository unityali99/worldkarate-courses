"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import useLanguageStore from "@/stores/languageStore";
import { lang, Language } from "@/lang";
import {
  parseLocale,
  nextLocale,
  localizePath,
  isContentRoute,
} from "@/lib/i18n/config";

/**
 * Content/SEO routes pass their URL locale so the rendered label always matches
 * the language of the server-rendered HTML. Reading the store alone is not
 * enough here: Zustand seeds the hydration snapshot from the persisted user
 * choice (cookie/localStorage), which can differ from the route locale and cause
 * a hydration mismatch. Locale-agnostic app routes (no `/en` twin) pass no
 * locale and stay store-driven, since their server render is seeded from the
 * same locale cookie.
 */
export default function LanguageSwitcher({ locale }: { locale?: Language }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setLanguage, t: storeT, currentLanguage } = useLanguageStore();
  const t = locale ? lang[locale] : storeT;

  const current = locale ?? currentLanguage;
  const target = nextLocale(current);

  const toggleLanguage = () => {
    setLanguage(target);
    // Content/SEO pages exist per locale, so re-point the URL to the target
    // locale's prefix. Locale-agnostic app pages (auth/profile/payment) have no
    // `/en` twin, so we only flip the store here and stay on the same URL to
    // avoid a 404; their client components react to the store change.
    if (isContentRoute(pathname)) {
      router.push(localizePath(target, parseLocale(pathname).neutralPath));
    } else {
      // App route: `setLanguage` already updated the store + cookie. Refresh the
      // route so server components re-read the cookie and render server-rendered
      // text (and <html dir>) in the new language too, not just client islands.
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-300 font-sans">
        {t.ui.langCode}
      </span>
      <button
        type="button"
        onClick={toggleLanguage}
        className="px-3 py-1 text-xs font-bold font-sans rounded-full text-white border border-white/30 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/10 hover:-translate-y-0.5 active:bg-white/20"
      >
        {t.ui.switchLang}
      </button>
    </div>
  );
}
