# Pre-Deployment Checklist

Use this before every production deployment to [robinfrancis.in](https://robinfrancis.in/).

## Code Quality

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] No unrelated files are included in the diff.
- [ ] No API keys, tokens, or secrets are committed.
- [ ] New routes use Next.js `metadata`, not client-side SEO tags.

## Route And Content Checks

- [ ] Home renders.
- [ ] `/projects/` renders project cards and project modal summaries.
- [ ] `/blog/` renders article list.
- [ ] `/blog/[slug]/` renders article content, listen controls, and share control.
- [ ] `/gallery/` renders masonry images.
- [ ] `/card/` renders profile card.
- [ ] `/api/contact` still sends through Resend.

## SEO And AEO

- [ ] Each route has one title and one meta description.
- [ ] Canonical URLs use the preferred trailing slash form.
- [ ] `x-default` hreflang is present where applicable.
- [ ] JSON-LD is present for structured routes.
- [ ] `public/sitemap.xml` includes new public routes.
- [ ] `public/robots.txt` points to the sitemap.
- [ ] `public/llms.txt` and `public/llms-full.txt` are still accurate after major content changes.
- [ ] `public/humans.txt` reflects the current stack.

## Accessibility

- [ ] Main pages have a clear H1.
- [ ] Pages include H2 coverage for crawler and assistive technology structure.
- [ ] Images have meaningful alt text.
- [ ] Keyboard focus states are visible.
- [ ] Buttons and links have accessible names.
- [ ] Mobile tap targets are usable.

## Security

- [ ] `vercel.json` still includes security headers.
- [ ] CSP changes were tested against images, fonts, Sanity, analytics, contact API, and external links.
- [ ] `X-Frame-Options: DENY` is present.
- [ ] `X-Content-Type-Options: nosniff` is present.
- [ ] `Referrer-Policy` and `Permissions-Policy` are present.

## Local Commands

```bash
npm run typecheck
npm run build
npm start
```

Production preview runs at [http://localhost:5174](http://localhost:5174).

## Deploy

```bash
git add .
git commit -m "describe the change"
git push origin main
vercel --prod --yes
```

## Post-Deploy Verification

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

Expected:

- Deployment is `READY` in Vercel.
- `https://robinfrancis.in` and `https://robinfrancis.in` resolve.
- Security headers are present.
- Main pages return `200`.
- Sitemap XML parses.

Last updated: July 1, 2026
