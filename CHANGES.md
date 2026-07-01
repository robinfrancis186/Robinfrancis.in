# Changes

## July 1, 2026

Current production state:

- Migrated documentation to reflect the active Next.js/Vercel architecture.
- Site runs on Next.js 16 App Router with React 19 and TypeScript.
- Production deploys through Vercel, not GitHub Pages.
- Contact form uses the `/api/contact` route with Resend.
- Route SEO is handled with Next.js metadata, not React Helmet.
- Main routes include JSON-LD and `x-default` hreflang.
- Main routes include crawler-visible fallback summaries.
- Security headers are configured in `vercel.json`.

Recent production commits:

- `77afa5f Improve crawlability and security headers`
- `c38ade1 Improve route crawl metadata`

## Historical March 2026 Notes

Earlier optimization work focused on image conversion, initial bundle reduction, AI crawler files, and GitHub Pages-era SEO fixes. Those notes are retained in the archive-style documentation files, but current setup and deployment instructions should come from:

- `README.md`
- `QUICK_START.md`
- `PRE_DEPLOYMENT_CHECKLIST.md`
- `POST_DEPLOYMENT_ACTIONS.md`
- `SEO_AEO_SECURITY_PLAN.md`

Last updated: July 1, 2026
