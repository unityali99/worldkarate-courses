import { z } from "zod";

const Payment = z.object({
  courseIds: z.string().array().min(1, "حداقل یک دوره باید در لیست خرید باشد"),
});

export type PaymentType = z.infer<typeof Payment>;

export default Payment;
