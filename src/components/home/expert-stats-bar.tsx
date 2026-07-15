import { MessageCircle, Mountain } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

const stats = [
  { value: "10,000+", label: "Happy Trekkers" },
  { value: "250+", label: "Treks Across India" },
  { value: "15+", label: "Years of Experience" },
  { value: "98%", label: "Customer Satisfaction" },
];

export function ExpertStatsBar() {
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I need help choosing the right trek.",
  )}`;

  return (
    <section className="border-y border-[#d8ded0] bg-[#eef2ea]" aria-label="Trek stats and expert help">
      <Container>
        <div className="flex flex-col gap-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="hidden shrink-0 text-[#6b8f3c] sm:inline-flex">
              <Mountain className="h-10 w-10" strokeWidth={1.25} aria-hidden />
            </span>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 sm:gap-x-8">
              {stats.map((stat) => (
                <li key={stat.label} className="min-w-0">
                  <p className="font-heading text-base font-extrabold tracking-tight text-[#14201a] sm:text-lg">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#6b7668] sm:text-xs">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#d5dccf] pt-4 sm:flex-row sm:items-center sm:gap-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="max-w-xs text-[12px] leading-relaxed text-[#4d5a50] sm:text-[13px]">
              Not sure which trek is for you? Talk to our trek expert and get personalized
              recommendations.
            </p>
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#d0d5cc] bg-white px-4 py-2.5 text-xs font-bold text-[#1A1A1A] shadow-sm transition hover:bg-[#F7F8F6] sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat with Expert
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
