"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
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
  Plus,
  Ruler,
  Settings2,
  Trash2,
  Type,
  Upload,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import {
  AdminSeoFields,
  seoFromDoc,
  seoToPayload,
  type EnterpriseSeoForm,
} from "@/components/admin/admin-seo-fields";
import { AiSeoAssistPanel } from "@/components/admin/ai-seo-assist-panel";
import { revalidateTrekContent } from "@/app/actions/revalidate-treks";
import {
  adminCreateTrek,
  adminUpdateTrek,
  adminUploadMedia,
  arrayToLines,
  getErrorMessage,
  linesToArray,
  type AdminDoc,
} from "@/lib/api/admin";
import { resolveMediaUrl } from "@/lib/resolve-media-url";
import { cn } from "@/lib/utils";

type ItineraryDayForm = {
  day: number;
  title: string;
  startLocation: string;
  endLocation: string;
  distanceKm: string;
  altitudeFt: string;
  elevationGainLoss: string;
  walkingHours: string;
  difficulty: string;
  trailType: string;
  meals: string;
  accommodation: string;
  description: string;
  highlights: string;
  tips: string;
  images: string[];
};

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
  heroImages: string[];
  highlights: string;
  inclusions: string;
  exclusions: string;
  months: string;
  relatedSlugs: string;
  itinerary: ItineraryDayForm[];
  seo: EnterpriseSeoForm;
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

const inputClass =
  "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#22C55E]/50 focus:ring-2 focus:ring-[#22C55E]/15";

const textareaClass =
  "min-h-[120px] w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#22C55E]/50 focus:ring-2 focus:ring-[#22C55E]/15";

function emptyDay(day: number): ItineraryDayForm {
  return {
    day,
    title: "",
    startLocation: "",
    endLocation: "",
    distanceKm: "",
    altitudeFt: "",
    elevationGainLoss: "",
    walkingHours: "",
    difficulty: "",
    trailType: "",
    meals: "",
    accommodation: "",
    description: "",
    highlights: "",
    tips: "",
    images: [],
  };
}

function parseItinerary(raw: unknown): ItineraryDayForm[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((item, index) => {
    const row = (item ?? {}) as Record<string, unknown>;
    return {
      day: Number(row.day) || index + 1,
      title: String(row.title ?? ""),
      startLocation: String(row.startLocation ?? ""),
      endLocation: String(row.endLocation ?? ""),
      distanceKm: row.distanceKm != null && row.distanceKm !== "" ? String(row.distanceKm) : "",
      altitudeFt: row.altitudeFt != null && row.altitudeFt !== "" ? String(row.altitudeFt) : "",
      elevationGainLoss: String(row.elevationGainLoss ?? ""),
      walkingHours: String(row.walkingHours ?? ""),
      difficulty: String(row.difficulty ?? ""),
      trailType: String(row.trailType ?? ""),
      meals: Array.isArray(row.meals) ? row.meals.map(String).join(", ") : String(row.meals ?? ""),
      accommodation: String(row.accommodation ?? ""),
      description: String(row.description ?? ""),
      highlights: Array.isArray(row.highlights)
        ? row.highlights.map(String).join("\n")
        : String(row.highlights ?? ""),
      tips: Array.isArray(row.tips) ? row.tips.map(String).join("\n") : String(row.tips ?? ""),
      images: Array.isArray(row.images)
        ? row.images.map((src) => resolveMediaUrl(String(src))).filter(Boolean)
        : [],
    };
  });
}

function fromDoc(doc?: AdminDoc | null): TrekFormState {
  const seo = (doc?.seo as Record<string, unknown> | undefined) ?? {};
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
    heroImages: Array.isArray(doc?.heroImages)
      ? doc!.heroImages.map((src) => resolveMediaUrl(String(src))).filter(Boolean)
      : linesToArray(arrayToLines(doc?.heroImages)),
    highlights: arrayToLines(doc?.highlights),
    inclusions: arrayToLines(doc?.inclusions),
    exclusions: arrayToLines(doc?.exclusions),
    months: arrayToLines(doc?.months),
    relatedSlugs: arrayToLines(doc?.relatedSlugs),
    itinerary: parseItinerary(doc?.itinerary),
    seo: seoFromDoc(seo),
  };
}

