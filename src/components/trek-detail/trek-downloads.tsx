import { Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekDownloads({ trek }: { trek: TrekDetail }) {
  return (
    <Section spacing="sm" className="bg-muted/30" id="downloads">
      <Container>
        <SectionHeader
          eyebrow="Downloads"
          title="Plan offline with official documents"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trek.downloads.map((file) => (
            <Button key={file.label} asChild variant="outline" className="h-auto justify-start gap-3 py-4">
              <Link href={file.href}>
                <Download className="h-4 w-4 text-primary" aria-hidden />
                <span className="text-left">
                  <span className="block font-semibold">{file.label}</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    PDF / Policy link
                  </span>
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </Container>
    </Section>
  );
}
