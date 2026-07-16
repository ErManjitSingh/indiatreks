import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";
import { TrekDetailPageContent } from "@/components/trek-detail";
import { getAllTrekDetailSlugs } from "@/data/trek-details";
import { createMetadata, reviewAggregateJsonLd } from "@/lib/seo";
import { getTrekDetail } from "@/services/treks.service";

interface TrekDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTrekDetailSlugs().map((slug) => ({ slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: TrekDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekDetail(slug);
  if (!trek) {
    return createMetadata({
      title: "Trek not found",
      description: "This trek could not be found.",
      canonical: `/treks/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: trek.cms?.seoTitle ?? `${trek.title} | Himalayan Trek`,
    description: trek.cms?.metaDescription ?? trek.summary,
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
  });
}

export default async function TrekDetailPage({ params }: TrekDetailPageProps) {
  const { slug } = await params;
  const trek = await getTrekDetail(slug);
  if (!trek) notFound();

  return (
    <>
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
      <TrekDetailPageContent trek={trek} />
    </>
  );
}
