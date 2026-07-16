import { Suspense } from "react";

import { TreksExplorer } from "@/components/treks/treks-explorer";
import { Seo } from "@/components/seo";
import { TrekCardSkeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { TrekListingItem } from "@/types/trek-listing";

interface TreksPageContentProps {
  treks: TrekListingItem[];
}

export function TreksPageContent({ treks }: TreksPageContentProps) {
  return (
    <>
      <Seo
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Treks", href: "/treks" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Explore All Himalayan Treks",
            description:
              "Browse premium Himalayan treks by destination, difficulty, duration, season, and budget.",
            url: `${siteConfig.url}/treks`,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: treks.length,
              itemListElement: treks.map((trek, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${siteConfig.url}/treks/${trek.slug}`,
                name: trek.title,
              })),
            },
          }),
        }}
      />

      <Suspense
        fallback={
          <div className="bg-[#F7F8F6]">
            <Container className="py-10">
              <div className="mb-8 h-16 max-w-xl animate-pulse rounded-lg bg-muted" />
              <div className="grid gap-5 sm:grid-cols-2">
                <TrekCardSkeleton />
                <TrekCardSkeleton />
                <TrekCardSkeleton />
                <TrekCardSkeleton />
              </div>
            </Container>
          </div>
        }
      >
        <TreksExplorer initialTreks={treks} />
      </Suspense>
    </>
  );
}
