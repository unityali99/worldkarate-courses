"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import Register, { RegisterType } from "@/schemas/Register";
import { Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function Page() {
  const { register, handleSubmit } = useForm<RegisterType>({
    resolver: zodResolver(Register),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ورود به پنل کاربری</Text>
      <FormInput register={register("firstName")} label="نام" placeholder="" />
      <FormInput
        register={register("lastName")}
        label="نام خانوادگی"
        placeholder=""
      />
      <FormInput
        register={register("email")}
        label="ایمیل"
        placeholder="Example@gmail.com"
      />
      <FormInput
        password
        register={register("password")}
        label="رمز عبور"
        placeholder="Password"
      />
      <FormButton onClick={handleSubmit(onSubmit)} text="ثبت نام" />
      <FormFooter text="ثبت نام کرده اید؟" linkText="ورود" href="/auth/login" />
    </FormContainer>
  );
}

export default Page;
