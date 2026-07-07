import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";

const retryDelays = [1000, 2000, 4000, 8000, 12000, 16000];

export async function fetchCoursesWithRetry() {
  const apiClient = new ApiClient<CourseType[]>("/fetch-course");

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    try {
      const courses = (await apiClient.get()).data;

      if (!Array.isArray(courses)) {
        throw new Error("Courses response must be an array");
      }

      if (courses.length === 0 && attempt === retryDelays.length) {
        throw new Error("Courses response stayed empty after retries");
      }

      if (courses.length === 0) {
        await wait(retryDelays[attempt]);
        continue;
      }

      return courses;
    } catch (error) {
      if (attempt === retryDelays.length) throw error;
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
