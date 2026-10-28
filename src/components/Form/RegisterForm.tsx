"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Register, { RegisterType } from "@/schemas/auth/Register";
import ApiClient from "@/services/ApiClient";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import FormFooter from "./components/FormFooter";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const { t } = useLanguageStore();
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
        toast.success(res.data.message || t.ui.authMsg.registerSuccess);
        replace("/auth/login");
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, t.ui.authMsg.registerError)),
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        {t.ui.authMsg.registerTitle}
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            register={register("firstName")}
            label={t.ui.firstName + ":"}
            placeholder={t.ui.authMsg.exampleFirstName}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            register={register("lastName")}
            label={t.ui.lastName + ":"}
            placeholder={t.ui.authMsg.exampleLastName}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            register={register("email")}
            label={t.ui.email + ":"}
            placeholder={t.ui.emailPlaceholder}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
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
            placeholder={t.ui.authMsg.passwordHint}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text={t.ui.register}
          isLoading={isLoading}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <FormFooter
          text={t.ui.alreadyRegistered}
          linkText={t.ui.login}
          href="/auth/login"
        />
      </div>
    </FormContainer>
  );
}
