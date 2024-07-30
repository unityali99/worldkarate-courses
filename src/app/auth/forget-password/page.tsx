"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import ForgetPassword, { ForgetPasswordType } from "@/schemas/ForgetPassword";
import { Alert, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function ForgetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({ resolver: zodResolver(ForgetPassword) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ریست رمز عبور</Text>
      <FormInput
        dir="ltr"
        register={register("email")}
        label="ایمیل:"
        placeholder="Email@example.com"
      />
      {errors.email && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.email.message}
        </Alert>
      )}
      <FormButton onClick={handleSubmit(onSubmit)} text="ارسال" />
      <FormFooter
        text="ثبت نام نکرده اید؟"
        linkText="ثبت نام"
        href="/auth/register"
      />
    </FormContainer>
  );
}

export default ForgetPasswordPage;
