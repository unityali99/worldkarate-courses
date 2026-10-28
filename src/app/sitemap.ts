import type { MetadataRoute } from "next";
import { fetchCoursesWithRetry } from "@/services/courseService";
import {
  defaultLocale,
  hreflangAlternates,
  locales,
  localizePath,
  siteUrl,
} from "@/lib/i18n/config";

/**
 * Sitemap `alternates.languages` must be absolute, while the i18n config builds
 * locale-relative paths. Convert in one place instead of hand-writing URLs.
 */
function absoluteLanguages(path: string): Record<string, string> {
  const base = siteUrl();
  return Object.fromEntries(
    Object.entries(hreflangAlternates(path)).map(([lang, localized]) => [
      lang,
      `${base}${localized}`,
    ]),
  );
}

interface SitemapPage {
  /** Locale-neutral path, shared by every locale variant. */
  path: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const lastModified = new Date();
  const courses = await fetchCoursesWithRetry();

  // Both locales serve every entry below, so each neutral path expands into one
  // URL per locale, all cross-referencing each other through hreflang.
  const pages: SitemapPage[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/courses", changeFrequency: "daily", priority: 0.9 },
    ...courses.map((course) => ({
      path: `/courses/${course.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${base}${localizePath(locale, page.path)}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      // Secondary locales rank just below the default one.
      priority:
        locale === defaultLocale
          ? page.priority
          : Number((page.priority - 0.1).toFixed(1)),
      alternates: { languages: absoluteLanguages(page.path) },
    })),
  );
}

// Automatically revalidate the sitemap every hour so newly published courses appear without rebuilding
export const revalidate = 3600;
