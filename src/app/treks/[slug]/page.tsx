import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrekDetailPageContent } from "@/components/trek-detail";
import { getAllTrekDetailSlugs, getTrekDetailBySlug } from "@/data/trek-details";
import { createMetadata } from "@/lib/seo";

interface TrekDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTrekDetailSlugs().map((slug) => ({ slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: TrekDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekDetailBySlug(slug);
  if (!trek) {
    return createMetadata({
      title: "Trek not found",
      description: "This trek could not be found.",
      canonical: `/treks/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${trek.title} | Himalayan Trek`,
    description: trek.summary,
    canonical: `/treks/${trek.slug}`,
    keywords: [
      trek.title,
      trek.location,
      `${trek.title} package`,
      `${trek.title} itinerary`,
      "Himalayan trek",
      "India Holiday Destinations",
    ],
    ogImage: trek.heroImages[0],
  });
}

export default async function TrekDetailPage({ params }: TrekDetailPageProps) {
  const { slug } = await params;
  const trek = getTrekDetailBySlug(slug);
  if (!trek) notFound();

  return <TrekDetailPageContent trek={trek} />;
}
