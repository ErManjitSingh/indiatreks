import Link from "next/link";
import { Compass, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

interface TreksEmptyStateProps {
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function TreksEmptyState({ hasActiveFilters, onReset }: TreksEmptyStateProps) {
  if (!hasActiveFilters) {
    return (
      <EmptyState
        title="No treks available yet"
        description="New Himalayan departures are being curated. Check back soon."
        icon={<Compass className="h-6 w-6" aria-hidden />}
        action={
          <Button asChild variant="primary">
            <Link href="/treks">Explore All</Link>
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      title="No treks matched your filters"
      description="Try resetting filters or broadening destination, difficulty, or budget."
      icon={<Compass className="h-6 w-6" aria-hidden />}
      action={
        <Button type="button" variant="primary" onClick={onReset}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Reset Filters
        </Button>
      }
    />
  );
}
