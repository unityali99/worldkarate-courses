import type { MetadataRoute } from "next";
import { fetchCoursesWithRetry } from "@/services/courseService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worldkarate.ir";
  const courses = await fetchCoursesWithRetry();

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          fa: baseUrl,
          "x-default": baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          fa: baseUrl,
          "x-default": baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          fa: `${baseUrl}/courses`,
          "x-default": `${baseUrl}/courses`,
          en: `${baseUrl}/en/courses`,
        },
      },
    },
    {
      url: `${baseUrl}/en/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          fa: `${baseUrl}/courses`,
          "x-default": `${baseUrl}/courses`,
          en: `${baseUrl}/en/courses`,
        },
      },
    },
    ...courseEntries,
  ];
}

// Automatically revalidate the sitemap every hour so newly published courses appear without rebuilding
export const revalidate = 3600;
