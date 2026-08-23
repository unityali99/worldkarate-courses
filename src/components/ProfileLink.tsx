import React from "react";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

export default function ProfileLink({ fullName }: { fullName: string }) {
  return (
    <Link
      href="/profile"
      aria-label={`Open profile for ${fullName}`}
      className="group flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-200 hover:border-teal-400/50 hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-white flex items-center justify-center shadow-[0_0_12px_rgba(20,184,166,0.5)] flex-shrink-0">
        <LuUser className="w-4 h-4" />
      </div>
      <div className="flex flex-col text-right leading-tight min-w-0 pr-1" dir="rtl">
        <span className="text-[10px] text-slate-400">حساب کاربری</span>
        <span className="text-xs font-bold text-white max-w-[130px] truncate">
          {fullName}
        </span>
      </div>
    </Link>
  );
}
