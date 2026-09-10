"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import BackgroundImage from "@/layouts/BackgroundImage";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuRefreshCw } from "react-icons/lu";

export default function CourseDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Course details error:", error);
  }, [error]);

  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-48 pb-24 flex items-center justify-center">
        <div
          dir="rtl"
          className="w-full max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-glass text-center space-y-6 text-white"
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.2)]">
            <LuRefreshCw className="w-8 h-8" />
          </div>

          <h1 className="font-lalezar text-3xl md:text-4xl text-white font-normal leading-tight">
            دوره بارگذاری نشد
          </h1>

          <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed">
            ممکن است ارتباط با سرور موقتا قطع شده باشد. لطفا چند لحظه دیگر دوباره تلاش کنید.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="teal"
              size="lg"
              className="w-full sm:w-auto gap-2"
              onClick={reset}
            >
              <span>تلاش دوباره</span>
              <LuRefreshCw className="w-4 h-4" />
            </Button>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <span>بازگشت به دوره‌ها</span>
                <LuArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}
