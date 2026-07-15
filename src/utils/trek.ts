export function formatAltitude(meters: number): string {
  return `${new Intl.NumberFormat("en-IN").format(meters)} ft`;
}

export function formatTrekDuration(days: number, nights: number): string {
  return `${days}D / ${nights}N`;
}

export function getDifficultyTone(
  difficulty: "easy" | "moderate" | "difficult" | "challenging",
): "success" | "warning" | "destructive" | "default" {
  switch (difficulty) {
    case "easy":
      return "success";
    case "moderate":
      return "warning";
    case "difficult":
    case "challenging":
      return "destructive";
    default:
      return "default";
  }
}
