"use client";

import {
  Award,
  Briefcase,
  Compass,
  HeartHandshake,
  Leaf,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { trekImages } from "@/constants/trek-images";
import { adventureStats } from "@/data/homepage";
import { useSiteContent } from "@/providers/site-content-provider";
import { cn } from "@/lib/utils";

const values: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Safety First",
    description:
      "Pre-trek briefings, weather checks, and certified first-aid support on every departure.",
    icon: ShieldCheck,
  },
  {
    title: "Local Expertise",
    description:
      "Himalayan-born guides who know trails, communities, and seasonal conditions intimately.",
    icon: MapPin,
  },
  {
    title: "Small Groups",
    description:
      "Intimate batches of 12–15 trekkers for better pacing, safety, and personal attention.",
    icon: Users,
  },
  {
    title: "Eco Conscious",
    description:
      "Leave No Trace camping, waste segregation, and respect for fragile mountain ecosystems.",
    icon: Leaf,
  },
];

const safetyPoints = [
  "Wilderness First Aid trained trek leaders on every group",
  "Medical kits, oximeters, and emergency evacuation protocols",
  "Daily weather and trail condition assessments",
  "Mandatory fitness and gear checks before departure",
  "24×7 operations desk for on-trail coordination",
];

export function AboutPageContent() {
  const { site } = useSiteContent();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Guiding India to Its Wildest Places"
        description="India Holiday Destinations is a Himalayan trekking company built on local expertise, small-group adventures, and uncompromising safety — from weekend escapes to high-altitude expeditions."
        image={trekImages.mountains2}
        imageAlt="Trekkers on a Himalayan ridge"
      />

      <section className="border-b border-border bg-white py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#2D5A27] uppercase">
                Our Story
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
                Born in the Mountains, Built for Trekkers
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#5c6658]">
                <p>
                  What started as a passion for Dhauladhar trails around Dharamshala has grown
                  into one of India&apos;s most trusted trekking platforms — curating 250+ Himalayan
                  adventures across Himachal Pradesh, Uttarakhand, and beyond.
                </p>
                <p>
                  We believe the mountains should be accessible without compromising safety or
                  authenticity. Every itinerary is designed with realistic pacing, experienced
                  local guides, and transparent pricing — so you can focus on the views, not the
                  logistics.
                </p>
                <p>
                  Whether it&apos;s your first Triund weekend or a multi-day high-altitude
                  crossing, our team is with you from enquiry to summit and back.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/treks">Explore Treks</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contact">Talk to Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(27,48,34,0.15)] ring-1 ring-black/5">
              <Image
                src={trekImages.landscape1}
                alt="Himalayan valley at sunrise"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="font-heading text-lg font-bold text-white">
                  Curated Himalayan Experiences
                </p>
                <p className="mt-1 text-sm text-white/75">
                  Dharamshala · Manali · Uttarakhand · Ladakh
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f2] py-10 md:py-12">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {adventureStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl bg-white px-4 py-5 text-center shadow-sm ring-1 ring-black/[0.04]"
              >
                <p className="font-display text-2xl font-semibold text-[#1B3022] md:text-3xl">
                  {stat.value.toLocaleString("en-IN")}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#6b7668]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#2D5A27] uppercase">
              What We Stand For
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a]">
              The Values Behind Every Trek
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e3e8de] bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4e8] text-[#2D5A27]">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-[#14201a]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7668]">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="safety" className="scroll-mt-24 bg-[#1B3022] py-12 text-white md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-lime uppercase">
                Safety Standards
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Your Safety Is Non-Negotiable
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                Mountains demand respect. Our standard operating procedures are designed around
                real Himalayan conditions — not checkbox compliance. Every trek leader is trained
                to pause, reassess, and adapt when weather or group fitness requires it.
              </p>
              <ul className="mt-6 space-y-3">
                {safetyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Award, title: "Certified Leaders", caption: "WFA & mountaineering trained" },
                { icon: HeartHandshake, title: "Guest Care", caption: "Dedicated trek coordinator" },
                { icon: Compass, title: "Route Planning", caption: "Season-aware itineraries" },
                { icon: Mountain, title: "Altitude Ready", caption: "Acclimatization built in" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <card.icon className="h-5 w-5 text-lime" aria-hidden />
                  <p className="mt-3 font-heading text-sm font-bold">{card.title}</p>
                  <p className="mt-1 text-xs text-white/65">{card.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="careers" className="scroll-mt-24 border-t border-border bg-[#f4f5f2] py-12 md:py-16">
        <Container>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.04] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eef4e8] px-3 py-1 text-[11px] font-bold tracking-wide text-[#2D5A27] uppercase">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden />
                  Careers
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[#1a1a1a] md:text-3xl">
                  Join the Mountain Team
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6b7668]">
                  We&apos;re always looking for passionate trek leaders, operations coordinators,
                  and content creators who live and breathe the outdoors. If the Himalayas are
                  your office, we&apos;d love to hear from you.
                </p>
                <p className="mt-4 text-sm text-[#6b7668]">
                  Send your resume to{" "}
                  <a
                    href={`mailto:${site.email}?subject=Career%20Enquiry`}
                    className="font-semibold text-[#2D5A27] hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
              <Button asChild variant="primary" size="lg" className="shrink-0">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#1B3022] py-12 text-white md:py-14">
        <Container>
          <div className={cn("text-center")}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Ready for Your Next Adventure?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">
              Browse curated treks or speak with our specialists — we&apos;ll help you pick the
              perfect trail for your fitness, budget, and dates.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/treks">View All Treks</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
