"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { LuBookOpen, LuInstagram, LuLogOut } from "react-icons/lu";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguageStore();
  const path = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasTransparentHero =
    path === "/" || path === "/profile" || path.startsWith("/courses");
  const shouldShowBackground = isScrolled || !hasTransparentHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-3 md:py-4 px-4 sm:px-6 ${
        shouldShowBackground
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-glass"
          : "bg-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="relative block w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
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
              href="/courses"
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

        {/* Right Side: Auth / Cart / Profile Links */}
        <div className="hidden md:flex items-center gap-4">
          <Cart />
          <LanguageSwitcher />

          {hydrated && user ? (
            <div className="flex items-center gap-3">
              <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
              <button
                type="button"
                onClick={logout}
                title="خروج از حساب"
                className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 hover:bg-red-900/80 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <LuLogOut size={18} />
              </button>
            </div>
          ) : hydrated && !user ? (
            <Link href="/auth/login">
              <Button variant="primary" size="default" className="px-5 font-bold shadow-glow-crimson">
                {t.ui.login + " / " + t.ui.register}
              </Button>
            </Link>
          ) : (
            <div className="w-24 h-10 rounded-full bg-white/5 animate-pulse" />
          )}
        </div>

        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <BurgerMenu hydrated={hydrated} />
        </div>
      </div>
    </header>
  );
}
