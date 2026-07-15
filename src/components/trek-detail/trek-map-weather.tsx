import { Map as MapIcon, Mountain } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekMapSection({ trek }: { trek: TrekDetail }) {
  return (
    <Section spacing="sm" id="map">
      <Container>
        <SectionHeader
          eyebrow="Map & Elevation"
          title="Route overview"
          description={trek.map.overview}
        />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl border border-border bg-[linear-gradient(145deg,#0f5132_0%,#14532d_40%,#111827_100%)] p-8 text-white shadow-lg">
            <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
              <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
              <div className="absolute bottom-0 right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative text-center">
              <MapIcon className="mx-auto h-10 w-10 text-accent" aria-hidden />
              <p className="mt-4 font-heading text-2xl font-bold">Interactive Route Placeholder</p>
              <p className="mt-2 max-w-md text-sm text-white/70">
                Camp markers and GPS trail overlay will connect to live mapping in a later phase.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-lg font-bold">Camp locations</h3>
              <ul className="mt-3 space-y-2">
                {trek.map.camps.map((camp) => (
                  <li key={camp} className="rounded-xl bg-muted/60 px-3 py-2 text-sm font-medium">
                    {camp}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <h3 className="inline-flex items-center gap-2 font-heading text-lg font-bold">
                <Mountain className="h-4 w-4 text-primary" aria-hidden />
                Elevation profile
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {trek.map.elevationNote}
              </p>
              <div className="mt-4 flex h-24 items-end gap-1 rounded-2xl bg-muted/50 p-3">
                {[30, 45, 55, 70, 88, 76, 60, 48].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-primary/70"
                    style={{ height: `${h}%` }}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Illustrative elevation profile</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TrekWeather({ trek }: { trek: TrekDetail }) {
  return (
    <Section spacing="sm" className="bg-muted/20" id="weather">
      <Container>
        <SectionHeader
          eyebrow="Weather Information"
          title="Month-by-month conditions"
          description="Plan around temperature bands, snow likelihood, and rainfall patterns."
        />
        <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Month</th>
                <th className="px-4 py-3 font-semibold">Temperature</th>
                <th className="px-4 py-3 font-semibold">Snow</th>
                <th className="px-4 py-3 font-semibold">Rainfall</th>
                <th className="px-4 py-3 font-semibold">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {trek.weather.map((row) => (
                <tr key={row.month} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{row.month}</td>
                  <td className="px-4 py-3">
                    {row.tempMinC}°C – {row.tempMaxC}°C
                  </td>
                  <td className="px-4 py-3">{row.snowfall}</td>
                  <td className="px-4 py-3">{row.rainfall}</td>
                  <td className="px-4 py-3">
                    {row.recommended ? (
                      <Badge variant="success">Best Time</Badge>
                    ) : (
                      <Badge variant="soft">Optional</Badge>
                    )}
                    {row.note ? (
                      <span className="ml-2 text-xs text-muted-foreground">{row.note}</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
