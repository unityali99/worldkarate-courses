import type { Metadata } from "next";
import CourseDetailView from "@/components/CourseDetailView";
import { fetchCoursesWithRetry } from "@/services/courseService";
import { getCourse } from "@/services/courseQuery";
import { buildCourseMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ courseId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  return buildCourseMetadata("fa", await getCourse(courseId));
}

export default async function PersianSingleCoursePage({ params }: Props) {
  const { courseId } = await params;
  return <CourseDetailView courseId={courseId} locale="fa" />;
}

export async function generateStaticParams() {
  const courses = await fetchCoursesWithRetry();

  return courses.map((course) => ({
    courseId: String(course.id),
  }));
}

export const dynamic = "force-static";
export const revalidate = 21600;
