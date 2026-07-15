import { BookNowButton } from "@/components/booking/book-now-button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaButton } from "@/components/ui/cta-button";
import { fixedDepartures } from "@/data/homepage";
import { formatCurrency, formatDate } from "@/utils";

export function FixedDeparturesSection() {
  return (
    <Section className="bg-background" spacing="md" id="fixed-departures">
      <Container>
        <SectionHeader
          eyebrow="Upcoming Fixed Departures"
          title="Confirmed dates. Real seats. Ready to go."
          description="Join small groups on locked departure windows with transparent inventory."
          action={<CtaButton href="/treks?departures=fixed">See all departures</CtaButton>}
        />

        <ol className="relative space-y-0 border-l border-primary/25 pl-6 md:pl-8">
          {fixedDepartures.map((departure, index) => (
            <li key={departure.id} className="relative pb-8 last:pb-0">
              <span
                className="absolute -left-[1.91rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background text-[11px] font-bold text-primary md:-left-[2.15rem]"
                aria-hidden
              >
                {index + 1}
              </span>
              <article className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-xs md:flex-row md:items-center md:justify-between md:p-5">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {formatDate(departure.departureDate)}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-foreground">
                    {departure.trekName}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Starts from {departure.location} · {departure.seatsAvailable} seats available
                  </p>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end lg:flex-row lg:items-center">
                  <p className="font-heading text-xl font-bold text-foreground">
                    {formatCurrency(departure.priceInr)}
                  </p>
                  <BookNowButton
                    trekSlug={departure.trekSlug}
                    departureDate={departure.departureDate}
                    variant="accent"
                  >
                    Join Group
                  </BookNowButton>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
