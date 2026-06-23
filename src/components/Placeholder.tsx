import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function Placeholder() {
  return (
    <Stack w="full">
      <Skeleton w="full" height="20px" />
      <Skeleton w="full" height="20px" />
    </Stack>
  );
}

export default Placeholder;
