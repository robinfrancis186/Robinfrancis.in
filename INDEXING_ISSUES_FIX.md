# Indexing Notes And Fixes

Current status as of July 1, 2026: the site has moved from the older SPA/GitHub Pages model to Next.js on Vercel. The earlier indexing issues around missing H1/H2, low-content initial HTML, long descriptions, missing `x-default`, missing structured data, and missing response security headers have been addressed in the current deployment.

## What Is Fixed

- Home page has a concise single meta description.
- Main routes have server-rendered metadata through Next.js.
- Main routes include `x-default` hreflang.
- Main routes include JSON-LD where appropriate.
- Projects, blog, gallery, card, and blog post routes include server-visible fallback content for crawlers.
- Sitemap uses canonical trailing slash URLs.
- Security headers are configured through Vercel.

## Current Sitemap URLs

- `https://www.robinfrancis.in/`
- `https://www.robinfrancis.in/projects/`
- `https://www.robinfrancis.in/blog/`
- `https://www.robinfrancis.in/gallery/`
- `https://www.robinfrancis.in/images/robin-francis-resume.pdf`
- `https://www.robinfrancis.in/blog/soulsync-emotional-wellness/`
- `https://www.robinfrancis.in/blog/ieee-r10-volunteer-award/`
- `https://www.robinfrancis.in/blog/future-of-accessible-technology/`
- `https://www.robinfrancis.in/blog/scalable-systems-with-communities/`
- `https://www.robinfrancis.in/blog/people-centric-ai/`

## Search Console Workflow

When Google reports indexing issues:

1. Inspect the exact URL in Search Console.
2. Confirm the canonical URL returns `200`.
3. Confirm the page is in `sitemap.xml` if it should be indexed.
4. Check source HTML for title, description, H1, H2, internal links, and JSON-LD.
5. Request indexing after the page is fixed and deployed.

## Quick Checks

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
curl -L https://robinfrancis.in/projects/
```

## Content Guidance

For better indexing quality:

- Keep project summaries specific and factual.
- Add blog posts with useful, original content.
- Link related blog posts and projects internally.
- Keep image alt text descriptive.
- Avoid thin pages that only hydrate through client JavaScript.

Last updated: July 1, 2026
