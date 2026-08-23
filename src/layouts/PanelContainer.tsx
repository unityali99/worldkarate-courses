import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface PanelContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function PanelContainer({ children, className, ...props }: PanelContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full md:w-10/12 lg:w-8/12 text-xs md:text-base font-bold text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
