import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-right" dir="rtl">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-white/15 bg-slate-900/60 px-4 py-2 text-sm text-white shadow-inner backdrop-blur-md transition-all duration-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-400 mr-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
