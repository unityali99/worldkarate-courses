import FormContainer from "@/layouts/FormContainer";
import { Alert, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import FormFooter from "./components/FormFooter";
import { useForm } from "react-hook-form";
import ForgetPassword, {
  ForgetPasswordType,
} from "@/schemas/auth/ForgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiClient from "@/services/ApiClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function ForgetPasswordForm({
  setOtp,
  setEmail,
}: {
  setOtp: (otp: number) => void;
  setEmail: (email: string) => void;
}) {
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
      .put(data)
      .then((res) => {
        toast.success(res.data.OTP);
        setOtp(res.data.OTP);
        setEmail(data.email);
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

export default ForgetPasswordForm;
