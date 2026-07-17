import Image from "next/image";
import Link from "next/link";
import { Headphones, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { siteConfig } from "@/config/site";

export function TreksCtaSection() {
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I need help choosing a trek.",
  )}`;

  return (
    <section className="bg-[#F7F8F6] py-8 md:py-10">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[#163528] text-white shadow-[0_16px_40px_rgba(22,53,40,0.25)]">
          <div className="grid items-center gap-6 p-5 md:grid-cols-[140px_minmax(0,1fr)_auto] md:gap-8 md:p-7 lg:p-8">
            <div className="relative hidden h-[110px] overflow-hidden rounded-xl md:block">
              <Image
                src="/images/treks/camp-1.jpg"
                alt="Camping under the stars on a Himalayan trek"
                fill
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
                sizes="140px"
              />
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight md:text-[1.7rem]">
                Plan Your Trek With Experts
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                Not sure which trail fits your fitness, dates, or group? Talk to our trek advisors
                and get a free personalized shortlist.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Headphones className="h-4 w-4" aria-hidden />
                Talk to Expert
              </Link>
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5A27] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#244820]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
