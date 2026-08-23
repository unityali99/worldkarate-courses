"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Profile, { ProfileType } from "@/schemas/auth/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import Placeholder from "../Placeholder";
import { toast } from "react-toastify";
import { LuPencil, LuShieldCheck, LuUserRound } from "react-icons/lu";

export default function ProfileForm({ isAdmin }: { isAdmin: boolean }) {
  const { user, login } = useAuth();
  const { t } = useLanguageStore();
  const [isEditing, setIsEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push, refresh } = useRouter();

  useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      : undefined,
  });

  const apiClient = new ApiClient<ProfileType>("/profile");

  const cancelEditing = () => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        login({ ...data, isAdmin: user?.isAdmin ?? isAdmin });
        reset(data);
        setIsEditing(false);
        refresh();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "ویرایش اطلاعات با خطا روبه‌رو شد"));
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
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
            <LuUserRound className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-lalezar text-2xl text-white font-normal">
              {t.ui.profile}
            </h3>
            <p className="text-slate-400 text-xs font-normal">
              اطلاعات حساب کاربری شما
            </p>
          </div>
        </div>

        {/* Admin Panel Banner */}
        {isAdmin && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30">
            <div className="flex items-center gap-2 text-teal-300 text-sm font-semibold">
              <LuShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>{t.ui.adminPanel}</span>
            </div>
            <Button
              type="button"
              variant="teal"
              size="sm"
              onClick={() => push("/profile/admin")}
            >
              {t.ui.redirectToAdmin}
            </Button>
          </div>
        )}

        {/* Form Fields */}
        {hydrated ? (
          <div className="space-y-4 flex-1">
            <div className="space-y-1 text-right">
              <label className="block text-xs font-semibold text-slate-300">
                {t.ui.firstName}
              </label>
              <input
                disabled={!isEditing}
                {...register("firstName")}
                className={`w-full h-11 px-4 rounded-2xl text-sm transition-all text-right border ${
                  isEditing
                    ? "bg-slate-900 border-teal-400 text-white focus:ring-2 focus:ring-teal-400/30"
                    : "bg-white/5 border-white/10 text-slate-200 cursor-default"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1 text-right">
              <label className="block text-xs font-semibold text-slate-300">
                {t.ui.lastName}
              </label>
              <input
                disabled={!isEditing}
                {...register("lastName")}
                className={`w-full h-11 px-4 rounded-2xl text-sm transition-all text-right border ${
                  isEditing
                    ? "bg-slate-900 border-teal-400 text-white focus:ring-2 focus:ring-teal-400/30"
                    : "bg-white/5 border-white/10 text-slate-200 cursor-default"
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-1 text-right">
              <label className="block text-xs font-semibold text-slate-300">
                {t.ui.email}
              </label>
              <input
                disabled={!isEditing}
                {...register("email")}
                dir="ltr"
                className={`w-full h-11 px-4 rounded-2xl text-sm transition-all text-left border ${
                  isEditing
                    ? "bg-slate-900 border-teal-400 text-white focus:ring-2 focus:ring-teal-400/30"
                    : "bg-white/5 border-white/10 text-slate-200 cursor-default"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        )}

        {/* Buttons */}
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              variant="teal"
              size="lg"
              className="flex-1"
              isLoading={isLoading}
            >
              {t.ui.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={cancelEditing}
              disabled={isLoading}
            >
              {t.ui.cancel}
            </Button>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              type="button"
              variant="gold"
              size="lg"
              className="w-full gap-2 font-bold"
              onClick={() => setIsEditing(true)}
              disabled={!hydrated}
            >
              <LuPencil className="w-4 h-4 ml-1" />
              <span>{t.ui.edit}</span>
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
