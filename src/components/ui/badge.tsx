import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors border",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white/90 border-white/15 backdrop-blur-md",
        crimson:
          "bg-red-500/15 text-red-300 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]",
        teal:
          "bg-teal-500/15 text-teal-200 border-teal-500/30 shadow-[0_0_12px_rgba(20,184,166,0.2)]",
        gold:
          "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
        "belt-white":
          "bg-slate-100 text-slate-900 border-slate-300 font-bold",
        "belt-yellow":
          "bg-yellow-400/90 text-yellow-950 border-yellow-500 font-bold",
        "belt-brown":
          "bg-amber-900/90 text-amber-100 border-amber-700 font-bold",
        "belt-black":
          "bg-neutral-900 text-neutral-100 border-neutral-700 shadow-md font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
