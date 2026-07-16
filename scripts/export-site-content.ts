/**
 * Export all website content (except binary files) for Mongo seeding.
 * Run: npx tsx scripts/export-site-content.ts
 */
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "../src/config/site";
import { mainNavigation, footerLinks, socialLinks } from "../src/constants/navigation";
import { trekImages } from "../src/constants/trek-images";
import {
  featuredTreks,
  destinationShowcases,
  popularDestinations,
  trekCategoryCards,
  whyChooseItems,
  fixedDepartures,
  galleryPhotos,
  testimonials,
  latestBlogs,
  homeFaqs,
  heroSearchOptions,
  heroMedia,
  trustBadges,
  adventureStats,
} from "../src/data/homepage";
import {
  trekListingDestinations,
  trekListingStates,
  trekListingRegions,
  popularTrekSearches,
  trekCollections,
  TREK_PRICE_BOUNDS,
  TREK_ALTITUDE_BOUNDS,
} from "../src/data/treks";

const outDir = path.join(process.cwd(), "backend/seed-data");
fs.mkdirSync(outDir, { recursive: true });

const publicRoot = path.join(process.cwd(), "public");
function walk(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const rel = path.posix.join(base.replace(/\\/g, "/"), entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, rel));
    else if (!entry.name.startsWith(".")) files.push(`/${rel.replace(/\\/g, "/")}`);
  }
  return files;
}

const mediaFiles = walk(publicRoot).filter(
  (f) =>
    f.startsWith("/images/") ||
    f.startsWith("/icons/") ||
    f.endsWith(".svg") ||
    f.endsWith(".png") ||
    f.endsWith(".jpg") ||
    f.endsWith(".jpeg") ||
    f.endsWith(".webp") ||
    f.endsWith(".avif"),
);

const payload = {
  site: {
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    ogImage: siteConfig.ogImage,
    locale: siteConfig.locale,
    currency: siteConfig.currency,
    phone: siteConfig.phone,
    email: siteConfig.email,
    enquiryEmail: siteConfig.enquiryEmail,
    whatsapp: siteConfig.whatsapp,
    address: siteConfig.address,
    social: siteConfig.social,
    logo: "/icons/logo.png",
  },
  navigation: {
    main: mainNavigation,
    footer: footerLinks,
    social: socialLinks,
  },
  homepage: {
    heroMedia,
    featuredTreks,
    destinationShowcases,
    popularDestinations,
    trekCategoryCards,
    whyChooseItems,
    fixedDepartures,
    galleryPhotos,
    testimonials,
    latestBlogs,
    homeFaqs,
    heroSearchOptions,
    trustBadges,
    adventureStats,
  },
  trekFacets: {
    destinations: [...trekListingDestinations],
    states: [...trekListingStates],
    regions: [...trekListingRegions],
    popularSearches: [...popularTrekSearches],
    collections: trekCollections,
    priceBounds: TREK_PRICE_BOUNDS,
    altitudeBounds: TREK_ALTITUDE_BOUNDS,
  },
  imageMap: trekImages,
  mediaCatalog: mediaFiles.map((url) => ({
    url,
    publicId: url.replace(/^\//, "").replace(/\//g, "__"),
    format: path.extname(url).replace(".", "") || "bin",
    folder: "site-assets",
    alt: path.basename(url),
  })),
};

fs.writeFileSync(path.join(outDir, "site-content.json"), JSON.stringify(payload, null, 2));
console.log(
  `Exported site-content.json (${mediaFiles.length} media URLs, homepage blocks, site config)`,
);
