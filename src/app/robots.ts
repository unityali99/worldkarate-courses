import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worldkarate.ir";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/courses", "/courses/*", "/en", "/en/courses"],
        disallow: [
          "/profile",
          "/profile/*",
          "/payment",
          "/payment/*",
          "/auth",
          "/auth/*",
          "/en/profile",
          "/en/profile/*",
          "/en/payment",
          "/en/payment/*",
          "/en/auth",
          "/en/auth/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
