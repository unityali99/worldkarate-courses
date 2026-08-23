"use client";

import React from "react";
import { FaWhatsapp, FaInstagram, FaTelegram } from "react-icons/fa";
import useLanguageStore from "@/stores/languageStore";

export default function Footer() {
  const { t, currentLanguage } = useLanguageStore();

  return (
    <footer
      dir={currentLanguage === "fa" ? "rtl" : "ltr"}
      className="w-full bg-slate-950/90 border-t border-white/10 text-white py-12 mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="font-lalezar text-xl text-teal-400 font-normal">
              {t.ui.footer.contactUs}
            </h4>
            <p className="text-sm text-slate-300/80">{t.ui.footer.address}</p>
            <p className="text-sm text-slate-300/80" dir="ltr">{t.ui.footer.phone}</p>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="font-lalezar text-lg text-white font-normal">
              {t.ui.footer.socialMedias}
            </h4>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://wa.me/989191257020"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://www.instagram.com/amiryarikata/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-400/50 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://t.me/Amiryarikata"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <FaTelegram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>{t.ui.footer.designer}</span>
            <span className="font-bold text-teal-400">{t.ui.footer.designerName}</span>
          </div>
          <p>
            {t.ui.footer.rights} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
