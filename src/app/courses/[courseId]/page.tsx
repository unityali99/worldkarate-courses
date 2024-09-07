import AddToCartBtn from "@/components/AddToCartBtn";
import PriceBadge from "@/components/Form/components/PriceBadge";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function SingleCoursePage({ params }: { params: { courseId: string } }) {
  const apiClient = new ApiClient<CourseType>(
    `/fetch-course/${params.courseId}`
  );
  let course: CourseType;

  try {
    course = (await apiClient.get()).data;
  } catch (error) {
    return notFound();
  }

  if (!course) return notFound();

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
      <PriceBadge price={course.price} />
      <AddToCartBtn course={course} text={"اضافه کردن به سبد خرید"} />
    </Flex>
  );
}

export default SingleCoursePage;
