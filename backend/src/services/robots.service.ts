import { RobotsConfigModel, type IRobotsConfig } from "../models/RobotsConfig.model";
import { SeoSettingsModel } from "../models/SeoSettings.model";
import { siteConfigFallback } from "../config/seoDefaults";

async function ensureConfig() {
  let config = await RobotsConfigModel.findOne({ key: "default" });
  if (!config) {
    const settings = await SeoSettingsModel.findOne({ key: "global" }).lean();
    config = await RobotsConfigModel.create({
      key: "default",
      host: settings?.siteUrl || siteConfigFallback.siteUrl,
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: [
            "/admin",
            "/api",
            "/private",
            "/checkout",
            "/wishlist",
            "/my-account",
            "/my-bookings",
            "/profile",
            "/payment-success",
            "/payment-failed",
          ],
        },
      ],
    });
  }
  return config;
}

function renderRobots(config: IRobotsConfig): string {
  if (config.customContent?.trim()) {
    return config.customContent.trim() + "\n";
  }

  const lines: string[] = [];
  for (const rule of config.rules || []) {
    lines.push(`User-agent: ${rule.userAgent || "*"}`);
    for (const allow of rule.allow || []) lines.push(`Allow: ${allow}`);
    for (const disallow of rule.disallow || []) lines.push(`Disallow: ${disallow}`);
    if (rule.crawlDelay) lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    lines.push("");
  }

  if (config.host) lines.push(`Host: ${config.host.replace(/\/$/, "")}`);
  for (const sitemap of config.sitemaps || []) {
    const url = sitemap.startsWith("http")
      ? sitemap
      : `${(config.host || siteConfigFallback.siteUrl).replace(/\/$/, "")}${sitemap}`;
    lines.push(`Sitemap: ${url}`);
  }

  return lines.join("\n").trim() + "\n";
}

async function getConfig() {
  return ensureConfig();
}

async function updateConfig(data: Partial<IRobotsConfig>) {
  return RobotsConfigModel.findOneAndUpdate({ key: "default" }, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function generateTxt() {
  const config = await ensureConfig();
  if (!config.enabled) {
    return "User-agent: *\nDisallow: /\n";
  }
  return renderRobots(config);
}

export const robotsService = {
  getConfig,
  updateConfig,
  generateTxt,
  renderRobots,
};
