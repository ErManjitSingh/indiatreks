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
  noIndex = false,
  type = "website",
}: SeoMeta): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(canonical ?? "");
  const image = absoluteUrl(ogImage ?? siteConfig.ogImage);

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icons/logo.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: Object.values(siteConfig.social),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
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
    ...(input.departureDate
      ? {
          event: {
            "@type": "Event",
            name: input.name,
            startDate: input.departureDate,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "Himalayas, India",
            },
            organizer: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            offers: {
              "@type": "Offer",
              price: input.priceInr,
              priceCurrency: "INR",
              url: absoluteUrl(input.url),
              availability: input.availability ?? "https://schema.org/InStock",
            },
          },
        }
      : {}),
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
