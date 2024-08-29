import { z } from "zod";

const ForgetPassword = z.object({
  email: z
    .string({ required_error: "لطفا ایمیل را وارد کنید" })
    .email({ message: "ایمیل وارد شده صحیح نمیباشد" }),
});

export type ForgetPasswordType = z.infer<typeof ForgetPassword>;

export default ForgetPassword;
