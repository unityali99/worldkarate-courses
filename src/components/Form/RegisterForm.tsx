"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Register, { RegisterType } from "@/schemas/auth/Register";
import ApiClient from "@/services/ApiClient";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import FormFooter from "./components/FormFooter";
import { toast } from "react-toastify";

export default function RegisterForm() {
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
      .catch((error) =>
        toast.error(getErrorMessage(error, "ثبت نام با خطا روبه‌رو شد"))
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        ثبت نام در آکادمی
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            dir="rtl"
            register={register("firstName")}
            label="نام:"
            placeholder="مثال: علی"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="rtl"
            register={register("lastName")}
            label="نام خانوادگی:"
            placeholder="مثال: محمدی"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            register={register("email")}
            label="ایمیل:"
            placeholder="Example@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            password
            register={register("password")}
            label="رمز عبور:"
            placeholder="حداقل ۶ کاراکتر"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text="ثبت نام"
          isLoading={isLoading}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <FormFooter text="قبلا ثبت نام کرده‌اید؟" linkText="ورود" href="/auth/login" />
      </div>
    </FormContainer>
  );
}
