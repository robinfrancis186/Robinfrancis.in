# Implementation Checklist

## Current Baseline

- [x] Next.js App Router routes are active.
- [x] Home, projects, blog, gallery, card, and static blog post routes build.
- [x] Contact API uses Resend.
- [x] Sanity Studio builds into `public/cms`.
- [x] Vercel deploy is production-ready.
- [x] Vercel security headers are configured.
- [x] Sitemap uses canonical URLs.
- [x] Main routes include route metadata.
- [x] Main routes include JSON-LD where appropriate.
- [x] Main routes include `x-default` hreflang.
- [x] Old client-side React Helmet SEO layer removed.

## Before Adding A Route

- [ ] Create the route in `src/app`.
- [ ] Add `metadata`.
- [ ] Add canonical and `x-default` alternate.
- [ ] Add Open Graph and Twitter metadata.
- [ ] Add JSON-LD if the route has structured content.
- [ ] Add the route to `public/sitemap.xml` if public.
- [ ] Add useful internal links.
- [ ] Confirm H1/H2 structure.

## Before Updating A Project

- [ ] Update visible card content.
- [ ] Update modal summary if applicable.
- [ ] Update image alt text.
- [ ] Update project JSON-LD in `src/app/projects/page.tsx`.
- [ ] Update `llms.txt` / `llms-full.txt` if the project is important for AI/search summaries.

## Before Updating Blog Content

- [ ] Update `src/data/blogPosts.ts`.
- [ ] Confirm slug is stable.
- [ ] Confirm article date and excerpt are accurate.
- [ ] Confirm image path and alt text.
- [ ] Update sitemap if adding/removing a post.

## Verification

```bash
npm run typecheck
npm run build
```

For production:

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

Last updated: July 1, 2026
