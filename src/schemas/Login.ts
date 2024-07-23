import { passwordRegex } from "@/utils/passwordRegex";
import { z } from "zod";

const Login = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .regex(passwordRegex),
});

export type LoginType = z.infer<typeof Login>;

export default Login;
