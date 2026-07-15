import dynamic from "next/dynamic";
import { Suspense } from "react";

import { TrekDetailHero } from "@/components/trek-detail/trek-detail-hero";
import { TrekDetailSidebar } from "@/components/trek-detail/trek-detail-sidebar";
import { TrekMediaGallery } from "@/components/trek-detail/trek-media-gallery";
import { TrekOverviewBlock } from "@/components/trek-detail/trek-overview-highlights";
import { TrekQuickInfoBar } from "@/components/trek-detail/trek-quick-info";
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

      <Container className="pb-16 pt-8">
        <TrekQuickInfoBar trek={trek} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <TrekMediaGallery trek={trek} />
            <TrekDetailTabs reviewCount={trek.reviewCount} />
            <div className="space-y-2">
              <TrekOverviewBlock trek={trek} />
              <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
                <TrekItinerary trek={trek} />
                <TrekInclusionsExclusions trek={trek} />
                <TrekPackingList trek={trek} />
                <TrekFaq trek={trek} />
                <TrekReviews trek={trek} />
              </Suspense>
            </div>
          </div>

          <TrekDetailSidebar trek={trek} />
        </div>
      </Container>

      <Suspense fallback={null}>
        <RelatedTreks treks={relatedTreks} />
        <TrekDetailCta trek={trek} />
      </Suspense>
    </div>
  );
}
