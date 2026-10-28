import React, { useState } from "react";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import FormFooter from "./components/FormFooter";
import { useForm } from "react-hook-form";
import ForgetPassword, {
  ForgetPasswordType,
} from "@/schemas/auth/ForgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiClient from "@/services/ApiClient";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/getErrorMessage";
import useLanguageStore from "@/stores/languageStore";

export default function ForgetPasswordForm({
  setOtp,
  setEmail,
  onSuccess,
}: {
  setOtp?: (otp: number) => void;
  setEmail: (email: string) => void;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({ resolver: zodResolver(ForgetPassword) });

  const { t } = useLanguageStore();
  const fp = t.ui.forgetPasswordForm;

  const apiClient = new ApiClient<ForgetPasswordType>("/forget-password");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: ForgetPasswordType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        // Only show OTP toast in development mode; in production, no OTP toast is displayed
        if (process.env.NODE_ENV === "development" && res.data?.OTP) {
          toast.info(`${fp.otpDevToast}: ${res.data.OTP}`);
        }
        if (setOtp && res.data?.OTP) {
          setOtp(res.data.OTP);
        }
        setEmail(data.email);
        onSuccess?.();
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, fp.sendError))
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        {fp.title}
      </h2>

      <div className="space-y-4">
        <div>
          <FormInput
            dir="ltr"
            register={register("email")}
            label={fp.emailLabel}
            placeholder={t.ui.emailPlaceholder}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          text={fp.submit}
          isLoading={isLoading}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <FormFooter
          text={fp.footerText}
          linkText={fp.footerLink}
          href="/auth/register"
        />
      </div>
    </FormContainer>
  );
}
