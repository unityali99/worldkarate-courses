import { Badge, Text } from "@chakra-ui/react";
import React from "react";

function PriceBadge({ price }: { price: number }) {
  return (
    <Badge
      display="inline-flex"
      alignItems="baseline"
      alignSelf="center"
      gap={1.5}
      px={4}
      py={2.5}
      rounded="xl"
      bg="rgba(56, 178, 172, 0.16)"
      color="teal.100"
      border="1px solid"
      borderColor="rgba(129, 230, 217, 0.35)"
      textTransform="none"
      dir="rtl"
    >
      <Text
        as="span"
        fontFamily="var(--font-lalezar)"
        fontSize="2xl"
        fontWeight="normal"
        lineHeight="1"
      >
        {price.toLocaleString("fa-IR")}
      </Text>
      <Text
        as="span"
        fontFamily="var(--font-iran-sans)"
        fontSize="xs"
        fontWeight="bold"
      >
        تومان
      </Text>
    </Badge>
  );
}

export default PriceBadge;
