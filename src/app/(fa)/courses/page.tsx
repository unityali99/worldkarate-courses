import type { Metadata } from "next";
import CoursesPageView from "@/components/CoursesPageView";
import { buildCoursesMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildCoursesMetadata("fa");

export default function CoursesPage() {
  return <CoursesPageView locale="fa" />;
}

export const dynamic = "force-static";
export const revalidate = 21600;
