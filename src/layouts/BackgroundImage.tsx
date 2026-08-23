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
    <div
      className={`min-h-screen bg-fixed bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: "rgba(8, 15, 18, 0.7)",
        backgroundBlendMode: "darken",
        backgroundPosition: "center 25%",
      }}
    >
      {children}
    </div>
  );
}
