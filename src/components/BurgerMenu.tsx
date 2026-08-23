"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import {
  LuMenu,
  LuUser,
  LuLock,
  LuInstagram,
  LuLogOut,
  LuBookOpen,
  LuX,
} from "react-icons/lu";
import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";

export default function BurgerMenu({ hydrated }: { hydrated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguageStore();
  const router = useRouter();

  if (!hydrated) return null;

  return (
    <div className="flex items-center gap-3">
      <Cart />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all hover:bg-white/20 active:scale-95"
      >
        {isOpen ? <LuX size={22} /> : <LuMenu size={22} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          dir="rtl"
          className="absolute top-full left-4 right-4 mt-2 p-5 rounded-3xl bg-slate-950/95 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {user ? (
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-all text-sm font-bold text-white"
            >
              <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <LuUser size={18} />
              </div>
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-red-600 to-crimson text-white transition-all text-sm font-bold shadow-glow-crimson"
            >
              <LuLock size={18} />
              <span>{t.ui.login + " / " + t.ui.register}</span>
            </Link>
          )}

          <div className="pt-2 space-y-1">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-slate-200 text-sm font-semibold transition-all"
            >
              <LuBookOpen size={18} className="text-teal-400" />
              <span>{t.ui.courses}</span>
            </Link>

            <a
              href="https://www.instagram.com/amiryarikata/?hl=en"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-slate-200 text-sm font-semibold transition-all"
            >
              <LuInstagram size={18} className="text-pink-400" />
              <span>{t.ui.instagram}</span>
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <LanguageSwitcher />

            {user && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  router.push("/");
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-red-400 hover:bg-red-950/50 text-xs font-bold transition-all"
              >
                <LuLogOut size={16} />
                <span>{t.ui.logout}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
