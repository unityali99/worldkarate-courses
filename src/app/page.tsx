import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default async function Home() {
  const apiClient = new ApiClient<CourseType[]>("/fetch-course");

  let courses: CourseType[] = [];
  try {
    const response = await apiClient.get();
    courses = response.data || [];
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    // courses will remain empty array, so the page will still render
  }
  return (
    <BackgroundImage image="/kyuna.jpg">
      <Box className="w-full pt-40 pb-20 px-4">
        <Box
          bg="rgba(13, 22, 27, 0.3)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.15)"
          textAlign="center"
          textColor="white"
          fontWeight="bold"
          w={{ base: "100%", md: "80%", lg: "60%" }}
          mx="auto"
          p={{ base: 8, md: 12 }}
          shadow="lg"
          backdropFilter="blur(5px)"
        >
          <Heading
            size={{ base: "lg", md: "xl", lg: "2xl" }}
            mb={4}
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            سنسی امیر یاری
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            mb={6}
            fontWeight="light"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
          >
            پکیج های آموزشی کاتا
          </Text>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            mb={8}
            fontWeight="light"
            dir="rtl"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
          >
            {"برای اطلاع از آخرین بروزرسانی پکیج ها ایمیل خود را وارد کنید."}
          </Text>
          <Flex
            alignItems={"center"}
            justify={"center"}
            gap={4}
            flexDirection={{ base: "column", md: "row" }}
          >
            <NewsLetterForm />
          </Flex>
        </Box>
      </Box>
      <Box className="space-y-10 py-12 flex flex-col w-full items-center pb-28 px-2">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </Box>
    </BackgroundImage>
  );
}

export const dynamic = "force-static";
