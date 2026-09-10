import CoursesPageView from "@/components/CoursesPageView";

export default function EnglishCoursesPage() {
  return <CoursesPageView locale="en" />;
}

export const dynamic = "force-static";
export const revalidate = 21600;
