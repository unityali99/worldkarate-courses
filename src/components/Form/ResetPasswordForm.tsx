import FormContainer from "@/layouts/FormContainer";
import { Alert, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetPassword, { ResetPasswordType } from "@/schemas/auth/ResetPassword";
import ApiClient from "@/services/ApiClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

function ResetPasswordForm({ email }: { email: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordType>({ resolver: zodResolver(ResetPassword) });
  const { replace } = useRouter();

  const apiClient = new ApiClient<ResetPasswordType>("/reset-password");
  const [isLoading, setIsLoading] = useState(false);

  setValue("email", email);

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        toast.success(res.data.message);
        ApiClient.logout();
        replace("/auth/login");
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string })?.message)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">
        {"رمز عبور خود را انتخاب کنید"}
      </Text>
      <FormInput
        password
        dir="ltr"
        register={register("newPassword")}
        label="رمز جدید:"
      />
      {errors.newPassword && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.newPassword.message}
        </Alert>
      )}
      <FormInput
        password
        dir="ltr"
        register={register("repeatPassword")}
        label="تکرار رمز جدید:"
      />
      {errors.repeatPassword && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.repeatPassword.message}
        </Alert>
      )}
      <FormButton
        onClick={handleSubmit(onSubmit)}
        text="تایید"
        isLoading={isLoading}
      />
    </FormContainer>
  );
}

export default ResetPasswordForm;
