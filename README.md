# Robin Francis Portfolio

Personal portfolio for Robin Francis, built with Next.js, React, TypeScript, Tailwind CSS, Sanity Studio, and Vercel.

[![Live Site](https://img.shields.io/badge/live-robinfrancis.in-blue)](https://robinfrancis.in/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-black)](https://vercel.com/)

Live site: [robinfrancis.in](https://robinfrancis.in/)

## What This Site Includes

- Server-rendered Next.js routes for home, projects, blog, gallery, card, and blog posts.
- Interactive portfolio sections with Framer Motion, Three.js, Lottie, and custom UI components.
- Static blog content with article audio/share controls.
- Sanity Studio bundled into `public/cms` during production builds.
- Contact API at `/api/contact` using Resend.
- SEO/AEO foundations: canonical URLs, sitemap, robots, llms files, JSON-LD, Open Graph, Twitter cards, and `x-default` hreflang.
- Security headers through `vercel.json`, including CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer Policy, and Permissions Policy.
- Image optimization workflow for WebP assets.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion and GSAP
- Three.js with React Three Fiber
- Sanity Studio and Sanity client
- Resend for contact email
- Vercel for production hosting

## Repository Structure

```text
src/app/                  Next.js App Router routes and API endpoints
src/views/                Client route views
src/components/           Reusable UI and page sections
src/data/                 Static blog data
src/lib/                  Sanity and utility helpers
public/                   Static assets, SEO files, sitemap, manifest
portfolio-cms/            Sanity Studio source
scripts/                  Image optimization and maintenance scripts
vercel.json               Production headers and Vercel config
```

## Local Development

```bash
git clone https://github.com/robinfrancis186/Robinfrancis.in.git
cd Robinfrancis.in
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174).

The production preview also runs on port `5174`:

```bash
npm run build
npm start
```

## Scripts

```bash
npm run dev              # Next.js dev server on port 5174
npm run typecheck        # TypeScript check
npm run lint             # Alias for TypeScript check
npm run optimize:images  # Convert supported images to WebP
npm run build            # Build Sanity Studio, copy CMS output, then build Next
npm start                # Run production Next server on port 5174
npm run preview          # Alias for production Next server
```

## Environment Variables

The contact API uses Resend. Configure these locally and in Vercel:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=robinfrancis186@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Sanity Studio uses the project configuration in `portfolio-cms/`. Vercel build logs may warn when the local Sanity package version differs from the hosted Studio runtime; that is non-blocking but should be reviewed during dependency updates.

## Deployment

Production is hosted on Vercel.

```bash
npm run typecheck
npm run build
git push origin main
vercel --prod --yes
```

Current production domains:

- [https://robinfrancis.in](https://robinfrancis.in)
- [https://www.robinfrancis.in](https://www.robinfrancis.in) redirects to the canonical apex domain.

After deployment, verify:

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

Expected headers include `content-security-policy`, `strict-transport-security`, `x-content-type-options: nosniff`, and `x-frame-options: DENY`.

## SEO And Crawlability

The site includes:

- One meta description per route.
- Canonical URLs with trailing slash route normalization.
- `x-default` alternate links.
- JSON-LD for home, projects, blog index, blog posts, gallery, and card routes.
- Server-visible fallback summaries for key routes so crawlers can understand content without executing all client JavaScript.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `humans.txt`, and `manifest.webmanifest`.

When changing routes, update:

- `public/sitemap.xml`
- route `metadata` in `src/app/**/page.tsx`
- route JSON-LD if the page represents structured content
- `public/llms.txt` / `public/llms-full.txt` for major content changes

## Documentation

- [Quick Start](QUICK_START.md)
- [Contributing](CONTRIBUTING.md)
- [Pre-Deployment Checklist](PRE_DEPLOYMENT_CHECKLIST.md)
- [Post-Deployment Actions](POST_DEPLOYMENT_ACTIONS.md)
- [SEO, AEO, and Security Plan](SEO_AEO_SECURITY_PLAN.md)
- [SEO Ranking Guide 2026](SEO_RANKING_GUIDE_2026.md)
- [Indexing Notes](INDEXING_ISSUES_FIX.md)
- [Performance Notes](PERFORMANCE_OPTIMIZATION.md)

Older optimization reports are retained for historical context and now include current-stack notes where needed.

## Known Maintenance Items

- `npm audit` currently reports dependency warnings, mostly from the CMS dependency tree. Avoid `npm audit fix --force` without testing because it can introduce breaking upgrades.
- Browserslist/caniuse-lite warnings may appear during build and should be refreshed periodically.
- Sanity Studio version warnings should be reviewed during Sanity upgrades.

## Author

Robin Francis

- Website: [robinfrancis.in](https://robinfrancis.in/)
- GitHub: [@robinfrancis186](https://github.com/robinfrancis186)
- LinkedIn: [Robin Francis](https://www.linkedin.com/in/robin-francis-b43565175)
- Email: robinfrancis186@gmail.com

Last updated: July 1, 2026
