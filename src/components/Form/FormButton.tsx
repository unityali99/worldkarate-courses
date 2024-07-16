import { Button } from "@chakra-ui/react";
import React from "react";

function FormButton({ text }: { text: string }) {
  return (
    <Button
      _hover={{ backgroundColor: "rgba(0,0,0,1)" }}
      bgColor={"rgba(0,0,0,0.9)"}
      w={"100%"}
      textColor={"white"}
    >
      {text}
    </Button>
  );
}

export default FormButton;
