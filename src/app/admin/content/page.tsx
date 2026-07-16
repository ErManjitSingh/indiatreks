"use client";

import { useEffect, useState } from "react";

import {
  AdminField,
  AdminPageHeader,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  adminGetSettings,
  adminUpsertSetting,
  getErrorMessage,
} from "@/lib/api/admin";

type SiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  description: string;
};

const emptySite: SiteConfig = {
  name: "",
  shortName: "",
  tagline: "",
  phone: "",
  email: "",
  whatsapp: "",
  description: "",
};

export default function AdminContentPage() {
  const [site, setSite] = useState<SiteConfig>(emptySite);
  const [homepageJson, setHomepageJson] = useState("{}");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const settings = await adminGetSettings();
        if (cancelled) return;
        const siteValue = (settings["site.config"] as Record<string, unknown> | undefined) ?? {};
        setSite({
          name: String(siteValue.name ?? ""),
          shortName: String(siteValue.shortName ?? ""),
          tagline: String(siteValue.tagline ?? ""),
          phone: String(siteValue.phone ?? ""),
          email: String(siteValue.email ?? ""),
          whatsapp: String(siteValue.whatsapp ?? ""),
          description: String(siteValue.description ?? ""),
        });
        const homepage = settings["homepage.content"] ?? {};
        setHomepageJson(JSON.stringify(homepage, null, 2));
      } catch (err) {
        if (!cancelled) toast.error(getErrorMessage(err, "Failed to load settings"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function setSiteField<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setSite((prev) => ({ ...prev, [key]: value }));
  }

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      let homepageValue: unknown;
      try {
        homepageValue = JSON.parse(homepageJson);
      } catch {
        toast.error("Homepage content must be valid JSON");
        setSaving(false);
        return;
      }

      await adminUpsertSetting(
        "site.config",
        {
          name: site.name.trim(),
          shortName: site.shortName.trim(),
          tagline: site.tagline.trim(),
          phone: site.phone.trim(),
          email: site.email.trim(),
          whatsapp: site.whatsapp.trim(),
          description: site.description.trim(),
        },
        "site",
      );
      await adminUpsertSetting("homepage.content", homepageValue, "homepage");
      toast.success("Site content saved");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save settings"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#5c6b5f]">Loading site content…</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Site content"
        description="Edit site.config and homepage.content settings stored in MongoDB"
      />

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid gap-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm md:grid-cols-2">
          <h3 className="font-heading text-lg font-bold md:col-span-2">Site config</h3>
          <AdminField label="Name">
            <input className={adminInputClass} value={site.name} onChange={(e) => setSiteField("name", e.target.value)} />
          </AdminField>
          <AdminField label="Short name">
            <input className={adminInputClass} value={site.shortName} onChange={(e) => setSiteField("shortName", e.target.value)} />
          </AdminField>
          <AdminField label="Tagline" className="md:col-span-2">
            <input className={adminInputClass} value={site.tagline} onChange={(e) => setSiteField("tagline", e.target.value)} />
          </AdminField>
          <AdminField label="Phone">
            <input className={adminInputClass} value={site.phone} onChange={(e) => setSiteField("phone", e.target.value)} />
          </AdminField>
          <AdminField label="Email">
            <input type="email" className={adminInputClass} value={site.email} onChange={(e) => setSiteField("email", e.target.value)} />
          </AdminField>
          <AdminField label="WhatsApp">
            <input className={adminInputClass} value={site.whatsapp} onChange={(e) => setSiteField("whatsapp", e.target.value)} />
          </AdminField>
          <AdminField label="Description" className="md:col-span-2">
            <textarea className={adminTextareaClass} value={site.description} onChange={(e) => setSiteField("description", e.target.value)} />
          </AdminField>
        </div>

        <div className="space-y-3 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
          <h3 className="font-heading text-lg font-bold">Homepage content (JSON)</h3>
          <p className="text-sm text-[#5c6b5f]">
            Edit the raw homepage.content object. Invalid JSON will block save.
          </p>
          <AdminField label="homepage.content">
            <textarea
              className={`${adminTextareaClass} min-h-[280px] font-mono text-xs`}
              value={homepageJson}
              onChange={(e) => setHomepageJson(e.target.value)}
              spellCheck={false}
            />
          </AdminField>
        </div>

        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save site content"}
        </Button>
      </form>
    </div>
  );
}
