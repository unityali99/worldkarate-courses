import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface PanelTableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function PanelTableContainer({
  children,
  className,
  ...props
}: PanelTableContainerProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-3xl border border-white/15 bg-slate-950/60 p-4 md:p-6 backdrop-blur-xl shadow-glass text-white",
        className
      )}
      dir="rtl"
      {...props}
    >
      {children}
    </div>
  );
}
