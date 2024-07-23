"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import { ForgetPasswordType } from "@/schemas/ForgetPassword";
import { Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

function ForgetPasswordPage() {
  const { register, handleSubmit } = useForm<ForgetPasswordType>({});

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ریست رمز عبور</Text>
      <FormInput
        register={register("email")}
        label="ایمیل:"
        placeholder="Email@example.com"
      />
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
