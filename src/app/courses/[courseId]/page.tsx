import AddToCartBtn from "@/components/AddToCartBtn";
import DeleteBtn from "@/components/DeleteBtn";
import PriceBadge from "@/components/PriceBadge";
import BackgroundImage from "@/layouts/BackgroundImage";
import { CourseType } from "@/schemas/Course";
import UserType from "@/schemas/UserType";
import ApiClient from "@/services/ApiClient";
import { cookieKey } from "@/stores/authStore";
import { getCourseImageSource } from "@/utils/courseImage";
import decodeJwt from "@/utils/jwtDecode";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image as ChakraImage,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuBookOpen } from "react-icons/lu";

async function SingleCoursePage({ params }: { params: { courseId: string } }) {
  const apiClient = new ApiClient<CourseType>(
    `/fetch-course/${params.courseId}`,
  );

  const authToken = cookies().get(cookieKey)?.value;
  const user: UserType | undefined = authToken
    ? decodeJwt(authToken)
    : undefined;
  const course = (await apiClient.get()).data;

  if (!course) return notFound();

  const imageSource = getCourseImageSource(course.img);

  return (
    <BackgroundImage image="/kyuna.webp">
      <Box
        minH="100vh"
        px={{ base: 4, md: 6 }}
        pt={{ base: 36, md: 48 }}
        pb={{ base: 20, md: 28 }}
      >
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

                {user?.isAdmin ? (
                  <Stack spacing={3}>
                    <DeleteBtn text="حذف دوره" courseId={course.id} />
                    <Link
                      href="/profile/admin"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        w="full"
                        size="lg"
                        rounded="xl"
                        colorScheme="teal"
                      >
                        ایجاد دوره جدید
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      "& > button": {
                        width: "100%",
                        minHeight: "48px",
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <AddToCartBtn course={course} />
                  </Box>
                )}
              </Stack>
            </Flex>
          </SimpleGrid>
        </Box>
      </Box>
    </BackgroundImage>
  );
}

export default SingleCoursePage;

export const dynamic = "force-dynamic";
