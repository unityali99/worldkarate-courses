export function getExternalUrl(url: string): string;
export function getExternalUrl(url: null | undefined): undefined;
export function getExternalUrl(
  url: string | null | undefined,
): string | undefined;
export function getExternalUrl(url: string | null | undefined) {
  if (typeof url !== "string") return undefined;

  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "";

  if (/^https?:\/\//i.test(trimmedUrl)) return trimmedUrl;

  return `https://${trimmedUrl.replace(/^\/+/, "")}`;
}
