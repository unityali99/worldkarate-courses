import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

function BackgroundImage({
  image,
  children,
}: {
  image: string;
  children: ReactNode;
}) {
  return (
    <Box
      bgAttachment={"fixed"}
      bgImage={`url(${image})`}
      bgBlendMode={"darken"}
      backgroundColor={"rgba(0,0,0,0.1)"}
      bgPos={"center"}
      bgSize={"cover"}
      backgroundPosition={"center 25%"}
      bgRepeat={"no-repeat"}
    >
      {children}
    </Box>
  );
}

export default BackgroundImage;
