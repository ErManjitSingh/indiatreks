import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";
import { ProgrammaticTrekPage } from "@/components/seo/programmatic-trek-page";
import { TrekDetailPageContent } from "@/components/trek-detail";
import { fetchProgrammaticSeoPage } from "@/lib/api/seo";
import {
  breadcrumbJsonLd,
  createMetadata,
  faqJsonLd,
  reviewAggregateJsonLd,
  tourJsonLd,
} from "@/lib/seo";
import { getAllTrekSlugs, getTrekDetail, getTrekListings } from "@/services/treks.service";

interface TrekDetailPageProps {
  params: Promise<{ slug: string }>;
}

const PROGRAMMATIC_FALLBACK = [
  "himachal",
  "manali",
  "dharamshala",
  "kullu",
  "spiti",
  "easy",
  "moderate",
  "difficult",
  "3-days",
  "4-days",
  "winter",
  "summer",
  "may",
  "june",
];

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const trekSlugs = (await getAllTrekSlugs()).map((slug) => ({ slug }));
  const programmatic = PROGRAMMATIC_FALLBACK.map((slug) => ({ slug }));
  const seen = new Set<string>();
  return [...trekSlugs, ...programmatic].filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export async function generateMetadata({ params }: TrekDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekDetail(slug);
  if (trek) {
    const seo = trek.cms as
      | {
          seoTitle?: string;
          metaDescription?: string;
          focusKeyword?: string;
          ogTitle?: string;
          ogDescription?: string;
          twitterTitle?: string;
          twitterDescription?: string;
        }
      | undefined;

    return createMetadata({
      title: seo?.seoTitle ?? trek.cms?.seoTitle ?? `${trek.title} | Himalayan Trek`,
      description: seo?.metaDescription ?? trek.cms?.metaDescription ?? trek.summary,
      canonical: `/treks/${trek.slug}`,
      keywords: [
        trek.title,
        trek.location,
        trek.region,
        `${trek.title} package`,
        `${trek.title} itinerary`,
        "Dharamshala trek",
        "Dhauladhar trek",
        "Himalayan trek",
        "India Holiday Destinations",
      ],
      ogImage: trek.heroImages[0],
      ogTitle: seo?.ogTitle,
      ogDescription: seo?.ogDescription,
      twitterTitle: seo?.twitterTitle,
      twitterDescription: seo?.twitterDescription,
    });
  }

  const programmatic = await fetchProgrammaticSeoPage(slug);
  if (programmatic) {
    const seo = (programmatic.seo as Record<string, unknown> | undefined) ?? {};
    const keywords = Array.isArray(seo.keywords)
      ? (seo.keywords as string[])
      : [slug, "treks india"];
    return createMetadata({
      title: String(seo.title || programmatic.title),
      description: String(seo.description || programmatic.summary || ""),
      canonical: String(programmatic.path || `/treks/${slug}`),
      keywords,
      ogTitle: seo.ogTitle ? String(seo.ogTitle) : undefined,
      ogDescription: seo.ogDescription ? String(seo.ogDescription) : undefined,
      ogImage: seo.ogImage ? String(seo.ogImage) : undefined,
      twitterTitle: seo.twitterTitle ? String(seo.twitterTitle) : undefined,
      twitterDescription: seo.twitterDescription ? String(seo.twitterDescription) : undefined,
      twitterImage: seo.twitterImage ? String(seo.twitterImage) : undefined,
      noIndex: seo.index === false,
    });
  }

  return createMetadata({
    title: "Trek not found",
    description: "This trek could not be found.",
    canonical: `/treks/${slug}`,
    noIndex: true,
  });
}

export default async function TrekDetailPage({ params }: TrekDetailPageProps) {
  const { slug } = await params;
  const trek = await getTrekDetail(slug);

  if (trek) {
    const faqs = trek.faqs ?? [];
    const listings = await getTrekListings({ limit: 500 });
    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Treks", href: "/treks" },
            { label: trek.title },
          ])}
        />
        <JsonLd
          data={tourJsonLd({
            name: trek.title,
            description: trek.summary,
            image: trek.heroImages[0] ?? "",
            url: `/treks/${trek.slug}`,
            priceInr: trek.basePriceInr,
            durationDays: trek.durationDays,
            destinationName: trek.location || trek.quickInfo?.destination || trek.region,
          })}
        />
        <JsonLd
          data={reviewAggregateJsonLd({
            name: trek.title,
            description: trek.summary,
            image: trek.heroImages[0] ?? "",
            url: `/treks/${trek.slug}`,
            rating: trek.rating,
            reviewCount: trek.reviewCount,
            priceInr: trek.basePriceInr,
            reviews: trek.reviews.map((review) => ({
              author: review.name,
              rating: review.rating,
              comment: review.comment,
              date: review.date,
            })),
          })}
        />
        {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}
        <TrekDetailPageContent trek={trek} listings={listings} />
      </>
    );
  }

  const programmatic = await fetchProgrammaticSeoPage(slug);
  if (programmatic) {
    const treks = await getTrekListings({ limit: 200 });
    return (
      <ProgrammaticTrekPage
        page={{
          slug: String(programmatic.slug),
          path: String(programmatic.path || `/treks/${slug}`),
          title: String(programmatic.title),
          headline: programmatic.headline ? String(programmatic.headline) : undefined,
          summary: programmatic.summary ? String(programmatic.summary) : undefined,
          content: programmatic.content ? String(programmatic.content) : undefined,
          filterType: String(programmatic.filterType || "custom"),
          filterValue: String(programmatic.filterValue || slug),
          faqs: Array.isArray(programmatic.faqs)
            ? (programmatic.faqs as Array<{ question: string; answer: string }>)
            : [],
          seo: programmatic.seo as { title?: string; description?: string } | undefined,
        }}
        treks={treks}
      />
    );
  }

  notFound();
}
