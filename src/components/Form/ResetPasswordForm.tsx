import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetPassword, { ResetPasswordType } from "@/schemas/auth/ResetPassword";
import ApiClient from "@/services/ApiClient";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-toastify";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({ resolver: zodResolver(ResetPassword) });
  const { replace } = useRouter();

  const apiClient = new ApiClient<ResetPasswordType>("/reset-password");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        ApiClient.logout();
        replace("/auth/login");
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, "تغییر رمز عبور با خطا روبه‌رو شد"))
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        انتخاب رمز عبور جدید
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            password
            dir="ltr"
            register={register("newPassword")}
            label="رمز عبور جدید:"
            placeholder="حداقل ۶ کاراکتر"
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            password
            dir="ltr"
            register={register("repeatPassword")}
            label="تکرار رمز عبور جدید:"
            placeholder="تکرار رمز عبور"
          />
          {errors.repeatPassword && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text="تغییر رمز عبور"
          isLoading={isLoading}
        />
      </div>
    </FormContainer>
  );
}
