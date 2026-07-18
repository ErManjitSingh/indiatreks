import {
  BriefcaseMedical,
  Leaf,
  ShieldCheck,
  Tent,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const features: Array<{
  title: string;
  caption: string;
  desktopTitle?: string;
  desktopCaption?: string;
  icon: LucideIcon;
  tone: {
    card: string;
    iconWrap: string;
    icon: string;
  };
}> = [
  {
    title: "Expert Trek Leaders",
    caption: "Certified & Experienced",
    desktopCaption: "Certified guides",
    icon: UserRound,
    tone: {
      card: "bg-[#eef8e4] ring-[#d4ebbc]",
      iconWrap: "bg-[#8BC34A]",
      icon: "text-white",
    },
  },
  {
    title: "Small Group",
    caption: "Max 12–15 People",
    desktopTitle: "Small Groups",
    desktopCaption: "Intimate journeys",
    icon: Users,
    tone: {
      card: "bg-[#e8f3ff] ring-[#c5def8]",
      iconWrap: "bg-[#3B82F6]",
      icon: "text-white",
    },
  },
  {
    title: "Safety First",
    caption: "Standard Protocols",
    desktopTitle: "Safety First",
    desktopCaption: "SOP checked",
    icon: ShieldCheck,
    tone: {
      card: "bg-[#fff3e8] ring-[#f5d5b8]",
      iconWrap: "bg-[#F97316]",
      icon: "text-white",
    },
  },
  {
    title: "Medical Support",
    caption: "First-Aid Ready",
    desktopTitle: "Medical Ready",
    desktopCaption: "First-aid trained",
    icon: BriefcaseMedical,
    tone: {
      card: "bg-[#fdecef] ring-[#f5c9d2]",
      iconWrap: "bg-[#E11D48]",
      icon: "text-white",
    },
  },
  {
    title: "Eco Friendly",
    caption: "Leave No Trace",
    desktopTitle: "Eco Friendly",
    desktopCaption: "Leave no trace",
    icon: Leaf,
    tone: {
      card: "bg-[#e7f7f2] ring-[#bfe8da]",
      iconWrap: "bg-[#0D9488]",
      icon: "text-white",
    },
  },
  {
    title: "Premium Camps",
    caption: "Comfort in Wild",
    desktopTitle: "Premium Camps",
    desktopCaption: "Wild comfort",
    icon: Tent,
    tone: {
      card: "bg-[#f3eefc] ring-[#ddd0f5]",
      iconWrap: "bg-[#7C3AED]",
      icon: "text-white",
    },
  },
];

export function TrustSection() {
  return (
    <>
      {/* —— Mobile: compact colorful chips —— */}
      <section
        className="bg-white px-4 pt-7 pb-1 md:hidden"
        aria-label="Why trek with us"
        id="trust-features"
      >
        <h2 className="mb-3 font-heading text-base font-extrabold tracking-tight text-[#14201a] uppercase">
          Why Trek With Us?
        </h2>
        <ul className="grid grid-cols-3 gap-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className={cn(
                  "rounded-xl px-2 py-2.5 text-center ring-1",
                  feature.tone.card,
                )}
              >
                <span
                  className={cn(
                    "mx-auto mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full shadow-sm",
                    feature.tone.iconWrap,
                    feature.tone.icon,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </span>
                <p className="font-heading text-[10px] leading-tight font-bold text-[#14201a]">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-[9px] leading-tight text-[#5a665c]">
                  {feature.caption}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* —— Desktop: compact colorful strip —— */}
      <section
        className="hidden border-y border-[#e8ece6] bg-[#fafbf8] py-4 md:block"
        aria-label="Why travelers trust us"
      >
        <Container>
          <ul className="grid grid-cols-3 gap-2.5 lg:grid-cols-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.title}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 ring-1 transition hover:-translate-y-0.5",
                    feature.tone.card,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
                      feature.tone.iconWrap,
                      feature.tone.icon,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <strong className="block truncate font-heading text-[12px] leading-tight font-bold text-[#14201a]">
                      {feature.desktopTitle ?? feature.title}
                    </strong>
                    <span className="mt-0.5 block truncate text-[10px] leading-tight text-[#5a665c]">
                      {feature.desktopCaption ?? feature.caption}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
