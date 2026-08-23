"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CreateCourseType } from "@/schemas/CreateCourse";
import ApiClient from "@/services/ApiClient";
import { getExternalUrl } from "@/utils/externalUrl";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import Placeholder from "./Placeholder";
import { toast } from "react-toastify";
import { LuBookOpen, LuExternalLink } from "react-icons/lu";

export default function UserCourses({ email }: { email?: string }) {
  const [hydrated, setHydrated] = useState(false);
  const [courses, setCourses] = useState<CreateCourseType[]>([]);

  useEffect(() => {
    const endpoint = email
      ? `/admin/fetch-course/${email}`
      : "/user/fetch-course";
    const apiClient = new ApiClient<CreateCourseType[]>(endpoint);
    apiClient
      .get()
      .then((res) => setCourses(res.data))
      .catch((error) =>
        toast.error(getErrorMessage(error, "خطا در دریافت دوره‌ها"))
      )
      .finally(() => setHydrated(true));
  }, [email]);

  return (
    <div className="w-full">
      <div
        dir="rtl"
        className="space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-xl shadow-glass text-white"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
            <LuBookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-lalezar text-2xl text-white font-normal">
              دوره‌های خریداری شده
            </h3>
            <p className="text-slate-400 text-xs font-normal">
              دسترسی سریع به محتوای آموزشی شما
            </p>
          </div>
        </div>

        {/* Content */}
        {!hydrated ? (
          <div className="space-y-4">
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
            <p className="text-slate-400 text-sm">دوره‌ای خریداری نشده است.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course, index) => (
              <div
                key={`${course.title}-${index}`}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-400/40 hover:bg-white/10 transition-all"
              >
                <span className="font-semibold text-slate-100 text-sm sm:text-base">
                  {course.title}
                </span>

                {getExternalUrl(course.link) ? (
                  <a
                    href={getExternalUrl(course.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="teal" size="sm" className="w-full sm:w-auto gap-2">
                      <span>مشاهده دوره</span>
                      <LuExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" disabled className="w-full sm:w-auto text-xs">
                    لینک موجود نیست
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link href="/courses" className="block w-full">
            <Button variant="outline" size="lg" className="w-full font-bold">
              مشاهده همه دوره‌ها
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
