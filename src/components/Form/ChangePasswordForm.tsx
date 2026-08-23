"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetPassword, { ResetPasswordType } from "@/schemas/auth/ResetPassword";
import ApiClient from "@/services/ApiClient";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import Placeholder from "../Placeholder";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff, LuKeyRound, LuLockKeyhole } from "react-icons/lu";

export default function ChangePasswordForm() {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { t } = useLanguageStore();

  useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPassword),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const apiClient = new ApiClient<ResetPasswordType>("/reset-password");

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        reset();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "تغییر رمز عبور با خطا روبه‌رو شد"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="flex flex-col justify-between h-full space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-xl shadow-glass text-white"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <LuLockKeyhole className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-lalezar text-2xl text-white font-normal">
              {t.ui.changePassword}
            </h3>
            <p className="text-slate-400 text-xs font-normal">
              برای امنیت بیشتر، رمز قدرتمندی انتخاب کنید
            </p>
          </div>
        </div>

        {/* Fields */}
        {hydrated ? (
          <div className="space-y-4 flex-1">
            <div className="space-y-1 text-right">
              <label className="block text-xs font-semibold text-slate-300">
                {t.ui.newPassword}
              </label>
              <div className="relative" dir="ltr">
                <input
                  type={showPasswords ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("newPassword")}
                  className="w-full h-11 px-4 pl-12 rounded-2xl text-sm bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 text-left transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPasswords ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1 text-right">
              <label className="block text-xs font-semibold text-slate-300">
                {t.ui.repeatPassword}
              </label>
              <div className="relative" dir="ltr">
                <input
                  type={showPasswords ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("repeatPassword")}
                  className="w-full h-11 px-4 pl-12 rounded-2xl text-sm bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 text-left transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPasswords ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
              {errors.repeatPassword && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <Placeholder />
            <Placeholder />
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            variant="teal"
            size="lg"
            className="w-full gap-2 font-bold"
            isLoading={isLoading}
            disabled={!hydrated || isLoading}
          >
            <LuKeyRound className="w-4 h-4 ml-1" />
            <span>{t.ui.save}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
