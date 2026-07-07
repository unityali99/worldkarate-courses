import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { fetchCoursesWithRetry } from "@/services/courseService";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function CoursesPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={{ base: 6, md: 8 }}
        w="full"
        px={{ base: 4, md: 6 }}
        pt={{ base: 8, md: 12 }}
        pb={{ base: 20, md: 28 }}
      >
        <CoursesList />
      </Box>
    </BackgroundImage>
  );
}

async function CoursesList() {
  const courses = await fetchCoursesWithRetry();

  if (courses.length === 0) {
    return (
      <Box
        dir="rtl"
        w="full"
        maxW="760px"
        px={{ base: 5, md: 8 }}
        py={{ base: 8, md: 10 }}
        rounded="2xl"
        bg="rgba(13, 22, 27, 0.68)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        shadow="0 12px 32px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
        textAlign="center"
      >
        <Text fontSize={{ base: "md", md: "lg" }} color="white">
          فعلا دوره‌ای برای نمایش وجود ندارد.
        </Text>
      </Box>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
}

export const dynamic = "force-static";
export const revalidate = 21600;
