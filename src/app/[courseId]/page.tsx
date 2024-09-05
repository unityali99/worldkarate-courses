import AddToCartBtn from "@/components/AddToCartBtn";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

async function SingleCoursePage({ params }: { params: { courseId: string } }) {
  const apiClient = new ApiClient<CourseType>(
    `/fetch-course/${params.courseId}`
  );
  const course = (await apiClient.get()).data;

  return (
    <Flex className="text-center my-10 space-y-16 flex-col items-center w-full px-4 md:px-0">
      <Heading>{course.title}</Heading>
      <Image
        className="rounded-lg"
        alt={course.title}
        src={course.img}
        unoptimized
        width={800}
        height={600}
        quality={100}
      />
      <Text>{course.description}</Text>
      <AddToCartBtn course={course} text={"اضافه کردن به سبد خرید"} />
    </Flex>
  );
}

export default SingleCoursePage;
