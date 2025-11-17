"use client";
import { registerNewsletter } from "@/services/registerNewsletter";
import { Alert, Button, Input, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoNewspaperOutline } from "react-icons/io5";

function NewsLetterForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(registerNewsletter, {
    message: "",
    successful: false,
  });

  return (
    <form action={formAction} className="space-y-6 w-full md:w-auto min-w-80">
      <Input
        placeholder="ایمیل خود را وارد کنید"
        size={{ base: "md", md: "lg" }}
        bgColor={"white"}
        textColor={"black"}
        type="email"
        name="email"
        borderRadius="md"
        border="2px solid"
        borderColor="gray.300"
        _hover={{
          borderColor: "gray.400",
        }}
        _focus={{
          borderColor: "red.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-red-500)",
        }}
      />
      {state.message && (
        <Alert
          colorScheme={state.successful ? "green" : "red"}
          textColor={"white"}
          borderRadius="md"
          fontSize="sm"
        >
          <Text className="mx-auto">{state.message}</Text>
        </Alert>
      )}
      <Button
        type="submit"
        colorScheme="red"
        size={{ base: "md", md: "lg" }}
        w="full"
        borderRadius="md"
        leftIcon={<IoNewspaperOutline className="ml-3" />}
      >
        {pending ? (
          <Spinner as={"div"} color="white" />
        ) : (
          "اطلاع از بروزرسانی ها"
        )}
      </Button>
    </form>
  );
}

export default NewsLetterForm;
