import {
  BriefcaseMedical,
  Handshake,
  HeartPulse,
  Leaf,
  Package,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";

const items: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Experienced Trek Leaders", icon: UsersRound },
  { label: "Safety First Approach", icon: HeartPulse },
  { label: "Quality Equipment", icon: Package },
  { label: "Sustainable Tourism", icon: Leaf },
  { label: "Local Support", icon: Handshake },
  { label: "First Aid Available", icon: BriefcaseMedical },
];

export function TrekTrustIconBar() {
  return (
    <section aria-label="Trust and safety" className="border-y border-[#e8ece6] bg-[#F7FBF6]">
      <Container>
        <ul className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ label, icon: Icon }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2D5A27] shadow-sm ring-1 ring-[#e0e8de]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-xs font-semibold leading-snug text-[#1A1A1A]">{label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
