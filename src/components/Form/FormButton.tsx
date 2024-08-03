"use client";
import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

function FormButton({
  text,
  isLoading,
  onClick,
}: {
  text: string;
  isLoading: boolean;
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
      {isLoading ? <Spinner color="white" /> : text}
    </Button>
  );
}

export default FormButton;
