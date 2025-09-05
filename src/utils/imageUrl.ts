export function getImageUrl(
  path: string | null,
  size: "w500" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
