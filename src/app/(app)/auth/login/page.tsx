import React, { Suspense } from "react";
import LoginForm from "@/components/Form/LoginForm";
import BackgroundImage from "@/layouts/BackgroundImage";
import { lang } from "@/lang";
import { getServerLocale } from "@/lib/i18n/serverLocale";

export default async function LoginPage() {
  // App routes carry no locale in the URL, so derive it from the SSR cookie.
  const t = lang[await getServerLocale()];
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-32 md:pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="w-full h-72 flex items-center justify-center text-white/50 animate-pulse">
                {t.ui.loading}
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
