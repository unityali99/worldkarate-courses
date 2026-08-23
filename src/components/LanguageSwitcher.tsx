"use client";

import React from "react";
import useLanguageStore from "@/stores/languageStore";

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "fa" ? "en" : "fa";
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-300 font-sans">
        {currentLanguage === "fa" ? "فا" : "En"}
      </span>
      <button
        type="button"
        onClick={toggleLanguage}
        className="px-3 py-1 text-xs font-bold font-sans rounded-full text-white border border-white/30 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/10 hover:-translate-y-0.5 active:bg-white/20"
      >
        {currentLanguage === "fa" ? "English" : "فارسی"}
      </button>
    </div>
  );
}
