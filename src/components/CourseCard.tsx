import { CourseType } from "@/schemas/Course";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseCard({
  course: { id, description, img, title },
}: {
  course: CourseType;
}) {
  return (
    <Flex className="flex-col md:flex-row justify-center items-stretch space-y-12 md:space-x-5">
      <Box className=" md:w-6/12 lg:w-5/12 self-center">
        <Image
          className="rounded-lg"
          alt={title}
          src={img}
          unoptimized
          width={600}
          height={600}
          quality={100}
        />
      </Box>

      <VStack
        dir="rtl"
        alignItems={"start"}
        className="md:w-4/12 space-y-5 md:space-y-14"
      >
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Link href={`/${id}`}>
          <Button colorScheme="red">مشاهده پکیج</Button>
        </Link>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
