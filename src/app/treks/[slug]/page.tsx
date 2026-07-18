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
import { siteConfig } from "@/config/site";
import { getTrekDetail, getRelatedTrekListings, getTrekListings } from "@/services/treks.service";

interface TrekDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const listings = await getTrekListings({ limit: 100, page: 1 });
    return listings.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: TrekDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekDetail(slug);
  if (trek) {
    const seo = trek.cms;
    const canonical =
      seo?.canonicalUrl && seo.canonicalUrl.startsWith("http")
        ? seo.canonicalUrl.replace(siteConfig.url.replace(/\/$/, ""), "") || `/treks/${trek.slug}`
        : seo?.canonicalUrl || `/treks/${trek.slug}`;

    return createMetadata({
      title: seo?.seoTitle || `${trek.title} | Himalayan Trek`,
      description: seo?.metaDescription || trek.summary,
      canonical,
      keywords: seo?.keywords?.length
        ? seo.keywords
        : [
            trek.title,
            seo?.focusKeyword,
            trek.location,
            trek.region,
            `${trek.title} package`,
            `${trek.title} itinerary`,
            "Himalayan trek",
            "India Holiday Destinations",
          ].filter(Boolean) as string[],
      ogImage: seo?.ogImage || trek.heroImages[0],
      ogTitle: seo?.ogTitle,
      ogDescription: seo?.ogDescription,
      twitterTitle: seo?.twitterTitle,
      twitterDescription: seo?.twitterDescription,
      twitterImage: seo?.twitterImage,
      twitterCard: seo?.twitterCard,
      noIndex: seo?.noIndex === true,
      noFollow: seo?.noFollow === true,
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
    const listings = await getRelatedTrekListings(slug, 8);
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
            itinerary: (trek.itinerary ?? []).map((day) => ({
              day: day.day,
              title: day.title,
              description: day.description,
            })),
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
            reviews: (trek.reviews ?? []).map((review) => ({
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
    const treks = await getTrekListings({ limit: 100, page: 1 });
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
