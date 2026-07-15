import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency, formatDate } from "@/utils";

const statusCopy = {
  open: { label: "Open", variant: "success" as const },
  filling: { label: "Filling Fast", variant: "warning" as const },
  "almost-full": { label: "Few Seats Left", variant: "accent" as const },
  "sold-out": { label: "Sold Out", variant: "soft" as const },
};

export function TrekDepartures({ trek }: { trek: TrekDetail }) {
  return (
    <Section spacing="sm" id="departures">
      <Container>
        <SectionHeader
          eyebrow="Fixed Departures"
          title="Confirmed dates & seat inventory"
          description="Join a small group on locked departure windows."
        />
        <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Departure Date</th>
                <th className="px-4 py-3 font-semibold">Available Seats</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {trek.departures.map((item) => {
                const status = statusCopy[item.status];
                return (
                  <tr key={item.id} className="border-t border-border">
                    <td className="px-4 py-4 font-semibold">
                      {formatDate(item.date, {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4">{item.seats}</td>
                    <td className="px-4 py-4 font-heading font-bold">
                      {formatCurrency(item.priceInr)}
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      {item.status === "sold-out" ? (
                        <Button size="sm" variant="outline" disabled>
                          Sold Out
                        </Button>
                      ) : (
                        <Button asChild size="sm" variant="accent">
                          <Link href={`#booking`}>Book Now</Link>
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
