import { z } from "zod";
import { passwordRegex } from "../../utils/passwordRegex";

const Register = z.object({
  firstName: z
    .string({
      required_error: "لطفا نام را وارد کنید",
      invalid_type_error: "نام باید فقط از حروف تشکیل شده باشد",
    })
    .min(2, { message: "نام باید حداقل ۲ کاراکتر باشد" })
    .max(20, "نام نمی‌تواند بیشتر از ۲۰ کاراکتر باشد")
    .regex(/^[\u0600-\u06FFa-zA-Z\s\u200C]+$/, {
      message: "نام باید فقط از حروف تشکیل شده باشد",
    }),
  lastName: z
    .string({
      required_error: "لطفا نام خانوادگی را وارد کنید",
      invalid_type_error: "نام خانوادگی باید فقط از حروف تشکیل شده باشد",
    })
    .min(2, { message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد" })
    .max(20, "نام نمی‌تواند بیشتر از ۲۰ کاراکتر باشد")
    .regex(/^[\u0600-\u06FFa-zA-Z\s\u200C]+$/, {
      message: "نام خانوادگی باید فقط از حروف تشکیل شده باشد",
    }),
  email: z
    .string({ required_error: "لطفا ایمیل را وارد کنید" })
    .email({ message: "ایمیل وارد شده صحیح نمی‌باشد" }),
  password: z
    .string({ required_error: "لطفا رمز عبور خود را انتخاب کنید" })
    .regex(
      passwordRegex,
      "رمز عبور باید حداقل ۸ کاراکتر شامل حداقل یک حرف و یک عدد باشد"
    ),
});

export type RegisterType = z.infer<typeof Register>;

export default Register;
