"use client";
import Register, { RegisterType } from "@/schemas/auth/Register";
import ApiClient from "@/services/ApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "./components/FormInput";
import { Alert, Text } from "@chakra-ui/react";
import FormContainer from "@/layouts/FormContainer";
import FormFooter from "./components/FormFooter";
import FormButton from "./components/FormButton";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(Register),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  const apiClient = new ApiClient<RegisterType>("/register");

  const onSubmit = (data: RegisterType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        toast.success(res.data.message);
        replace("/auth/login");
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setIsLoading(false));
  };
  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ثبت نام</Text>
      <FormInput
        dir="rtl"
        register={register("firstName")}
        label="نام"
        placeholder=""
      />
      {errors.firstName && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.firstName.message}
        </Alert>
      )}
      <FormInput
        dir="rtl"
        register={register("lastName")}
        label="نام خانوادگی"
        placeholder=""
      />
      {errors.lastName && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.lastName.message}
        </Alert>
      )}
      <FormInput
        dir="ltr"
        register={register("email")}
        label="ایمیل"
        placeholder="Example@gmail.com"
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
      <FormInput
        dir="ltr"
        password
        register={register("password")}
        label="رمز عبور"
        placeholder="Password"
      />
      {errors.password && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.password.message}
        </Alert>
      )}
      <FormButton
        onClick={handleSubmit(onSubmit)}
        text="ثبت نام"
        isLoading={isLoading}
      />
      <FormFooter text="ثبت نام کرده اید؟" linkText="ورود" href="/auth/login" />
    </FormContainer>
  );
}

export default RegisterForm;
