"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  FileText,
  Hash,
  ImageIcon,
  IndianRupee,
  Info,
  ListChecks,
  MapPin,
  Mountain,
  Ruler,
  Settings2,
  Type,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import {
  adminCreateTrek,
  adminUpdateTrek,
  arrayToLines,
  getErrorMessage,
  linesToArray,
  type AdminDoc,
} from "@/lib/api/admin";
import { cn } from "@/lib/utils";

type TrekFormState = {
  title: string;
  slug: string;
  summary: string;
  overview: string;
  location: string;
  state: string;
  region: string;
  destinationName: string;
  difficulty: string;
  durationDays: string;
  durationNights: string;
  maxAltitude: string;
  distanceKm: string;
  basePriceInr: string;
  originalPriceInr: string;
  seatsLeft: string;
  status: string;
  heroImages: string;
  highlights: string;
  inclusions: string;
  exclusions: string;
  months: string;
  relatedSlugs: string;
  itineraryJson: string;
  seoTitle: string;
  seoDescription: string;
};

type TabId =
  | "basic"
  | "details"
  | "itinerary"
  | "inclusions"
  | "media"
  | "seo";

const TABS: { id: TabId; label: string; icon: typeof Info }[] = [
  { id: "basic", label: "Basic Information", icon: Info },
  { id: "details", label: "Details", icon: FileText },
  { id: "itinerary", label: "Itinerary", icon: ListChecks },
  { id: "inclusions", label: "Inclusions & Exclusions", icon: Check },
  { id: "media", label: "Images & Media", icon: ImageIcon },
  { id: "seo", label: "SEO & Settings", icon: Settings2 },
];

function fromDoc(doc?: AdminDoc | null): TrekFormState {
  const seo = (doc?.seo as { title?: string; description?: string } | undefined) ?? {};
  const itinerary = Array.isArray(doc?.itinerary) ? doc!.itinerary : [];
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    summary: String(doc?.summary ?? ""),
    overview: String(doc?.overview ?? ""),
    location: String(doc?.location ?? ""),
    state: String(doc?.state ?? ""),
    region: String(doc?.region ?? ""),
    destinationName: String(doc?.destinationName ?? ""),
    difficulty: String(doc?.difficulty ?? "moderate"),
    durationDays: String(doc?.durationDays ?? "1"),
    durationNights: String(doc?.durationNights ?? "0"),
    maxAltitude: String(doc?.maxAltitude ?? "0"),
    distanceKm: String(doc?.distanceKm ?? "0"),
    basePriceInr: String(doc?.basePriceInr ?? "0"),
    originalPriceInr: doc?.originalPriceInr != null ? String(doc.originalPriceInr) : "",
    seatsLeft: String(doc?.seatsLeft ?? "0"),
    status: String(doc?.status ?? "draft"),
    heroImages: arrayToLines(doc?.heroImages),
    highlights: arrayToLines(doc?.highlights),
    inclusions: arrayToLines(doc?.inclusions),
    exclusions: arrayToLines(doc?.exclusions),
    months: arrayToLines(doc?.months),
    relatedSlugs: arrayToLines(doc?.relatedSlugs),
    itineraryJson: JSON.stringify(itinerary, null, 2),
    seoTitle: String(seo.title ?? ""),
    seoDescription: String(seo.description ?? ""),
  };
}

function toPayload(form: TrekFormState) {
  let itinerary: unknown[] = [];
  try {
    const parsed = JSON.parse(form.itineraryJson || "[]");
    itinerary = Array.isArray(parsed) ? parsed : [];
  } catch {
    throw new Error("Itinerary JSON is invalid. Fix the Itinerary tab before saving.");
  }

  return {
    title: form.title.trim(),
    slug: form.slug.trim() || undefined,
    summary: form.summary,
    overview: form.overview,
    location: form.location,
    state: form.state,
    region: form.region,
    destinationName: form.destinationName,
    difficulty: form.difficulty,
    durationDays: Number(form.durationDays) || 1,
    durationNights: Number(form.durationNights) || 0,
    maxAltitude: Number(form.maxAltitude) || 0,
    distanceKm: Number(form.distanceKm) || 0,
    basePriceInr: Number(form.basePriceInr) || 0,
    originalPriceInr: form.originalPriceInr ? Number(form.originalPriceInr) : undefined,
    seatsLeft: Number(form.seatsLeft) || 0,
    status: form.status,
    heroImages: linesToArray(form.heroImages),
    highlights: linesToArray(form.highlights),
    inclusions: linesToArray(form.inclusions),
    exclusions: linesToArray(form.exclusions),
    months: linesToArray(form.months),
    relatedSlugs: linesToArray(form.relatedSlugs),
    itinerary,
    seo: {
      title: form.seoTitle || undefined,
      description: form.seoDescription || undefined,
    },
  };
}

