import type { Metadata } from "next";

import { ProfileClient } from "@/app/profile/profile-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Profile",
  description: "Update your India Holiday Destinations profile details.",
  canonical: "/profile",
  noIndex: true,
});

export default function ProfilePage() {
  return <ProfileClient />;
}