function toPayload(form: TrekFormState) {
  const itinerary = form.itinerary
    .filter((day) => day.title.trim())
    .map((day, index) => ({
      day: Number(day.day) || index + 1,
      title: day.title.trim(),
      startLocation: day.startLocation.trim() || undefined,
      endLocation: day.endLocation.trim() || undefined,
      distanceKm: day.distanceKm ? Number(day.distanceKm) : undefined,
      altitudeFt: day.altitudeFt ? Number(day.altitudeFt) : undefined,
      elevationGainLoss: day.elevationGainLoss.trim() || undefined,
      walkingHours: day.walkingHours.trim() || undefined,
      difficulty: day.difficulty.trim() || undefined,
      trailType: day.trailType.trim() || undefined,
      meals: day.meals
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      accommodation: day.accommodation.trim(),
      description: day.description.trim(),
      highlights: day.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      tips: day.tips
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
      images: day.images.filter(Boolean),
    }));

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
    heroImages: form.heroImages.filter(Boolean),
    highlights: linesToArray(form.highlights),
    inclusions: linesToArray(form.inclusions),
    exclusions: linesToArray(form.exclusions),
    months: linesToArray(form.months),
    relatedSlugs: linesToArray(form.relatedSlugs),
    itinerary,
    seo: seoToPayload(form.seo),
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

export function TrekForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<TrekFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dayUploading, setDayUploading] = useState<number | null>(null);
  const [manualUrl, setManualUrl] = useState("");
  const [tab, setTab] = useState<TabId>("basic");
  const heroFileRef = useRef<HTMLInputElement>(null);
  const isEdit = Boolean(initial?._id);

  const previewHref = useMemo(() => {
    const slug = form.slug.trim() || String(initial?.slug ?? "");
    return slug ? `/treks/${slug}` : "/treks";
  }, [form.slug, initial?.slug]);

  function set<K extends keyof TrekFormState>(key: K, value: TrekFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateDay(index: number, patch: Partial<ItineraryDayForm>) {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => (i === index ? { ...day, ...patch } : day)),
    }));
  }

  function renumberDays(days: ItineraryDayForm[]) {
    return days.map((day, index) => ({ ...day, day: index + 1 }));
  }

  function addDay() {
    setForm((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, emptyDay(prev.itinerary.length + 1)],
    }));
  }

  function removeDay(index: number) {
    setForm((prev) => ({
      ...prev,
      itinerary: renumberDays(prev.itinerary.filter((_, i) => i !== index)),
    }));
  }

  function moveDay(index: number, direction: -1 | 1) {
    setForm((prev) => {
      const next = [...prev.itinerary];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, itinerary: renumberDays(next) };
    });
  }

  async function uploadFiles(files: FileList | File[], folder = "treks") {
    const list = Array.from(files);
    if (!list.length) return [] as string[];
    const urls: string[] = [];
    for (const file of list) {
      const media = await adminUploadMedia(file, folder, form.title || file.name);
      const url = resolveMediaUrl(String(media?.url ?? ""));
      if (url) urls.push(url);
    }
    return urls;
  }

  async function onHeroUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls = await uploadFiles(files, "treks");
      if (!urls.length) throw new Error("Upload returned no URL");
      setForm((prev) => ({ ...prev, heroImages: [...prev.heroImages, ...urls] }));
      toast.success(urls.length === 1 ? "Image uploaded" : `${urls.length} images uploaded`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function onDayImageUpload(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    setDayUploading(index);
    try {
      const urls = await uploadFiles(files, "treks/itinerary");
      if (!urls.length) throw new Error("Upload returned no URL");
      setForm((prev) => ({
        ...prev,
        itinerary: prev.itinerary.map((day, i) =>
          i === index ? { ...day, images: [...day.images, ...urls] } : day,
        ),
      }));
      toast.success("Day image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
    } finally {
      setDayUploading(null);
      event.target.value = "";
    }
  }

  function removeHeroImage(url: string) {
    setForm((prev) => ({
      ...prev,
      heroImages: prev.heroImages.filter((item) => item !== url),
    }));
  }

  function addManualHeroUrl() {
    const url = manualUrl.trim();
    if (!url) return;
    setForm((prev) => ({
      ...prev,
      heroImages: prev.heroImages.includes(url) ? prev.heroImages : [...prev.heroImages, url],
    }));
    setManualUrl("");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateTrek(String(initial!._id), payload);
        await revalidateTrekContent(form.slug || undefined);
        toast.success("Trek updated");
        router.refresh();
      } else {
        const created = await adminCreateTrek(payload);
        await revalidateTrekContent(form.slug || String(created.slug ?? ""));
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#111827]">Itinerary</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Add day-wise plan with title, description, distance and meals.
              </p>
            </div>
            <button
              type="button"
              onClick={addDay}
              className="inline-flex h-10 items-center gap-1.5 self-start rounded-xl bg-[#22C55E] px-3.5 text-sm font-bold text-white transition hover:bg-[#16A34A]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add Day
            </button>
          </div>

          {form.itinerary.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-4 py-10 text-center">
              <p className="text-sm text-[#6B7280]">No itinerary days yet.</p>
              <button
                type="button"
                onClick={addDay}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#16A34A]"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Add first day
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {form.itinerary.map((day, index) => (
                <article
                  key={`day-${index}`}
                  className="rounded-2xl border border-[#E8ECF1] bg-[#FAFBFC] p-4"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#111827]">Day {day.day}</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Move up"
                        disabled={index === 0}
                        onClick={() => moveDay(index, -1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] disabled:opacity-40"
                      >
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        title="Move down"
                        disabled={index === form.itinerary.length - 1}
                        onClick={() => moveDay(index, 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] disabled:opacity-40"
                      >
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        title="Remove day"
                        onClick={() => removeDay(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-white text-[#DC2626]"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <FieldShell label="Title" required>
                      <input
                        className={inputClass}
                        value={day.title}
                        onChange={(e) => updateDay(index, { title: e.target.value })}
                        placeholder="e.g. Jobra to Chikka"
                      />
                    </FieldShell>
                    <FieldShell label="Walking hours">
                      <input
                        className={inputClass}
                        value={day.walkingHours}
                        onChange={(e) => updateDay(index, { walkingHours: e.target.value })}
                        placeholder="e.g. 5-6 hrs"
                      />
                    </FieldShell>
                    <FieldShell label="Start location">
                      <input
                        className={inputClass}
                        value={day.startLocation}
                        onChange={(e) => updateDay(index, { startLocation: e.target.value })}
                        placeholder="e.g. Jobra"
                      />
                    </FieldShell>
                    <FieldShell label="End location">
                      <input
                        className={inputClass}
                        value={day.endLocation}
                        onChange={(e) => updateDay(index, { endLocation: e.target.value })}
                        placeholder="e.g. Chikka"
                      />
                    </FieldShell>
                    <FieldShell label="Distance (km)">
                      <input
                        className={inputClass}
                        type="number"
                        min={0}
                        value={day.distanceKm}
                        onChange={(e) => updateDay(index, { distanceKm: e.target.value })}
                      />
                    </FieldShell>
                    <FieldShell label="Altitude (ft)">
                      <input
                        className={inputClass}
                        type="number"
                        min={0}
                        value={day.altitudeFt}
                        onChange={(e) => updateDay(index, { altitudeFt: e.target.value })}
                      />
                    </FieldShell>
                    <FieldShell label="Elevation gain/loss">
                      <input
                        className={inputClass}
                        value={day.elevationGainLoss}
                        onChange={(e) => updateDay(index, { elevationGainLoss: e.target.value })}
                        placeholder="e.g. +1,800 ft / -200 ft"
                      />
                    </FieldShell>
                    <FieldShell label="Day difficulty">
                      <input
                        className={inputClass}
                        value={day.difficulty}
                        onChange={(e) => updateDay(index, { difficulty: e.target.value })}
                        placeholder="e.g. Moderate"
                      />
                    </FieldShell>
                    <FieldShell label="Trail type">
                      <input
                        className={inputClass}
                        value={day.trailType}
                        onChange={(e) => updateDay(index, { trailType: e.target.value })}
                        placeholder="e.g. pine forest, river, meadow"
                      />
                    </FieldShell>
                    <FieldShell label="Meals (comma separated)">
                      <input
                        className={inputClass}
                        value={day.meals}
                        onChange={(e) => updateDay(index, { meals: e.target.value })}
                        placeholder="Breakfast, Lunch, Dinner"
                      />
                    </FieldShell>
                    <FieldShell label="Accommodation">
                      <input
                        className={inputClass}
                        value={day.accommodation}
                        onChange={(e) => updateDay(index, { accommodation: e.target.value })}
                        placeholder="Camp / Homestay / Hotel"
                      />
                    </FieldShell>
                  </div>

                  <div className="mt-3">
                    <FieldShell label="Description">
                      <textarea
                        className={cn(textareaClass, "min-h-[160px]")}
                        value={day.description}
                        onChange={(e) => updateDay(index, { description: e.target.value })}
                        placeholder="Trail-specific narrative: terrain, landmarks, water sources, weather, safety..."
                      />
                    </FieldShell>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <FieldShell label="Highlights (one per line)">
                      <textarea
                        className={cn(textareaClass, "min-h-[90px]")}
                        value={day.highlights}
                        onChange={(e) => updateDay(index, { highlights: e.target.value })}
                        placeholder="Viewpoint&#10;River crossing&#10;Sunset at camp"
                      />
                    </FieldShell>
                    <FieldShell label="Important tips (one per line)">
                      <textarea
                        className={cn(textareaClass, "min-h-[90px]")}
                        value={day.tips}
                        onChange={(e) => updateDay(index, { tips: e.target.value })}
                        placeholder="Carry 2L water&#10;Steep final climb"
                      />
                    </FieldShell>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#374151]">Day images</p>
                      <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB]">
                        <Upload className="h-3.5 w-3.5" aria-hidden />
                        {dayUploading === index ? "Uploading…" : "Upload"}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                          multiple
                          className="hidden"
                          disabled={dayUploading === index}
                          onChange={(e) => void onDayImageUpload(index, e)}
                        />
                      </label>
                    </div>
                    {day.images.length > 0 ? (
                      <div className="grid gap-2 sm:grid-cols-3">
                        {day.images.map((src) => (
                          <div
                            key={src}
                            className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white"
                              onClick={() =>
                                updateDay(index, {
                                  images: day.images.filter((item) => item !== src),
                                })
                              }
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#9CA3AF]">No images for this day.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
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
              Upload trek hero images or paste an image URL.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Upload images</p>
              <p className="mt-0.5 text-xs text-[#6B7280]">
                PNG, JPG, WEBP up to {10}MB. Multiple files supported.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={heroFileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                multiple
                className="hidden"
                disabled={uploading}
                onChange={(e) => void onHeroUpload(e)}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => heroFileRef.current?.click()}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22C55E] px-4 text-sm font-bold text-white transition hover:bg-[#16A34A] disabled:opacity-60"
              >
                <Upload className="h-4 w-4" aria-hidden />
                {uploading ? "Uploading…" : "Upload Media"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={cn(inputClass, "flex-1")}
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="Or paste image URL…"
            />
            <button
              type="button"
              onClick={addManualHeroUrl}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB]"
            >
              Add URL
            </button>
          </div>

          {form.heroImages.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {form.heroImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white"
                    onClick={() => removeHeroImage(src)}
                    title="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#9CA3AF]">No hero images added yet.</p>
          )}
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
              Search metadata, social previews, schema, and publish settings for this trek.
            </p>
          </div>
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
          <AiSeoAssistPanel
            entityType="trek"
            payload={{
              title: form.title,
              destinationName: form.destinationName,
              region: form.region,
              difficulty: form.difficulty,
              durationDays: Number(form.durationDays) || undefined,
              maxAltitude: Number(form.maxAltitude) || undefined,
              summary: form.summary,
              overview: form.overview,
              months: linesToArray(form.months),
              basePriceInr: Number(form.basePriceInr) || undefined,
            }}
            onApplyMeta={(seo) => setForm((prev) => ({ ...prev, seo }))}
          />
          <AdminSeoFields
            value={form.seo}
            onChange={(seo) => setForm((prev) => ({ ...prev, seo }))}
            previewTitle={form.title}
            previewUrl={form.slug ? `https://treks.indiaholidaydestination.com/treks/${form.slug}` : undefined}
          />
        </section>
      </form>
    </div>
  );
}
