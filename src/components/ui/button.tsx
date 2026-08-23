import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-red-600 to-crimson hover:from-red-500 hover:to-crimson text-white shadow-glow-crimson font-semibold border border-red-500/30",
        glass:
          "bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md hover:border-white/30",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
        gold: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-glow-gold border border-amber-400/50",
        teal: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-glow-teal font-semibold border border-teal-400/40",
        ghost: "hover:bg-white/10 text-white/90 hover:text-white",
        danger: "bg-red-950/80 text-red-200 border border-red-800/60 hover:bg-red-900/80",
      },
      size: {
        sm: "h-9 px-3.5 text-xs rounded-lg",
        default: "h-11 px-5 py-2.5 text-sm",
        lg: "h-13 px-7 py-3 text-base rounded-2xl",
        icon: "h-10 w-10 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>لطفا صبر کنید...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
