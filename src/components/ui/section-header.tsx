import * as React from "react";
import { cn } from "@/utils/cn";
import { Badge } from "./badge";

export interface SectionHeaderProps {
  tag?: string;
  tagVariant?: "default" | "crimson" | "teal" | "gold";
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "right" | "left";
}

export function SectionHeader({
  tag,
  tagVariant = "crimson",
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  const alignmentClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div
      className={cn("flex flex-col space-y-3 max-w-2xl mx-auto mb-10", alignmentClass, className)}
      dir="rtl"
    >
      {tag && (
        <Badge variant={tagVariant} className="mb-1">
          {tag}
        </Badge>
      )}
      <h2 className="font-lalezar text-3xl md:text-4xl text-white tracking-wide leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
