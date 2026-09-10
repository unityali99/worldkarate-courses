"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/stores/authStore";
import useCart from "@/stores/cartStore";
import useLanguageStore from "@/stores/languageStore";
import { lang, Language } from "@/lang";
import {
  LuBookOpen,
  LuInstagram,
  LuUser,
  LuLogIn,
} from "react-icons/lu";
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { FaShoppingBasket } from "react-icons/fa";

export default function MobileBottomNav({ locale }: { locale?: Language }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { courses, setIsOpen, hydrated: cartHydrated, setHydrated: setCartHydrated } = useCart();
  const { t: storeT, currentLanguage } = useLanguageStore();
  const activeLang = locale || currentLanguage || "fa";
  const t = locale ? lang[locale] : storeT;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCartHydrated();
  }, [setCartHydrated]);

  const isRtl = activeLang === "fa";
  const isEnglish = locale ? locale === "en" : pathname.startsWith("/en");

  const homePath = isEnglish ? "/en" : "/";
  const coursesPath = isEnglish ? "/en/courses" : "/courses";
  const profilePath = isEnglish ? "/en/profile" : "/profile";
  const authPath = isEnglish ? "/en/auth/login" : "/auth/login";

  const isHome = pathname === "/" || pathname === "/en";
  const isCourses = pathname.startsWith("/courses") || pathname.startsWith("/en/courses");
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/en/auth");
  const isProfile = pathname.startsWith("/profile") || pathname.startsWith("/en/profile");

  return (
    <nav
      dir={isRtl ? "rtl" : "ltr"}
      aria-label="Mobile Navigation"
      className="fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 md:hidden"
    >
      <div className="relative bg-slate-950/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.75)]">
        {/* Subtle Ambient Glow inside dock */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/5 via-teal-500/5 to-pink-500/5 pointer-events-none" />

        <div className="relative grid grid-cols-5 items-center">
          {/* 1. Home */}
          <Link
            href={homePath}
            aria-label={t.ui.home}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
              isHome
                ? "text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isHome ? (
              <IoHome className="w-5 h-5 text-red-400" />
            ) : (
              <IoHomeOutline className="w-5 h-5" />
            )}
            <span className="text-[11px] mt-1 truncate leading-tight font-medium">
              {t.ui.home}
            </span>
          </Link>

          {/* 2. Courses (Highlighted / Primary Product) */}
          <Link
            href={coursesPath}
            aria-label={t.ui.courses}
            className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
              isCourses
                ? "text-white bg-teal-500/15 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.3)] font-bold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <LuBookOpen
              className={`w-5 h-5 transition-colors ${
                isCourses ? "text-teal-300" : "text-teal-400/90"
              }`}
            />
            <span className="text-[11px] mt-1 truncate leading-tight font-semibold">
              {t.ui.courses}
            </span>
            {/* Active Indicator Dot */}
            {isCourses && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-400 animate-pulse" />
            )}
          </Link>

          {/* 3. Cart with Badge */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={t.ui.cart}
            className="relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 text-slate-400 hover:text-slate-200 active:scale-95"
          >
            <div className="relative">
              <FaShoppingBasket className="w-5 h-5" />
              {mounted && cartHydrated && courses.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-gradient-to-r from-red-600 to-crimson text-white text-[10px] font-black flex items-center justify-center shadow-glow-crimson border border-slate-950 animate-in zoom-in-50 duration-200">
                  {courses.length}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-1 truncate leading-tight font-medium">
              {t.ui.cart}
            </span>
          </button>

          {/* 4. Instagram */}
          <a
            href="https://www.instagram.com/amiryarikata/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label={t.ui.instagram}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 text-slate-400 hover:text-pink-400 active:scale-95 group"
          >
            <LuInstagram className="w-5 h-5 text-pink-400/90 group-hover:text-pink-400 transition-colors" />
            <span className="text-[11px] mt-1 truncate leading-tight font-medium">
              {t.ui.instagram}
            </span>
          </a>

          {/* 5. Account / Login */}
          {mounted && user ? (
            <Link
              href={profilePath}
              aria-label={t.ui.profile}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
                isProfile
                  ? "text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LuUser className={`w-5 h-5 ${isProfile ? "text-teal-300" : ""}`} />
              <span className="text-[11px] mt-1 truncate leading-tight font-medium">
                {t.ui.profile}
              </span>
            </Link>
          ) : (
            <Link
              href={authPath}
              aria-label={t.ui.login}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
                isAuth
                  ? "text-white bg-red-600/20 border border-red-500/40 shadow-glow-crimson font-bold"
                  : "text-slate-400 hover:text-red-300"
              }`}
            >
              <LuLogIn className={`w-5 h-5 ${isAuth ? "text-red-400" : ""}`} />
              <span className="text-[11px] mt-1 truncate leading-tight font-medium">
                {t.ui.login}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
