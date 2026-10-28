import React from "react";
import Link from "next/link";
import Image from "next/image";
import CourseActions from "@/components/CourseActions";
import PriceBadge from "@/components/PriceBadge";
import JsonLd from "@/components/seo/JsonLd";
import BackgroundImage from "@/layouts/BackgroundImage";
import { Badge } from "@/components/ui/badge";
import { getCourse } from "@/services/courseQuery";
import { getCourseImageSource } from "@/utils/courseImage";
import { lang, Language } from "@/lang";
import { getLocaleConfig, localizePath } from "@/lib/i18n/config";
import { breadcrumbSchema, courseSchema } from "@/lib/seo/schema";
import { LuArrowLeft, LuArrowRight, LuBookOpen } from "react-icons/lu";

/**
 * Shared course detail page body, rendered by both locale-split routes
 * (`/courses/[courseId]` and `/en/courses/[courseId]`). The route only decides
 * the locale; every label, direction and structured-data field follows it, so
 * the two URLs are separated but not duplicated.
 */
export default async function CourseDetailView({
  courseId,
  locale,
}: {
  courseId: string;
  locale: Language;
}) {
  const course = await getCourse(courseId);
  const t = lang[locale];
  const cd = t.ui.courseDetail;
  const isRtl = getLocaleConfig(locale).dir === "rtl";
  const imageSource = getCourseImageSource(course.img);
  const coursePath = `/courses/${course.id}`;
  const BackIcon = isRtl ? LuArrowLeft : LuArrowRight;

  return (
    <BackgroundImage image="/kyuna.webp">
      <JsonLd
        data={[
          courseSchema(locale, {
            title: course.title,
            description: course.description,
            price: course.price,
            image: imageSource,
            path: coursePath,
          }),
          breadcrumbSchema(locale, [
            { name: t.ui.home, path: "/" },
            { name: t.ui.courses, path: "/courses" },
            { name: course.title, path: coursePath },
          ]),
        ]}
      />

      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-44 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            href={localizePath(locale, "/courses")}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-full text-slate-200 bg-slate-900/60 border border-white/15 backdrop-blur-md text-sm font-medium transition-all hover:bg-slate-900/90 hover:border-white/30 hover:-translate-x-1"
          >
            <BackIcon className="w-4 h-4" />
            <span>{cd.backToCourses}</span>
          </Link>

          {/* Main Course Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 rounded-3xl overflow-hidden bg-slate-950/75 border border-white/15 backdrop-blur-xl shadow-glass">
            {/* Left/Top: Image & Glow */}
            <div className="relative h-[320px] sm:h-[420px] lg:h-auto min-h-[400px] overflow-hidden bg-slate-900">
              <Image
                aria-hidden="true"
                alt=""
                src={imageSource}
                unoptimized
                fill
                sizes="(max-width: 992px) 100vw, 600px"
                className="object-cover filter blur-2xl opacity-45 scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-slate-950/25 to-transparent z-10" />

              <div className="absolute inset-6 sm:inset-10 flex items-center justify-center z-20">
                <div className="relative w-full h-full max-h-[380px]">
                  <Image
                    alt={course.title}
                    src={imageSource}
                    unoptimized
                    fill
                    className="object-contain rounded-2xl drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
            </div>

            {/* Right/Bottom: Details & Action */}
            <div
              dir={isRtl ? "rtl" : "ltr"}
              className={`flex flex-col justify-between p-6 sm:p-10 text-white border-t lg:border-t-0 ${
                isRtl ? "lg:border-r" : "lg:border-l"
              } border-white/10`}
            >
              <div className="space-y-5">
                <Badge
                  variant="teal"
                  className="gap-2 py-1.5 px-4 text-xs font-semibold"
                >
                  <LuBookOpen className="w-4 h-4" />
                  <span>{cd.categoryBadge}</span>
                </Badge>

                <h1 className="font-lalezar text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                  {course.title}
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-loose text-justify font-light">
                  {course.description}
                </p>
              </div>

              <div className="space-y-6 mt-10 pt-6 border-t border-white/15">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400 text-sm font-bold">
                    {cd.priceLabel}
                  </span>
                  <PriceBadge price={course.price} locale={locale} />
                </div>

                <CourseActions course={course} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}
