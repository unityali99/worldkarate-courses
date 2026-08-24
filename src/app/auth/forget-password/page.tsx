"use client";

import React, { useState } from "react";
import ForgetPasswordForm from "@/components/Form/ForgetPasswordForm";
import OTPForm from "@/components/Form/OTPForm";
import ResetPasswordForm from "@/components/Form/ResetPasswordForm";
import BackgroundImage from "@/layouts/BackgroundImage";

export default function ForgetPasswordPage() {
  const [otp, setOtp] = useState<number>();
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [email, setEmail] = useState<string>();

  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-32 md:pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          {isOtpValid ? (
            <ResetPasswordForm />
          ) : otp && !isOtpValid ? (
            <OTPForm setIsOtpValid={setIsOtpValid} email={email!} />
          ) : (
            <ForgetPasswordForm setOtp={setOtp} setEmail={setEmail} />
          )}
        </div>
      </div>
    </BackgroundImage>
  );
}
