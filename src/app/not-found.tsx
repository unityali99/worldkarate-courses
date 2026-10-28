"use client";

import React from "react";
import Link from "next/link";
import BackgroundImage from "@/layouts/BackgroundImage";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuHouse } from "react-icons/lu";
import { iranSans, lalezar } from "@/app/fonts";
import useLanguageStore from "@/stores/languageStore";
import { getLocaleConfig } from "@/lib/i18n/config";
import "@/app/globals.css";

/**
 * Root 404 boundary. It intentionally reads the locale from the client language
 * store rather than the request cookie: a 404 is not an indexable/SEO surface, so
 * using `cookies()` here would needlessly force every route without a closer
 * `not-found` (e.g. `/en`) into dynamic rendering and break their static prerender.
 */
export default function NotFound() {
  const { t, currentLanguage } = useLanguageStore();
  const cfg = getLocaleConfig(currentLanguage);
  const e = t.ui.errors;

  return (
    <html lang={cfg.hreflang} dir={cfg.dir} className="dark">
      <body
        className={`${iranSans.variable} ${lalezar.variable} font-sans min-h-screen flex flex-col bg-[#070c0e] text-white selection:bg-red-500 selection:text-white`}
      >
        <BackgroundImage image="/kyuna.webp">
          <div className="min-h-screen px-4 sm:px-6 pt-40 md:pt-52 pb-24 flex items-center justify-center">
            <div
              dir={cfg.dir}
              className="w-full max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-glass text-center space-y-6 text-white"
            >
              <span className="font-lalezar text-6xl md:text-8xl text-red-500 font-normal leading-none block">
                {e.errorCode}
              </span>

              <h1 className="font-lalezar text-3xl md:text-4xl text-white font-normal leading-tight">
                {e.notFoundTitle}
              </h1>

              <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed">
                {e.notFoundDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button
                    variant="teal"
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                  >
                    <span>{e.viewCourses}</span>
                    <LuArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                  >
                    <span>{t.ui.home}</span>
                    <LuHouse className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </body>
    </html>
  );
}
