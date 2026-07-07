import CourseActions from "@/components/CourseActions";
import PriceBadge from "@/components/PriceBadge";
import CourseDetailsPlaceholder from "@/components/placeholders/CourseDetailsPlaceholder";
import BackgroundImage from "@/layouts/BackgroundImage";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { getCourseImageSource } from "@/utils/courseImage";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Image as ChakraImage,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Suspense } from "react";
import { LuArrowLeft, LuBookOpen } from "react-icons/lu";

export default function SingleCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <BackgroundImage image="/kyuna.webp">
      <Box
        minH="100vh"
        px={{ base: 4, md: 6 }}
        pt={{ base: 36, md: 48 }}
        pb={{ base: 20, md: 28 }}
      >
        <Suspense fallback={<CourseDetailsPlaceholder />}>
          <CourseDetails courseId={params.courseId} />
        </Suspense>
      </Box>
    </BackgroundImage>
  );
}

async function CourseDetails({ courseId }: { courseId: string }) {
  const course = await getCourse(courseId);
  const imageSource = getCourseImageSource(course.img);

  return (
    <Box maxW="1180px" mx="auto">
      <Link
        href="/courses"
        display="inline-flex"
        alignItems="center"
        gap={2}
        mb={{ base: 5, md: 7 }}
        px={4}
        py={2}
        rounded="full"
        color="whiteAlpha.900"
        bg="rgba(13, 22, 27, 0.55)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(8px)"
        _hover={{ bg: "rgba(13, 22, 27, 0.72)", textDecoration: "none" }}
      >
        <LuArrowLeft />
        بازگشت به دوره‌ها
      </Link>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 0, lg: 6 }}
        p={{ base: 3, sm: 4, md: 6 }}
        rounded={{ base: "2xl", md: "3xl" }}
        overflow="hidden"
        bg="rgba(13, 22, 27, 0.72)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(12px)"
        shadow="0 16px 45px rgba(0, 0, 0, 0.24)"
      >
        <Box
          position="relative"
          h={{ base: "310px", sm: "430px", lg: "560px" }}
          overflow="hidden"
          rounded={{ base: "xl", md: "2xl" }}
          bg="gray.900"
        >
          <Image
            aria-hidden="true"
            alt=""
            src={imageSource}
            unoptimized
            fill
            sizes="(max-width: 992px) 100vw, 570px"
            style={{
              objectFit: "cover",
              filter: "blur(24px)",
              opacity: 0.5,
              transform: "scale(1.14)",
            }}
          />
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(145deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.48))"
          />
          <Box position="absolute" inset={{ base: 4, sm: 6, md: 8 }}>
            <ChakraImage
              alt={course.title}
              src={imageSource}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="auto"
              h="auto"
              maxW="100%"
              maxH="100%"
              rounded="xl"
              objectFit="contain"
              filter="drop-shadow(0 14px 24px rgba(0, 0, 0, 0.3))"
            />
          </Box>
        </Box>

        <Flex
          dir="rtl"
          direction="column"
          justify="space-between"
          p={{ base: 5, sm: 7, lg: 6 }}
          mt={{ base: 3, lg: 0 }}
          borderTop={{ base: "1px solid", lg: "none" }}
          borderLeft={{ base: "none", lg: "1px solid" }}
          borderColor="whiteAlpha.200"
          color="white"
        >
          <Box>
            <Badge
              display="inline-flex"
              alignItems="center"
              gap={2}
              mb={5}
              px={3}
              py={2}
              rounded="full"
              bg="whiteAlpha.100"
              color="teal.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              textTransform="none"
            >
              <LuBookOpen />
              دوره آموزشی کاتا
            </Badge>

            <Heading
              as="h1"
              fontFamily="var(--font-lalezar)"
              fontWeight="normal"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              lineHeight="1.5"
              mb={5}
            >
              {course.title}
            </Heading>

            <Text
              color="whiteAlpha.800"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="2.1"
              textAlign="right"
            >
              {course.description}
            </Text>
          </Box>

          <Stack spacing={6} mt={{ base: 9, lg: 14 }}>
            <Divider borderColor="whiteAlpha.300" />
            <Flex align="center" justify="space-between" gap={4}>
              <Text color="whiteAlpha.700" fontSize="sm" fontWeight="bold">
                قیمت دوره
              </Text>
              <PriceBadge price={course.price} />
            </Flex>

            <CourseActions course={course} />
          </Stack>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

async function getCourse(courseId: string) {
  const apiClient = new ApiClient<CourseType>(`/fetch-course/${courseId}`);
  const retryDelays = [1000, 2000, 4000, 8000, 12000, 16000];

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    try {
      const course = (await apiClient.get()).data;

      if (!course?.id || !course.title || !course.description || !course.img) {
        throw new Error("Course response is empty or invalid");
      }

      return course;
    } catch (error) {
      if (attempt === retryDelays.length) throw error;
      await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt]));
    }
  }

  throw new Error("Failed to fetch course");
}

export const dynamic = "force-static";
export const revalidate = 21600;
