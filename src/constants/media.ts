/** Shared blur placeholder for progressive image loading */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZDVlM2U4Ii8+PC9zdmc+";

export const IMAGE_SIZES = {
  hero: "100vw",
  card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  gallery: "(max-width: 768px) 100vw, 25vw",
} as const;
