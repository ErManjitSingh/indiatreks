import type { DifficultyLevel, FAQ, Season, TrekCategory } from "@/types";

export const difficultyLevels: Array<{
  value: DifficultyLevel;
  label: string;
  description: string;
}> = [
  {
    value: "easy",
    label: "Easy",
    description: "Beginner-friendly trails with gentle climbs",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "Balanced effort for regular fitness levels",
  },
  {
    value: "difficult",
    label: "Difficult",
    description: "Demanding terrain requiring strong stamina",
  },
  {
    value: "challenging",
    label: "Challenging",
    description: "Advanced alpine trails for experienced trekkers",
  },
];

export const seasons: Array<{
  value: Season;
  label: string;
  months: string;
}> = [
  { value: "spring", label: "Spring", months: "Mar – May" },
  { value: "summer", label: "Summer", months: "Jun – Aug" },
  { value: "monsoon", label: "Monsoon", months: "Jul – Sep" },
  { value: "autumn", label: "Autumn", months: "Sep – Nov" },
  { value: "winter", label: "Winter", months: "Dec – Feb" },
];

export const trekCategories: Array<{
  value: TrekCategory;
  label: string;
  href: string;
  description: string;
}> = [
  {
    value: "weekend",
    label: "Weekend Treks",
    href: "/weekend-treks",
    description: "2–3 day escapes near the mountains",
  },
  {
    value: "winter",
    label: "Winter Treks",
    href: "/winter-treks",
    description: "Snow routes and frozen landscapes",
  },
  {
    value: "high-altitude",
    label: "High Altitude",
    href: "/high-altitude-treks",
    description: "Expeditions above 12,000 ft",
  },
  {
    value: "camping",
    label: "Camping",
    href: "/camping",
    description: "Curated camps under starlit skies",
  },
  {
    value: "family",
    label: "Family Friendly",
    href: "/treks?category=family",
    description: "Safe adventures for all ages",
  },
  {
    value: "solo",
    label: "Solo Friendly",
    href: "/treks?category=solo",
    description: "Join group departures with confidence",
  },
  {
    value: "expedition",
    label: "Expeditions",
    href: "/treks?category=expedition",
    description: "Multi-day premium mountain journeys",
  },
];

export const destinationList = [
  {
    name: "Kashmir",
    slug: "kashmir",
    region: "North India",
    state: "Jammu & Kashmir",
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    region: "North India",
    state: "Ladakh",
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    region: "North India",
    state: "Himachal Pradesh",
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    region: "North India",
    state: "Uttarakhand",
  },
  {
    name: "Sikkim",
    slug: "sikkim",
    region: "Northeast India",
    state: "Sikkim",
  },
  {
    name: "Spiti Valley",
    slug: "spiti-valley",
    region: "North India",
    state: "Himachal Pradesh",
  },
] as const;

export const companyInfo = {
  legalName: "India Holiday Destinations",
  brand: "IHD Treks",
  foundedYear: 2014,
  mission:
    "To make India's most incredible treks accessible, safe, and unforgettable for every adventurer.",
  values: ["Safety First", "Local Expertise", "Premium Experience", "Responsible Travel"],
  certifications: ["ISO Safety Standards", "Trained Mountain Guides", "Verified Local Partners"],
} as const;

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Do I need prior trekking experience?",
    answer:
      "Many of our weekend and easy-category treks are beginner-friendly. For difficult and high-altitude treks, prior experience and fitness preparation are recommended. Each trek page lists difficulty and readiness guidance.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "What is included in the trek price?",
    answer:
      "Most packages include accommodation, meals as listed, local transport during the trek, trek leader support, and necessary permits. Exact inclusions vary by trek and are clearly listed on each itinerary.",
    category: "booking",
  },
  {
    id: "faq-3",
    question: "How do I book a trek?",
    answer:
      "Choose your trek, select a departure date and package, fill traveler details, and confirm your booking. Our team will follow up with confirmation and pre-trek guidance.",
    category: "booking",
  },
  {
    id: "faq-4",
    question: "Are your treks safe?",
    answer:
      "Safety is our first priority. We operate with trained leaders, acclimatization-aware itineraries, briefings, and emergency protocols suited for Himalayan conditions.",
    category: "safety",
  },
  {
    id: "faq-5",
    question: "What is your cancellation policy?",
    answer:
      "Cancellation terms depend on how early you cancel before departure. Full details are available on our Cancellation Policy page and shared at booking confirmation.",
    category: "cancellation",
  },
  {
    id: "faq-6",
    question: "Which payment methods do you accept?",
    answer:
      "We accept UPI, major debit/credit cards, and net banking. Booking confirmation is issued after successful payment verification.",
    category: "payment",
  },
];
