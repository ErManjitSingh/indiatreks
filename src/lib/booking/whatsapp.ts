import { siteConfig } from "@/config/site";

export function buildTrekWhatsAppMessage(
  trekTitle: string,
  departure?: string,
  price?: number | string,
): string {
  const parts = [`Hi! I'm interested in ${trekTitle}.`];

  if (departure) {
    parts.push(`Preferred departure: ${departure}.`);
  }

  if (price != null && price !== "") {
    const formatted =
      typeof price === "number"
        ? `₹${price.toLocaleString("en-IN")}`
        : String(price);
    parts.push(`Looking at the ${formatted} package.`);
  }

  parts.push("Please share availability and next steps.");
  return parts.join(" ");
}

export function buildTrekWhatsAppHref(
  trekTitle: string,
  departure?: string,
  price?: number | string,
): string {
  const message = buildTrekWhatsAppMessage(trekTitle, departure, price);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppHref(message?: string): string {
  const text =
    message ?? "Hi! I want to know more about your treks.";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
