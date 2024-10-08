import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default async function Home() {
  const apiClient = new ApiClient<CourseType[]>("/fetch-course");
  const courses = (await apiClient.get()).data;

  return (
    <main className="space-y-14 md:px-0 my-12 flex flex-col items-center mb-28">
      <Box className="bg-heading text-white text-center py-12 font-bold text-lg px-4 w-full">
        <Heading>سنسی امیر یاری</Heading>
        <Text className="mt-7 mb-10 font-light">پکیج های آموزشی کاتا</Text>
        <Text className="mt-7 mb-10 font-light" dir="rtl">
          {"برای اطلاع از آخرین بروزرسانی پکیج ها ایمیل خود را وارد کنید."}
        </Text>
        <Flex
          alignItems={"center"}
          justify={"center"}
          className="space-y-3 md:space-x-5 md:space-y-0 flex-col md:flex-row"
        >
          <NewsLetterForm />
        </Flex>
      </Box>
      {courses?.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </main>
  );
}

export const dynamic = "force-static";
