"use client";

import { createContext, ReactNode, useContext } from "react";
import type { Language } from "@/lang";

/**
 * The locale the CURRENT render is being produced for, decided by the server:
 * the URL locale on locale-split content routes, the `language` cookie on the
 * locale-agnostic app routes (auth, profile, payment).
 *
 * This lives in React context rather than in the language store because the
 * store cannot know it: on the server it is a process-wide singleton with no
 * access to the request (no cookies, no `document`), so its value is always the
 * hardcoded default. Seeding that singleton per request would leak one request's
 * language into another's render. Context is per-request, so it is the only
 * value SSR text and `<html dir>` may be derived from.
 */
const RequestLocaleContext = createContext<Language | undefined>(undefined);

export function RequestLocaleProvider({
  locale,
  children,
}: {
  locale?: Language;
  children: ReactNode;
}) {
  return (
    <RequestLocaleContext.Provider value={locale}>
      {children}
    </RequestLocaleContext.Provider>
  );
}

/** Locale of the in-flight server render, or `undefined` when there is none. */
export function useRequestLocale(): Language | undefined {
  return useContext(RequestLocaleContext);
}
