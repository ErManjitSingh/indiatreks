import {
  Award,
  BadgeCheck,
  Mountain,
  Smile,
  Star,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/container";

const items = [
  { label: "12+ Years Experience", icon: Award },
  { label: "50,000+ Happy Trekkers", icon: Users },
  { label: "120+ Trek Adventures", icon: Mountain },
  { label: "600+ Verified Reviews", icon: BadgeCheck },
  { label: "4.9 Google Rating", icon: Star },
  { label: "99% Satisfaction", icon: Smile },
];

export function TreksTrustBar() {
  return (
    <section className="border-y border-[#D8E6CF] bg-[#EAF3E3] py-6 md:py-7">
      <Container>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex flex-col items-center text-center">
                <Icon className="h-6 w-6 text-[#2D5A27]" aria-hidden />
                <p className="mt-2 text-xs font-semibold text-[#243528] md:text-[13px]">
                  {item.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
