import {
  Backpack,
  Headphones,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Tent,
  Users,
  UsersRound,
} from "lucide-react";
import type { ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { whyChooseItems } from "@/data/homepage";

const iconMap: Record<(typeof whyChooseItems)[number]["icon"], ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  heart: HeartPulse,
  users: Users,
  tent: Tent,
  leaf: Leaf,
  backpack: Backpack,
  group: UsersRound,
  headset: Headphones,
};

export function WhyChooseSection() {
  return (
    <Section className="relative overflow-hidden bg-dark text-white" spacing="md">
      <div className="why-choose-glow pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Why India Holiday Destinations"
          description="Premium planning, mountain craft, and care systems built for the Himalayas."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {whyChooseItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/10"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
