import { trekImages } from "@/constants/trek-images";

/**
 * Maps legacy Unsplash photo IDs → local /public files.
 * Broken remote IDs are remapped to the closest local alternative.
 */
const PHOTO_MAP: Record<string, string> = {
  "photo-1551632811-561732d1e306": trekImages.hero,
  "photo-1464822759023-fed622ff2c3b": trekImages.mountains1,
  "photo-1506905925346-21bda4d32df4": trekImages.mountains2,
  "photo-1519681393784-d120267933ba": trekImages.mountains3,
  "photo-1500530855697-b586d89ba3ee": trekImages.landscape1,
  "photo-1469474968028-56623f02e42e": trekImages.landscape2,
  "photo-1470071459604-3b5ec3a7fe05": trekImages.landscape3,
  "photo-1504280390367-361c6d9f38f4": trekImages.camp1,
  "photo-1523987355523-c7b5b0dd90a7": trekImages.camp2,
  "photo-1441974231531-c6227db76b6e": trekImages.forest1,
  "photo-1511497584788-876760111969": trekImages.forest2,
  "photo-1472214103451-9374bd1c798e": trekImages.meadow1,
  "photo-1626621341517-bbf3d9990a23": trekImages.india1,
  "photo-1494790108377-be9c29b29330": trekImages.avatar1,
  "photo-1507003211169-0a1dd7228f2d": trekImages.avatar2,
  "photo-1438761681033-6461ffad8d80": trekImages.avatar3,
  "photo-1472099645785-5658abf4ff4e": trekImages.avatar4,
  "photo-1544005313-94ddf0286df2": trekImages.avatar5,

  // Broken Unsplash IDs → stable local stand-ins
  "photo-1491002052546-bf38f186af21": trekImages.mountains3,
  "photo-1486870591958-9b9d0d1c83bf": trekImages.forest2,
  "photo-1478131143081-80f7f84ca84a": trekImages.forest1,
  "photo-1585409677983-0f6c411fa381": trekImages.landscape3,
  "photo-1544735716-392fe16912ea": trekImages.india1,
};

/** Local trek image URL (ignores width — next/image handles sizing). */
export function img(id: string, _width = 1400): string {
  return PHOTO_MAP[id] ?? trekImages.mountains1;
}

export function avatar(index: number): string {
  const avatars = [
    trekImages.avatar1,
    trekImages.avatar2,
    trekImages.avatar3,
    trekImages.avatar4,
    trekImages.avatar5,
  ];
  return avatars[index % avatars.length]!;
}
