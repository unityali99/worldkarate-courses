import React from "react";
import LoginForm from "@/components/Form/LoginForm";
import BackgroundImage from "@/layouts/BackgroundImage";

export default function LoginPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-32 md:pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          <LoginForm />
        </div>
      </div>
    </BackgroundImage>
  );
}
