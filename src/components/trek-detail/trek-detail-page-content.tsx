import { TrekDetailViewport } from "@/components/trek-detail/trek-detail-viewport";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

interface TrekDetailPageContentProps {
  trek: TrekDetail;
  listings?: TrekListingItem[];
}

export function TrekDetailPageContent({ trek, listings = [] }: TrekDetailPageContentProps) {
  // `listings` is expected to be related treks (from /related) or a filtered set.
  const relatedTreks = listings.filter((item) => item.slug !== trek.slug).slice(0, 8);

  return <TrekDetailViewport trek={trek} relatedTreks={relatedTreks} />;
}
