import React from "react";
import Link from "next/link";

export default function FormFooter({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="text-right text-xs sm:text-sm font-light text-slate-300" dir="rtl">
      {text}{" "}
      <Link href={href} className="inline-block text-teal-400 hover:text-teal-300 hover:underline font-semibold pr-1 transition-colors">
        {linkText}
      </Link>
    </p>
  );
}
