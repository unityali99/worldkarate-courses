import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

function PanelContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      className="mx-auto text-xs md:text-base font-bold"
      w={{ base: "100%", md: "75%", lg: "50%" }}
    >
      {children}
    </Box>
  );
}

export default PanelContainer;
