"use client";

import { Suspense, useEffect, useState } from "react";
import { Camera, Plus, Trash2 } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/booking/store";

function ProfileContent() {
  const profile = useProfileStore();
  const setProfile = useProfileStore((s) => s.setProfile);
  const [hydrated, setHydrated] = useState(false);
  const [addressDraft, setAddressDraft] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useProfileStore.persist.rehydrate());
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const addAddress = () => {
    const value = addressDraft.trim();
    if (!value) return;
    setProfile({ addresses: [...profile.addresses, value] });
    setAddressDraft("");
  };

  const removeAddress = (index: number) => {
    setProfile({
      addresses: profile.addresses.filter((_, i) => i !== index),
    });
  };

  if (!hydrated) {
    return (
      <AccountShell title="Profile" description="Loading your profile…">
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </AccountShell>
    );
  }

  return (
    <AccountShell
      title="Profile"
      description="Update personal details, emergency contact, and saved addresses."
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[#e8ece6] bg-[#F7F8F6]">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-7 w-7 text-[#2D5A27]" />
              )}
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">
                Profile photo
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Placeholder only — upload connects in a later release.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() =>
                  setProfile({
                    photoUrl: profile.photoUrl
                      ? ""
                      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
                  })
                }
              >
                {profile.photoUrl ? "Remove placeholder" : "Use placeholder"}
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          <h2 className="font-heading text-lg font-bold">Personal details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Full name", "text"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
                ["city", "City", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <label key={key} className="block space-y-1.5 text-sm">
                <span className="font-medium text-[#333]">{label}</span>
                <input
                  type={type}
                  value={profile[key]}
                  onChange={(e) => setProfile({ [key]: e.target.value })}
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          <h2 className="font-heading text-lg font-bold">Emergency contact</h2>
          <label className="mt-4 block space-y-1.5 text-sm">
            <span className="font-medium text-[#333]">Phone / name</span>
            <input
              type="text"
              value={profile.emergencyContact}
              onChange={(e) => setProfile({ emergencyContact: e.target.value })}
              placeholder="Name + phone number"
              className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          <h2 className="font-heading text-lg font-bold">Change password</h2>
          <p className="mt-1 text-sm text-muted-foreground">UI only — no auth backend yet.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["current", "Current password"],
                ["next", "New password"],
                ["confirm", "Confirm password"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block space-y-1.5 text-sm">
                <span className="font-medium text-[#333]">{label}</span>
                <input
                  type="password"
                  value={passwordForm[key]}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
            ))}
          </div>
          <Button type="button" variant="outline" className="mt-4" disabled>
            Update password
          </Button>
        </div>

        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          <h2 className="font-heading text-lg font-bold">Saved addresses</h2>
          <ul className="mt-4 space-y-2">
            {profile.addresses.length === 0 ? (
              <li className="text-sm text-muted-foreground">No addresses saved.</li>
            ) : (
              profile.addresses.map((address, index) => (
                <li
                  key={`${address}-${index}`}
                  className="flex items-start justify-between gap-3 rounded-xl border border-[#e8ece6] px-3 py-2.5 text-sm"
                >
                  <span>{address}</span>
                  <button
                    type="button"
                    aria-label="Remove address"
                    onClick={() => removeAddress(index)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="mt-3 flex gap-2">
            <input
              value={addressDraft}
              onChange={(e) => setAddressDraft(e.target.value)}
              placeholder="Add a new address"
              className="h-11 flex-1 rounded-xl border border-[#d0d5cc] px-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
            <Button type="button" variant="primary" onClick={addAddress}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}

export function ProfileClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading profile…
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
