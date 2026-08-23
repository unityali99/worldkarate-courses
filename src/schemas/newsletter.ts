import { z } from "zod";

export const NewsletterSchema = z.object({
  email: z
    .string({ required_error: "لطفا ایمیل خود را وارد کنید" })
    .trim()
    .min(1, { message: "لطفا ایمیل خود را وارد کنید" })
    .email({ message: "فرمت ایمیل وارد شده معتبر نیست" }),
});

export type NewsletterType = z.infer<typeof NewsletterSchema>;
