import Link from "next/link";
import { Compass, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { TrekListingCard } from "@/components/treks/trek-listing-card";
import { getPopularTreks } from "@/data/treks";

interface TreksEmptyStateProps {
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function TreksEmptyState({ hasActiveFilters, onReset }: TreksEmptyStateProps) {
  if (!hasActiveFilters) {
    return (
      <EmptyState
        title="No treks available yet"
        description="New Himalayan departures are being curated. Explore collections while you wait."
        icon={<Compass className="h-6 w-6" aria-hidden />}
        action={
          <Button asChild variant="primary">
            <Link href="/treks">Explore All</Link>
          </Button>
        }
      />
    );
  }

  const suggestions = getPopularTreks(3);

  return (
    <div className="space-y-8">
      <EmptyState
        title="No treks matched your filters"
        description="Try resetting filters or explore these popular Himalayan routes."
        icon={<Compass className="h-6 w-6" aria-hidden />}
        action={
          <Button type="button" variant="primary" onClick={onReset}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset Filters
          </Button>
        }
      />

      <div>
        <h3 className="mb-4 font-heading text-lg font-bold">Popular Treks</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {suggestions.map((trek) => (
            <TrekListingCard key={trek.id} trek={trek} />
          ))}
        </div>
      </div>
    </div>
  );
}
