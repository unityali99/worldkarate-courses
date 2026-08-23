import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseType } from "@/schemas/Course";
import { getCourseImageSource } from "@/utils/courseImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PriceBadge from "./PriceBadge";
import { LuArrowLeft, LuBookOpen } from "react-icons/lu";

interface CourseCardProps {
  course: CourseType;
}

export default function CourseCard({
  course: { id, description, img, title, price },
}: CourseCardProps) {
  const imageSource = getCourseImageSource(img);

  return (
    <div className="group relative flex flex-col md:flex-row w-full max-w-4xl min-h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-glass transition-all duration-300 hover:border-white/25 hover:bg-slate-950/85 hover:shadow-2xl">
      {/* Course Image & Ambient Glow Container */}
      <div className="relative w-full md:w-[42%] h-64 md:h-auto min-h-[260px] flex-shrink-0 overflow-hidden bg-slate-900">
        {/* Blurred Ambient Background Glow */}
        <Image
          aria-hidden="true"
          alt=""
          src={imageSource}
          unoptimized
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter blur-xl opacity-40 scale-125 transition-transform duration-700 group-hover:scale-135"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent z-10" />

        {/* Crisp Featured Image */}
        <div className="absolute inset-4 sm:inset-6 flex items-center justify-center z-20">
          <div className="relative w-full h-full max-h-48 sm:max-h-56">
            <Image
              alt={title}
              src={imageSource}
              unoptimized
              fill
              className="object-contain rounded-xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Floating Rank Badge */}
        <div className="absolute top-4 right-4 z-30">
          <Badge variant="teal" className="backdrop-blur-md">
            <LuBookOpen className="w-3.5 h-3.5 ml-1 text-teal-300" />
            <span>پکیج آموزشی</span>
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="flex flex-col justify-between flex-1 p-6 sm:p-8 text-right space-y-6"
        dir="rtl"
      >
        <div className="space-y-3">
          <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal leading-snug group-hover:text-red-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Footer: Price & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
          <PriceBadge price={price} />

          <Link href={`/courses/${id}`} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="default"
              className="w-full sm:w-auto gap-2 px-6 rounded-xl text-sm font-semibold"
            >
              <span>مشاهده دوره</span>
              <LuArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
