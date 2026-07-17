import { siteConfigFallback } from "../config/seoDefaults";
import type { IEnterpriseSeo } from "../models/schemas/enterpriseSeo.schema";
import type { ISeoSettings } from "../models/SeoSettings.model";

type JsonLd = Record<string, unknown>;

function abs(base: string, path?: string) {
  if (!path) return base;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema(settings?: Partial<ISeoSettings> | null): JsonLd {
  const s = settings ?? siteConfigFallback;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.organizationName || s.siteName || siteConfigFallback.organizationName,
    url: s.siteUrl || siteConfigFallback.siteUrl,
    logo: abs(s.siteUrl || siteConfigFallback.siteUrl, s.organizationLogo || "/icons/logo.png"),
    email: s.organizationEmail,
    telephone: s.organizationPhone,
    sameAs: Object.values(s.socialProfiles || {}).filter(Boolean),
  };
}

export function websiteSchema(settings?: Partial<ISeoSettings> | null): JsonLd {
  const s = settings ?? siteConfigFallback;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.siteName || siteConfigFallback.siteName,
    url: s.siteUrl || siteConfigFallback.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${(s.siteUrl || siteConfigFallback.siteUrl).replace(/\/$/, "")}/treks?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string = siteConfigFallback.siteUrl,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(baseUrl, item.url),
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): JsonLd | null {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedAt?: string | Date | null;
  modifiedAt?: string | Date | null;
  authorName?: string;
  baseUrl?: string;
}): JsonLd {
  const base = input.baseUrl || siteConfigFallback.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? abs(base, input.image) : undefined,
    url: abs(base, input.url),
    datePublished: input.publishedAt ? new Date(input.publishedAt).toISOString() : undefined,
    dateModified: input.modifiedAt
      ? new Date(input.modifiedAt).toISOString()
      : input.publishedAt
        ? new Date(input.publishedAt).toISOString()
        : undefined,
    author: { "@type": "Person", name: input.authorName || "Editorial Team" },
    publisher: organizationSchema(),
  };
}

export function blogPostingSchema(input: Parameters<typeof articleSchema>[0]): JsonLd {
  return { ...articleSchema(input), "@type": "BlogPosting" };
}

export function imageObjectSchema(input: {
  url: string;
  caption?: string;
  alt?: string;
  baseUrl?: string;
}): JsonLd {
  const base = input.baseUrl || siteConfigFallback.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: abs(base, input.url),
    url: abs(base, input.url),
    caption: input.caption || input.alt,
    name: input.alt || input.caption,
  };
}

export function touristDestinationSchema(input: {
  name: string;
  description: string;
  image?: string;
  url: string;
  geo?: { lat: number; lng: number };
  baseUrl?: string;
}): JsonLd {
  const base = input.baseUrl || siteConfigFallback.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: input.name,
    description: input.description,
    image: input.image ? abs(base, input.image) : undefined,
    url: abs(base, input.url),
    ...(input.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: input.geo.lat,
            longitude: input.geo.lng,
          },
        }
      : {}),
  };
}

export function touristTripSchema(input: {
  name: string;
  description: string;
  image?: string;
  url: string;
  priceInr: number;
  durationDays: number;
  destinationName: string;
  baseUrl?: string;
}): JsonLd {
  const base = input.baseUrl || siteConfigFallback.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    image: input.image ? abs(base, input.image) : undefined,
    url: abs(base, input.url),
    touristType: "Adventure travelers",
    duration: `P${input.durationDays}D`,
    itinerary: { "@type": "ItemList", name: `${input.name} itinerary` },
    offers: offerSchema({
      priceInr: input.priceInr,
      url: input.url,
      baseUrl: base,
    }),
    destination: { "@type": "Place", name: input.destinationName },
    provider: organizationSchema(),
  };
}

export function offerSchema(input: {
  priceInr: number;
  url: string;
  currency?: string;
  availability?: string;
  baseUrl?: string;
}): JsonLd {
  const base = input.baseUrl || siteConfigFallback.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    priceCurrency: input.currency || "INR",
    price: input.priceInr,
    availability: input.availability || "https://schema.org/InStock",
    url: abs(base, input.url),
  };
}

