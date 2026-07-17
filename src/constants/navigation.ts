import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Treks",
    href: "/treks",
    description: "Browse India's most iconic curated treks",
    children: [
      {
        title: "All Treks",
        href: "/treks",
        description: "Explore the complete trek collection",
      },
      {
        title: "Weekend Treks",
        href: "/treks?trekType=weekend",
        description: "Short escapes for busy schedules",
      },
      {
        title: "Winter Treks",
        href: "/treks?season=winter",
        description: "Snow trails and alpine winters",
      },
      {
        title: "High Altitude Treks",
        href: "/treks?trekType=high-altitude",
        description: "Challenging Himalayan expeditions",
      },
      {
        title: "Camping",
        href: "/treks?trekType=camping",
        description: "Premium outdoor camping experiences",
      },
      {
        title: "Beginner Treks",
        href: "/treks?difficulty=easy",
        description: "Gentle introductions to the mountains",
      },
    ],
  },
  {
    title: "Destinations",
    href: "/destinations",
    description: "Discover regions across the Himalayas",
    children: [
      {
        title: "All Destinations",
        href: "/destinations",
        description: "Browse every Himalayan region",
      },
      {
        title: "Dharamshala",
        href: "/treks?destination=Dharamshala",
        description: "Dhauladhar classics & weekend trails",
      },
      {
        title: "Manali",
        href: "/treks?destination=Manali",
        description: "Kullu Valley classics",
      },
      {
        title: "Kasol",
        href: "/treks?destination=Kasol",
        description: "Parvati Valley escapes",
      },
      {
        title: "Spiti Valley",
        href: "/treks?destination=Spiti",
        description: "High desert expeditions",
      },
      {
        title: "Uttarakhand",
        href: "/treks?destination=Uttarakhand",
        description: "Garhwal & Kumaon trails",
      },
    ],
  },
  {
    title: "Weekend Treks",
    href: "/treks?trekType=weekend",
    description: "2–3 day mountain escapes",
  },
  {
    title: "Blogs",
    href: "/blogs",
    description: "Guides, stories, and trail insights",
  },
  {
    title: "About",
    href: "/about",
    description: "Our story and safety standards",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Talk to our trek specialists",
  },
];

export const footerLinks = {
  about: [
    { title: "Our Story", href: "/about" },
    { title: "Safety Standards", href: "/about#safety" },
    { title: "Careers", href: "/about#careers" },
  ],
  treks: [
    { title: "All Treks", href: "/treks" },
    { title: "Weekend Treks", href: "/treks?trekType=weekend" },
    { title: "Winter Treks", href: "/treks?season=winter" },
    { title: "High Altitude", href: "/treks?trekType=high-altitude" },
    { title: "Camping", href: "/treks?trekType=camping" },
  ],
  destinations: [
    { title: "Dharamshala", href: "/treks?destination=Dharamshala" },
    { title: "Manali", href: "/treks?destination=Manali" },
    { title: "Kasol", href: "/treks?destination=Kasol" },
    { title: "Spiti Valley", href: "/treks?destination=Spiti" },
    { title: "Uttarakhand", href: "/treks?destination=Uttarakhand" },
    { title: "Kedarkantha", href: "/treks?q=Kedarkantha" },
    { title: "Hampta Pass", href: "/treks?q=Hampta" },
  ],
  useful: [
    { title: "Gallery", href: "/gallery" },
    { title: "Blog", href: "/blogs" },
    { title: "FAQ", href: "/faq" },
    { title: "Booking", href: "/booking" },
    { title: "Contact", href: "/contact" },
  ],
  policies: [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cancellation Policy", href: "/cancellation" },
  ],
} as const;

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/indiaholidaydestinations",
    icon: "instagram" as const,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/indiaholidaydestinations",
    icon: "facebook" as const,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@indiaholidaydestinations",
    icon: "youtube" as const,
  },
  {
    name: "X",
    href: "https://x.com/ihdtreks",
    icon: "twitter" as const,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/indiaholidaydestinations",
    icon: "linkedin" as const,
  },
] as const;
