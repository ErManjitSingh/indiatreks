import {
  Headphones,
  HeartPulse,
  Leaf,
  ShieldCheck,
  UsersRound,
  Wallet,
} from "lucide-react";
import type { ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const items: Array<{ title: string; description: string; icon: ComponentType<{ className?: string }> }> = [
  {
    title: "Certified Guides",
    description: "Wilderness and mountain-trained leaders on every departure.",
    icon: ShieldCheck,
  },
  {
    title: "Safety First",
    description: "Briefings, pacing protocols, and emergency readiness.",
    icon: HeartPulse,
  },
  {
    title: "Medical Support",
    description: "First-aid kits and altitude-aware monitoring.",
    icon: HeartPulse,
  },
  {
    title: "Eco Friendly",
    description: "Leave-no-trace camps and local community partners.",
    icon: Leaf,
  },
  {
    title: "Small Groups",
    description: "Intimate batches for better attention and experience.",
    icon: UsersRound,
  },
  {
    title: "Transparent Pricing",
    description: "Clear inclusions with no last-minute trail surprises.",
    icon: Wallet,
  },
  {
    title: "24×7 Assistance",
    description: "Support from enquiry through your summit morning.",
    icon: Headphones,
  },
];

export function WhyBookWithUs() {
  return (
    <Section spacing="sm" id="why-us">
      <Container>
        <SectionHeader
          eyebrow="Why Book With Us"
          title="Trust built for the Himalayas"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
