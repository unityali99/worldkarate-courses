"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLanguageStore from "@/stores/languageStore";
import { LuUser } from "react-icons/lu";

export default function ProfileLink({ fullName }: { fullName: string }) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";

  return (
    <Link
      href={isEnglish ? "/en/profile" : "/profile"}
      aria-label={`${t.ui.openProfile}: ${fullName}`}
      className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-xl shadow-glass transition-all duration-200 hover:border-teal-400/60 hover:bg-slate-900/95 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-white flex items-center justify-center shadow-[0_0_12px_rgba(20,184,166,0.5)] flex-shrink-0">
        <LuUser className="w-4 h-4" />
      </div>
      <div
        className={`flex flex-col ${isRtl ? "text-right pr-0.5" : "text-left pl-0.5"} leading-tight min-w-0`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <span className="text-[11px] font-semibold text-teal-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {t.ui.account}
        </span>
        <span className="text-xs font-bold text-white max-w-[130px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {fullName}
        </span>
      </div>
    </Link>
  );
}
