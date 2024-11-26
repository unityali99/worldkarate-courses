import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default async function Home() {
  const apiClient = new ApiClient<CourseType[]>("/fetch-course");
  const courses = (await apiClient.get()).data;
  return (
    <BackgroundImage image="/kyuna.jpg">
      <Box className="bg-heading bg-opacity-80 text-white text-center py-12 font-bold text-lg px-4 w-full pt-40">
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
      <Box className="space-y-14 py-12 flex flex-col w-full items-center pb-28 px-2">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </Box>
    </BackgroundImage>
  );
}

export const dynamic = "force-static";
