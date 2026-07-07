import { Box, Flex, Skeleton, VStack } from "@chakra-ui/react";

function CoursesPlaceholder({ itemsCount }: { itemsCount?: number }) {
  return (
    <>
      {Array.from({ length: itemsCount || 3 }).map((_, index) => (
        <Flex
          key={index}
          direction={{ base: "column", md: "row" }}
          w="full"
          maxW="960px"
          minH={{ md: "320px" }}
          rounded="2xl"
          overflow="hidden"
          bg="rgba(13, 22, 27, 0.68)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.14)"
          shadow="0 12px 32px rgba(0, 0, 0, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Box
            w={{ base: "full", md: "45%" }}
            h={{ base: "250px", sm: "300px", md: "auto" }}
            minH={{ md: "320px" }}
            p={{ base: 4, md: 5 }}
            bg="blackAlpha.400"
          >
            <Skeleton
              w="full"
              h="full"
              minH={{ base: "218px", sm: "268px", md: "280px" }}
              rounded="lg"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.400"
            />
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
              <Skeleton
                h="32px"
                w={{ base: "75%", md: "62%" }}
                mb={5}
                rounded="md"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
              <Skeleton
                h="18px"
                w="full"
                mb={3}
                rounded="md"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
              <Skeleton
                h="18px"
                w="88%"
                mb={3}
                rounded="md"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
              <Skeleton
                h="18px"
                w="68%"
                rounded="md"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
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
              <Skeleton
                h="40px"
                w="120px"
                rounded="full"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
              <Skeleton
                h={{ base: "40px", sm: "48px" }}
                w={{ base: "140px", sm: "170px" }}
                rounded="xl"
                startColor="whiteAlpha.200"
                endColor="whiteAlpha.400"
              />
            </Flex>
          </VStack>
        </Flex>
      ))}
    </>
  );
}

export default CoursesPlaceholder;
