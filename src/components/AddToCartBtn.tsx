"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useCart from "@/stores/cartStore";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { LuCheck, LuShoppingBag } from "react-icons/lu";

const apiClient = new ApiClient<CourseType[]>("/user/fetch-course");

export default function AddToCartBtn({ course }: { course: CourseType }) {
  const { add } = useCart();
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";
  const profileHref = isRtl ? "/profile" : "/en/profile";
  const [hydrated, setHydrated] = useState(false);
  const [userCourses, setUserCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    apiClient
      .get()
      .then((res) => setUserCourses(res.data))
      .catch((error) =>
        toast.error(getErrorMessage(error, "خطا در دریافت دوره‌های کاربر"))
      )
      .finally(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return (
      <Button variant="primary" size="lg" isLoading className="w-full">
        {t.ui.checkingStatus}
      </Button>
    );
  }

  const isAlreadyPurchased = user && userCourses.some((c) => c.id === course.id);

  if (isAlreadyPurchased) {
    return (
      <div className="space-y-4 w-full" dir={isRtl ? "rtl" : "ltr"}>
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-200 text-sm font-medium">
          <LuCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span>{t.ui.alreadyPurchasedNotice}</span>
        </div>
        <Link href={profileHref} className="block w-full">
          <Button variant="teal" size="lg" className="w-full font-bold">
            {t.ui.viewInProfile}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => add(course)}
      className="w-full gap-2 font-bold shadow-glow-crimson"
    >
      <LuShoppingBag className="w-5 h-5 ml-1" />
      <span>{t.ui.addToCart}</span>
    </Button>
  );
}
