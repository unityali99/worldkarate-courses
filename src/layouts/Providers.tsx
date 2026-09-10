"use client";

import { ReactNode, useEffect } from "react";
import { syncLanguage } from "@/stores/languageStore";
import { Language } from "@/lang";

export default function Providers({
  children,
  locale = "fa",
}: {
  children: ReactNode;
  locale?: Language;
}) {
  syncLanguage(locale);

  useEffect(() => {
    syncLanguage(locale);
  }, [locale]);

  return <>{children}</>;
}
