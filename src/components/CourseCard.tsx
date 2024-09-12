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
    <Flex className="flex-col md:flex-row justify-center items-stretch space-y-12 md:space-x-5 w-full px-2 md:px-0 lg:w-7/12">
      <Box className="self-center relative w-full md:w-7/12 h-56 sm:h-64 md:h-96">
        <Image
          className="md:rounded-l-lg rounded-t-lg md:rounded-r-none object-cover "
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
        className="md:w-4/12 space-y-5 md:space-y-10"
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