export function reviewSchema(input: {
  author: string;
  rating: number;
  comment: string;
  date?: string | Date;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: input.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: input.comment,
    datePublished: input.date ? new Date(input.date).toISOString() : undefined,
  };
}

export function aggregateRatingSchema(input: { rating: number; reviewCount: number }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: input.rating,
    reviewCount: input.reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildEntitySchemas(input: {
  type: "trek" | "blog" | "destination" | "programmatic";
  title: string;
  description: string;
  url: string;
  image?: string;
  seo?: IEnterpriseSeo | null;
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumb?: Array<{ name: string; url: string }>;
  trek?: {
    priceInr: number;
    durationDays: number;
    destinationName: string;
    rating?: number;
    reviewCount?: number;
    reviews?: Array<{ author: string; rating: number; comment: string; date?: string | Date }>;
  };
  blog?: {
    publishedAt?: string | Date | null;
    modifiedAt?: string | Date | null;
    authorName?: string;
  };
  settings?: Partial<ISeoSettings> | null;
  baseUrl?: string;
}): JsonLd[] {
  const base = input.baseUrl || input.settings?.siteUrl || siteConfigFallback.siteUrl;
  const schemas: JsonLd[] = [];

  if (input.seo?.schemaJson) {
    schemas.push(input.seo.schemaJson);
  }

  const crumbs =
    input.breadcrumb ||
    input.seo?.breadcrumb ||
    [
      { name: "Home", url: "/" },
      { name: input.title, url: input.url },
    ];
  schemas.push(breadcrumbSchema(crumbs, base));

  const faqs = input.faqs || input.seo?.faqs || [];
  const faq = faqSchema(faqs);
  if (faq) schemas.push(faq);

  if (input.type === "trek" && input.trek) {
    schemas.push(
      touristTripSchema({
        name: input.title,
        description: input.description,
        image: input.image || input.seo?.ogImage,
        url: input.url,
        priceInr: input.trek.priceInr,
        durationDays: input.trek.durationDays,
        destinationName: input.trek.destinationName,
        baseUrl: base,
      }),
    );
    if (input.trek.rating && input.trek.reviewCount) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: input.title,
        description: input.description,
        image: input.image ? abs(base, input.image) : undefined,
        aggregateRating: aggregateRatingSchema({
          rating: input.trek.rating,
          reviewCount: input.trek.reviewCount,
        }),
        offers: offerSchema({ priceInr: input.trek.priceInr, url: input.url, baseUrl: base }),
        review: (input.trek.reviews || []).slice(0, 5).map((r) => reviewSchema(r)),
      });
    }
  }

  if (input.type === "blog") {
    schemas.push(
      blogPostingSchema({
        title: input.title,
        description: input.description,
        image: input.image || input.seo?.ogImage,
        url: input.url,
        publishedAt: input.blog?.publishedAt,
        modifiedAt: input.blog?.modifiedAt,
        authorName: input.blog?.authorName,
        baseUrl: base,
      }),
    );
  }

  if (input.type === "destination") {
    schemas.push(
      touristDestinationSchema({
        name: input.title,
        description: input.description,
        image: input.image || input.seo?.ogImage,
        url: input.url,
        baseUrl: base,
      }),
    );
  }

  if (input.image || input.seo?.ogImage) {
    schemas.push(
      imageObjectSchema({
        url: (input.image || input.seo?.ogImage) as string,
        alt: input.seo?.imageAlt,
        caption: input.seo?.imageCaption,
        baseUrl: base,
      }),
    );
  }

  return schemas.filter(Boolean);
}

export const schemaService = {
  organization: organizationSchema,
  website: websiteSchema,
  breadcrumb: breadcrumbSchema,
  faq: faqSchema,
  article: articleSchema,
  blog: blogPostingSchema,
  image: imageObjectSchema,
  touristDestination: touristDestinationSchema,
  touristTrip: touristTripSchema,
  offer: offerSchema,
  review: reviewSchema,
  aggregateRating: aggregateRatingSchema,
  buildEntitySchemas,
};
