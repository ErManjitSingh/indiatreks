import { TrekCardSkeleton } from "@/components/ui/skeleton";

export default function TreksLoading() {
  return (
    <div className="min-h-[60vh] bg-[#F7F8F6]">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-8">
        <div className="h-12 w-3/4 max-w-xl animate-pulse rounded-lg bg-muted" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-white" />
        <div className="grid gap-4 md:grid-cols-2">
          <TrekCardSkeleton />
          <TrekCardSkeleton />
          <TrekCardSkeleton />
          <TrekCardSkeleton />
        </div>
      </div>
    </div>
  );
}
