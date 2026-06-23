import { passwordRegex } from "@/utils/passwordRegex";
import { lang } from "@/lang";
import { z } from "zod";

const ResetPassword = z
  .object({
    newPassword: z
      .string({ required_error: lang.fa.validation.newPasswordRequired })
      .min(1, lang.fa.validation.newPasswordRequired)
      .regex(passwordRegex, lang.fa.validation.newPasswordInvalidFormat),
    repeatPassword: z
      .string({ required_error: lang.fa.validation.repeatPasswordRequired })
      .min(1, lang.fa.validation.repeatPasswordRequired),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: lang.fa.validation.repeatPasswordMismatch,
    path: ["repeatPassword"],
  });

export type ResetPasswordType = z.infer<typeof ResetPassword>;

export default ResetPassword;
