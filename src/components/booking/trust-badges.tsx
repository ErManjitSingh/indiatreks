import { BadgeCheck, IndianRupee, ShieldCheck, Star, Users, Wallet } from "lucide-react";

import { TRUST_POINTS } from "@/lib/booking/constants";
import { cn } from "@/lib/utils";

const ICONS = [Star, BadgeCheck, ShieldCheck, IndianRupee, Wallet, Users] as const;

export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
      {TRUST_POINTS.map((label, index) => {
        const Icon = ICONS[index] ?? BadgeCheck;
        return (
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-[#e8ece6] bg-white px-2.5 py-2 text-xs font-medium text-[#333]"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#2D5A27]" />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
