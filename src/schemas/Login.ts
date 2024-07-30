import { passwordRegex } from "@/utils/passwordRegex";
import { z } from "zod";

const Login = z.object({
  email: z
    .string({ required_error: "لطفا ایمیل را وارد کنید" })
    .email({ message: "ایمیل صحیح نمیباشد" }),
  password: z
    .string({ required_error: "Password is required" })
    .regex(
      passwordRegex,
      "رمز عبور باید حداقل 8 کاراکتر شامل حداقل یک حرف و یک عدد باشد"
    ),
});

export type LoginType = z.infer<typeof Login>;

export default Login;
