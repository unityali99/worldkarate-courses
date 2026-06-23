import { CourseType } from "@/schemas/Course";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image as ChakraImage,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import PriceBadge from "./PriceBadge";
import { getCourseImageSource } from "@/utils/courseImage";

function CourseCard({
  course: { id, description, img, title, price },
}: {
  course: CourseType;
}) {
  const imageSource = getCourseImageSource(img);

  return (
    <Flex
      background="rgba(13, 22, 27, 0.68)"
      direction={{ base: "column", md: "row" }}
      w="full"
      maxW="960px"
      minH={{ md: "320px" }}
      rounded="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.14)"
      shadow="0 12px 32px rgba(0, 0, 0, 0.2)"
      backdropFilter="blur(10px)"
      _hover={{
        borderColor: "rgba(255, 255, 255, 0.24)",
        background: "rgba(13, 22, 27, 0.76)",
      }}
      transition="background 0.2s ease, border-color 0.2s ease"
    >
      <Box
        position="relative"
        w={{ base: "full", md: "45%" }}
        h={{ base: "250px", sm: "300px", md: "auto" }}
        minH={{ md: "320px" }}
        flexShrink={0}
        overflow="hidden"
        bg="gray.900"
      >
        <Image
          aria-hidden="true"
          alt=""
          src={imageSource}
          unoptimized
          fill
          sizes="(max-width: 768px) 100vw, 432px"
          style={{
            objectFit: "cover",
            filter: "blur(20px)",
            opacity: 0.55,
            transform: "scale(1.15)",
          }}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(135deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.42))"
        />
        <Box position="absolute" inset={{ base: 3, sm: 4, md: 5 }}>
          <ChakraImage
            alt={title}
            src={imageSource}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="auto"
            h="auto"
            maxW="100%"
            maxH="100%"
            rounded="lg"
            objectFit="contain"
            filter="drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28))"
          />
        </Box>
      </Box>

      <VStack
        dir="rtl"
        align="stretch"
        justify="space-between"
        w={{ base: "full", md: "55%" }}
        spacing={0}
        p={{ base: 5, sm: 7, md: 8 }}
      >
        <Box>
          <Heading
            size={{ base: "md", md: "lg" }}
            color="white"
            lineHeight="1.6"
            mb={3}
          >
            {title}
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="whiteAlpha.800"
            lineHeight="1.9"
            noOfLines={3}
          >
            {description}
          </Text>
        </Box>

        <Flex
          align="center"
          justify="space-between"
          direction="row"
          gap={{ base: 3, sm: 4 }}
          mt={{ base: 6, md: 8 }}
          pt={5}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
        >
          <PriceBadge price={price} />
          <Link
            href={`/courses/${id}`}
            flex="1"
            minW={0}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              bg="red.600"
              color="white"
              minW={{ sm: "160px" }}
              w={{ base: "full", sm: "auto" }}
              size={{ base: "md", sm: "lg" }}
              rounded="xl"
              rightIcon={<IoIosArrowRoundBack size={26} />}
              _hover={{ bg: "red.700", transform: "translateX(-2px)" }}
              _active={{ bg: "red.800", transform: "translateX(0)" }}
              transition="all 0.2s ease"
            >
              مشاهده دوره
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default CourseCard;
