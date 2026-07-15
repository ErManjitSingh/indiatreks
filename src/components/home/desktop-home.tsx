import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ExpertStatsBar } from "@/components/home/expert-stats-bar";
import { HeroSection } from "@/components/home/hero-section";
import { TrustSection } from "@/components/home/trust-section";

const HeroSearch = dynamic(
  () => import("@/components/home/hero-search").then((m) => m.HeroSearch),
  {
    loading: () => <div className="mx-auto h-24 max-w-5xl animate-pulse rounded-2xl bg-muted" />,
  },
);

const FeaturedTreksSection = dynamic(
  () =>
    import("@/components/home/featured-treks-section").then((m) => m.FeaturedTreksSection),
  {
    loading: () => <div className="mx-auto h-96 max-w-6xl animate-pulse rounded-2xl bg-muted" />,
  },
);

const DestinationsSection = dynamic(
  () =>
    import("@/components/home/destinations-section").then((m) => m.DestinationsSection),
  {
    loading: () => <div className="mx-auto h-72 max-w-6xl animate-pulse rounded-2xl bg-muted" />,
  },
);

export function DesktopHome() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={<div className="mx-auto h-24 max-w-5xl animate-pulse rounded-2xl bg-muted" />}
      >
        <HeroSearch />
      </Suspense>
      <TrustSection />
      <Suspense
        fallback={<div className="mx-auto h-96 max-w-6xl animate-pulse rounded-2xl bg-muted" />}
      >
        <FeaturedTreksSection />
      </Suspense>
      <ExpertStatsBar />
      <Suspense
        fallback={<div className="mx-auto h-72 max-w-6xl animate-pulse rounded-2xl bg-muted" />}
      >
        <DestinationsSection />
      </Suspense>
    </>
  );
}
