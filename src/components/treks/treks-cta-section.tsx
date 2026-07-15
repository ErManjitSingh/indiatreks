import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export function TreksCtaSection() {
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I need help choosing a trek.",
  )}`;

  return (
    <Section spacing="md" className="bg-dark text-white">
      <Container>
        <div className="grid items-center gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Need help choosing?
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
              Talk to a Trek Expert
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Tell us your fitness, dates, and mountain mood — we&apos;ll match you with the right
              trail, season, and group departure.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button asChild variant="accent" size="lg" className="flex-1">
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              <Link href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
