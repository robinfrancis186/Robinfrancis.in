# Trailing Slash URL Policy

Current status as of July 1, 2026: the site runs on Next.js and Vercel, not the older GitHub Pages SPA setup.

## Canonical Policy

Canonical public URLs use trailing slashes:

- `https://www.robinfrancis.in/`
- `https://www.robinfrancis.in/projects/`
- `https://www.robinfrancis.in/blog/`
- `https://www.robinfrancis.in/gallery/`
- `https://www.robinfrancis.in/card/`
- `https://www.robinfrancis.in/blog/[slug]/`

## Where To Maintain This

- `public/sitemap.xml`
- `metadata.alternates.canonical` in `src/app/**/page.tsx`
- Open Graph URLs in route metadata
- Internal links in components and fallback content

## Verification

```bash
curl -I https://robinfrancis.in/projects/
curl -I https://robinfrancis.in/blog/
curl -I https://robinfrancis.in/gallery/
curl -L https://robinfrancis.in/sitemap.xml
```

The important behavior is that canonical tags, sitemap URLs, and internal links agree. Redirects from non-slash variants are acceptable, but the canonical URL should remain the trailing slash URL.

Last updated: July 1, 2026
