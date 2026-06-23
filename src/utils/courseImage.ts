export function getCourseImageSource(image: string) {
  const source = image.trim();

  if (
    source.startsWith("data:image/") ||
    source.startsWith("http://") ||
    source.startsWith("https://") ||
    source.startsWith("/")
  ) {
    return source;
  }

  const compactBase64 = source.replace(/\s/g, "");
  const mimeType = compactBase64.startsWith("iVBOR")
    ? "image/png"
    : compactBase64.startsWith("UklGR")
      ? "image/webp"
      : compactBase64.startsWith("R0lGOD")
        ? "image/gif"
        : "image/jpeg";

  return `data:${mimeType};base64,${compactBase64}`;
}
