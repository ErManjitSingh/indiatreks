import Link from "next/link";

import { JsonLd } from "@/components/seo";
import { TreksPageContent } from "@/components/treks";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from "@/lib/seo";
import type { TrekListingItem } from "@/types";

type ProgrammaticPage = {
  slug: string;
  path: string;
  title: string;
  headline?: string;
  summary?: string;
  content?: string;
  filterType: string;
  filterValue: string;
  faqs?: Array<{ question: string; answer: string }>;
  seo?: {
    title?: string;
    description?: string;
  };
};

function matchesFilter(trek: TrekListingItem, page: ProgrammaticPage): boolean {
  const value = page.filterValue.toLowerCase();
  switch (page.filterType) {
    case "region":
      return (trek.region || "").toLowerCase().includes(value);
    case "destination":
      return (
        (trek.destinationName || "").toLowerCase().includes(value) ||
        (trek.location || "").toLowerCase().includes(value)
      );
    case "difficulty":
      return (trek.difficulty || "").toLowerCase() === value;
    case "duration": {
      const days = Number(String(value).replace(/-days?$/, ""));
      return trek.durationDays === days;
    }
    case "season":
      return (trek.bestSeasons || []).some((s) => String(s).toLowerCase() === value);
    case "month":
      return (trek.months || []).some((m) => String(m).toLowerCase().includes(value));
    default:
      return (
        (trek.title || "").toLowerCase().includes(value) ||
        (trek.region || "").toLowerCase().includes(value) ||
        (trek.destinationName || "").toLowerCase().includes(value)
      );
  }
}

export function ProgrammaticTrekPage({
  page,
  treks,
}: {
  page: ProgrammaticPage;
  treks: TrekListingItem[];
}) {
  const filtered = treks.filter((trek) => matchesFilter(trek, page));
  const faqs = page.faqs ?? [];
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Treks", href: "/treks" },
    { label: page.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <JsonLd
        data={itemListJsonLd({
          name: page.title,
          description: page.summary || page.seo?.description || "",
          url: page.path || `/treks/${page.slug}`,
          items: filtered.slice(0, 20).map((trek) => ({
            name: trek.title,
            url: `/treks/${trek.slug}`,
          })),
        })}
      />

      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/treks" className="hover:text-foreground">
                  Treks
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">{page.title}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {page.headline || page.title}
          </h1>
          {page.summary ? (
            <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">{page.summary}</p>
          ) : null}
          {page.content ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{page.content}</p>
          ) : null}
        </div>
      </section>

      <TreksPageContent treks={filtered.length ? filtered : treks} />

      {faqs.length ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-border/70 bg-background p-4">
                <summary className="cursor-pointer list-none font-medium text-foreground">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
