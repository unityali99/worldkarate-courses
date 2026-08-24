import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface FormContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function FormContainer({ children, className, ...props }: FormContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xl md:max-w-2xl mx-auto p-7 sm:p-12 text-center rounded-3xl border border-white/15 bg-slate-950/80 backdrop-blur-2xl shadow-glass text-white",
        className
      )}
      dir="rtl"
      {...props}
    >
      <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-6">{children}</div>
    </div>
  );
}
