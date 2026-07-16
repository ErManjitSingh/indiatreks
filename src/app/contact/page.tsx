import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact/contact-page-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Trek Specialists",
  description:
    "Contact India Holiday Destinations for trek enquiries, group bookings, and custom Himalayan itineraries. Phone, WhatsApp, and email support available.",
  canonical: "/contact",
  keywords: [
    "contact India treks",
    "trek enquiry Himachal",
    "Himalayan trek booking support",
    "India Holiday Destinations contact",
  ],
});

export default function ContactPage() {
  return <ContactPageContent />;
}
