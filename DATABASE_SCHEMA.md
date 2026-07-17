# Database Schema — Enterprise SEO

## New collections

### `seo_settings`
Global site SEO defaults, homepage block, verification tokens, organization fields.

### `robots`
Robots.txt rules, host, sitemap list, optional custom content override.

### `redirects`
`fromPath` (unique), `toPath`, `statusCode` (301/302/307/308), `isActive`, `hitCount`, `entityType`, `entityId`, soft-delete.

### `sitemaps`
Sitemap generator config: base URL, autoUpdate, entries (`name`, `path`, `changefreq`, `priority`, `urlCount`, `lastGeneratedAt`).

### `meta_templates`
Reusable title/description templates per entity type with `{{variables}}`.

### `schema_templates`
JSON-LD templates by schema type (Organization, FAQPage, TouristTrip, …).

### `search_console`
Property URL, verification meta, sitemap submission log, indexing request log.

### `analytics`
GA4, GTM, Meta Pixel, Microsoft Clarity, custom scripts.

### `programmatic_seo_pages`
Filter landing pages (`/treks/himachal`, `/treks/easy`, …) with SEO + FAQ + filterQuery.

### `search_queries`
Tracked search terms for popular/trending/autocomplete.

### `not_found_logs`
404 path hits for admin 404 manager.

## Extended existing collections

### Treks / Blogs / Destinations — `seo` subdocument

Backward compatible expansion of prior `{ title, description, canonical, ogImage }`:

- keywords, focusKeyword
- ogTitle, ogDescription, ogType
- twitterCard, twitterTitle, twitterDescription, twitterImage
- robots, index, follow
- schemaType, breadcrumb, faqs, schemaJson
- imageAlt, imageCaption
- seoScore, readabilityScore, lastSeoUpdate

### Blog additions
`tableOfContents`, `internalLinks`, `faq`, `modifiedAt`

### Destination additions
`howToReach`, `faqs`

## Compatibility

- Existing documents load without migration (all new fields optional).
- Unique slug indexes unchanged.
- Soft-delete plugins retained on CMS models.
