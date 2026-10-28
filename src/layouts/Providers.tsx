"use client";

import { ReactNode, useEffect } from "react";
import { syncLanguage } from "@/stores/languageStore";
import { RequestLocaleProvider } from "@/lib/i18n/requestLocale";
import { Language } from "@/lang";

export default function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  /**
   * Passed only by locale-split (SEO/content) routes. When present, the store is
   * pinned to it so shared client UI matches the URL locale for SSR/hydration.
   * Locale-agnostic app routes omit it, letting the store follow the user's
   * toggled/persisted language instead of being forced to a fixed locale.
   */
  locale?: Language;
}) {
  if (locale) syncLanguage(locale);

  useEffect(() => {
    if (locale) syncLanguage(locale);
  }, [locale]);

  // Server renders read the request locale from context, never from the store.
  return (
    <RequestLocaleProvider locale={locale}>{children}</RequestLocaleProvider>
  );
}
