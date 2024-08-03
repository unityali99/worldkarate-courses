"use client";
import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import Login, { LoginType } from "@/schemas/Login";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/utils/store";
import { Alert, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function LoginPage() {
  const { login } = useAuth();
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(Login),
  });
  const apiClient = new ApiClient<LoginType>("/login");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: LoginType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        login(res.data.jwt);
        localStorage.setItem("auth-token", res.data.jwt);
        toast.success(res.data.message);
        replace("/");
      })
      .catch((error: AxiosError) => {
        toast.error((error.response?.data as { message: string })?.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ورود به پنل کاربری</Text>
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
      <FormInput
        dir="ltr"
        password
        register={register("password")}
        label="رمز عبور:"
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
        text="ورود"
        isLoading={isLoading}
      />
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
