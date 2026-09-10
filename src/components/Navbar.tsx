"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { lang, Language } from "@/lang";
import { Button } from "@/components/ui/button";
import ProfileLink from "./ProfileLink";
import Cart, { CartDrawer } from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { LuBookOpen, LuInstagram, LuLogOut } from "react-icons/lu";

export default function Navbar({ locale }: { locale?: Language }) {
  const pathname = usePathname();
  const isEnglish = locale ? locale === "en" : pathname.startsWith("/en");

  const { user, logout } = useAuth();
  const { t: storeT } = useLanguageStore();
  const t = locale ? lang[locale] : storeT;
  const [hydrated, setHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const homeHref = isEnglish ? "/en" : "/";
  const coursesHref = isEnglish ? "/en/courses" : "/courses";
  const loginHref = isEnglish ? "/en/auth/login" : "/auth/login";

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full py-3 md:py-4 px-4 sm:px-6 transition-colors duration-300"
      suppressHydrationWarning
    >
      {/* GPU-Accelerated Hardware Background Layer */}
      <div
        className={`absolute inset-0 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-opacity duration-300 pointer-events-none ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href={homeHref} className="relative block w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
            <Image
              priority
              alt="Logo"
              fill
              className="object-contain drop-shadow-md"
              src="/logo.webp"
              unoptimized
            />
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/amiryarikata/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-pink-400 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-pink-600 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                <LuInstagram size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                {t.ui.instagram}
              </span>
            </a>

            {/* Courses Link */}
            <Link
              href={coursesHref}
              aria-label={t.ui.courses}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-teal-400 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-600 flex items-center justify-center shadow-[0_0_12px_rgba(20,184,166,0.5)]">
                <LuBookOpen size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                {t.ui.courses}
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Side Desktop: Auth / Cart / Profile Links */}
        <div className="hidden md:flex items-center gap-4">
          <Cart showDrawer={false} />
          <LanguageSwitcher />

          {hydrated && user ? (
            <div className="flex items-center gap-3">
              <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
              <button
                type="button"
                onClick={logout}
                title={t.ui.logoutTitle}
                className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 hover:bg-red-900/80 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <LuLogOut size={18} />
              </button>
            </div>
          ) : hydrated && !user ? (
            <Link href={loginHref}>
              <Button variant="primary" size="default" className="px-5 font-bold shadow-glow-crimson">
                {t.ui.loginRegister}
              </Button>
            </Link>
          ) : (
            <div className="w-24 h-10 rounded-full bg-white/5 animate-pulse" />
          )}
        </div>

        {/* Right Side Mobile: Directly Visible Language Switcher & Quick Logout */}
        <div className="flex md:hidden items-center gap-2.5">
          <LanguageSwitcher />

          {hydrated && user && (
            <button
              type="button"
              onClick={logout}
              title={t.ui.logoutTitle}
              className="w-9 h-9 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 hover:bg-red-900/80 hover:text-white flex items-center justify-center transition-all active:scale-95"
            >
              <LuLogOut size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Synchronized Global Cart Drawer */}
      <CartDrawer />
    </header>
  );
}
