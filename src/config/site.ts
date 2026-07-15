export const siteConfig = {
  name: "India Holiday Destinations",
  shortName: "IHD Treks",
  tagline: "Explore India's Most Incredible Treks",
  description:
    "India's premium trekking platform for Himalayan adventures, weekend getaways, winter expeditions, and curated camping experiences.",
  url: "https://treks.indiaholidaydestination.com",
  ogImage: "/images/og-default.jpg",
  locale: "en_IN",
  currency: "INR",
  phone: "+91 98765 43210",
  email: "treks@indiaholidaydestination.com",
  whatsapp: "919876543210",
  address: {
    line1: "India Holiday Destinations",
    line2: "Adventure Hub, Himalayan Trails",
    city: "Delhi NCR",
    country: "India",
  },
  social: {
    instagram: "https://instagram.com/indiaholidaydestinations",
    facebook: "https://facebook.com/indiaholidaydestinations",
    youtube: "https://youtube.com/@indiaholidaydestinations",
    twitter: "https://x.com/ihdtreks",
    linkedin: "https://linkedin.com/company/indiaholidaydestinations",
  },
} as const;

export type SiteConfig = typeof siteConfig;
