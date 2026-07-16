/** Trek listing URL for region / state showcase cards (home, destinations hub). */
export function getDestinationShowcaseHref(slug: string, name: string): string {
  switch (slug) {
    case "himachal-pradesh":
      return "/treks?state=Himachal%20Pradesh";
    case "uttarakhand":
      return "/treks?state=Uttarakhand";
    case "jammu-kashmir":
      return "/treks?q=Kashmir";
    case "ladakh":
    case "leh-ladakh":
      return "/treks?destination=Ladakh";
    case "sikkim":
      return "/treks?destination=Sikkim";
    case "dharamshala":
      return "/treks?destination=Dharamshala";
    case "mcleod-ganj":
      return "/treks?destination=McLeod%20Ganj";
    case "manali":
      return "/treks?destination=Manali";
    case "kasol":
      return "/treks?destination=Kasol";
    case "spiti-valley":
      return "/treks?destination=Spiti";
    case "kashmir":
      return "/treks?q=Kashmir";
    default:
      return `/treks?destination=${encodeURIComponent(name)}`;
  }
}
