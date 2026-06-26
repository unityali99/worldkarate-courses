export function getErrorMessage(
  error: unknown,
  fallback = "خطایی رخ داد. لطفا دوباره تلاش کنید",
) {
  if (error && typeof error === "object") {
    const responseData = "response" in error
      ? (error as { response?: { data?: unknown } }).response?.data
      : undefined;

    if (responseData && typeof responseData === "object") {
      const { message, error: responseError } = responseData as {
        message?: unknown;
        error?: unknown;
      };

      if (typeof message === "string" && message.length > 0) return message;
      if (typeof responseError === "string" && responseError.length > 0) {
        return responseError;
      }
    }

    if ("message" in error) {
      const message = (error as { message?: unknown }).message;
      if (typeof message === "string" && message.length > 0) return message;
    }
  }

  return fallback;
}
