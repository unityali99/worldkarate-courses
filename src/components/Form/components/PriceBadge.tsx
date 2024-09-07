import { Badge } from "@chakra-ui/react";
import React from "react";

function PriceBadge({ price }: { price: number }) {
  return (
    <Badge fontSize={"medium"} rounded={"10px"} p={"5px"} colorScheme="cyan">
      {price.toLocaleString()}
      {" تومان"}
    </Badge>
  );
}

export default PriceBadge;
