import { Check, X } from "lucide-react";

import type { TrekDetail } from "@/types/trek-detail";
import { cn } from "@/lib/utils";

export function TrekInclusionsExclusions({ trek }: { trek: TrekDetail }) {
  return (
    <div className="space-y-8 border-t border-[#e8ece6] pt-8">
      <section id="inclusions" data-trek-section="inclusions" className="scroll-mt-28">
        <Checklist
          title="Inclusions"
          tone="success"
          items={trek.inclusions}
          icon={<Check className="h-4 w-4" aria-hidden />}
        />
      </section>
      <section id="exclusions" data-trek-section="exclusions" className="scroll-mt-28">
        <Checklist
          title="Exclusions"
          tone="destructive"
          items={trek.exclusions}
          icon={<X className="h-4 w-4" aria-hidden />}
        />
      </section>
    </div>
  );
}

function Checklist({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  tone: "success" | "destructive";
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-[#1A1A1A]">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-[#e8ece6] bg-white px-3.5 py-3 text-sm"
          >
            <span
              className={cn(
                "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                tone === "success" ? "bg-[#E8F5E9] text-[#2D5A27]" : "bg-red-50 text-red-600",
              )}
            >
              {icon}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
