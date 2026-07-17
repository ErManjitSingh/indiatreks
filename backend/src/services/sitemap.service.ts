import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";
import { CategoryModel } from "../models/Category.model";
import { ProgrammaticSeoPageModel } from "../models/ProgrammaticSeoPage.model";
import { SitemapConfigModel, type SitemapName } from "../models/SitemapConfig.model";
import { SeoSettingsModel } from "../models/SeoSettings.model";
import { siteConfigFallback } from "../config/seoDefaults";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function abs(base: string, path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function urlEntry(
  loc: string,
  opts?: { lastmod?: Date | string | null; changefreq?: string; priority?: number },
) {
  const lastmod = opts?.lastmod ? new Date(opts.lastmod).toISOString() : new Date().toISOString();
  return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${opts?.changefreq || "weekly"}</changefreq>
    <priority>${(opts?.priority ?? 0.7).toFixed(1)}</priority>
  </url>`;
}

function wrapUrlset(body: string, image = false) {
  const ns = image
    ? `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
    : `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${ns}>\n${body}\n</urlset>`;
}

function wrapIndex(body: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>`;
}

async function getBaseUrl() {
  const [settings, config] = await Promise.all([
    SeoSettingsModel.findOne({ key: "global" }).lean(),
    SitemapConfigModel.findOne({ key: "default" }).lean(),
  ]);
  return settings?.siteUrl || config?.baseUrl || siteConfigFallback.siteUrl;
}

async function ensureConfig() {
  let config = await SitemapConfigModel.findOne({ key: "default" });
  if (!config) {
    config = await SitemapConfigModel.create({ key: "default" });
  }
  return config;
}

async function generateTreks(base: string) {
  const treks = await TrekModel.find({ status: "published" })
    .select("slug updatedAt publishedAt")
    .lean();
  const body = treks
    .map((t) =>
      urlEntry(abs(base, `/treks/${t.slug}`), {
        lastmod: t.updatedAt || t.publishedAt,
        changefreq: "weekly",
        priority: 0.8,
      }),
    )
    .join("\n");
  return { xml: wrapUrlset(body), count: treks.length };
}

async function generateBlogs(base: string) {
  const blogs = await BlogModel.find({ status: "published" })
    .select("slug updatedAt publishedAt")
    .lean();
  const body = blogs
    .map((b) =>
      urlEntry(abs(base, `/blogs/${b.slug}`), {
        lastmod: b.updatedAt || b.publishedAt,
        changefreq: "weekly",
        priority: 0.7,
      }),
    )
    .join("\n");
  return { xml: wrapUrlset(body), count: blogs.length };
}

async function generateDestinations(base: string) {
  const destinations = await DestinationModel.find({ status: "published" })
    .select("slug updatedAt")
    .lean();
  const staticListing = urlEntry(abs(base, "/destinations"), {
    changefreq: "weekly",
    priority: 0.7,
  });
  const body = [
    staticListing,
    ...destinations.map((d) =>
      urlEntry(abs(base, `/destinations/${d.slug}`), {
        lastmod: d.updatedAt,
        changefreq: "weekly",
        priority: 0.75,
      }),
    ),
  ].join("\n");
  return { xml: wrapUrlset(body), count: destinations.length + 1 };
}

async function generateImages(base: string) {
  const treks = await TrekModel.find({ status: "published" })
    .select("slug title heroImages gallery updatedAt")
    .lean();

  const entries = treks
    .map((trek) => {
      const images = [
        ...(trek.heroImages || []),
        ...((trek.gallery || []).map((g) => (typeof g === "string" ? g : g.src)) as string[]),
      ].filter(Boolean);

      if (!images.length) return "";

      const imageTags = images
        .slice(0, 20)
        .map(
          (src) => `    <image:image>
      <image:loc>${esc(abs(base, src))}</image:loc>
      <image:title>${esc(trek.title)}</image:title>
    </image:image>`,
        )
        .join("\n");

      return `  <url>
    <loc>${esc(abs(base, `/treks/${trek.slug}`))}</loc>
${imageTags}
  </url>`;
    })
    .filter(Boolean)
    .join("\n");

  return { xml: wrapUrlset(entries, true), count: treks.length };
}

async function generateVideos(base: string) {
  // Placeholder structure for future video content — still valid empty/minimal sitemap
  const body = urlEntry(abs(base, "/"), { changefreq: "monthly", priority: 0.3 });
  return { xml: wrapUrlset(body), count: 1 };
}

async function generateCategories(base: string) {
  const categories = await CategoryModel.find({}).select("slug type updatedAt name").lean();
  const programmatic = await ProgrammaticSeoPageModel.find({ status: "published" })
    .select("path updatedAt")
    .lean();

  const catUrls = categories.map((c) =>
    urlEntry(abs(base, c.type === "blog" ? `/blogs?category=${c.slug}` : `/treks?category=${c.slug}`), {
      lastmod: c.updatedAt,
      changefreq: "weekly",
      priority: 0.5,
    }),
  );

  const progUrls = programmatic.map((p) =>
    urlEntry(abs(base, p.path), { lastmod: p.updatedAt, changefreq: "weekly", priority: 0.65 }),
  );

  const body = [...catUrls, ...progUrls].join("\n");
  return { xml: wrapUrlset(body), count: catUrls.length + progUrls.length };
}

async function generateProgrammatic(base: string) {
  const pages = await ProgrammaticSeoPageModel.find({ status: "published" })
    .select("path updatedAt")
    .lean();
  const body = pages
    .map((p) =>
      urlEntry(abs(base, p.path), {
        lastmod: p.updatedAt,
        changefreq: "weekly",
        priority: 0.7,
      }),
    )
    .join("\n");
  return { xml: wrapUrlset(body), count: pages.length };
}

async function generateIndex(base: string, paths: string[]) {
  const now = new Date().toISOString();
  const body = paths
    .map(
      (p) => `  <sitemap>
    <loc>${esc(abs(base, p))}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
    )
    .join("\n");
  return { xml: wrapIndex(body), count: paths.length };
}

