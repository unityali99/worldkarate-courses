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
    <form action={formAction} className="space-y-6 w-10/12 md:w-3/12">
      <Input
        mx={"auto"}
        placeholder="Email"
        size={{ base: "md", md: "lg" }}
        bgColor={"whitesmoke"}
        textColor={"black"}
        type="email"
        name="email"
      />
      {state.message && (
        <Alert
          colorScheme={state.successful ? "green" : "red"}
          textColor={"black"}
          className="rounded-md text-xs md:text-base"
        >
          <Text className="mx-auto">{state.message}</Text>
        </Alert>
      )}
      <Button type="submit" colorScheme="red" size={{ base: "md", md: "lg" }}>
        {pending ? (
          <Spinner as={"div"} color="white" />
        ) : (
          <React.Fragment>
            <IoNewspaperOutline className="mr-3" />
            {"اطلاع از بروزرسانی ها"}
          </React.Fragment>
        )}
      </Button>
    </form>
  );
}

export default NewsLetterForm;
