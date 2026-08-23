"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function FormButton({
  text,
  isLoading,
  onClick,
}: {
  text: string;
  isLoading: boolean;
  onClick?: (data: any) => void;
}) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      isLoading={isLoading}
      onClick={onClick}
      className="w-full font-bold shadow-glow-crimson rounded-2xl h-12"
    >
      {text}
    </Button>
  );
}
