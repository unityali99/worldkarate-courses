"use server";
import ApiClient from "@/services/ApiClient";
import { ForgetPasswordType as NewsletterType } from "@/schemas/auth/ForgetPassword";

export async function registerNewsletter(prevState: any, formData: FormData) {
  try {
    const apiClient = new ApiClient<NewsletterType>("/register-newsletter");
    const email = formData.get("email");

    if (!email)
      return {
        message: "لطفا ایمیل را وارد کنید",
        successful: false,
      };

    const res = await apiClient.post({ email: email.toString() });

    return {
      message: res.data.message,
      successful: true,
    };
  } catch (error: any) {
    return {
      message: (error.response?.data as { message: string }).message,
      successful: false,
    };
  }
}
