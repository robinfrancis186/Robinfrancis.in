# Final Report

## Current Status

The portfolio is live on Vercel at:

- [https://robinfrancis.in](https://robinfrancis.in)
- [https://robinfrancis.in](https://robinfrancis.in)

Current stack:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Sanity Studio
- Resend
- Vercel

## Completed Production Improvements

- Server-rendered route metadata for key pages.
- Structured data for home, projects, blog, blog posts, gallery, and card routes.
- `x-default` hreflang on sampled public routes.
- Crawler-visible fallback content for content-heavy client routes.
- Single meta description per sampled route.
- Clean H1/H2 coverage across sampled routes.
- Vercel security headers including CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer Policy, and Permissions Policy.
- Updated sitemap and public SEO helper files.
- Removed unused client-side React Helmet SEO layer.

## Verified Checks

- `npm run typecheck`
- `npm run build`
- Live header checks with `curl -I`
- Live HTML checks for:
  - meta description count
  - H1
  - H2 coverage
  - internal links
  - JSON-LD
  - `x-default`

## Remaining Maintenance

- Review npm audit warnings deliberately.
- Refresh Browserslist data periodically.
- Review Sanity Studio runtime/local version drift during dependency updates.
- Re-run a crawler after major content or route changes.

Last updated: July 1, 2026
