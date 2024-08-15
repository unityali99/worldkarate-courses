"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import ForgetPassword, { ForgetPasswordType } from "@/schemas/ForgetPassword";
import ApiClient from "@/services/ApiClient";
import { Alert, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function ForgetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({ resolver: zodResolver(ForgetPassword) });

  const apiClient = new ApiClient<ForgetPasswordType>("/forget-password");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: ForgetPasswordType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string })?.message)
      )
      .finally(() => setIsLoading(false));
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
      <FormButton
        onClick={handleSubmit(onSubmit)}
        text="ارسال"
        isLoading={isLoading}
      />
      <FormFooter
        text="ثبت نام نکرده اید؟"
        linkText="ثبت نام"
        href="/auth/register"
      />
    </FormContainer>
  );
}

export default ForgetPasswordPage;
