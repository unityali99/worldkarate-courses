"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { registerNewsletter, type NewsletterState } from "@/services/registerNewsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoNewspaperOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { cn } from "@/utils/cn";

const initialState: NewsletterState = {
  message: "",
  successful: false,
};

interface NewsLetterFormProps {
  className?: string;
  buttonText?: string;
}

export default function NewsLetterForm({
  className,
  buttonText = "عضویت در خبرنامه دوجو",
}: NewsLetterFormProps) {
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
      className={cn("space-y-3 w-full", className)}
      dir="rtl"
    >
      <div className="relative w-full">
        <Input
          placeholder="ایمیل خود را وارد کنید (مثال: sensei@karate.ir)"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="bg-slate-900/80 border-white/20 text-white placeholder:text-slate-400 focus-visible:border-red-500 focus-visible:ring-red-500/40 rounded-2xl h-11 text-xs sm:text-sm shadow-inner w-full"
        />
      </div>

      {state.message && (
        <div
          className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-medium border transition-all duration-300 ${
            state.successful
              ? "bg-emerald-950/80 text-emerald-200 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              : "bg-red-950/80 text-red-200 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          }`}
        >
          {state.successful ? (
            <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <IoAlertCircleOutline className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
          <span className="flex-1 leading-relaxed">{state.message}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="default"
        isLoading={isPending}
        className="w-full gap-2 rounded-2xl h-11 text-xs sm:text-sm font-bold shadow-glow-crimson hover:shadow-lg transition-all"
      >
        <IoNewspaperOutline className="w-4 h-4 ml-1" />
        <span>{buttonText}</span>
      </Button>
    </form>
  );
}
