import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function Placeholder() {
  return (
    <Stack>
      <Skeleton height="20px" className="w-full md:w-8/12" />
      <Skeleton height="20px" className="w-full md:w-8/12" />
    </Stack>
  );
}

export default Placeholder;
