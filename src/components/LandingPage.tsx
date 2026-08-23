"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import useLanguageStore from "@/stores/languageStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuArrowRight,
  LuArrowLeft,
  LuShield,
  LuTarget,
  LuAward,
  LuSparkles,
} from "react-icons/lu";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";
  const ArrowIcon = isRtl ? LuArrowLeft : LuArrowRight;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-[#070c0e] text-slate-100 selection:bg-red-500 selection:text-white overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH AMBIENT LIGHT & PARALLAX GLOW                        */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transform transition-transform duration-1000"
          style={{ backgroundImage: "url('/navbar.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-[#070c0e] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12)_0%,transparent_70%)] z-10" />
        </div>

        {/* Ambient Floating Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 max-w-4xl mx-auto py-28 sm:py-36">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6"
          >
            <Badge
              variant="crimson"
              className="py-1.5 px-5 text-xs font-bold uppercase tracking-widest gap-2 shadow-[0_0_20px_rgba(220,38,38,0.35)]"
            >
              <LuSparkles className="w-3.5 h-3.5" />
              <span>آکادمی بین‌المللی کاتا و کاراته</span>
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-lalezar text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-tight tracking-wide drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            >
              {t.ui.landing.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto drop-shadow"
            >
              {t.ui.landing.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4"
            >
              <Link href="/courses">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-3 px-10 py-5 text-base sm:text-lg font-bold rounded-2xl shadow-glow-crimson hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all hover:scale-105"
                >
                  <span>{t.ui.landing.ctaButton}</span>
                  <ArrowIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PILLARS / FEATURES WITH GEOMETRIC PATTERN & CARD NEON ACCENTS          */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#091014] border-t border-b border-white/10 overflow-hidden">
        {/* Subtle Dojo Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #091014 1px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        {/* Ambient Section Glows */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* 1. Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group p-8 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl hover:border-teal-400/40 hover:bg-slate-900/90 transition-all duration-300 shadow-glass overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
              <div className="w-16 h-16 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(20,184,166,0.25)] group-hover:scale-110 transition-transform">
                <LuAward className="w-8 h-8" />
              </div>
              <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal mb-3">
                {t.ui.landing.experience}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                {t.ui.landing.experienceDesc}
              </p>
            </motion.div>

            {/* 2. Target Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group p-8 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl hover:border-red-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-glass overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all" />
              <div className="w-16 h-16 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(239,68,68,0.25)] group-hover:scale-110 transition-transform">
                <LuTarget className="w-8 h-8" />
              </div>
              <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal mb-3">
                {t.ui.landing.training}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                {t.ui.landing.trainingDesc}
              </p>
            </motion.div>

            {/* 3. Shield Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group p-8 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-glass overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(245,158,11,0.25)] group-hover:scale-110 transition-transform">
                <LuShield className="w-8 h-8" />
              </div>
              <h3 className="font-lalezar text-2xl sm:text-3xl text-white font-normal mb-3">
                {t.ui.landing.environment}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                {t.ui.landing.environmentDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT SENSEI ROW WITH SPOTLIGHT NEBULA BACKGROUND                      */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#091014] via-[#0b1419] to-[#070c0e] overflow-hidden">
        {/* Soft Radial Spotlight behind Sensei */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Sensei Portrait with Luminous Frame */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 h-[380px] sm:h-[480px] lg:h-[540px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-70" />
              <Image
                src="/sensei.webp"
                alt="Sensei Amir Yari"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </motion.div>

            {/* Sensei Story Text */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-right space-y-6"
            >
              <Badge variant="teal" className="py-1 px-3 text-xs font-semibold">
                درباره استاد امیر یاری
              </Badge>

              <h2 className="font-lalezar text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                {t.ui.landing.aboutTitle}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-loose text-justify font-light">
                {t.ui.landing.aboutDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/courses">
                  <Button variant="primary" size="lg" className="font-bold shadow-glow-crimson">
                    {t.ui.landing.learnMore}
                  </Button>
                </Link>
                <Link href="/profile/admin">
                  <Button variant="outline" size="lg">
                    {t.ui.landing.meetSensei}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. METHODOLOGY ROW WITH CYAN AMBIENT MESH & HIGHLIGHT CHIPS                */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-32 bg-[#081116] border-t border-b border-white/10 overflow-hidden">
        {/* Subtle Cyan Mesh Gradient */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-950/25 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Methodology Text */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-right space-y-6"
            >
              <Badge variant="teal" className="py-1 px-3 text-xs font-semibold">
                متدولوژی و اصول تمرین
              </Badge>

              <h2 className="font-lalezar text-3xl sm:text-4xl lg:text-5xl text-teal-300 font-normal leading-tight">
                {t.ui.landing.methodologyTitle}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-loose text-justify font-light">
                {t.ui.landing.methodologyDesc}
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center flex-shrink-0">
                    <LuTarget className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{t.ui.landing.structuredApproach}</span>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center flex-shrink-0">
                    <LuTarget className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{t.ui.landing.progressiveSkill}</span>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center flex-shrink-0">
                    <LuTarget className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{t.ui.landing.traditionalModern}</span>
                </div>
              </div>
            </motion.div>

            {/* Methodology Image with Floating Glow Card */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950/80 h-[340px] sm:h-[440px] flex items-center justify-center p-8 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 to-transparent opacity-60 pointer-events-none" />
              <Image
                src="/product-1.webp"
                alt="Karate Methodology"
                fill
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LEGACY ROW WITH WARM GOLDEN MASTERCLASS BACKGROUND                      */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#070c0e] via-[#0f1412] to-[#070c0e] overflow-hidden">
        {/* Soft Golden Ambient Nebula */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] bg-amber-950/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Legacy Image Showcase */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 bg-slate-950/80 h-[340px] sm:h-[440px] flex items-center justify-center p-8 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent opacity-60 pointer-events-none" />
              <Image
                src="/product-3.webp"
                alt="Legacy"
                fill
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </motion.div>

            {/* Legacy Text */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-right space-y-6"
            >
              <Badge variant="gold" className="py-1 px-3 text-xs font-semibold">
                افتخارات و تاریخچه قهرمانی
              </Badge>

              <h2 className="font-lalezar text-3xl sm:text-4xl lg:text-5xl text-amber-400 font-normal leading-tight">
                {t.ui.landing.legacyTitle}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-loose text-justify font-light">
                {t.ui.landing.legacyDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/courses">
                  <Button variant="gold" size="lg" className="font-bold shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                    {t.ui.landing.exploreHistory}
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" size="lg">
                    {t.ui.landing.viewAchievements}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. READY TO BEGIN CTA WITH CRIMSON PULSE FLARE                            */}
      {/* ========================================================================= */}
      <section className="relative py-28 bg-gradient-to-b from-[#070c0e] via-red-950/40 to-[#070c0e] border-t border-white/10 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 p-8 sm:p-14 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl shadow-glass"
          >
            <h2 className="font-lalezar text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              {t.ui.landing.readyToBegin}
            </h2>

            <p className="text-slate-300 text-base sm:text-xl max-w-xl mx-auto leading-relaxed font-light">
              {t.ui.landing.joinCommunity}
            </p>

            <div className="pt-4">
              <Link href="/courses">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-3 px-12 py-5 text-lg font-bold rounded-2xl shadow-glow-crimson hover:scale-105 transition-all"
                >
                  <span>{t.ui.landing.ctaButton}</span>
                  <ArrowIcon className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
