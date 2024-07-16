import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
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
      <Image
        alt={imageAlt}
        src={imageSrc}
        width={500}
        height={500}
        quality={100}
        className="sm:w-9/12 md:w-5/12 lg:w-5/12 rounded-lg"
      />
      <VStack dir="rtl" alignItems={"start"} className="md:w-4/12 space-y-7">
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Button colorScheme="red">مشاهده پکیج</Button>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
