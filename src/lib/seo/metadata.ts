import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { BreadcrumbItem, SeoMeta } from "@/types";
import { absoluteUrl } from "@/utils";

export function createMetadata({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  ogTitle,
  ogDescription,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex = false,
  noFollow = false,
  type = "website",
  authors,
  publishedTime,
  modifiedTime,
  alternatesLanguages,
}: SeoMeta): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(canonical ?? "");
  const image = absoluteUrl(ogImage ?? siteConfig.ogImage);
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;
  const resolvedTwitterImage = absoluteUrl(twitterImage ?? ogImage ?? siteConfig.ogImage);

  return {
    title: fullTitle,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: alternatesLanguages ?? { "en-IN": url, "x-default": url },
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: twitterCard ?? "summary_large_image",
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      images: [resolvedTwitterImage],
    },
    robots: {
      index: !noIndex,
      follow: !noFollow && !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noFollow && !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/manifest.webmanifest",
    other: {
      "format-detection": "telephone=no",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icons/logo.png"),
    },
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
  };
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl("/icons/logo.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: [siteConfig.address.line1, siteConfig.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/treks?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function tourJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceInr: number;
  durationDays: number;
  destinationName: string;
  itinerary?: Array<{ day: number; title: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
    touristType: "Adventure travelers",
    itinerary: {
      "@type": "ItemList",
      name: `${input.name} itinerary`,
      numberOfItems: input.itinerary?.length || input.durationDays,
      ...(input.itinerary?.length
        ? {
            itemListElement: input.itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: day.day || index + 1,
              name: day.title,
              description: day.description,
            })),
          }
        : {}),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: input.priceInr,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(input.url),
    },
    destination: {
      "@type": "Place",
      name: input.destinationName,
    },
    duration: `P${input.durationDays}D`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function touristDestinationJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
  };
}

export function blogJsonLd(input: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icons/logo.png"),
      },
    },
  };
}

export function itemListJsonLd(input: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; position?: number }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position ?? index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function bookingJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceInr: number;
  departureDate?: string;
  availability?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
    brand: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: input.priceInr,
      availability: input.availability ?? "https://schema.org/InStock",
      url: absoluteUrl(input.url),
      ...(input.departureDate
        ? {
            validFrom: input.departureDate,
            availabilityStarts: input.departureDate,
          }
        : {}),
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

export function reviewAggregateJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
  rating: number;
  reviewCount: number;
  priceInr: number;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
    brand: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: input.rating,
      reviewCount: input.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: input.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      reviewBody: review.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: input.priceInr,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(input.url),
    },
  };
}
