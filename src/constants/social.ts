/**
 * Official social channels of the academy.
 *
 * Single source of truth: the footer renders these links and the Organization
 * JSON-LD claims them as `sameAs`, so the visible profiles and the entity
 * claims can never drift apart.
 */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/amiryarikata/",
  telegram: "https://t.me/Amiryarikata",
  whatsapp: "https://wa.me/989191257020",
} as const;

/** Every official profile URL, as claimed by structured data (`sameAs`). */
export const SOCIAL_PROFILE_URLS: string[] = Object.values(SOCIAL_LINKS);
