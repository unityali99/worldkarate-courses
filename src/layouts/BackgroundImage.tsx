import React, { ReactNode } from "react";

interface BackgroundImageProps {
  image: string;
  children: ReactNode;
  className?: string;
}

export default function BackgroundImage({
  image,
  children,
  className = "",
}: BackgroundImageProps) {
  return (
    <div className={`relative min-h-screen bg-[#070c0e] ${className}`}>
      {/* Clear, Vivid Karate Visual Background */}
      <div
        className="fixed inset-0 bg-fixed bg-cover bg-no-repeat pointer-events-none z-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center 22%",
        }}
      >
        {/* Soft, clean, luminous gradient overlay allowing the image to shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-slate-950/20 to-[#070c0e]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_75%)]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
