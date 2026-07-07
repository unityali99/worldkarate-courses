import {
  Badge,
  Box,
  Divider,
  Flex,
  Link,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";

function CourseDetailsPlaceholder() {
  return (
    <Box maxW="1180px" mx="auto">
      <Link
        href="/courses"
        display="inline-flex"
        alignItems="center"
        gap={2}
        mb={{ base: 5, md: 7 }}
        px={4}
        py={2}
        rounded="full"
        color="whiteAlpha.900"
        bg="rgba(13, 22, 27, 0.55)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(8px)"
        _hover={{ bg: "rgba(13, 22, 27, 0.72)", textDecoration: "none" }}
      >
        <LuArrowLeft />
        بازگشت به دوره‌ها
      </Link>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 0, lg: 6 }}
        p={{ base: 3, sm: 4, md: 6 }}
        rounded={{ base: "2xl", md: "3xl" }}
        overflow="hidden"
        bg="rgba(13, 22, 27, 0.72)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(12px)"
        shadow="0 16px 45px rgba(0, 0, 0, 0.24)"
      >
        <Box
          h={{ base: "310px", sm: "430px", lg: "560px" }}
          overflow="hidden"
          rounded={{ base: "xl", md: "2xl" }}
          bg="gray.900"
          p={{ base: 4, sm: 6, md: 8 }}
        >
          <Skeleton
            w="full"
            h="full"
            rounded="xl"
            startColor="whiteAlpha.200"
            endColor="whiteAlpha.400"
          />
        </Box>

        <Flex
          dir="rtl"
          direction="column"
          justify="space-between"
          p={{ base: 5, sm: 7, lg: 6 }}
          mt={{ base: 3, lg: 0 }}
          borderTop={{ base: "1px solid", lg: "none" }}
          borderLeft={{ base: "none", lg: "1px solid" }}
          borderColor="whiteAlpha.200"
        >
          <Box>
            <Badge
              display="inline-flex"
              mb={5}
              px={3}
              py={2}
              rounded="full"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Skeleton
                h="18px"
                w="130px"
                rounded="full"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
            </Badge>

            <Skeleton
              h={{ base: "36px", md: "48px" }}
              w={{ base: "82%", md: "70%" }}
              mb={6}
              rounded="md"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
            <Skeleton
              h="20px"
              w="full"
              mb={4}
              rounded="md"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
            <Skeleton
              h="20px"
              w="92%"
              mb={4}
              rounded="md"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
            <Skeleton
              h="20px"
              w="74%"
              rounded="md"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
          </Box>

          <Stack spacing={6} mt={{ base: 9, lg: 14 }}>
            <Divider borderColor="whiteAlpha.300" />
            <Flex align="center" justify="space-between" gap={4}>
              <Skeleton
                h="20px"
                w="80px"
                rounded="md"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
              <Skeleton
                h="40px"
                w="120px"
                rounded="full"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
            </Flex>
            <Skeleton
              h="48px"
              w="full"
              rounded="xl"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
          </Stack>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

export default CourseDetailsPlaceholder;