async function markGenerated(name: SitemapName, count: number) {
  await SitemapConfigModel.updateOne(
    { key: "default", "entries.name": name },
    {
      $set: {
        "entries.$.lastGeneratedAt": new Date(),
        "entries.$.urlCount": count,
        lastFullGenerateAt: new Date(),
      },
    },
  );
}

async function generate(name: SitemapName | "sitemap.xml" = "index") {
  const base = await getBaseUrl();
  await ensureConfig();

  const normalized =
    name === "sitemap.xml" || name === "index"
      ? "index"
      : (String(name).replace(/\.xml$/, "") as SitemapName);

  let result: { xml: string; count: number };

  switch (normalized) {
    case "treks":
      result = await generateTreks(base);
      break;
    case "blogs":
      result = await generateBlogs(base);
      break;
    case "destinations":
      result = await generateDestinations(base);
      break;
    case "images":
      result = await generateImages(base);
      break;
    case "videos":
      result = await generateVideos(base);
      break;
    case "categories":
      result = await generateCategories(base);
      break;
    case "programmatic":
      result = await generateProgrammatic(base);
      break;
    case "index":
    default: {
      const childPaths = [
        "/sitemaps/treks.xml",
        "/sitemaps/blogs.xml",
        "/sitemaps/destinations.xml",
        "/sitemaps/images.xml",
        "/sitemaps/videos.xml",
        "/sitemaps/categories.xml",
        "/sitemaps/programmatic.xml",
      ];
      result = await generateIndex(base, childPaths);
      break;
    }
  }

  await markGenerated(normalized === "index" ? "index" : normalized, result.count);
  return { ...result, name: normalized, baseUrl: base };
}

async function generateAll() {
  const names: SitemapName[] = [
    "treks",
    "blogs",
    "destinations",
    "images",
    "videos",
    "categories",
    "programmatic",
    "index",
  ];
  const results = [];
  for (const name of names) {
    results.push(await generate(name));
  }
  return results;
}

async function getConfig() {
  return ensureConfig();
}

async function updateConfig(data: Record<string, unknown>) {
  return SitemapConfigModel.findOneAndUpdate({ key: "default" }, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

export const sitemapService = {
  generate,
  generateAll,
  getConfig,
  updateConfig,
  getBaseUrl,
};
