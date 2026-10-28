import {
  type Locale,
  getLocaleConfig,
  absoluteUrl,
  siteUrl,
} from "@/lib/i18n/config";

const SCHEMA_CONTEXT = "https://schema.org";

/** Turn a possibly-relative URL into an absolute one. */
function abs(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${siteUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}

interface PersonOrg {
  "@type": string;
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

/** EducationalOrganization used as site publisher/provider. */
export function organizationSchema(locale: Locale): PersonOrg {
  const cfg = getLocaleConfig(locale);
  return {
    "@type": "EducationalOrganization",
    name: cfg.siteName,
    url: siteUrl(),
    logo: abs("/logo.webp"),
  };
}

/** WebSite schema (site-level). */
export function websiteSchema(locale: Locale) {
  const cfg = getLocaleConfig(locale);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: cfg.siteName,
    url: siteUrl(),
    inLanguage: cfg.hreflang,
    publisher: organizationSchema(locale),
  };
}

/**
 * Combined site-level graph (WebSite + Organization) rendered once in the root
 * layout. Returns an array so JsonLd emits a valid @graph-style multi-entity.
 */
export function siteSchema(locale: Locale) {
  return [websiteSchema(locale), organizationSchema(locale)];
}

export interface BreadcrumbItem {
  name: string;
  /** Locale-neutral path (no prefix), e.g. "/courses/5". */
  path: string;
}

/** BreadcrumbList for the given locale. */
export function breadcrumbSchema(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export interface CourseInput {
  title: string;
  description: string;
  price: number;
  image: string;
  /** Locale-neutral path of the course detail page. */
  path: string;
  /** ISO currency code for the offer. Defaults to Iranian Toman. */
  currency?: string;
}

/** Course schema with provider + offer, for public (indexable) course pages. */
export function courseSchema(locale: Locale, course: CourseInput) {
  const cfg = getLocaleConfig(locale);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Course",
    name: course.title,
    description: course.description,
    image: abs(course.image),
    inLanguage: cfg.hreflang,
    url: absoluteUrl(locale, course.path),
    provider: organizationSchema(locale),
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: course.currency ?? "IRT",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(locale, course.path),
    },
  };
}

export interface ItemListItem {
  name: string;
  path: string;
}

/** ItemList for collection pages (courses list, category pages, featured). */
export function itemListSchema(
  locale: Locale,
  name: string,
  items: ItemListItem[],
) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  image: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** Article | NewsArticle | BlogPosting */
  type?: string;
}

/** Article / NewsArticle / BlogPosting schema for the news & articles feature. */
export function articleSchema(locale: Locale, article: ArticleInput) {
  const cfg = getLocaleConfig(locale);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": article.type ?? "Article",
    headline: article.title,
    description: article.description,
    image: abs(article.image),
    inLanguage: cfg.hreflang,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : undefined,
    publisher: organizationSchema(locale),
    mainEntityOfPage: absoluteUrl(locale, article.path),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema — use ONLY for publicly visible Q&A (never gated content). */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
