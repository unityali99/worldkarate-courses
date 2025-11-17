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
      background={"rgba(255,255,255,0.4)"}
      className="flex-col md:flex-row w-full lg:w-10/12 xl:w-7/12 rounded-xl overflow-hidden"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.25)"
      shadow="lg"
      backdropFilter="blur(5px)"
      _hover={{
        shadow: "xl",
        transform: "translateY(-2px)",
        background: "rgba(255,255,255,0.55)",
      }}
      transition="all 0.3s ease"
    >
      <Box className="relative w-full md:w-7/12 h-56 sm:h-64 md:h-96">
        <Image
          className="object-cover"
          alt={title}
          objectPosition="center top"
          src={img}
          unoptimized
          fill
          quality={100}
        />
      </Box>

      <VStack
        dir="rtl"
        alignItems={"start"}
        className="md:w-5/12 py-8 md:py-0 px-8 space-y-6 my-auto"
      >
        <Heading size={{ base: "md", md: "lg" }}>{title}</Heading>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.700"
          fontWeight="medium"
        >
          {description}
        </Text>
        <PriceBadge price={price} />
        <Link href={`/courses/${id}`} w="full">
          <Button
            colorScheme="red"
            w="full"
            size={{ base: "md", md: "lg" }}
            rightIcon={<IoIosArrowRoundBack size={30} />}
          >
            {"مشاهده دوره"}
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
