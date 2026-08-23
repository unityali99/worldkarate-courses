"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { registerNewsletter, type NewsletterState } from "@/services/registerNewsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoNewspaperOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";

const initialState: NewsletterState = {
  message: "",
  successful: false,
};

export default function NewsLetterForm() {
  const [state, formAction, isPending] = useActionState(
    registerNewsletter,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.successful && formRef.current) {
      formRef.current.reset();
    }
  }, [state.timestamp, state.successful]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 w-full md:w-auto min-w-[320px] max-w-md mx-auto"
      dir="rtl"
    >
      <div className="relative">
        <Input
          placeholder="ایمیل خود را وارد کنید (مثال: sensei@karate.ir)"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="bg-slate-900/80 border-white/20 text-white placeholder:text-slate-400 focus-visible:border-red-500 focus-visible:ring-red-500/40 rounded-2xl h-12 text-sm shadow-inner"
        />
      </div>

      {state.message && (
        <div
          className={`flex items-center gap-2 p-3.5 rounded-2xl text-xs font-medium border transition-all duration-300 ${
            state.successful
              ? "bg-emerald-950/80 text-emerald-200 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              : "bg-red-950/80 text-red-200 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          }`}
        >
          {state.successful ? (
            <IoCheckmarkCircleOutline className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <IoAlertCircleOutline className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="flex-1 leading-relaxed">{state.message}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isPending}
        className="w-full gap-2 rounded-2xl h-12 text-sm font-bold shadow-glow-crimson hover:shadow-lg transition-all"
      >
        <IoNewspaperOutline className="w-4 h-4 ml-1" />
        <span>عضویت در خبرنامه دوجو</span>
      </Button>
    </form>
  );
}
