"use client";

import React, { useState } from "react";
import ForgetPasswordForm from "@/components/Form/ForgetPasswordForm";
import OTPForm from "@/components/Form/OTPForm";
import ResetPasswordForm from "@/components/Form/ResetPasswordForm";
import BackgroundImage from "@/layouts/BackgroundImage";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState<string>();

  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-32 md:pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          {step === "reset" ? (
            <ResetPasswordForm />
          ) : step === "otp" ? (
            <OTPForm setIsOtpValid={() => setStep("reset")} email={email!} />
          ) : (
            <ForgetPasswordForm
              onSuccess={() => setStep("otp")}
              setEmail={setEmail}
            />
          )}
        </div>
      </div>
    </BackgroundImage>
  );
}
