"use client";
import { CourseType } from "@/schemas/Course";
import useCart from "@/stores/cartStore";
import { Button } from "@chakra-ui/react";
import React from "react";

function AddToCartBtn({ course, text }: { course: CourseType; text: string }) {
  const { add } = useCart();

  return (
    <Button onClick={() => add(course)} colorScheme="red">
      {text}
    </Button>
  );
}

export default AddToCartBtn;
