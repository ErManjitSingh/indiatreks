import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";
import { AppImage } from "@/components/ui/app-image";
import { fetchDestinationBySlug } from "@/lib/api/destinations";
import {
  breadcrumbJsonLd,
  createMetadata,
  faqJsonLd,
  touristDestinationJsonLd,
} from "@/lib/seo";
import { getTrekListings } from "@/services/treks.service";

export const revalidate = 3600;

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const destination = await fetchDestinationBySlug(slug);
    if (!destination) {
      return createMetadata({
        title: "Destination not found",
        description: "This destination could not be found.",
        canonical: `/destinations/${slug}`,
        noIndex: true,
      });
    }
    const seo = destination.seo ?? {};
    return createMetadata({
      title: String(seo.title || `${destination.name} Treks & Travel Guide`),
      description: String(seo.description || destination.summary || ""),
      canonical: String(seo.canonical || `/destinations/${destination.slug}`),
      keywords: [destination.name, destination.region, destination.state, "treks", "India Holiday Destinations"].filter(
        Boolean,
      ) as string[],
      ogImage: String(seo.ogImage || destination.coverImage || "/images/og-default.jpg"),
      ogTitle: seo.ogTitle ? String(seo.ogTitle) : undefined,
      ogDescription: seo.ogDescription ? String(seo.ogDescription) : undefined,
      twitterTitle: seo.twitterTitle ? String(seo.twitterTitle) : undefined,
      twitterDescription: seo.twitterDescription ? String(seo.twitterDescription) : undefined,
      noIndex: seo.index === false,
    });
  } catch {
    return createMetadata({
      title: "Destination not found",
      description: "This destination could not be found.",
      canonical: `/destinations/${slug}`,
      noIndex: true,
    });
  }
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  let destination;
  try {
    destination = await fetchDestinationBySlug(slug);
  } catch {
    destination = null;
  }
  if (!destination) notFound();

  const treks = await getTrekListings({ limit: 200 });
  const nearby = treks
    .filter(
      (t) =>
        t.destinationName?.toLowerCase().includes(destination.name.toLowerCase()) ||
        t.region?.toLowerCase().includes((destination.region || "").toLowerCase()),
    )
    .slice(0, 8);

  const faqs = destination.faqs ?? [];
  const howToReach = String(destination.howToReach || "");
  const weatherNotes = String(destination.weatherNotes || "");
  const description = String(destination.description || destination.summary || "");
  const highlights = destination.highlights || [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: destination.name },
        ])}
      />
      <JsonLd
        data={touristDestinationJsonLd({
          name: destination.name,
          description: destination.summary,
          image: destination.coverImage || "/images/og-default.jpg",
          url: `/destinations/${destination.slug}`,
        })}
      />
      {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}

      <section className="relative min-h-[42vh] w-full overflow-hidden">
        <AppImage
          src={destination.coverImage || "/images/og-default.jpg"}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          rounded={false}
          containerClassName="absolute inset-0 rounded-none"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-6xl flex-col justify-end px-4 pb-10">
          <p className="text-sm text-white/80">
            {[destination.region, destination.state].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-white md:text-5xl">{destination.name}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/90">{destination.summary}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <section>
          <h2 className="font-heading text-2xl font-bold">About {destination.name}</h2>
          <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{description}</p>
          {highlights.length ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="text-sm text-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {weatherNotes ? (
          <section>
            <h2 className="font-heading text-2xl font-bold">Weather</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{weatherNotes}</p>
          </section>
        ) : null}

        {howToReach ? (
          <section>
            <h2 className="font-heading text-2xl font-bold">How to reach</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{howToReach}</p>
          </section>
        ) : null}

        <section>
          <h2 className="font-heading text-2xl font-bold">Nearby treks</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((trek) => (
              <Link
                key={trek.slug}
                href={`/treks/${trek.slug}`}
                className="rounded-xl border border-border/70 p-3 transition hover:border-foreground/30"
              >
                <p className="font-medium text-foreground">{trek.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {trek.durationDays}D · {trek.difficulty}
                </p>
              </Link>
            ))}
            {!nearby.length ? (
              <p className="text-sm text-muted-foreground col-span-full">
                Treks for this destination will appear as they are published.
              </p>
            ) : null}
          </div>
        </section>

        {faqs.length ? (
          <section>
            <h2 className="font-heading text-2xl font-bold">FAQ</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-border/70 p-4">
                  <summary className="cursor-pointer font-medium">{faq.question}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
