"use client";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseMedical,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  Mountain,
  Play,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ComponentType } from "react";

import { TrekCard } from "@/components/home/trek-card";
import { BlogsSection } from "@/components/home/blogs-section";
import { budgetLabelToPriceRange } from "@/lib/trek-filters";
import { getDestinationShowcaseHref } from "@/lib/destination-links";
import { BLUR_DATA_URL } from "@/constants/media";
import { useSiteContent } from "@/providers/site-content-provider";

const heroImage = "/images/heroes/home-mobile-hero.jpg";
const serviceChips: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Expert Trek Leaders", icon: UserRound },
  { title: "Safety First", icon: ShieldCheck },
  { title: "Small Group", icon: Users },
  { title: "Medical Support", icon: BriefcaseMedical },
  { title: "Best Price", icon: BadgeCheck },
];

const whyStats = [
  { value: "10,000+", label: "Happy Trekkers" },
  { value: "250+", label: "Treks Across India" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction" },
];

/** Exact mobile homepage from mockup — shown via parent `md:hidden`. */
export function MobileHome() {
  return (
    <div className="bg-[#f5f6f4]">
      <MobileHero />
      <MobileSearchCard />
      <MobileServiceRow />
      <MobilePopularTreks />
      <MobileDestinations />
      <MobileWhyStats />
      <MobileExpertCta />
      <BlogsSection />
    </div>
  );
}

function MobileHero() {
  return (
    <section className="relative isolate min-h-[58svh] overflow-hidden bg-[#0b1220] text-white">
      <Image
        src={heroImage}
        alt="Night camping under the Milky Way in the Himalayas"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.35)_0%,rgba(8,12,20,0.25)_40%,rgba(8,12,20,0.82)_100%)]" />

      <div className="relative z-[1] flex min-h-[58svh] flex-col justify-end px-4 pt-20 pb-24">
        <p className="text-[10px] font-bold tracking-[0.2em] text-lime uppercase">
          Explore India&apos;s Most Incredible Treks
        </p>
        <h1 className="mt-2 font-heading text-[2.75rem] leading-[1] font-extrabold tracking-tight text-white uppercase">
          <span className="block text-white">Explore India&apos;s</span>
          <span className="mt-1 block font-brush text-[3.5rem] font-bold normal-case leading-[0.9] text-lime">
            Wild Side
          </span>
        </h1>
        <p className="mt-3 max-w-[20rem] text-[13px] leading-relaxed text-white/80">
          Curated Himalayan treks with expert local guides &amp; unforgettable mountain experiences.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/treks"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#244820] bg-[#2D5A27] px-5 py-2.5 text-xs font-bold !text-white"
          >
            Explore Treks
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <button type="button" className="inline-flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10">
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
            </span>
            <span className="text-left text-[11px] leading-tight">
              <span className="block font-semibold">Watch Film</span>
              <span className="text-white/60">Experience Himalayas</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function MobileSearchCard() {
  const router = useRouter();
  const { heroSearchOptions } = useSiteContent();
  const [destination, setDestination] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [month, setMonth] = useState("");
  const [budget, setBudget] = useState("");

  const onSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (difficulty) params.set("difficulty", difficulty.toLowerCase());
    if (duration) {
      if (duration.startsWith("2")) params.set("duration", "1-2,3-4");
      else if (duration.startsWith("4")) params.set("duration", "3-4,5-7");
      else if (duration.startsWith("7")) params.set("duration", "5-7,8+");
      else if (duration.startsWith("10")) params.set("duration", "8+");
    }
    if (month) params.set("month", month);
    if (budget) {
      const range = budgetLabelToPriceRange(budget);
      if (range.priceMin != null) params.set("priceMin", String(range.priceMin));
      if (range.priceMax != null) params.set("priceMax", String(range.priceMax));
    }
    router.push(`/treks${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="relative z-20 -mt-14 px-4">
      <form
        className="rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)]"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <p className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.12em] text-[#2D5A27] uppercase">
          <Mountain className="h-3.5 w-3.5 text-[#6b8f3c]" aria-hidden />
          Find Your Perfect Trek
        </p>

        <div className="grid grid-cols-3 gap-2">
          <MiniField
            icon={MapPin}
            label="Destination"
            placeholder="Any"
            value={destination}
            onChange={setDestination}
            options={heroSearchOptions.destinations}
          />
          <MiniField
            icon={Mountain}
            label="Difficulty"
            placeholder="Any"
            value={difficulty}
            onChange={setDifficulty}
            options={heroSearchOptions.difficulties}
          />
          <MiniField
            icon={Clock3}
            label="Duration"
            placeholder="Any"
            value={duration}
            onChange={setDuration}
            options={heroSearchOptions.durations}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <MiniField
            icon={CalendarDays}
            label="Month"
            placeholder="Any"
            value={month}
            onChange={setMonth}
            options={heroSearchOptions.months}
          />
          <MiniField
            icon={Wallet}
            label="Budget"
            placeholder="Any"
            value={budget}
            onChange={setBudget}
            options={heroSearchOptions.budgets}
          />
        </div>

        <button
          type="submit"
          className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d0d5cc] bg-white py-3.5 text-sm font-extrabold text-[#1A1A1A]"
        >
          <Search className="h-4 w-4" aria-hidden />
          Search Treks
        </button>
      </form>
    </div>
  );
}

function MiniField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="relative rounded-xl border border-[#e8ece6] bg-[#f8faf7] px-2 py-2">
      <span className="mb-1 flex items-center gap-1 text-[9px] font-semibold tracking-wide text-[#6b7668] uppercase">
        <Icon className="h-3 w-3 text-[#6b8f3c]" aria-hidden />
        {label}
      </span>
      <select
        className="h-6 w-full appearance-none bg-transparent pr-4 text-[11px] font-bold text-[#14201a] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 bottom-2.5 h-3 w-3 text-[#9aa39a]" />
    </label>
  );
}

function MobileServiceRow() {
  return (
    <section className="px-4 pt-5" aria-label="Service highlights">
      <ul className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {serviceChips.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex w-[104px] shrink-0 flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3 text-center shadow-[0_4px_14px_rgba(15,23,42,0.05)] ring-1 ring-[#e8ece6]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef5e6] text-[#2D5A27]">
                <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden />
              </span>
              <span className="text-[10px] leading-tight font-bold text-[#14201a]">
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function MobilePopularTreks() {
  const { featuredTreks } = useSiteContent();
  const treks = featuredTreks.slice(0, 4);
  return (
    <section className="px-4 pt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-heading text-base font-extrabold tracking-tight text-[#14201a] uppercase">
          Popular Treks
        </h2>
        <Link href="/treks" className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27]">
          View All
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {treks.map((trek) => (
          <div key={trek.id} className="w-[78%] max-w-[300px] shrink-0">
            <TrekCard trek={trek} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileDestinations() {
  const { destinationShowcases } = useSiteContent();
  return (
    <section className="px-4 pt-7" aria-labelledby="mobile-destinations-heading">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-[#6b8f3c] uppercase">
            <Mountain className="h-3.5 w-3.5" aria-hidden />
            Explore India
          </p>
          <h2
            id="mobile-destinations-heading"
            className="mt-1 font-heading text-lg font-extrabold tracking-tight text-[#14201a]"
          >
            Destinations
          </h2>
          <p className="mt-1 max-w-[16rem] text-[11px] leading-snug text-[#6b7668]">
            From alpine meadows to high desert trails.
          </p>
        </div>
        <Link
          href="/destinations"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#2D5A27]/20 bg-white px-3 py-1.5 text-[11px] font-bold text-[#2D5A27]"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {destinationShowcases.map((dest) => (
          <article
            key={dest.id}
            className="flex w-[82%] max-w-[300px] shrink-0 flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04]"
          >
            <div className="relative aspect-[5/3.6] overflow-hidden">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="300px"
                quality={75}
                placeholder="blur"
                blurDataURL={dest.blurDataURL ?? BLUR_DATA_URL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 rounded-md bg-[#2D5A27] px-2 py-1 text-[9px] font-extrabold tracking-[0.06em] text-white uppercase shadow-sm">
                {dest.badge}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="font-heading text-[17px] font-extrabold tracking-tight text-white">
                  {dest.name}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-3.5">
              <p className="line-clamp-2 text-[12px] leading-relaxed text-[#6b7668]">
                {dest.description}
              </p>

              <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#f4f6f2] px-2.5 py-2.5">
                <DestMeta icon={Mountain} label={dest.trekCountLabel} />
                <DestMeta icon={MapPin} label={dest.destinationCountLabel} />
                <DestMeta icon={CalendarDays} label={dest.bestTime} />
              </div>

              <Link
                href={getDestinationShowcaseHref(dest.slug, dest.name)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#d0d5cc] bg-white py-2.5 text-[12px] font-bold text-[#1A1A1A]"
              >
                Explore Region
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DestMeta({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="min-w-0 text-center">
      <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-[#6b8f3c]" strokeWidth={1.8} aria-hidden />
      <p className="truncate text-[9px] font-semibold leading-tight text-[#4d5a50]">{label}</p>
    </div>
  );
}

function MobileWhyStats() {
  return (
    <section className="px-4 pt-7">
      <h2 className="mb-3 font-heading text-base font-extrabold tracking-tight text-[#14201a]">
        Why Trek With Us?
      </h2>
      <ul className="grid grid-cols-2 gap-2.5">
        {whyStats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl bg-white px-3.5 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)] ring-1 ring-[#e8ece6]"
          >
            <p className="font-heading text-lg font-extrabold text-[#2D5A27]">{stat.value}</p>
            <p className="mt-1 text-[11px] leading-snug text-[#6b7668]">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MobileExpertCta() {
  const { site } = useSiteContent();
  const wa = `https://wa.me/${String(site.whatsapp ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi! I need help choosing a trek.",
  )}`;

  return (
    <section className="px-4 pt-6 pb-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#2D5A27] px-4 py-5 text-white">
        <div className="max-w-[75%]">
          <p className="font-heading text-[15px] font-bold leading-snug">
            Not sure which trek is for you?
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/75">
            Talk to our trek expert and get personalized recommendations.
          </p>
        </div>
        <Link
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="absolute top-1/2 right-4 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white text-[#1A1A1A] shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
