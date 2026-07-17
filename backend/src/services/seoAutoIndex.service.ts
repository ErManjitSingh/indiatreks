import { BlogModel } from "../models/Blog.model";
import { siteConfigFallback } from "../config/seoDefaults";
import { logger } from "../utils/logger";
import { sitemapService } from "./sitemap.service";

const CORE_SITEMAP_PATHS = [
  "/sitemap.xml",
  "/sitemaps/blogs.xml",
  "/sitemaps/treks.xml",
  "/sitemaps/destinations.xml",
];

async function siteBase() {
  try {
    return (await sitemapService.getBaseUrl()).replace(/\/$/, "");
  } catch {
    return siteConfigFallback.siteUrl.replace(/\/$/, "");
  }
}

function absUrl(base: string, pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${base}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** Refresh sitemap URL counts from live Mongo collections. */
async function refreshSitemapCounts() {
  return sitemapService.generateAll();
}

/** Resubmit core sitemap feeds to Google Search Console. */
async function submitCoreSitemaps() {
  const base = await siteBase();
  const { googleSearchConsoleService } = await import("./googleSearchConsole.service");
  const results: Array<{ url: string; status: "submitted" | "failed"; error?: string }> = [];

  for (const path of CORE_SITEMAP_PATHS) {
    const url = absUrl(base, path);
    try {
      await googleSearchConsoleService.submitSitemap(url);
      results.push({ url, status: "submitted" });
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      results.push({ url, status: "failed", error });
      logger.warn("Auto sitemap submit failed", { url, error });
    }
  }

  return { base, results };
}

/**
 * After a page/blog/trek is published:
 * 1) refresh sitemap counts
 * 2) resubmit sitemap feeds to GSC
 * 3) notify Google about the URL (Indexing API when available)
 */
function notifyPublishedUrl(pathOrUrl: string) {
  setImmediate(() => {
    void (async () => {
      try {
        await refreshSitemapCounts();
        await submitCoreSitemaps().catch((err) => {
          logger.warn("Core sitemap submit skipped", { error: String(err) });
        });

        const base = await siteBase();
        const url = absUrl(base, pathOrUrl);
        const { googleSearchConsoleService } = await import("./googleSearchConsole.service");
        const { seoService } = await import("./seo.service");

        try {
          await googleSearchConsoleService.notifyUrlUpdated(url);
          await seoService.requestIndexing(url, "auto-publish-index-api");
        } catch (err) {
          logger.warn("Indexing notify failed; falling back to inspect", {
            url,
            error: String(err),
          });
          await googleSearchConsoleService.inspectUrl(url).catch(() => null);
          await seoService.requestIndexing(url, "auto-publish-inspect").catch(() => null);
        }

        const { invalidateBootstrapCache } = await import("../controllers/content.controller");
        invalidateBootstrapCache();
      } catch (err) {
        logger.warn("seoAutoIndex.notifyPublishedUrl failed", {
          pathOrUrl,
          error: String(err),
        });
      }
    })();
  });
}

/** Push latest published blogs: refresh blogs sitemap + notify each URL. */
async function pushRecentBlogs(limit = 30) {
  const base = await siteBase();
  await refreshSitemapCounts();

  const blogsSitemap = absUrl(base, "/sitemaps/blogs.xml");
  const indexSitemap = absUrl(base, "/sitemap.xml");
  const { googleSearchConsoleService } = await import("./googleSearchConsole.service");
  const { seoService } = await import("./seo.service");

  const sitemapResults = [];
  for (const url of [indexSitemap, blogsSitemap]) {
    try {
      await googleSearchConsoleService.submitSitemap(url);
      sitemapResults.push({ url, status: "submitted" as const });
    } catch (err) {
      sitemapResults.push({
        url,
        status: "failed" as const,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const blogs = await BlogModel.find({ status: "published", deletedAt: null })
    .select("slug title publishedAt updatedAt")
    .sort({ publishedAt: -1, updatedAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 50))
    .lean();

  const urlResults: Array<{
    slug: string;
    url: string;
    status: "notified" | "inspected" | "failed";
    detail?: string;
  }> = [];

  for (const blog of blogs) {
    const url = absUrl(base, `/blogs/${blog.slug}`);
    try {
      await googleSearchConsoleService.notifyUrlUpdated(url);
      await seoService.requestIndexing(url, "manual-push-blogs");
      urlResults.push({ slug: blog.slug, url, status: "notified" });
    } catch (notifyErr) {
      try {
        await googleSearchConsoleService.inspectUrl(url);
        await seoService.requestIndexing(url, "manual-push-blogs-inspect");
        urlResults.push({
          slug: blog.slug,
          url,
          status: "inspected",
          detail: notifyErr instanceof Error ? notifyErr.message : String(notifyErr),
        });
      } catch (inspectErr) {
        urlResults.push({
          slug: blog.slug,
          url,
          status: "failed",
          detail: inspectErr instanceof Error ? inspectErr.message : String(inspectErr),
        });
      }
    }
  }

  const { invalidateBootstrapCache } = await import("../controllers/content.controller");
  invalidateBootstrapCache();

  return {
    base,
    blogsCount: blogs.length,
    sitemaps: sitemapResults,
    urls: urlResults,
  };
}

export const seoAutoIndexService = {
  refreshSitemapCounts,
  submitCoreSitemaps,
  notifyPublishedUrl,
  pushRecentBlogs,
  CORE_SITEMAP_PATHS,
};
