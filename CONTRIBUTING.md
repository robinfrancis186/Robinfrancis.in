# Contributing

This repository powers [robinfrancis.in](https://www.robinfrancis.in/). It is a Next.js portfolio with interactive client views, static SEO metadata, Sanity Studio output, and a Resend-backed contact API.

## Setup

```bash
git clone https://github.com/robinfrancis186/Robinfrancis.in.git
cd Robinfrancis.in
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174).

## Project Layout

```text
src/app/                  App Router pages, metadata, JSON-LD, API routes
src/views/                Client-side route experiences
src/components/           UI components and page sections
src/data/                 Static blog post data
src/lib/                  Sanity and helper utilities
public/                   Static assets and SEO files
portfolio-cms/            Sanity Studio source
scripts/                  Maintenance scripts
```

## Development Workflow

1. Create a branch.
2. Make a focused change.
3. Run checks.
4. Commit with a clear message.
5. Push and deploy through Vercel when ready.

```bash
git checkout -b feature/short-name
npm run typecheck
npm run build
git add .
git commit -m "feat: short description"
git push origin feature/short-name
```

Commit prefixes:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `perf:` performance
- `refactor:` internal cleanup
- `chore:` maintenance

## Coding Guidelines

- Keep route metadata in `src/app/**/page.tsx` using Next.js `metadata`.
- Do not reintroduce client-side SEO tags; the app uses server metadata now.
- When adding a route, include canonical metadata, Open Graph/Twitter metadata, and a sitemap entry.
- Add JSON-LD when the route represents structured content such as an article, profile, gallery, or project collection.
- Keep client components focused on the interactive experience.
- Prefer existing UI patterns, Tailwind tokens, and lucide icons.
- Keep images in `public/images/` and prefer WebP where practical.

## Required Checks

```bash
npm run typecheck
npm run build
```

During build you may see non-blocking warnings for Sanity Studio runtime version drift, Browserslist data freshness, or dependency audits. Do not run `npm audit fix --force` without a full test pass because it can introduce breaking upgrades.

## Manual Test Checklist

- Home page loads and theme toggle works.
- Projects page opens project cards and external links.
- Blog index and blog post pages render.
- Article audio/share controls still work.
- Gallery masonry renders.
- Contact form submits through Resend.
- Mobile navigation and scrolling work.
- Browser console has no new errors.

## Deployment

Production deployment is handled with Vercel:

```bash
vercel --prod --yes
```

After deploying:

```bash
curl -I https://robinfrancis.in/
```

Confirm CSP, HSTS, `X-Frame-Options`, `nosniff`, and the live alias are correct.

Last updated: July 1, 2026
