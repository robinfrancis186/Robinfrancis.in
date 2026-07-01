# Optimization Summary

## Current Optimization State

The current site is optimized around Next.js static generation, Vercel hosting, route-level metadata, and selective client-side interactivity.

Implemented:

- Image optimization script for WebP assets.
- Next.js static generation for public pages.
- Sanity Studio build copied into `public/cms`.
- Server metadata for SEO-critical tags.
- JSON-LD for structured content.
- Crawler-visible fallback content for key client routes.
- Security headers at the Vercel edge.
- Production build validation through `npm run build`.

## Performance Notes

Important interactive libraries remain in use:

- Framer Motion
- GSAP
- Three.js / React Three Fiber
- Lottie
- Sanity client

When optimizing further:

- Keep first-viewport assets small.
- Defer non-critical animation work.
- Prefer WebP images in `public/images`.
- Avoid adding large dependencies for small UI behavior.
- Test mobile performance after visual-heavy changes.

## Current Verification

```bash
npm run typecheck
npm run build
```

Optional production checks:

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

## Historical Note

Older March 2026 optimization numbers in previous versions of this document referred to the Vite/GitHub Pages build. The live site now runs on Next.js/Vercel, so new measurements should be taken against the current deployment.

Last updated: July 1, 2026
