"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useCart from "@/stores/cartStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { LuCheck, LuShoppingBag } from "react-icons/lu";

const apiClient = new ApiClient<CourseType[]>("/user/fetch-course");

export default function AddToCartBtn({ course }: { course: CourseType }) {
  const { add } = useCart();
  const { user } = useAuth();
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
        در حال بررسی وضعیت...
      </Button>
    );
  }

  const isAlreadyPurchased = user && userCourses.some((c) => c.id === course.id);

  if (isAlreadyPurchased) {
    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-200 text-sm font-medium">
          <LuCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span>شما این دوره را قبلا خریداری نموده‌اید.</span>
        </div>
        <Link href="/profile" className="block w-full">
          <Button variant="teal" size="lg" className="w-full font-bold">
            مشاهده دوره در پروفایل
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
      <span>افزودن به سبد خرید</span>
    </Button>
  );
}
