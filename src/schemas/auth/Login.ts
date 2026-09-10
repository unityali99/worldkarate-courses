import { z } from "zod";

const Login = z.object({
  email: z
    .string({ required_error: "لطفا ایمیل را وارد کنید" })
    .email({ message: "ایمیل وارد شده صحیح نمی‌باشد" }),
  password: z
    .string({ required_error: "لطفا رمز عبور را وارد کنید" })
    .min(1, { message: "لطفا رمز عبور را وارد کنید" }),
});

export type LoginType = z.infer<typeof Login>;

export default Login;
