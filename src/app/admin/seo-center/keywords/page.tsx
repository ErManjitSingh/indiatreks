"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoSimpleTable } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  centerCreateKeyword,
  centerDeleteKeyword,
  centerListKeywords,
  centerSyncKeywordsGsc,
  type SeoCenterDoc,
} from "@/lib/api/seo-center";

export default function KeywordsPage() {
  const [items, setItems] = useState<SeoCenterDoc[]>([]);
  const [keyword, setKeyword] = useState("");
  const [landingPage, setLandingPage] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await centerListKeywords({ limit: 100 });
      setItems(res.items);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load keywords"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function add() {
    if (!keyword.trim()) return;
    setBusy(true);
    try {
      await centerCreateKeyword({ keyword, landingPage });
      setKeyword("");
      setLandingPage("");
      toast.success("Keyword added");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Add failed"));
    } finally {
      setBusy(false);
    }
  }

  async function sync() {
    setBusy(true);
    try {
      const res = await centerSyncKeywordsGsc();
      toast.success(`Synced ${String(res?.upserted ?? 0)} keywords from GSC`);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "GSC sync failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <SeoPanel
        title="Keyword Tracking"
        description="Target keyword, position, volume, difficulty, landing page"
        action={
          <Button variant="outline" disabled={busy} onClick={() => void sync()}>
            Sync from Search Console
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <AdminField label="Target keyword">
            <input className={adminInputClass} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </AdminField>
          <AdminField label="Landing page">
            <input className={adminInputClass} value={landingPage} onChange={(e) => setLandingPage(e.target.value)} />
          </AdminField>
          <div className="flex items-end">
            <Button variant="primary" disabled={busy} onClick={() => void add()}>
              Track keyword
            </Button>
          </div>
        </div>
      </SeoPanel>

      <SeoPanel title="Tracked keywords">
        <SeoSimpleTable
          headers={["Keyword", "Position", "Prev", "Volume", "Difficulty", "Landing", "Source", ""]}
          rows={items.map((item) => {
            const id = String(item._id || "");
            return [
              String(item.keyword || ""),
              item.currentPosition != null ? String(item.currentPosition) : "—",
              item.previousPosition != null ? String(item.previousPosition) : "—",
              item.searchVolume != null ? String(item.searchVolume) : "—",
              item.difficulty != null ? String(item.difficulty) : "—",
              String(item.landingPage || "—"),
              String(item.source || ""),
              <Button
                key={id}
                variant="outline"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  void centerDeleteKeyword(id)
                    .then(() => load())
                    .catch((err) => toast.error(getErrorMessage(err, "Delete failed")))
                }
              >
                Delete
              </Button>,
            ];
          })}
        />
      </SeoPanel>
    </div>
  );
}
