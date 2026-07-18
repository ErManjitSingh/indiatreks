import dynamic from "next/dynamic";
import { Suspense } from "react";

import { TrekDetailHero } from "@/components/trek-detail/trek-detail-hero";
import { TrekDetailSidebar } from "@/components/trek-detail/trek-detail-sidebar";
import { TrekOverviewBlock } from "@/components/trek-detail/trek-overview-highlights";
import { TrekQuickInfoBar } from "@/components/trek-detail/trek-quick-info";
import { TrekTrustIconBar } from "@/components/trek-detail/trek-trust-icon-bar";
import { Container } from "@/components/ui/container";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

const TrekDetailTabs = dynamic(
  () => import("@/components/trek-detail/trek-detail-tabs").then((m) => m.TrekDetailTabs),
);

const TrekItinerary = dynamic(
  () => import("@/components/trek-detail/trek-itinerary").then((m) => m.TrekItinerary),
);

const TrekInclusionsExclusions = dynamic(() =>
  import("@/components/trek-detail/trek-inclusions").then((m) => m.TrekInclusionsExclusions),
);

const TrekPackingList = dynamic(() =>
  import("@/components/trek-detail/trek-packing-fitness").then((m) => m.TrekPackingList),
);

const TrekFaq = dynamic(() =>
  import("@/components/trek-detail/trek-faq").then((m) => m.TrekFaq),
);

const TrekReviews = dynamic(() =>
  import("@/components/trek-detail/trek-reviews").then((m) => m.TrekReviews),
);

const TrekMediaGallery = dynamic(() =>
  import("@/components/trek-detail/trek-media-gallery").then((m) => m.TrekMediaGallery),
);

const RelatedTreks = dynamic(() =>
  import("@/components/trek-detail/related-treks").then((m) => m.RelatedTreks),
);

const TrekDetailCta = dynamic(() =>
  import("@/components/trek-detail/trek-detail-cta").then((m) => m.TrekDetailCta),
);

interface DesktopTrekDetailProps {
  trek: TrekDetail;
  relatedTreks: TrekListingItem[];
}

export function DesktopTrekDetail({ trek, relatedTreks }: DesktopTrekDetailProps) {
  return (
    <div className="bg-white">
      <TrekDetailHero trek={trek} />
      <TrekQuickInfoBar trek={trek} />

      <Container className="pt-0">
        <TrekDetailTabs reviewCount={trek.reviewCount} />

        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_320px]">
          <div className="min-w-0 space-y-10 xl:contents">
            <div className="min-w-0">
              <TrekOverviewBlock trek={trek} />
            </div>
            <div className="min-w-0">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
                <TrekItinerary trek={trek} />
              </Suspense>
            </div>
          </div>

          <TrekDetailSidebar trek={trek} />
        </div>

        <div className="space-y-2 border-t border-[#e8ece6] pb-12 pt-2">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
            <TrekInclusionsExclusions trek={trek} />
            <div id="essentials" className="scroll-mt-28">
              <TrekPackingList trek={trek} />
            </div>
            <section id="gallery" className="scroll-mt-28 border-t border-[#e8ece6] pt-8">
              <h2 className="mb-4 font-heading text-2xl font-bold text-[#1A1A1A]">Gallery</h2>
              <TrekMediaGallery trek={trek} />
            </section>
            <TrekReviews trek={trek} />
            <TrekFaq trek={trek} />
          </Suspense>
        </div>
      </Container>

      <TrekTrustIconBar />

      <Suspense fallback={null}>
        <RelatedTreks treks={relatedTreks} />
        <TrekDetailCta trek={trek} />
      </Suspense>
    </div>
  );
}
