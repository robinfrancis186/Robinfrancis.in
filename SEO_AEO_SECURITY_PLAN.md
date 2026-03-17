# Robinfrancis.in Implementation Plan (March 17, 2026)

This plan is based on completed code changes, live production checks, and official search/security documentation.

## 1) Completed in Production

- Automatic IndexNow URL submission on publish is active in CI:
  - Workflow step: `Submit sitemap URLs to IndexNow`
  - Verified successful in run: `23203077745`
- Static route generation and sitemap generation are active for:
  - `/projects/`, `/blog/`, `/gallery/`, and individual blog URLs.
- Canonical and `og:url` normalization now uses trailing slash URLs to avoid avoidable redirects.
- Accessibility issue fixed in the 3D blog carousel:
  - Removed mismatched `aria-label` on content cards.
- Manifest/favicon issue fixed:
  - Added `public/manifest.webmanifest` with absolute icon paths.
- Security hardening additions:
  - Added `/.well-known/security.txt`
  - Added weekly TLS certificate monitor workflow:
    - `.github/workflows/security-monitor.yml`
    - `scripts/check-tls-cert.mjs`

## 2) Current Measured Baseline

Production checks (2026-03-17):

- Lighthouse Desktop:
  - Performance: `0.99`
  - SEO: `1.00`
  - Accessibility: `1.00`
  - Best Practices: `1.00`
- Lighthouse Mobile:
  - Performance: `0.54`
  - SEO: `1.00`
  - Accessibility: `1.00`
  - Best Practices: `1.00`
- TLS certificate:
  - Issuer: `Let's Encrypt R13`
  - Subject: `www.robinfrancis.in`
  - Validity observed: `2026-03-13` to `2026-06-11`

## 3) Remaining Priority Work

### Priority A: Mobile performance (highest impact now)

Goal: raise mobile Lighthouse performance from `0.54` toward `0.75+`.

Actions:

1. Reduce initial JS on home route (largest remaining gap).
2. Review and defer non-critical animation payloads below first viewport.
3. Audit heavy image assets still loaded on first view and enforce responsive sizing.
4. Optionally disable production sourcemaps (`vite.config.ts`) to reduce build output and parser noise.

### Priority B: Search visibility for the query "Robin Francis"

Important: technical SEO can improve discoverability but cannot guarantee ranking position.

Actions:

1. In Google Search Console:
   - Submit `https://www.robinfrancis.in/sitemap.xml`
   - Request indexing of key pages (`/`, `/projects/`, `/blog/`, `/gallery/`).
2. In Bing Webmaster Tools:
   - Confirm sitemap ingestion and crawl status.
3. Expand `sameAs` references where accurate and verifiable (authoritative profiles only).
4. Maintain fresh, name-explicit content (blog/project updates that include "Robin Francis" naturally).

### Priority C: Security headers via edge layer

GitHub Pages does not provide custom response header configuration for strict security headers.

Actions:

1. Put Cloudflare (or equivalent edge proxy) in front of the site.
2. Configure response headers:
   - Strict-Transport-Security
   - X-Content-Type-Options
   - Referrer-Policy
   - Permissions-Policy
   - Content-Security-Policy (header form, not meta-only)
3. Keep weekly TLS monitor workflow active.

## 4) Verification Checklist After Each Publish

1. `npm run build` passes.
2. `sitemap.xml` includes all canonical URLs.
3. IndexNow step succeeds in GitHub Actions.
4. `curl -I https://www.robinfrancis.in/manifest.webmanifest` returns `200`.
5. `curl -I https://www.robinfrancis.in/.well-known/security.txt` returns `200`.
6. Lighthouse quick check on production homepage (mobile + desktop).

## 5) Official Reference Links

- IndexNow protocol docs: https://www.indexnow.org/documentation
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google robots meta guidance: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google structured data intro: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- GitHub Pages HTTPS docs: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- security.txt standard (RFC 9116): https://datatracker.ietf.org/doc/html/rfc9116
