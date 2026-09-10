import React from "react";
import useLanguageStore from "@/stores/languageStore";

interface PriceBadgeProps {
  price: number;
  className?: string;
}

export default function PriceBadge({ price, className = "" }: PriceBadgeProps) {
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`inline-flex items-baseline gap-1.5 px-4 py-2 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-200 shadow-[0_0_15px_rgba(20,184,166,0.15)] ${className}`}
    >
      <span className="font-lalezar text-2xl font-normal leading-none tracking-wide text-white">
        {price.toLocaleString(isRtl ? "fa-IR" : "en-US")}
      </span>
      <span className="text-xs font-bold text-teal-300/80">{t.ui.currency}</span>
    </div>
  );
}
