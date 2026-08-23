import React from "react";
import Link from "next/link";
import BackgroundImage from "@/layouts/BackgroundImage";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuHouse } from "react-icons/lu";

export default function NotFound() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-40 md:pt-52 pb-24 flex items-center justify-center">
        <div
          dir="rtl"
          className="w-full max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-glass text-center space-y-6 text-white"
        >
          <span className="font-lalezar text-6xl md:text-8xl text-red-500 font-normal leading-none block">
            ۴۰۴
          </span>

          <h1 className="font-lalezar text-3xl md:text-4xl text-white font-normal leading-tight">
            صفحه مورد نظر پیدا نشد
          </h1>

          <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed">
            ممکن است آدرس صفحه تغییر کرده باشد یا این دوره موقتا در دسترس نباشد.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="teal" size="lg" className="w-full sm:w-auto gap-2">
                <span>مشاهده دوره‌ها</span>
                <LuArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <span>صفحه اصلی</span>
                <LuHouse className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}
