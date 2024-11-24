import { CourseType } from "@/schemas/Course";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import PriceBadge from "./PriceBadge";

function CourseCard({
  course: { id, description, img, title, price },
}: {
  course: CourseType;
}) {
  return (
    <Flex
      background={"rgba(0,0,0,.5)"}
      className="flex-col md:flex-row justify-between md:space-x-5 w-full lg:w-10/12 xl:w-7/12 md:rounded-l-lg rounded-t-lg md:rounded-r-none"
    >
      <Box className="relative w-full md:w-7/12 h-56 sm:h-64 md:h-96">
        <Image
          className="object-cover md:rounded-l-lg rounded-t-lg md:rounded-r-none"
          alt={title}
          src={img}
          unoptimized
          fill
          quality={100}
        />
      </Box>

      <VStack
        dir="rtl"
        alignItems={"start"}
        className="md:w-5/12 py-6 md:py-0 px-5 space-y-6 my-auto"
      >
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <PriceBadge price={price} />
        <Link href={`/courses/${id}`}>
          <Button colorScheme="red">
            {"مشاهده دوره"}
            <IoIosArrowRoundBack size={30} />
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
