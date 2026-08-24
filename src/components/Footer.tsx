"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaTelegram } from "react-icons/fa";
import useLanguageStore from "@/stores/languageStore";
import NewsLetterForm from "@/components/Form/NewsLetterForm";

const toPersianDigits = (str: string) =>
  str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export default function Footer() {
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";

  const displayPhone = isRtl
    ? toPersianDigits(t.ui.footer.phone)
    : t.ui.footer.phone;

  const displayAddress = isRtl
    ? toPersianDigits(t.ui.footer.address)
    : t.ui.footer.address;

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className="relative z-30 w-full bg-slate-950/95 border-t border-white/10 text-white pt-14 pb-8 mt-auto backdrop-blur-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.65)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start text-right">
          {/* ========================================================= */}
          {/* 1. Brand & Contact (md: 4 cols)                          */}
          {/* ========================================================= */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Academy Logo"
                  fill
                  className="object-contain drop-shadow-md"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-lalezar text-2xl sm:text-3xl text-teal-400 font-normal leading-tight">
                  سنسی امیر یاری
                </h4>
                <p className="text-xs text-slate-400 font-light">
                  آکادمی تخصصی کاراته و کاتا
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-sm text-slate-300/90 leading-relaxed font-light">
              <p>{displayAddress}</p>
              <div className="pt-1">
                <span className="text-slate-200 font-normal">
                  {displayPhone}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. Social Channels (md: 3 cols)                          */}
          {/* ========================================================= */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-lalezar text-xl text-white font-normal">
              {t.ui.footer.socialMedias}
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              ارتباط مستقیم و مشاهده ویدیوهای روزانه:
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/amiryarikata/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-950/30 transition-all text-xs font-semibold text-slate-300 hover:text-white"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaInstagram size={15} />
                </div>
                <span>صفحه اینستاگرام</span>
              </a>

              <a
                href="https://t.me/Amiryarikata"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all text-xs font-semibold text-slate-300 hover:text-white"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaTelegram size={15} />
                </div>
                <span>کانال تلگرام</span>
              </a>

              <a
                href="https://wa.me/989191257020"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 transition-all text-xs font-semibold text-slate-300 hover:text-white"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaWhatsapp size={15} />
                </div>
                <span>پشتیبانی واتساپ</span>
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. Newsletter Box (md: 5 cols)                           */}
          {/* ========================================================= */}
          <div className="md:col-span-5 space-y-3 p-6 rounded-3xl bg-slate-900/60 border border-white/10 shadow-inner">
            <h4 className="font-lalezar text-xl text-white font-normal">
              عضویت در خبرنامه آکادمی
            </h4>
            <p className="text-xs text-slate-300/80 font-light leading-relaxed">
              با عضویت در خبرنامه، از تخفیف‌های ویژه دوره‌ها، رویدادها و آپدیت‌های تکنیک‌ها مطلع شوید.
            </p>
            <div className="pt-2 w-full">
              <NewsLetterForm buttonText="عضویت در خبرنامه" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Bar: Designer & Copyright                          */}
        {/* ========================================================= */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>{t.ui.footer.designer}</span>
            <span className="font-bold text-teal-400">{t.ui.footer.designerName}</span>
          </div>
          <p>
            {t.ui.footer.rights} © {isRtl ? toPersianDigits(new Date().getFullYear().toString()) : new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
