# API Documentation — Enterprise SEO Module

Base URL: `{API_URL}/api/v1`  
Auth for admin routes: `Authorization: Bearer <accessToken>` + permission `seo.write`

Interactive docs: `{API_URL}/api/v1/docs`

## Public endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/seo/bootstrap` | Settings, analytics flags, verification |
| GET | `/seo/robots.txt` | Generated robots.txt |
| GET | `/seo/sitemaps/:name` | XML sitemap (`index`, `treks`, `blogs`, `destinations`, `images`, `videos`, `categories`, `programmatic`) |
| GET | `/seo/page/:path` | Page-level SEO by path |
| GET | `/seo/redirects/resolve?path=` | Resolve active redirect |
| POST | `/seo/404` | Log a 404 hit |
| GET | `/seo/treks/:slug` | Trek SEO bundle + related/nearby/similar |
| GET | `/seo/destinations/:slug` | Destination SEO bundle |
| GET | `/seo/blogs/:slug` | Blog SEO bundle |
| GET | `/seo/programmatic/by-slug/:slug` | Programmatic landing page |
| POST | `/seo/schema/generate` | Generate JSON-LD by type |
| POST | `/seo/score/preview` | Score preview without persistence |
| GET | `/search` | Advanced search |
| GET | `/search/autocomplete` | Autocomplete |
| GET | `/search/suggestions` | Suggestions |
| GET | `/search/popular` | Popular searches |
| GET | `/search/trending` | Trending searches |
| GET | `/analytics/config` | Public GA4/GTM/Pixel/Clarity config |

## Admin endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET/PUT | `/seo/settings` | Global SEO settings |
| GET/PUT | `/seo/robots` | Robots config |
| GET/PUT | `/seo/sitemap-config` | Sitemap config |
| POST | `/seo/sitemaps/generate` | Regenerate all sitemaps |
| GET/POST | `/seo/redirects` | List / create redirects |
| PATCH/DELETE | `/seo/redirects/:id` | Update / delete redirect |
| GET | `/seo/404` | 404 logs |
| PATCH | `/seo/404/:id/resolve` | Mark 404 resolved |
| GET/PUT | `/seo/meta-templates` | Meta templates |
| DELETE | `/seo/meta-templates/:id` | Delete meta template |
| GET/PUT | `/seo/schema-templates` | Schema templates |
| GET/PUT | `/seo/search-console` | Search Console settings |
| POST | `/seo/search-console/sitemaps` | Record sitemap submission |
| POST | `/seo/search-console/indexing` | Record indexing request |
| GET/PUT | `/seo/analytics-config` | Analytics tag config |
| GET/PUT | `/seo/programmatic` | Programmatic pages |
| POST | `/seo/programmatic/seed` | Seed default filter pages |
| DELETE | `/seo/programmatic/:id` | Archive programmatic page |
| POST | `/seo/score` | Score entity `{ type, id }` |
| GET/PUT | `/seo` | List / upsert SEO pages |
| DELETE | `/seo/:id` or `/seo/pages/:id` | Soft-delete SEO page |

## Entity SEO payload (Trek / Blog / Destination)

```json
{
  "seo": {
    "title": "string",
    "description": "string",
    "keywords": ["string"],
    "canonical": "/treks/slug",
    "focusKeyword": "string",
    "ogTitle": "string",
    "ogDescription": "string",
    "ogImage": "https://...",
    "twitterCard": "summary_large_image",
    "twitterTitle": "string",
    "twitterDescription": "string",
    "twitterImage": "https://...",
    "robots": "index,follow",
    "index": true,
    "follow": true,
    "schemaType": "TouristTrip",
    "imageAlt": "string",
    "imageCaption": "string",
    "seoScore": 0,
    "readabilityScore": 0,
    "lastSeoUpdate": "ISO-8601"
  }
}
```

Existing create/update trek, blog, and destination APIs accept the expanded `seo` object without breaking older clients.
