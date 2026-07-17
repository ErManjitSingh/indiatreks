"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  adminContentQuality,
  adminPreviewSchema,
  adminSuggestFaqs,
  adminSuggestInternalLinks,
  adminSuggestMeta,
  adminTrekWorkflow,
  type SeoDoc,
} from "@/lib/api/seo";
import type { EnterpriseSeoForm } from "@/components/admin/admin-seo-fields";
import { seoFromDoc } from "@/components/admin/admin-seo-fields";

type AssistProps = {
  entityType: "trek" | "blog" | "destination";
  payload: Record<string, unknown>;
  onApplyMeta: (seo: EnterpriseSeoForm) => void;
  onApplyFaqs?: (faqs: Array<{ question: string; answer: string }>) => void;
};

export function AiSeoAssistPanel({ entityType, payload, onApplyMeta, onApplyFaqs }: AssistProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
  const [links, setLinks] = useState<Array<Record<string, unknown>>>([]);
  const [quality, setQuality] = useState<Record<string, unknown> | null>(null);
  const [schemaPreview, setSchemaPreview] = useState<unknown[] | null>(null);
  const [workflowNote, setWorkflowNote] = useState<string>("");

  async function run(label: string, fn: () => Promise<void>) {
    setBusy(label);
    try {
      await fn();
    } catch (err) {
      toast.error(getErrorMessage(err, `Could not run ${label}`));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-dashed border-[#86efac] bg-[#f0fdf4] p-4">
      <div>
        <h3 className="font-heading text-base font-bold text-[#14532d]">AI SEO Assistant</h3>
        <p className="mt-1 text-xs text-[#166534]">
          Suggestions only — review and edit before saving. Nothing is published automatically.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={Boolean(busy)}
          onClick={() =>
            run("meta", async () => {
              const data = await adminSuggestMeta({ entityType, payload });
              if (data?.suggestions) {
                onApplyMeta(seoFromDoc(data.suggestions as SeoDoc));
                toast.success("Meta draft applied — review before save");
              }
            })
          }
        >
          {busy === "meta" ? "Generating…" : "Generate Meta"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={Boolean(busy)}
          onClick={() =>
            run("faqs", async () => {
              const data = await adminSuggestFaqs({ entityType, payload });
              const next = data?.faqs ?? [];
              setFaqs(next);
              onApplyFaqs?.(next);
              toast.success("FAQ drafts ready — review before save");
            })
          }
        >
          {busy === "faqs" ? "Generating…" : "Generate FAQs"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={Boolean(busy)}
          onClick={() =>
            run("schema", async () => {
              const data = await adminPreviewSchema({ entityType, payload });
              setSchemaPreview(data?.schemas ?? []);
              toast.success("Schema preview ready");
            })
          }
        >
          {busy === "schema" ? "Building…" : "Preview Schema"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={Boolean(busy)}
          onClick={() =>
            run("links", async () => {
              const data = await adminSuggestInternalLinks({
                sourceType: entityType,
                title: String(payload.title || payload.name || ""),
                region: payload.region,
                destinationName: payload.destinationName || payload.name,
                difficulty: payload.difficulty,
                tags: payload.tags,
                category: payload.category,
              });
              setLinks(data?.suggestions ?? []);
              toast.success("Internal link suggestions ready");
            })
          }
        >
          {busy === "links" ? "Scanning…" : "Suggest Links"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={Boolean(busy)}
          onClick={() =>
            run("quality", async () => {
              const data = await adminContentQuality({
                entityType,
                title: String(payload.title || payload.name || ""),
                payload,
              });
              setQuality(data);
              toast.success("Content quality guidance ready");
            })
          }
        >
          {busy === "quality" ? "Analyzing…" : "Analyze Content"}
        </Button>

        {entityType === "trek" ? (
          <Button
            type="button"
            variant="primary"
            disabled={Boolean(busy)}
            onClick={() =>
              run("workflow", async () => {
                const data = await adminTrekWorkflow(payload);
                if (data?.meta && typeof data.meta === "object" && "suggestions" in (data.meta as object)) {
                  const suggestions = (data.meta as { suggestions?: Record<string, unknown> }).suggestions;
                  if (suggestions) onApplyMeta(seoFromDoc(suggestions as SeoDoc));
                }
                if (data?.faqs && typeof data.faqs === "object" && "faqs" in (data.faqs as object)) {
                  const next = (data.faqs as { faqs?: Array<{ question: string; answer: string }> }).faqs ?? [];
                  setFaqs(next);
                  onApplyFaqs?.(next);
                }
                setWorkflowNote(
                  "Workflow steps 1–2 complete. Review & edit (step 3), preview (step 4), then publish manually (step 5).",
                );
                toast.success("AI workflow draft ready — human review required");
              })
            }
          >
            {busy === "workflow" ? "Running…" : "Run AI Workflow"}
          </Button>
        ) : null}
      </div>

      {workflowNote ? <p className="text-xs font-medium text-[#166534]">{workflowNote}</p> : null}

      {faqs.length ? (
        <div className="rounded-xl border border-[#bbf7d0] bg-white p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#166534]">FAQ drafts (editable above/after apply)</p>
          <ul className="mt-2 space-y-2 text-sm text-[#111827]">
            {faqs.slice(0, 6).map((faq) => (
              <li key={faq.question}>
                <strong>{faq.question}</strong>
                <p className="text-[#6b7280]">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {links.length ? (
        <div className="rounded-xl border border-[#bbf7d0] bg-white p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#166534]">Suggested internal links</p>
          <ul className="mt-2 space-y-1 text-sm">
            {links.map((link) => (
              <li key={String(link.url)}>
                <span className="font-medium">{String(link.anchorText)}</span>
                <span className="text-[#6b7280]"> → {String(link.url)}</span>
                <span className="text-xs text-[#9ca3af]"> ({String(link.reason)})</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {quality ? (
        <div className="rounded-xl border border-[#bbf7d0] bg-white p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#166534]">
            Content quality: {String((quality.scores as { overall?: number } | undefined)?.overall ?? "—")}/100
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#4b5563]">
            {((quality.improvements as string[]) || []).slice(0, 6).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[#6b7280]">Guidance only — content is never overwritten automatically.</p>
        </div>
      ) : null}

      {schemaPreview ? (
        <details className="rounded-xl border border-[#bbf7d0] bg-white p-3">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-[#166534]">
            Schema JSON-LD preview
          </summary>
          <pre className="mt-2 max-h-64 overflow-auto text-[11px] text-[#374151]">
            {JSON.stringify(schemaPreview, null, 2)}
          </pre>
        </details>
      ) : null}
    </div>
  );
}
