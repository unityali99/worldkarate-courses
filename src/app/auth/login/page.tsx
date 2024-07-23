"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import Login, { LoginType } from "@/schemas/Login";
import { Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(Login),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ورود به پنل کاربری</Text>
      <FormInput
        register={register("email")}
        label="ایمیل:"
        placeholder="Email@example.com"
      />
      <FormInput
        password
        register={register("password")}
        label="رمز عبور:"
        placeholder="Password"
      />
      <FormButton onClick={handleSubmit(onSubmit)} text="ورود" />
      <FormFooter
        text="رمز خود را فراموش کرده اید؟"
        linkText="ریست رمز"
        href="/auth/forget-password"
      />
      <FormFooter
        text="ثبت نام نکرده اید؟"
        linkText="ثبت نام"
        href="/auth/register"
      />
    </FormContainer>
  );
}

export default LoginPage;
