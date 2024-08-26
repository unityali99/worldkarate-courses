import { ForgetPasswordType } from "@/schemas/ForgetPassword";
import { LoginType } from "@/schemas/Login";
import { OTPType } from "@/schemas/OTP";
import { ProfileType } from "@/schemas/Profile";
import { RegisterType } from "@/schemas/Register";
import { ResetPasswordType } from "@/schemas/ResetPassword";
import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Inputs = LoginType &
  RegisterType &
  ProfileType &
  ResetPasswordType &
  ForgetPasswordType &
  OTPType;

function FormInput({
  className,
  label,
  placeholder = "",
  password = false,
  number = false,
  register,
  dir,
}: {
  className?: string;
  label: string;
  password?: boolean;
  number?: boolean;
  placeholder?: string;
  register: ReturnType<UseFormRegister<Inputs>>;
  dir: "ltr" | "rtl";
}) {
  return (
    <Box className="space-y-1">
      <Text className="text-start">{label}</Text>
      <Input
        className={className}
        {...register}
        borderColor={"rgba(0,0,0,0.2)"}
        placeholder={placeholder}
        focusBorderColor={"black"}
        dir={dir}
        size="md"
        type={password ? "password" : number ? "number" : ""}
      />
    </Box>
  );
}

export default FormInput;
