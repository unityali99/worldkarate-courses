"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Profile, { ProfileType } from "@/schemas/auth/Profile";
import UserType from "@/schemas/UserType";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAdmin as checkIsAdmin, isInstructor, isStaff } from "@/utils/authHelpers";
import { toast } from "react-toastify";
import {
  LuPencil,
  LuShieldCheck,
  LuUserRound,
  LuCheck,
  LuX,
  LuMail,
} from "react-icons/lu";

interface ProfileFormProps {
  initialUser: UserType;
}

export default function ProfileForm({ initialUser }: ProfileFormProps) {
  const { user, login } = useAuth();
  const { t } = useLanguageStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push, refresh } = useRouter();

  // Active user data preferring authStore when hydrated, otherwise server initialUser
  const activeUser = user || initialUser;
  const userIsAdmin = checkIsAdmin(activeUser);
  const userIsStaff = isStaff(activeUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
    defaultValues: {
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      email: activeUser.email,
    },
  });

  // Sync form defaults when active user updates
  useEffect(() => {
    reset({
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      email: activeUser.email,
    });
  }, [activeUser.firstName, activeUser.lastName, activeUser.email, reset]);

  const apiClient = new ApiClient<ProfileType>("/profile");

  const handleStartEditing = () => {
    reset({
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      email: activeUser.email,
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    reset({
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      email: activeUser.email,
    });
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message || "اطلاعات با موفقیت ذخیره شد");
        login({ ...data, role: activeUser.role });
        setIsEditing(false);
        refresh();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "ویرایش اطلاعات با خطا روبه‌رو شد"));
      })
      .finally(() => setIsLoading(false));
  };

  const getRoleLabel = () => {
    if (userIsAdmin) return "مدیر ارشد آکادمی";
    if (isInstructor(activeUser)) return "مربی و استاد کاتا";
    return "هنرجوی آکادمی";
  };

  return (
    <div
      dir="rtl"
      className="w-full h-full p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-xl shadow-glass text-white transition-all duration-300"
    >
      {/* ========================================================= */}
      {/* 1. Header with View/Edit Mode Indicator                  */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(20,184,166,0.25)]">
            <LuUserRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-lalezar text-2xl text-white font-normal leading-tight">
              {isEditing ? "ویرایش مشخصات فردی" : t.ui.profile}
            </h3>
            <p className="text-slate-400 text-xs font-light">
              {isEditing ? "اطلاعات جدید خود را وارد نمایید" : "مشخصات ثبت‌شده حساب کاربری شما"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <Button
            type="button"
            variant="gold"
            size="sm"
            onClick={handleStartEditing}
            className="gap-2 font-bold shadow-md hover:scale-105 transition-all text-xs"
          >
            <LuPencil className="w-3.5 h-3.5" />
            <span>{t.ui.edit}</span>
          </Button>
        )}
      </div>

      {/* Staff / Admin Panel Quick Banner */}
      {userIsStaff && !isEditing && (
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30">
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

      {/* ========================================================= */}
      {/* 2. BODY: Dual-Mode Rendering (View vs Edit Form)         */}
      {/* ========================================================= */}
      {!isEditing ? (
        /* --- VIEW MODE: Read-Only Dashboard Summary --- */
        <div className="mt-6 space-y-4">
          {/* First Name & Last Name Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium">نام</span>
              <p className="text-sm sm:text-base font-bold text-white">
                {activeUser.firstName}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium">نام خانوادگی</span>
              <p className="text-sm sm:text-base font-bold text-white">
                {activeUser.lastName}
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">آدرس ایمیل</span>
              <LuMail className="w-4 h-4 text-slate-400" />
            </div>
            <p dir="ltr" className="text-sm sm:text-base font-medium text-slate-200 text-right">
              {activeUser.email}
            </p>
          </div>

          {/* Role Status Pill */}
          <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <span>نوع کاربری:</span>
            <span className={`font-bold ${userIsAdmin ? "text-teal-400" : isInstructor(activeUser) ? "text-amber-400" : "text-slate-200"}`}>
              {getRoleLabel()}
            </span>
          </div>
        </div>
      ) : (
        /* --- EDIT MODE: Active Form --- */
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* First Name Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-slate-300">
              {t.ui.firstName}:
            </label>
            <div className="relative">
              <Input
                autoFocus
                {...register("firstName")}
                placeholder="مثال: علی"
                className="h-11 rounded-2xl bg-slate-900/90 border-white/20 text-white focus-visible:border-teal-400 focus-visible:ring-teal-400/30 text-sm"
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-400 font-medium pt-0.5">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-slate-300">
              {t.ui.lastName}:
            </label>
            <div className="relative">
              <Input
                {...register("lastName")}
                placeholder="مثال: احمدی"
                className="h-11 rounded-2xl bg-slate-900/90 border-white/20 text-white focus-visible:border-teal-400 focus-visible:ring-teal-400/30 text-sm"
              />
            </div>
            {errors.lastName && (
              <p className="text-xs text-red-400 font-medium pt-0.5">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-slate-300">
              {t.ui.email}:
            </label>
            <div className="relative">
              <Input
                dir="ltr"
                type="email"
                {...register("email")}
                placeholder="example@gmail.com"
                className="h-11 rounded-2xl bg-slate-900/90 border-white/20 text-white focus-visible:border-teal-400 focus-visible:ring-teal-400/30 text-sm text-left"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 font-medium pt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Button
              type="submit"
              variant="teal"
              size="lg"
              className="flex-1 font-bold gap-2 shadow-glow-teal"
              isLoading={isLoading}
            >
              <LuCheck className="w-4 h-4" />
              <span>{t.ui.save}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 font-semibold gap-2 border-white/20 hover:bg-white/10"
              onClick={handleCancelEditing}
              disabled={isLoading}
            >
              <LuX className="w-4 h-4" />
              <span>{t.ui.cancel}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
