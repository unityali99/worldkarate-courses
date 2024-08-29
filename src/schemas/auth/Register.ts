import { z } from "zod";
import { passwordRegex } from "../../utils/passwordRegex";

const Register = z.object({
  firstName: z
    .string({
      required_error: "لطفا نام را وارد کنید",
      invalid_type_error: "نام باید فقط از حروف تشکیل شده باشد",
    })
    .min(3, { message: "نام باید حداقل 3 کاراتر باشد" })
    .max(20, "نام نمیتواتند بیشتر از 20 کاراکتر باشد"),
  lastName: z
    .string({
      required_error: "لطفا نام خانوادگی را وارد کنید",
      invalid_type_error: "نام خانوادگی باید فقط از حروف تشکیل شده باشد",
    })
    .min(3, { message: "نام خانوادگی باید حداقل 3 کاراتر باشد" })
    .max(20, "نام خانوادگی نمیتواتند بیشتر از 20 کاراکتر باشد"),
  email: z
    .string({ required_error: "لطفا ایمیل را وارد کنید" })
    .email({ message: "ایمیل وارد شده صحیح نمیباشد" }),
  password: z
    .string({ required_error: "لطفا رمز عبور خودرا انتخاب کنید" })
    .regex(
      passwordRegex,
      "رمز عبور باید حداقل 8 کاراکتر شامل حداقل یک حرف و یک عدد باشد"
    ),
});

export type RegisterType = z.infer<typeof Register>;

export default Register;
