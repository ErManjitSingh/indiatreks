import { TrekCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-white">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <div className="h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-muted" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2">
          <TrekCardSkeleton />
          <TrekCardSkeleton />
        </div>
      </div>
    </div>
  );
}
