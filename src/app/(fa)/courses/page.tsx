import CoursesPageView from "@/components/CoursesPageView";

export default function CoursesPage() {
  return <CoursesPageView locale="fa" />;
}

export const dynamic = "force-static";
export const revalidate = 21600;
