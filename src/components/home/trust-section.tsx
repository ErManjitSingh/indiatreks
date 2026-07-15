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
  icon: LucideIcon;
}> = [
  { title: "Expert Trek Leaders", caption: "Certified & Experienced", icon: UserRound },
  { title: "Small Group", caption: "Max 12–15 People", icon: Users },
  { title: "Safety First", caption: "Standard Protocols", icon: ShieldCheck },
  { title: "Medical Support", caption: "First-Aid Ready", icon: BriefcaseMedical },
  { title: "Eco Friendly", caption: "Leave No Trace", icon: Leaf },
  { title: "Premium Camps", caption: "Comfort in Wild", icon: Tent },
];

export function TrustSection() {
  return (
    <>
      {/* —— Mobile: Why Trek With Us cards —— */}
      <section
        className="bg-white px-4 pt-8 pb-2 md:hidden"
        aria-label="Why trek with us"
        id="trust-features"
      >
        <h2 className="mb-4 font-heading text-lg font-extrabold tracking-tight text-[#14201a] uppercase">
          Why Trek With Us?
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className="rounded-2xl bg-[#f4f6f2] p-3.5 ring-1 ring-[#e4e9df]"
              >
                <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6b8f3c] shadow-sm">
                  <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden />
                </span>
                <p className="font-heading text-[12px] leading-4 font-bold text-[#14201a]">
                  {feature.title}
                </p>
                <p className="mt-1 text-[10px] leading-3.5 text-[#6b7668]">{feature.caption}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* —— Desktop strip unchanged —— */}
      <section
        className="hidden border-y border-[#d8ded0] bg-[#eef2ea] md:block"
        aria-label="Why travelers trust us"
      >
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.title}
                  className={cn(
                    "flex items-center gap-3 border-[#d5dccf] px-4 py-4 sm:px-5 sm:py-5",
                    "border-b sm:border-b",
                    index % 2 === 0 && "sm:border-r",
                    index >= 4 && "sm:border-b-0",
                    "xl:border-b-0 xl:border-r xl:last:border-r-0",
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#6b8f3c] shadow-[inset_0_0_0_1px_#d8ded0]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <strong className="font-heading text-[13px] leading-5 font-bold text-[#14201a]">
                      {feature.title}
                    </strong>
                    <span className="text-[11px] leading-4 font-normal text-[#6b7668]">
                      {feature.caption}
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
