"use server";

import { NewsletterSchema } from "@/schemas/newsletter";

export type NewsletterState = {
  message: string;
  successful: boolean;
  timestamp?: number;
};

export async function registerNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const rawEmail = formData.get("email");

  const validation = NewsletterSchema.safeParse({ email: rawEmail });

  if (!validation.success) {
    const errorMessage =
      validation.error.errors[0]?.message || "لطفا یک ایمیل معتبر وارد کنید";
    return {
      message: errorMessage,
      successful: false,
      timestamp: Date.now(),
    };
  }

  const { email } = validation.data;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${backendUrl}/register-newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        (response.status === 409
          ? "این ایمیل قبلا در خبرنامه ثبت شده است"
          : "ثبت ایمیل با خطا مواجه شد. لطفا دوباره تلاش کنید");
      return {
        message: errorMessage,
        successful: false,
        timestamp: Date.now(),
      };
    }

    return {
      message: data?.message || "ایمیل شما با موفقیت در خبرنامه ثبت شد!",
      successful: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Newsletter registration server action error:", error);
    return {
      message: "ارتباط با سرور برقرار نشد. لطفا بعدا تلاش کنید",
      successful: false,
      timestamp: Date.now(),
    };
  }
}
