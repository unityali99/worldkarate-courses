import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { ReactNode } from "react";

function CourseCard({
  imageAlt,
  imageSrc,
  title,
  description,
}: {
  imageAlt: string;
  imageSrc: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <Flex className="flex-col md:flex-row justify-center items-stretch space-y-12 md:space-x-5">
      <Box className=" md:w-6/12 lg:w-5/12 self-center">
        <Image
          className="rounded-lg"
          alt={imageAlt}
          src={imageSrc}
          unoptimized
          width={600}
          height={600}
          quality={100}
        />
      </Box>

      <VStack dir="rtl" alignItems={"start"} className="md:w-4/12 space-y-7">
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Button colorScheme="red">مشاهده پکیج</Button>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
