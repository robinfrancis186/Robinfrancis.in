# Performance Optimization

## Current Architecture

The production site uses:

- Next.js static generation for public routes.
- Client components for interactive sections.
- Vercel hosting and cache behavior.
- WebP images where available.
- Sanity Studio built separately and copied to `public/cms`.

## Performance Priorities

1. Keep home route first load stable.
2. Avoid adding heavy libraries to shared client bundles.
3. Defer visual effects that are not needed above the fold.
4. Keep images responsive, compressed, and appropriately cropped.
5. Re-test mobile after animation or media changes.

## Commands

```bash
npm run optimize:images
npm run typecheck
npm run build
npm start
```

Local production preview runs at:

```text
http://localhost:5174
```

## Build Warnings

Known non-blocking warnings:

- Browserslist/caniuse-lite data can become stale.
- Sanity Studio may warn about runtime/local version differences.
- npm audit may report dependency warnings, especially from CMS dependencies.

Treat forced dependency upgrades as separate work and verify the whole app afterward.

## Measurement

Use Lighthouse or WebPageTest against the live Vercel deployment:

- [https://robinfrancis.in](https://robinfrancis.in)
- [https://www.robinfrancis.in](https://www.robinfrancis.in)

Do not compare current results to the older Vite/GitHub Pages bundle numbers without noting the architecture change.

Last updated: July 1, 2026
