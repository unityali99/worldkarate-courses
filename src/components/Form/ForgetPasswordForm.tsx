import React, { useState } from "react";
import FormContainer from "@/layouts/FormContainer";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function ForgetPasswordForm({
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
      .catch((error) =>
        toast.error(getErrorMessage(error, "ارسال کد با خطا روبه‌رو شد"))
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        بازیابی رمز عبور
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            dir="ltr"
            register={register("email")}
            label="ایمیل شما:"
            placeholder="Email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text="ارسال کد تایید"
          isLoading={isLoading}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <FormFooter
          text="حساب کاربری ندارید؟"
          linkText="ثبت نام"
          href="/auth/register"
        />
      </div>
    </FormContainer>
  );
}
