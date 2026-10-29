import type { Metadata } from "next";
import { lang } from "@/lang";
import type { CourseType } from "@/schemas/Course";
import { getCourseImageSource } from "@/utils/courseImage";
import {
  type Locale,
  getLocaleConfig,
  localizePath,
  hreflangAlternates,
  siteUrl,
} from "@/lib/i18n/config";

export interface BuildMetadataInput {
  /** Locale this page is rendered in. */
  locale: Locale;
  /**
   * Locale-neutral path (no prefix), e.g. "/", "/courses", "/courses/5".
   * Used to build the canonical URL and every hreflang variant.
   */
  path?: string;
  /** Page title. Omit to inherit the layout default/template. */
  title?: string;
  /** Page description. Defaults to the locale's site description. */
  description?: string;
  /** Keywords. Defaults to the locale's site keywords. */
  keywords?: string[];
  /** OG/Twitter image (relative or absolute). Defaults to the site logo. */
  image?: string;
  /** OpenGraph object type. */
  type?: "website" | "article";
  /**
   * Locales where this exact page exists. Keep this narrow for content that is
   * not yet translated so hreflang stays reciprocal. Defaults to all locales.
   */
  availableLocales?: Locale[];
  /** Mark a page non-indexable (auth, profile, payment, gated content). */
  noindex?: boolean;
}

const DEFAULT_IMAGE = "/logo.webp";

/**
 * Site-wide metadata for a locale root layout.
 *
 * Deliberately limited to facts that are identical on EVERY page: the base URL,
 * the title template and the fallback description. It never sets a canonical,
 * hreflang or OpenGraph URL, because those are per-page facts — baking them into
 * a layout makes every descendant inherit a wrong canonical. Pages provide them
 * through `buildMetadata`, so a page that forgets fails loudly (no canonical)
 * instead of silently claiming another page's URL.
 */
export function buildRootMetadata(locale: Locale): Metadata {
  const cfg = getLocaleConfig(locale);
  const siteMeta = lang[locale].metadata;

  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: siteMeta.title,
      template: `%s | ${siteMeta.title}`,
    },
    description: siteMeta.description,
    keywords: siteMeta.keywords,
    applicationName: cfg.siteName,
  };
}

/**
 * Single source of truth for per-page metadata. Produces canonical + hreflang
 * alternates, OpenGraph and Twitter cards from the centralized i18n config, so
 * individual pages never hand-roll locale/URL logic.
 *
 * Relies on `metadataBase` being set on the root layout (it is) so relative URLs
 * resolve to absolute ones automatically.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { locale, path = "/", image = DEFAULT_IMAGE } = input;
  const cfg = getLocaleConfig(locale);
  const siteMeta = lang[locale].metadata;

  const url = localizePath(locale, path);
  const languages = hreflangAlternates(path, input.availableLocales);

  const title = input.title;
  const description = input.description ?? siteMeta.description;
  const ogTitle = title ?? siteMeta.title;
  const ogDescription = description;

  const metadata: Metadata = {
    // Only set `title` when explicitly provided so the layout template applies
    // to page names, and the default is used for home/section pages.
    ...(title ? { title } : {}),
    description,
    keywords: input.keywords ?? siteMeta.keywords,
    alternates: { canonical: url, languages },
    openGraph: {
      type: input.type ?? "website",
      url,
      siteName: cfg.siteName,
      locale: cfg.ogLocale,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };

  if (input.noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

/**
 * Metadata for a course detail page. Both locale variants share this builder so
 * title/description/canonical/hreflang can never drift between `/courses/[id]`
 * and `/en/courses/[id]`; only `locale` differs.
 */
export function buildCourseMetadata(
  locale: Locale,
  course: CourseType,
): Metadata {
  const description =
    course.description.length > 155
      ? `${course.description.slice(0, 152).trimEnd()}…`
      : course.description;

  return buildMetadata({
    locale,
    path: `/courses/${course.id}`,
    title: course.title,
    description,
    image: getCourseImageSource(course.img),
  });
}

/** Metadata for the landing page — the site's primary entry point. */
export function buildHomeMetadata(locale: Locale): Metadata {
  const home = lang[locale].metadata.home;
  // The landing page lives in the same route segment as its root layout, so the
  // layout's `title.template` is NOT applied to it (it only applies to deeper
  // segments, e.g. /courses). Compose the branded title here and mark it
  // absolute, so the brand appears exactly once either way.
  const title = `${home.title} | ${lang[locale].metadata.title}`;

  return {
    ...buildMetadata({ locale, path: "/", title, description: home.description }),
    title: { absolute: title },
  };
}

/** Metadata for the courses list page. */
export function buildCoursesMetadata(locale: Locale): Metadata {
  const courses = lang[locale].metadata.courses;
  return buildMetadata({
    locale,
    path: "/courses",
    title: courses.title,
    description: courses.description,
  });
}
