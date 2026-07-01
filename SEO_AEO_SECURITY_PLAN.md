# SEO, AEO, And Security Plan

Current production stack: Next.js on Vercel with route-level metadata, JSON-LD, static SEO files, and Vercel response headers.

## Current Production State

- Canonical site:
  - [https://robinfrancis.in](https://robinfrancis.in)
  - [https://robinfrancis.in](https://robinfrancis.in)
- Public routes:
  - `/`
  - `/projects/`
  - `/blog/`
  - `/blog/[slug]/`
  - `/gallery/`
  - `/card/`
- Sitemap:
  - `public/sitemap.xml`
- AI/search helper files:
  - `public/robots.txt`
  - `public/llms.txt`
  - `public/llms-full.txt`
  - `public/humans.txt`

## SEO Foundation

Each public route should maintain:

- Unique title.
- One meta description under normal search-result length.
- Canonical URL.
- Open Graph metadata.
- Twitter card metadata.
- `x-default` hreflang.
- Server-visible H1 and H2 structure.
- Internal links to relevant routes.

Current sampled live pages verify those properties for `/`, `/projects/`, `/blog/`, `/gallery/`, `/card/`, and a static blog post.

## AEO And Structured Data

JSON-LD is used for:

- Home: `Person` and `WebSite`.
- Projects: `CollectionPage` with `CreativeWork` entries.
- Blog index: `Blog` with `BlogPosting` entries.
- Blog posts: `BlogPosting`.
- Gallery: `CollectionPage` with `ImageObject` entries.
- Card: `ProfilePage`.

When adding content:

1. Add or update the route metadata in `src/app/**/page.tsx`.
2. Add JSON-LD if the content maps cleanly to Schema.org.
3. Keep descriptions concise and factual.
4. Update sitemap and LLM files if the page should be discoverable.

## Security Headers

Headers are configured in `vercel.json`.

Expected live headers:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

Verify with:

```bash
curl -I https://robinfrancis.in/
```

## Crawl Verification

Before claiming SEO work is complete:

```bash
npm run typecheck
npm run build
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

For route HTML checks, inspect:

- meta description count
- H1 count
- H2 coverage
- internal links
- JSON-LD script count
- `x-default` alternate

## Search Console Actions

After route or metadata changes:

1. Submit sitemap in Google Search Console.
2. Submit sitemap in Bing Webmaster Tools.
3. Request indexing for changed URLs.
4. Monitor "Crawled - currently not indexed" pages for content depth and internal links.

## Known Maintenance Items

- Dependency audit warnings remain and should be handled deliberately, not with blind forced upgrades.
- Browserslist data should be refreshed periodically.
- Sanity Studio version drift warnings should be reviewed during CMS dependency updates.

Last updated: July 1, 2026