function FieldShell({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-semibold text-[#374151]">
        {label}
        {required ? <span className="text-[#EF4444]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: typeof Type }) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
        aria-hidden
      />
      <input
        {...props}
        className={cn(
          "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-9 pr-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#22C55E]/50 focus:ring-2 focus:ring-[#22C55E]/15",
          className,
        )}
      />
    </div>
  );
}

function IconSelect({
  icon: Icon,
  className,
  children,
  ...props
}: React.ComponentProps<"select"> & { icon: typeof Type }) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
        aria-hidden
      />
      <select
        {...props}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-[#E5E7EB] bg-white pl-9 pr-8 text-sm capitalize text-[#111827] outline-none transition focus:border-[#22C55E]/50 focus:ring-2 focus:ring-[#22C55E]/15",
          className,
        )}
      >
        {children}
      </select>
    </div>
  );
}

const textareaClass =
  "min-h-[120px] w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#22C55E]/50 focus:ring-2 focus:ring-[#22C55E]/15";

export function TrekForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<TrekFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabId>("basic");
  const isEdit = Boolean(initial?._id);

  const previewHref = useMemo(() => {
    const slug = form.slug.trim() || String(initial?.slug ?? "");
    return slug ? `/treks/${slug}` : "/treks";
  }, [form.slug, initial?.slug]);

  function set<K extends keyof TrekFormState>(key: K, value: TrekFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateTrek(String(initial!._id), payload);
        toast.success("Trek updated");
        router.refresh();
      } else {
        const created = await adminCreateTrek(payload);
        toast.success("Trek created");
        router.replace(`/admin/treks/${created._id}/edit`);
        return;
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save trek"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
        <div className="absolute inset-0">
          <Image
            src="/images/admin/hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1100px"
            className="object-cover object-[center_35%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/40" />
        </div>
        <div className="relative space-y-4 px-5 py-5 md:px-7 md:py-6">
          <Link
            href="/admin/treks"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4B5563] transition hover:text-[#111827]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Treks
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Mountain className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111827]">
                  {isEdit ? "Edit Trek" : "Add New Trek"}
                </h1>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {isEdit
                    ? "Update trek information, pricing, itinerary and more."
                    : "Create a new trekking package with pricing, itinerary and media."}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <Link
                href={previewHref}
                target="_blank"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-sm font-semibold text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
              >
                <Eye className="h-4 w-4 text-[#6B7280]" aria-hidden />
                Preview
              </Link>
              <button
                type="submit"
                form="trek-form"
                disabled={saving}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22C55E] px-4 text-sm font-bold text-white shadow-sm shadow-[#22C55E]/25 transition hover:bg-[#16A34A] disabled:opacity-60"
              >
                <Check className="h-4 w-4" aria-hidden />
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="overflow-x-auto rounded-2xl border border-[#E8ECF1] bg-white px-2 shadow-sm">
        <nav className="flex min-w-max gap-1">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex items-center gap-2 border-b-2 px-3.5 py-3.5 text-sm font-semibold transition",
                  active
                    ? "border-[#22C55E] text-[#16A34A]"
                    : "border-transparent text-[#6B7280] hover:text-[#111827]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <form id="trek-form" onSubmit={onSubmit} className="space-y-5">
        <section
          className={cn(
            "rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "basic" && "hidden",
          )}
        >
            <div className="mb-5">
              <h2 className="font-heading text-lg font-bold text-[#111827]">Basic Information</h2>
              <p className="mt-1 text-sm text-[#6B7280]">Enter the basic details about the trek.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell label="Title" required>
                <IconInput
                  icon={Type}
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Trek title"
                />
              </FieldShell>
              <FieldShell label="Slug">
                <IconInput
                  icon={Hash}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="auto from title if empty"
                />
              </FieldShell>
              <FieldShell label="Difficulty" required>
                <IconSelect
                  icon={Mountain}
                  value={form.difficulty}
                  onChange={(e) => set("difficulty", e.target.value)}
                >
                  {["easy", "moderate", "difficult", "challenging"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </IconSelect>
              </FieldShell>
              <FieldShell label="Status" required>
                <IconSelect
                  icon={Settings2}
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  {["draft", "published", "archived"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </IconSelect>
              </FieldShell>
              <FieldShell label="Region">
                <IconInput
                  icon={MapPin}
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  placeholder="e.g. Dharamshala"
                />
              </FieldShell>
              <FieldShell label="Destination Name">
                <IconInput
                  icon={MapPin}
                  value={form.destinationName}
                  onChange={(e) => set("destinationName", e.target.value)}
                  placeholder="Destination hub name"
                />
              </FieldShell>
              <FieldShell label="Location">
                <IconInput
                  icon={MapPin}
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Dhauladhar, Himachal Pradesh"
                />
              </FieldShell>
              <FieldShell label="State">
                <IconInput
                  icon={MapPin}
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  placeholder="e.g. Himachal Pradesh"
                />
              </FieldShell>
              <FieldShell label="Duration (Days)" required>
                <IconInput
                  icon={Hash}
                  type="number"
                  min={1}
                  required
                  value={form.durationDays}
                  onChange={(e) => set("durationDays", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Duration (Nights)">
                <IconInput
                  icon={Hash}
                  type="number"
                  min={0}
                  value={form.durationNights}
                  onChange={(e) => set("durationNights", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Base Price (INR)" required>
                <IconInput
                  icon={IndianRupee}
                  type="number"
                  min={0}
                  required
                  value={form.basePriceInr}
                  onChange={(e) => set("basePriceInr", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Original Price (INR)">
                <IconInput
                  icon={IndianRupee}
                  type="number"
                  min={0}
                  value={form.originalPriceInr}
                  onChange={(e) => set("originalPriceInr", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Max Altitude (ft)">
                <IconInput
                  icon={Mountain}
                  type="number"
                  value={form.maxAltitude}
                  onChange={(e) => set("maxAltitude", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Distance (km)">
                <IconInput
                  icon={Ruler}
                  type="number"
                  value={form.distanceKm}
                  onChange={(e) => set("distanceKm", e.target.value)}
                />
              </FieldShell>
            </div>
        </section>

        <section
          className={cn(
            "space-y-4 rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "details" && "hidden",
          )}
        >
            <div className="mb-1">
              <h2 className="font-heading text-lg font-bold text-[#111827]">Details</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Summary, overview, highlights and availability.
              </p>
            </div>
            <FieldShell label="Summary">
              <textarea
                className={textareaClass}
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder="Short summary shown on cards"
              />
            </FieldShell>
            <FieldShell label="Overview">
              <textarea
                className={cn(textareaClass, "min-h-[160px]")}
                value={form.overview}
                onChange={(e) => set("overview", e.target.value)}
                placeholder="Full trek overview"
              />
            </FieldShell>
            <FieldShell label="Highlights (one per line)">
              <textarea
                className={textareaClass}
                value={form.highlights}
                onChange={(e) => set("highlights", e.target.value)}
              />
            </FieldShell>
            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell label="Best months (one per line)">
                <textarea
                  className={textareaClass}
                  value={form.months}
                  onChange={(e) => set("months", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Seats left">
                <IconInput
                  icon={Hash}
                  type="number"
                  min={0}
                  value={form.seatsLeft}
                  onChange={(e) => set("seatsLeft", e.target.value)}
                />
              </FieldShell>
            </div>
            <FieldShell label="Related trek slugs (one per line)">
              <textarea
                className={textareaClass}
                value={form.relatedSlugs}
                onChange={(e) => set("relatedSlugs", e.target.value)}
              />
            </FieldShell>
        </section>

        <section
          className={cn(
            "space-y-4 rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "itinerary" && "hidden",
          )}
        >
            <div>
              <h2 className="font-heading text-lg font-bold text-[#111827]">Itinerary</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Edit day-wise itinerary as JSON. Keep day, title, description and optional fields.
              </p>
            </div>
            <FieldShell label="Itinerary JSON">
              <textarea
                className={cn(textareaClass, "min-h-[360px] font-mono text-xs")}
                value={form.itineraryJson}
                onChange={(e) => set("itineraryJson", e.target.value)}
                spellCheck={false}
              />
            </FieldShell>
        </section>

        <section
          className={cn(
            "space-y-4 rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "inclusions" && "hidden",
          )}
        >
            <div>
              <h2 className="font-heading text-lg font-bold text-[#111827]">
                Inclusions & Exclusions
              </h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                One item per line for what is included and excluded.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell label="Inclusions">
                <textarea
                  className={cn(textareaClass, "min-h-[220px]")}
                  value={form.inclusions}
                  onChange={(e) => set("inclusions", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Exclusions">
                <textarea
                  className={cn(textareaClass, "min-h-[220px]")}
                  value={form.exclusions}
                  onChange={(e) => set("exclusions", e.target.value)}
                />
              </FieldShell>
            </div>
        </section>

        <section
          className={cn(
            "space-y-4 rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "media" && "hidden",
          )}
        >
            <div>
              <h2 className="font-heading text-lg font-bold text-[#111827]">Images & Media</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Hero image URLs used on trek cards and detail pages.
              </p>
            </div>
            <FieldShell label="Hero image URLs (one per line)">
              <textarea
                className={cn(textareaClass, "min-h-[200px]")}
                value={form.heroImages}
                onChange={(e) => set("heroImages", e.target.value)}
                placeholder="/images/treks/example.jpg"
              />
            </FieldShell>
            {linesToArray(form.heroImages).length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {linesToArray(form.heroImages).slice(0, 6).map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
        </section>

        <section
          className={cn(
            "space-y-4 rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-6",
            tab !== "seo" && "hidden",
          )}
        >
            <div>
              <h2 className="font-heading text-lg font-bold text-[#111827]">SEO & Settings</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Search metadata and publish settings for this trek.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell label="SEO title">
                <IconInput
                  icon={Type}
                  value={form.seoTitle}
                  onChange={(e) => set("seoTitle", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Status">
                <IconSelect
                  icon={Settings2}
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  {["draft", "published", "archived"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </IconSelect>
              </FieldShell>
            </div>
            <FieldShell label="SEO description">
              <textarea
                className={textareaClass}
                value={form.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
              />
            </FieldShell>
        </section>
      </form>
    </div>
  );
}
