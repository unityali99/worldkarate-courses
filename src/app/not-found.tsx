import BackgroundImage from "@/layouts/BackgroundImage";
import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowLeft, LuHouse } from "react-icons/lu";

export default function NotFound() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <Box
        minH="100vh"
        px={{ base: 4, md: 6 }}
        pt={{ base: 40, md: 52 }}
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
            صفحه مورد نظر پیدا نشد
          </Heading>
          <Text color="whiteAlpha.800" lineHeight="2" fontSize={{ base: "md", md: "lg" }}>
            ممکن است آدرس اشتباه باشد یا این دوره دیگر در دسترس نباشد.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={3} justify="center">
            <Link as={NextLink} href="/courses" _hover={{ textDecoration: "none" }}>
              <Button colorScheme="teal" rounded="xl" rightIcon={<LuArrowLeft />}>
                مشاهده دوره‌ها
              </Button>
            </Link>
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              <Button variant="outline" colorScheme="whiteAlpha" rounded="xl" rightIcon={<LuHouse />}>
                صفحه اصلی
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </BackgroundImage>
  );
}
