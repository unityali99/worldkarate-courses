import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";

const retryDelays = [1000, 2000, 3000];

export async function fetchCoursesWithRetry(): Promise<CourseType[]> {
  const apiClient = new ApiClient<CourseType[]>("/fetch-course");

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    try {
      const response = await apiClient.get();
      const courses = response.data;

      if (Array.isArray(courses)) {
        return courses;
      }

      return [];
    } catch (error) {
      if (attempt === retryDelays.length) {
        console.warn("Could not fetch courses after retries:", error);
        return [];
      }
      await wait(retryDelays[attempt]);
    }
  }

  return [];
}

export async function fetchCourseWithRetry(courseId: string) {
  const apiClient = new ApiClient<CourseType>(`/fetch-course/${courseId}`);

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    try {
      const course = (await apiClient.get()).data;

      if (!course?.id || !course.title || !course.description || !course.img) {
        throw new Error("Course response is empty or invalid");
      }

      return course;
    } catch (error) {
      if (attempt === retryDelays.length) throw error;
      await wait(retryDelays[attempt]);
    }
  }

  throw new Error("Failed to fetch course");
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
