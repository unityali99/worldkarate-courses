import React from "react";
import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { fetchCoursesWithRetry } from "@/services/courseService";
import { Badge } from "@/components/ui/badge";
import { LuGraduationCap, LuSparkles } from "react-icons/lu";
import { lang, Language } from "@/lang";

export default async function CoursesPageView({
  locale = "fa",
}: {
  locale?: Language;
}) {
  const t = lang[locale];
  const isRtl = locale === "fa";
  const courses = await fetchCoursesWithRetry();

  return (
    <BackgroundImage image="/kyuna.webp">
      {/* Hero Header Section */}
      <div className="w-full pt-36 sm:pt-44 pb-14 px-4">
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="w-full max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 text-center text-white border border-white/15 bg-slate-950/60 backdrop-blur-xl shadow-glass"
        >
          <Badge variant="crimson" className="mb-4 text-xs font-semibold">
            {t.ui.coursesPage.badge}
          </Badge>
          <h1 className="font-lalezar text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 leading-tight tracking-wide">
            {t.ui.coursesPage.instructorTitle}
          </h1>
          <p className="text-lg sm:text-xl font-light text-slate-200 mb-3">
            {t.ui.coursesPage.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
            {t.ui.coursesPage.newsletterDesc}
          </p>

          <div className="flex items-center justify-center">
            <NewsLetterForm buttonText={t.ui.coursesPage.newsletterBtn} />
          </div>
        </div>
      </div>

      {/* Courses Catalog Section */}
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-28">
        {courses.length === 0 ? (
          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950/75 border border-white/15 shadow-glass backdrop-blur-xl text-center space-y-5"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(20,184,166,0.2)]">
              <LuGraduationCap className="w-8 h-8" />
            </div>

            <Badge variant="teal" className="gap-1.5 py-1 px-4">
              <LuSparkles className="w-3.5 h-3.5" />
              <span>{t.ui.coursesPage.emptyBadge}</span>
            </Badge>

            <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal leading-snug">
              {t.ui.coursesPage.emptyTitle}
            </h3>

            <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              {t.ui.coursesPage.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 w-full">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </BackgroundImage>
  );
}
