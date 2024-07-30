"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

function FormButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (data: any) => void;
}) {
  return (
    <Button
      _hover={{ backgroundColor: "rgba(0,0,0,1)" }}
      bgColor={"rgba(0,0,0,0.9)"}
      w={"100%"}
      textColor={"white"}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default FormButton;
