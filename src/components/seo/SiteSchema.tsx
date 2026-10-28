import React from "react";
import JsonLd from "@/components/seo/JsonLd";
import { siteSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/i18n/config";

/**
 * Site-level structured data (WebSite + Organization). Render once per locale
 * root layout so every page inherits it.
 */
export default function SiteSchema({ locale }: { locale: Locale }) {
  return <JsonLd data={siteSchema(locale)} />;
}
