import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BLUR_DATA_URL } from "@/constants/media";
import { trekCollections } from "@/data/treks";

export function TrekCollections() {
  return (
    <Section spacing="sm" className="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow="Featured Collections"
          title="Start with a trail personality"
          description="Jump into curated lists shaped by season, effort, and experience style."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {trekCollections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width:768px) 50vw, 16vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-heading text-base font-bold text-white">{collection.title}</h3>
                <p className="mt-1 text-xs text-white/75">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
