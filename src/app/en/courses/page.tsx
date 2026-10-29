import type { Metadata } from "next";
import CoursesPageView from "@/components/CoursesPageView";
import { buildCoursesMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildCoursesMetadata("en");

export default function EnglishCoursesPage() {
  return <CoursesPageView locale="en" />;
}

export const dynamic = "force-static";
export const revalidate = 21600;
