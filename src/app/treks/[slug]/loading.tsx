import { TrekCardSkeleton } from "@/components/ui/skeleton";

export default function TrekDetailLoading() {
  return (
    <div className="min-h-[70vh] bg-white">
      <div className="aspect-[4/3] animate-pulse bg-muted md:aspect-[21/9]" />
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-muted" />
        <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
        <TrekCardSkeleton />
      </div>
    </div>
  );
}
