"use client";
import ForgetPasswordForm from "@/components/Form/ForgetPasswordForm";
import OTPForm from "@/components/Form/OTPForm";
import ResetPasswordForm from "@/components/Form/ResetPasswordForm";
import React, { useState } from "react";

function ForgetPasswordPage() {
  const [otp, setOtp] = useState<number>();
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [email, setEmail] = useState<string>();

  if (isOtpValid) return <ResetPasswordForm />;

  if (otp && !isOtpValid)
    return <OTPForm setIsOtpValid={setIsOtpValid} email={email!} />;

  if (!otp) return <ForgetPasswordForm setOtp={setOtp} setEmail={setEmail} />;
}

export default ForgetPasswordPage;
