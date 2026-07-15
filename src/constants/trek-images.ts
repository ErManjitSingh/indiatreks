/**
 * Local curated trek media — never depends on third-party CDN uptime.
 * All files live under /public/images/treks/
 */
export const trekImages = {
  hero: "/images/treks/hero.jpg",
  mountains1: "/images/treks/mountains-1.jpg",
  mountains2: "/images/treks/mountains-2.jpg",
  mountains3: "/images/treks/mountains-3.jpg",
  landscape1: "/images/treks/landscape-1.jpg",
  landscape2: "/images/treks/landscape-2.jpg",
  landscape3: "/images/treks/landscape-3.jpg",
  camp1: "/images/treks/camp-1.jpg",
  camp2: "/images/treks/camp-2.jpg",
  forest1: "/images/treks/forest-1.jpg",
  forest2: "/images/treks/forest-2.jpg",
  meadow1: "/images/treks/meadow-1.jpg",
  india1: "/images/treks/india-1.jpg",
  avatar1: "/images/treks/avatar-1.jpg",
  avatar2: "/images/treks/avatar-2.jpg",
  avatar3: "/images/treks/avatar-3.jpg",
  avatar4: "/images/treks/avatar-4.jpg",
  avatar5: "/images/treks/avatar-5.jpg",
} as const;

export type TrekImageKey = keyof typeof trekImages;

/** Pool used to rotate gallery / listing imagery without broken remote URLs. */
export const trekImagePool = [
  trekImages.hero,
  trekImages.mountains1,
  trekImages.mountains2,
  trekImages.mountains3,
  trekImages.landscape1,
  trekImages.landscape2,
  trekImages.landscape3,
  trekImages.camp1,
  trekImages.camp2,
  trekImages.forest1,
  trekImages.forest2,
  trekImages.meadow1,
  trekImages.india1,
] as const;

export function localImg(...keys: TrekImageKey[]): string[] {
  return keys.map((key) => trekImages[key]);
}

export function pickImages(seed: number, count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push(trekImagePool[(seed + i) % trekImagePool.length]!);
  }
  return out;
}
