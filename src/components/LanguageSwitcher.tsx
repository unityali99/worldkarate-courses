"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import useLanguageStore from "@/stores/languageStore";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { setLanguage, t } = useLanguageStore();

  const isEnglish = pathname.startsWith("/en");

  const toggleLanguage = () => {
    if (isEnglish) {
      setLanguage("fa");
      const targetPath = pathname.replace(/^\/en(\/|$)/, "$1") || "/";
      router.push(targetPath);
    } else {
      setLanguage("en");
      const targetPath = pathname === "/" ? "/en" : `/en${pathname}`;
      router.push(targetPath);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-300 font-sans">
        {t.ui.langCode}
      </span>
      <button
        type="button"
        onClick={toggleLanguage}
        className="px-3 py-1 text-xs font-bold font-sans rounded-full text-white border border-white/30 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/10 hover:-translate-y-0.5 active:bg-white/20"
      >
        {t.ui.switchLang}
      </button>
    </div>
  );
}
