import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekDetailCta({ trek }: { trek: TrekDetail }) {
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I want help with ${trek.title}.`,
  )}`;

  return (
    <Section spacing="md" className="bg-dark text-white">
      <Container>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Ready for the mountains?
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold md:text-5xl">
            Ready For Your Next Himalayan Adventure?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            Secure your seat on {trek.title} or talk to a trek specialist for custom dates and group
            plans.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BookNowButton trekSlug={trek.slug} variant="accent" size="lg">
              Book Now
            </BookNowButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              <Link href={`mailto:${siteConfig.enquiryEmail}`}>Talk To Expert</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" />
                Call
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
