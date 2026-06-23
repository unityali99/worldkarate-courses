import { Box, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface PanelContainerProps extends BoxProps {
  children: ReactNode;
}

function PanelContainer({ children, ...props }: PanelContainerProps) {
  return (
    <Box
      className="mx-auto text-xs md:text-base font-bold"
      w={{ base: "100%", md: "75%", lg: "50%" }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default PanelContainer;
