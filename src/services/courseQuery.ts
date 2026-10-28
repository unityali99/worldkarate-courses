import { cache } from "react";
import { fetchCourseWithRetry } from "@/services/courseService";
import type { CourseType } from "@/schemas/Course";

/**
 * Per-request memoized course lookup.
 *
 * `generateMetadata` and the page body both need the same course, and the API
 * client (axios) is not deduplicated by Next the way `fetch` is. Wrapping it in
 * React `cache` keeps a single upstream call per render.
 *
 * Server-only: `cache` is a React Server Component primitive, so never import
 * this from a client module.
 */
export const getCourse = cache(
  async (courseId: string): Promise<CourseType> =>
    fetchCourseWithRetry(courseId),
);
