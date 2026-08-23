import React from "react";
import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { fetchCoursesWithRetry } from "@/services/courseService";
import { Badge } from "@/components/ui/badge";
import { LuGraduationCap, LuSparkles } from "react-icons/lu";

export default function CoursesPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      {/* Hero Header Section */}
      <div className="w-full pt-36 sm:pt-44 pb-14 px-4">
        <div className="w-full max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 text-center text-white border border-white/15 bg-slate-950/60 backdrop-blur-xl shadow-glass">
          <Badge variant="crimson" className="mb-4 text-xs font-semibold">
            دوجو آنلاین کاراته
          </Badge>
          <h1 className="font-lalezar text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 leading-tight tracking-wide">
            سنسی امیر یاری
          </h1>
          <p className="text-lg sm:text-xl font-light text-slate-200 mb-3">
            پکیج‌های آموزش تخصصی کاتا و تکنیک‌های کاراته
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed" dir="rtl">
            برای اطلاع از انتشار دوره‌های جدید و تخفیف‌های ویژه، ایمیل خود را در کادر زیر ثبت کنید.
          </p>

          <div className="flex items-center justify-center">
            <NewsLetterForm />
          </div>
        </div>
      </div>

      {/* Courses Catalog Section */}
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-28">
        <CoursesList />
      </div>
    </BackgroundImage>
  );
}

async function CoursesList() {
  const courses = await fetchCoursesWithRetry();

  if (courses.length === 0) {
    return (
      <div
        dir="rtl"
        className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950/75 border border-white/15 shadow-glass backdrop-blur-xl text-center space-y-5"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(20,184,166,0.2)]">
          <LuGraduationCap className="w-8 h-8" />
        </div>

        <Badge variant="teal" className="gap-1.5 py-1 px-4">
          <LuSparkles className="w-3.5 h-3.5" />
          <span>در حال آماده‌سازی</span>
        </Badge>

        <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal leading-snug">
          در حال حاضر دوره‌ای منتشر نشده است
        </h3>

        <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          پکیج‌های ویدیویی جدید آموزش تکنیک‌ها و کاتاهای کاراته به زودی در این بخش قرار خواهند گرفت.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export const dynamic = "force-static";
export const revalidate = 21600;
