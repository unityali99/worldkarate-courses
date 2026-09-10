import React, { Suspense } from "react";
import LoginForm from "@/components/Form/LoginForm";
import BackgroundImage from "@/layouts/BackgroundImage";

export default function LoginPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-32 md:pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="w-full h-72 flex items-center justify-center text-white/50 animate-pulse">
                در حال بارگذاری...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </BackgroundImage>
  );
}
