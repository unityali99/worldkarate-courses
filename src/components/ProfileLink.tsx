import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { LuUser } from "react-icons/lu";

function ProfileLink({ fullName }: { fullName: string }) {
  return (
    <Link
      href="/profile"
      _hover={{ textDecoration: "none" }}
      aria-label={`Open profile for ${fullName}`}
    >
      <Flex
        align="center"
        gap={3}
        px={3}
        py={2}
        rounded="full"
        border="1px solid"
        borderColor="whiteAlpha.300"
        bg="whiteAlpha.100"
        backdropFilter="blur(8px)"
        transition="all 0.2s ease"
        _hover={{
          transform: "translateY(-2px)",
          borderColor: "teal.300",
          bg: "whiteAlpha.200",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
        }}
      >
        <Flex
          align="center"
          justify="center"
          w={10}
          h={10}
          rounded="full"
          bgGradient="linear(135deg, teal.300, cyan.400, blue.500)"
          color="white"
          boxShadow="0 0 14px rgba(56, 178, 172, 0.45)"
          position="relative"
          overflow="hidden"
          flexShrink={0}
        >
          <Box position="absolute" inset={0} bg="whiteAlpha.200" />
          <Box position="relative">
            <LuUser size={18} />
          </Box>
        </Flex>
        <Flex direction="column" lineHeight={1.1} minW={0}>
          <Text fontSize="xs" textTransform="uppercase" color="whiteAlpha.700">
            Profile
          </Text>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="sm"
            maxW="140px"
            noOfLines={1}
          >
            {fullName}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}

export default ProfileLink;
