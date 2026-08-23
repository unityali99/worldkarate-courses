import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface FormContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function FormContainer({ children, className, ...props }: FormContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 p-6 sm:p-10 text-center rounded-3xl border border-white/15 bg-slate-950/70 backdrop-blur-xl shadow-glass text-white",
        className
      )}
      dir="rtl"
      {...props}
    >
      <div className="w-full max-w-md mx-auto space-y-6">{children}</div>
    </div>
  );
}
