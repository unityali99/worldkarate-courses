"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddToCartBtn from "@/components/AddToCartBtn";
import DeleteBtn from "@/components/DeleteBtn";
import { CourseType } from "@/schemas/Course";
import useAuth from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/utils/authHelpers";
import { LuPlus } from "react-icons/lu";

export default function CourseActions({ course }: { course: CourseType }) {
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="w-full h-12 rounded-2xl bg-white/5 animate-pulse" />
    );
  }

  if (isAdmin(user)) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <DeleteBtn text="حذف دوره" courseId={String(course.id)} />
        <Link href="/profile/admin" className="w-full">
          <Button variant="teal" size="lg" className="w-full gap-2 font-bold">
            <LuPlus className="w-5 h-5 ml-1" />
            <span>ایجاد دوره جدید</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AddToCartBtn course={course} />
    </div>
  );
}
