"use client";

import { useEffect, useState } from "react";

import { fetchBootstrap, type SiteBootstrap } from "@/lib/api/content";

export default function AdminContentPage() {
  const [data, setData] = useState<SiteBootstrap | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bootstrap = await fetchBootstrap();
        if (!cancelled) setData(bootstrap);
      } catch {
        if (!cancelled) setError("Failed to load site content bootstrap.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const homepage = (data?.homepage ?? {}) as Record<string, unknown>;
  const blocks = [
    ["Featured treks", Array.isArray(homepage.featuredTreks) ? homepage.featuredTreks.length : 0],
    ["Destination showcases", Array.isArray(homepage.destinationShowcases) ? homepage.destinationShowcases.length : 0],
    ["Testimonials", Array.isArray(data?.testimonials) ? data!.testimonials!.length : 0],
    ["FAQs", Array.isArray(data?.faqs) ? data!.faqs!.length : 0],
    ["Blogs", Array.isArray(data?.blogs) ? data!.blogs!.length : 0],
    ["Media catalog", Array.isArray(data?.media) ? data!.media!.length : 0],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Site content</h2>
        <p className="mt-1 text-sm text-[#5c6b5f]">
          Homepage + CMS blocks stored in Mongo settings and served by `/content/bootstrap`.
        </p>
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map(([label, count]) => (
          <div key={label} className="rounded-2xl border border-[#d8e0d4] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7668]">{label}</p>
            <p className="mt-2 font-heading text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <h3 className="font-heading text-lg font-bold">Site config</h3>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[#6b7668]">Name</dt>
            <dd className="font-medium">{String(data?.site?.name ?? "—")}</dd>
          </div>
          <div>
            <dt className="text-[#6b7668]">Phone</dt>
            <dd className="font-medium">{String(data?.site?.phone ?? "—")}</dd>
          </div>
          <div>
            <dt className="text-[#6b7668]">Email</dt>
            <dd className="font-medium">{String(data?.site?.email ?? "—")}</dd>
          </div>
          <div>
            <dt className="text-[#6b7668]">WhatsApp</dt>
            <dd className="font-medium">{String(data?.site?.whatsapp ?? "—")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
