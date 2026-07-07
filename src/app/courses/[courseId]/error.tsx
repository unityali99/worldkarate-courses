"use client";

import BackgroundImage from "@/layouts/BackgroundImage";
import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import { LuArrowLeft, LuRefreshCw } from "react-icons/lu";

export default function CourseDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Course details error:", error);
  }, [error]);

  return (
    <BackgroundImage image="/kyuna.webp">
      <Box
        minH="100vh"
        px={{ base: 4, md: 6 }}
        pt={{ base: 36, md: 48 }}
        pb={{ base: 20, md: 28 }}
      >
        <Stack
          dir="rtl"
          spacing={6}
          maxW="720px"
          mx="auto"
          p={{ base: 7, md: 10 }}
          rounded={{ base: "2xl", md: "3xl" }}
          color="white"
          textAlign="center"
          bg="rgba(13, 22, 27, 0.76)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(12px)"
          shadow="0 16px 45px rgba(0, 0, 0, 0.24)"
        >
          <Heading
            as="h1"
            fontFamily="var(--font-lalezar)"
            fontWeight="normal"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="1.5"
          >
            دوره بارگذاری نشد
          </Heading>
          <Text
            color="whiteAlpha.800"
            lineHeight="2"
            fontSize={{ base: "md", md: "lg" }}
          >
            ممکن است سرور هنوز در حال آماده شدن باشد. چند لحظه دیگر دوباره تلاش
            کنید.
          </Text>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={3}
            justify="center"
          >
            <Button
              colorScheme="teal"
              rounded="xl"
              rightIcon={<LuRefreshCw />}
              onClick={reset}
            >
              تلاش دوباره
            </Button>
            <Link as={NextLink} href="/courses" _hover={{ textDecoration: "none" }}>
              <Button
                variant="outline"
                colorScheme="whiteAlpha"
                rounded="xl"
                rightIcon={<LuArrowLeft />}
              >
                بازگشت به دوره‌ها
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </BackgroundImage>
  );
}
