import { TrekDetailViewport } from "@/components/trek-detail/trek-detail-viewport";
import { Seo } from "@/components/seo";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

interface TrekDetailPageContentProps {
  trek: TrekDetail;
  listings?: TrekListingItem[];
}

export function TrekDetailPageContent({ trek, listings = [] }: TrekDetailPageContentProps) {
  // `listings` is expected to be related treks (from /related) or a filtered set.
  const relatedTreks = listings.filter((item) => item.slug !== trek.slug).slice(0, 8);

  return (
    <>
      <Seo
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Treks", href: "/treks" },
          { label: trek.state, href: `/treks?state=${encodeURIComponent(trek.state)}` },
          { label: trek.title, href: `/treks/${trek.slug}` },
        ]}
        faqs={(trek.faqs ?? []).map((faq) => ({ question: faq.question, answer: faq.answer }))}
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
