import AddToCartBtn from "@/components/AddToCartBtn";
import DeleteBtn from "@/components/DeleteBtn";
import PriceBadge from "@/components/PriceBadge";
import { CourseType } from "@/schemas/Course";
import UserType from "@/schemas/UserType";
import ApiClient from "@/services/ApiClient";
import { cookieKey } from "@/stores/authStore";
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function SingleCoursePage({ params }: { params: { courseId: string } }) {
  const apiClient = new ApiClient<CourseType>(
    `/fetch-course/${params.courseId}`
  );

  let course: CourseType;

  const authToken = cookies().get(cookieKey)?.value;
  const user: UserType | undefined = authToken
    ? jwtDecode(authToken)
    : undefined;

  try {
    course = (await apiClient.get()).data;
  } catch (error) {
    return notFound();
  }

  if (!course) return notFound();

  return (
    <Flex className="text-center my-10 space-y-16 flex-col items-center w-full px-4 md:px-0 mb-28">
      <Heading>{course.title}</Heading>
      <Image
        className="rounded-lg"
        alt={course.title}
        src={course.img}
        unoptimized
        width={800}
        height={800}
        quality={100}
      />
      <Text>{course.description}</Text>
      <PriceBadge price={course.price} />
      {user?.isAdmin ? (
        <Box className="space-y-10">
          <DeleteBtn text="حذف دوره" courseId={course.id} />
          <Link className="block" href="/profile/admin">
            <Button colorScheme="blue">{"ایجاد دوره جدید"}</Button>
          </Link>
        </Box>
      ) : (
        <AddToCartBtn course={course} />
      )}
    </Flex>
  );
}

export default SingleCoursePage;

export const dynamic = "force-dynamic";
