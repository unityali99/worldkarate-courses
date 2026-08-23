"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Login, { LoginType } from "@/schemas/auth/Login";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import FormFooter from "./components/FormFooter";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { login } = useAuth();
  const { t } = useLanguageStore();
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(Login),
  });
  const apiClient = new ApiClient<LoginType>("/login", {
    withCredentials: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: LoginType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        login(res.data.user);
        toast.success(res.data.message);
        replace("/");
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "ورود با خطا روبه‌رو شد"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        {t.ui.userLogin}
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            dir="ltr"
            register={register("email")}
            label={t.ui.email + ":"}
            placeholder={t.ui.emailPlaceholder}
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
            label={t.ui.password + ":"}
            placeholder={t.ui.passwordPlaceholder}
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
          text={t.ui.login}
          isLoading={isLoading}
        />
      </div>

      <div className="pt-4 border-t border-white/10 space-y-2">
        <FormFooter
          text={t.ui.forgotPassword}
          linkText={t.ui.resetPassword}
          href="/auth/forget-password"
        />
        <FormFooter
          text={t.ui.notRegistered}
          linkText={t.ui.register}
          href="/auth/register"
        />
      </div>
    </FormContainer>
  );
}
