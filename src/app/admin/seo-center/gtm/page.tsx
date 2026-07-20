"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Copy, ExternalLink } from "lucide-react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerIntegrations, centerUpdateIntegrations } from "@/lib/api/seo-center";
import { siteConfig } from "@/config/site";

function normalizeGtmId(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function isValidGtmId(value: string) {
  return /^GTM-[A-Z0-9]+$/.test(normalizeGtmId(value));
}

export default function GtmPage() {
  const [enabled, setEnabled] = useState(false);
  const [containerId, setContainerId] = useState("");
  const [status, setStatus] = useState("inactive");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const i = await centerIntegrations();
      const gtm = (i?.gtm || {}) as Record<string, unknown>;
      setEnabled(Boolean(gtm.enabled));
      setContainerId(String(gtm.containerId || ""));
      setStatus(String(gtm.status || "inactive"));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load GTM"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const normalized = useMemo(() => normalizeGtmId(containerId), [containerId]);
  const valid = isValidGtmId(containerId);

  async function save() {
    if (enabled && !valid) {
      toast.error("Enter a valid Container ID like GTM-XXXXXXX");
      return;
    }
    setBusy(true);
    try {
      await centerUpdateIntegrations({
        gtm: {
          enabled: enabled && valid,
          containerId: valid ? normalized : "",
        },
      });
      toast.success(enabled && valid ? "GTM enabled on the live site" : "GTM settings saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  async function copySnippet() {
    if (!valid) {
      toast.error("Save a valid GTM ID first");
      return;
    }
    const snippet = `<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${normalized}');
<!-- End Google Tag Manager -->`;
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Snippet copied");
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <SeoStatCard label="Container ID" value={normalized || "—"} />
        <SeoStatCard label="Status" value={status} />
        <SeoStatCard
          label="Site install"
          value={enabled && valid ? "Live on public pages" : "Not active"}
        />
      </div>

      <SeoPanel
        title="Google Tag Manager"
        description="Paste your GTM container ID. The public site injects the official head script + noscript iframe and pushes page_view on route changes."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Enabled">
            <select
              className={adminInputClass}
              value={enabled ? "1" : "0"}
              onChange={(e) => setEnabled(e.target.value === "1")}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Container ID (GTM-XXXXXXX)">
            <input
              className={adminInputClass}
              placeholder="GTM-XXXXXXX"
              value={containerId}
              onChange={(e) => setContainerId(e.target.value)}
            />
            {containerId && !valid ? (
              <p className="mt-1 text-xs text-red-600">Format must be GTM- followed by letters/numbers.</p>
            ) : null}
          </AdminField>
        </div>

        <ol className="mt-4 space-y-2 rounded-xl border border-[#E8ECF1] bg-[#F9FAFB] p-4 text-sm text-[#4B5563]">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Create a container at{" "}
              <a
                href="https://tagmanager.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#16A34A] hover:underline"
              >
                tagmanager.google.com
              </a>{" "}
              for <strong>{siteConfig.url}</strong>
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>Copy the Container ID (starts with GTM-) and paste it above, then enable + save.</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              In GTM, add a <strong>Google Analytics: GA4 Configuration</strong> tag (or other tags) and publish the
              container.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Verify with GTM Preview / Tag Assistant on {siteConfig.url} (admin pages do not load GTM).
            </span>
          </li>
        </ol>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" disabled={busy} onClick={() => void save()}>
            {busy ? "Saving…" : "Save GTM"}
          </Button>
          <Button variant="outline" disabled={!valid} onClick={() => void copySnippet()}>
            <Copy className="mr-1.5 h-4 w-4" aria-hidden />
            Copy snippet
          </Button>
          <a
            href="https://tagmanager.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB]"
          >
            Open GTM
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </SeoPanel>
    </div>
  );
}
