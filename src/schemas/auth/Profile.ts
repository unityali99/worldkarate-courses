import { z } from "zod";
import { lang } from "@/lang";

const Profile = z.object({
  firstName: z
    .string({
      invalid_type_error: lang.fa.validation.firstNameInvalidType,
    })
    .min(3, { message: lang.fa.validation.firstNameMinLength })
    .max(20, lang.fa.validation.firstNameMaxLength)
    .regex(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/,
      { message: lang.fa.validation.firstNameInvalidFormat }
    ),

  lastName: z
    .string({
      invalid_type_error: lang.fa.validation.lastNameInvalidType,
    })
    .min(3, { message: lang.fa.validation.lastNameMinLength })
    .max(20, lang.fa.validation.lastNameMaxLength)
    .regex(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/,
      { message: lang.fa.validation.lastNameInvalidFormat }
    ),

  email: z
    .string({ required_error: lang.fa.validation.emailRequired })
    .email({ message: lang.fa.validation.emailInvalid }),
});

export type ProfileType = z.infer<typeof Profile>;

export default Profile;
