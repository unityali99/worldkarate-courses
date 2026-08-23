import React from "react";

interface PriceBadgeProps {
  price: number;
  className?: string;
}

export default function PriceBadge({ price, className = "" }: PriceBadgeProps) {
  return (
    <div
      dir="rtl"
      className={`inline-flex items-baseline gap-1.5 px-4 py-2 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-200 shadow-[0_0_15px_rgba(20,184,166,0.15)] ${className}`}
    >
      <span className="font-lalezar text-2xl font-normal leading-none tracking-wide text-white">
        {price.toLocaleString("fa-IR")}
      </span>
      <span className="text-xs font-bold text-teal-300/80">تومان</span>
    </div>
  );
}
