import React from "react";
import { UseFormRegister } from "react-hook-form";
import { cn } from "@/utils/cn";

function FormInput({
  className,
  label,
  placeholder = "",
  password = false,
  number = false,
  register,
  dir = "rtl",
  autoComplete,
}: {
  className?: string;
  label?: string;
  password?: boolean;
  number?: boolean;
  placeholder?: string;
  register: ReturnType<UseFormRegister<any>>;
  dir: "ltr" | "rtl";
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5 text-right w-full" dir="rtl">
      {label && (
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">
          {label}
        </label>
      )}
      <input
        {...register}
        placeholder={placeholder}
        dir={dir}
        type={password ? "password" : number ? "number" : "text"}
        autoComplete={autoComplete}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-white/15 bg-slate-900/60 px-4 py-2 text-sm text-white shadow-inner backdrop-blur-md transition-all duration-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30",
          className
        )}
      />
    </div>
  );
}

export default FormInput;
