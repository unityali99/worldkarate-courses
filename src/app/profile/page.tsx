import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import UserCourses from "@/components/UserCourses";
import BackgroundImage from "@/layouts/BackgroundImage";
import UserType from "@/schemas/UserType";
import { cookieKey } from "@/constants/auth";
import decodeJwt from "@/utils/jwtDecode";
import { LuShieldCheck, LuUser } from "react-icons/lu";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieKey)?.value;
  if (!token || token?.length === 0) return redirect("/auth/login");

  const decodedToken = decodeJwt(token!);
  const { isAdmin, firstName, lastName, email }: UserType = decodedToken;

  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-48 pb-24">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* User Hero Badge */}
          <div
            dir="rtl"
            className="flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-xl shadow-glass text-white"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
              <LuUser className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1 min-w-0 w-full text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="font-lalezar text-3xl sm:text-4xl text-white font-normal">
                  {firstName} {lastName}
                </h1>
                {isAdmin && (
                  <LuShieldCheck className="w-6 h-6 text-teal-400" title="مدیر سیستم" />
                )}
              </div>
              <p dir="ltr" className="text-slate-400 text-sm md:text-base font-light text-center sm:text-right truncate">
                {email}
              </p>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <ProfileForm isAdmin={isAdmin} />
            <ChangePasswordForm />
          </div>

          {/* User Enrolled Courses */}
          {!isAdmin && (
            <div className="pt-2">
              <UserCourses />
            </div>
          )}
        </div>
      </div>
    </BackgroundImage>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
