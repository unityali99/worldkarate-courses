import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTP, { OTPType } from "@/schemas/auth/OTP";
import ApiClient from "@/services/ApiClient";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-toastify";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";

export default function OTPForm({
  setIsOtpValid,
  email,
}: {
  setIsOtpValid: (isValid: boolean) => void;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OTPType>({ resolver: zodResolver(OTP) });

  const apiClient = new ApiClient<OTPType>("/validate-otp");
  const [isLoading, setIsLoading] = useState(false);

  setValue("email", email);

  const onSubmit = (data: OTPType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        toast.success(res.data.message);
        setIsOtpValid(true);
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, "اعتبارسنجی کد با خطا روبه‌رو شد"))
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-4">
        کد تایید یکبار مصرف
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm text-center mb-6">
        کد ارسال شده به ایمیل <span className="font-bold text-teal-400">{email}</span> را وارد نمایید.
      </p>

      <div className="space-y-4">
        <div>
          <FormInput
            className="text-center tracking-widest text-lg font-bold"
            number
            dir="ltr"
            register={register("OTP", { valueAsNumber: true })}
            label="کد یکبار مصرف:"
            placeholder="— — — —"
          />
          {errors.OTP && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.OTP.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text="تایید کد"
          isLoading={isLoading}
        />
      </div>
    </FormContainer>
  );
}
