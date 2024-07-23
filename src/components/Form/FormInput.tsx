import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

function FormInput({
  label,
  placeholder,
  password = false,
  register,
}: {
  label: string;
  password?: boolean;
  placeholder: string;
  register: ReturnType<UseFormRegister<Inputs>>;
}) {
  return (
    <Box className="space-y-1">
      <Text className="text-start">{label}</Text>
      <Input
        {...register}
        borderColor={"rgba(0,0,0,0.2)"}
        placeholder={placeholder}
        focusBorderColor={"black"}
        dir="ltr"
        size="md"
        type={password ? "password" : ""}
      />
    </Box>
  );
}

export default FormInput;
