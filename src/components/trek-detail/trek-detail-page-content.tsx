import { TrekDetailViewport } from "@/components/trek-detail/trek-detail-viewport";
import { Seo } from "@/components/seo";
import { allTreks } from "@/data/treks";
import type { TrekDetail } from "@/types/trek-detail";

interface TrekDetailPageContentProps {
  trek: TrekDetail;
}

export function TrekDetailPageContent({ trek }: TrekDetailPageContentProps) {
  const relatedTreks = trek.relatedSlugs
    .map((slug) => allTreks.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <Seo
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Treks", href: "/treks" },
          { label: trek.state, href: `/treks?state=${encodeURIComponent(trek.state)}` },
          { label: trek.title, href: `/treks/${trek.slug}` },
        ]}
        faqs={trek.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))}
        tour={{
          name: trek.title,
          description: trek.summary,
          image: trek.heroImages[0],
          url: `/treks/${trek.slug}`,
          priceInr: trek.basePriceInr,
          durationDays: trek.durationDays,
          destinationName: trek.location,
        }}
      />

      <TrekDetailViewport trek={trek} relatedTreks={relatedTreks} />
    </>
  );
}
