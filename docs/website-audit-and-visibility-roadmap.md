# Robin Francis Website Audit And Visibility Roadmap

Date: 2026-07-07
Site: https://robinfrancis.in
Stack: Next.js App Router, Vercel, Sanity CMS, Tailwind CSS

## Executive Score

Overall rating: 8.5 / 10

The site is now a credible, source-backed personal platform rather than only a portfolio. The strongest assets are the proof-led achievements page, press kit, project evidence, gallery, blog audio/share controls, generated sitemap, metadata coverage, and schema markup. The main remaining gaps are external measurement setup, public backlink building, more case-study depth, and a few remaining raw/animated image surfaces that should be optimized gradually.

## Completed In This Pass

- Improved `/achievements/` with a clearer section navigator, proof-first scan path, richer public-source cards, anchored sections, award imagery, and stronger role/impact/proof framing.
- Added BreadcrumbList JSON-LD to the major non-home routes.
- Converted the static sitemap to per-route and per-blog `lastModified` values.
- Added internal "related evidence" links to every static blog post so articles route readers toward achievements, projects, gallery, and press kit.
- Added richer crawlable fallback/SEO content to major client-rendered routes, including a server-rendered homepage proof section and a complete project evidence block.
- Replaced key raw image surfaces with `next/image`: hero portrait, project cards, project modal images, blog thumbnails, blog hero/gallery images, masonry gallery images, press kit headshot, and homepage achievement carousel imagery.
- Removed `images.unoptimized: true` from Next config so Vercel can optimize images.
- Added GA4-ready script loading through `NEXT_PUBLIC_GA_ID`.
- Added custom GA4 event hooks for contact form success, article audio playback, article sharing, resume downloads, press kit views/downloads/proof clicks, project summary opens, and project live/GitHub outbound clicks.
- Hardened CMS PortableText links so unsafe protocols do not render as anchors.
- Kept `/awards/` redirected to `/achievements/` and `/speaking/` redirected to `/achievements/`.
- Split per-route client wrappers so each route imports only its own client view instead of sharing one all-routes client module.
- Removed manual gallery image preloading and added focused priority hints for the first visible gallery images.
- Added a normal keyboard-friendly contact form submit button alongside the slide-to-send interaction.
- Removed `unsafe-eval` from the Content Security Policy.
- Added `docs/monthly-visibility-dashboard.md` with the monthly GA4/GSC dashboard metric map.

## Design And UI/UX

Score: 8.4 / 10

Strengths:

- Visual identity is memorable and consistent.
- Dark mode feels polished and premium.
- The achievements page now leads with verification, not vague self-promotion.
- Project open cards explain what each project is and provide live/repo paths.
- Gallery gives strong real-world proof of leadership, speaking, awards, and community work.

Recommended next improvements:

- Add active state to the floating navigation on all pages.
- Improve mobile nav density so page context is obvious without relying only on icons.
- Add a conventional submit button fallback below the slide-to-send contact interaction.
- Give the homepage a stronger above-the-fold credibility strip: IEEE R10, IBM watsonx, STRIDE, GitHub.
- Build dedicated case studies for Argus, BulkyFi, STRIDE Kerala, and IEEE Sahrdaya leadership.

## Writing And Positioning

Score: 8.6 / 10

Strengths:

- Claims are increasingly source-backed.
- The site now says "Robin Francis" clearly across important routes.
- Achievements are framed around role, impact, and public proof.
- Press kit language is reusable for events, media, and partner pages.

Recommended next improvements:

- Keep tightening project copy into this structure: problem, Robin's role, what shipped, proof link, impact.
- Add one short "available for" line near the home hero: AI products, accessibility talks, public-interest platforms, community leadership.
- Convert the strongest blog posts into source-backed LinkedIn/Medium summaries that canonical-link back to the site.
- Avoid broad phrases like "AI innovator" unless paired with a concrete proof point.

## SEO And Indexing

Score: 8.7 / 10

Completed:

- Route metadata exists across home, projects, blog, blog posts, gallery, card, achievements, and press kit.
- Canonicals use `https://robinfrancis.in`.
- Sitemap is generated from `src/app/sitemap.ts`.
- Blog post metadata includes `publishedTime` and `modifiedTime`.
- Person, Organization, WebSite, BlogPosting, CollectionPage, ImageObject, Award/Thing, and BreadcrumbList schema are present.
- `llms.txt` and crawl-oriented docs exist.

Remaining SEO work:

- Add dedicated pages for the highest-intent queries:
  - `/projects/argus/`
  - `/projects/bulkyfi/`
  - `/projects/stride-kerala/`
  - `/work/ieee-sahrdaya/`
- Add FAQ sections to case studies where useful.
- Add more source-backed text near image-heavy pages so Google has enough crawlable context.
- Add backlinks from GitHub READMEs, product footers, STRIDE/K-DISC profiles where possible, IEEE/event pages, LinkedIn featured section, and Medium profile.

## Analytics And Measurement

Score now: 8.6 / 10

Code is ready. The site will load GA4 only when `NEXT_PUBLIC_GA_ID` is configured.

Current Vercel status checked on 2026-07-16:

- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` exist for Production and Development.
- Sanity environment variables exist for Production, Preview, and Development.
- `NEXT_PUBLIC_GA_ID` exists for Production and Development, so GA4 is active on production.
- Vercel's managed Upstash integration supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN` for Production, Preview, and Development. The contact endpoint also accepts the legacy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` aliases.

Tracked custom events:

- `contact_submit_success`
- `article_audio_play`
- `article_share_click`
- `resume_download`
- `press_kit_view`
- `press_kit_download` for headshot/media asset downloads
- `press_kit_contact_click`
- `press_kit_outbound_click`
- `press_kit_proof_click`
- `project_summary_open`
- `project_outbound_click` from project cards, modals, and server-rendered proof links

GA4 setup still required:

- Create a GA4 property and web data stream for `https://robinfrancis.in`.
- Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to Vercel Production, Preview, and Development environments.
- Enable enhanced measurement in GA4. Google's documentation says enhanced measurement can track interactions such as outbound clicks, file downloads, scrolls, form interactions, and video engagement when enabled in the GA interface: https://support.google.com/analytics/answer/9216061
- Validate outbound click/file download parameters in GA4 explorations. Google documents `link_url`, `link_domain`, `file_name`, `file_extension`, and outbound link dimensions here: https://support.google.com/analytics/table/13594742

Vercel setup references:

- Environment variables overview: https://vercel.com/docs/environment-variables
- Vercel CLI `env` commands: https://vercel.com/docs/cli/env

What I can do from code:

- Keep the GA loader and custom events in the repo.
- Add or update Vercel env variables once you provide the GA4 Measurement ID.
- Maintain the monthly dashboard spec in `docs/monthly-visibility-dashboard.md` until live GA4/GSC data is connected.

What needs your account/DNS access:

- Creating the GA4 property.
- Creating/verifying the Google Search Console property.
- DNS TXT verification if Search Console uses a domain property.

## Google Search Console

Priority setup:

- Create a Search Console Domain Property for `robinfrancis.in`.
- Verify ownership using DNS TXT.
- Submit `https://robinfrancis.in/sitemap.xml`.
- Use URL Inspection on:
  - `/`
  - `/projects/`
  - `/achievements/`
  - `/press-kit/`
  - `/blog/`
  - `/gallery/`
  - the top blog posts

Google's Search Console sitemap documentation recommends confirming that the sitemap is accessible to Googlebot, then submitting it in the Sitemaps report: https://support.google.com/webmasters/answer/7451001

Queries to monitor:

- Robin Francis
- Robin Francis AI
- Robin Francis IEEE
- Robin Francis Kerala
- Robin Francis K-DISC
- Robin Francis STRIDE
- Argus QA agent
- BulkyFi
- STRIDE Kerala website developer
- IEEE Region 10 Outstanding Volunteer Award Robin Francis

## Digital Visibility Plan

Priority 1: Entity consistency

- Use the same name, title, headshot, website URL, GitHub URL, LinkedIn URL, and 80-word bio everywhere.
- Update GitHub profile, LinkedIn featured section, Medium, Instagram, product README files, and event bios.
- Make `https://robinfrancis.in/press-kit/` the default public proof link for organizers and media.

Priority 2: Backlinks

- Add website links to:
  - Argus README
  - BulkyFi README
  - BulkyFi live app footer/about page
  - STRIDE/K-DISC profile or contributor pages where allowed
  - IEEE student branch posts and event reports
  - LinkedIn featured items
  - Medium profile and canonical article reposts

Priority 3: Content engine

- Publish one source-backed post every two weeks for three months.
- Best topics:
  - How I built a local-first QA browser agent
  - Building BulkyFi as a privacy-first certificate generator
  - How we built STRIDE Kerala's assistive technology platform
  - Lessons from growing IEEE Sahrdaya SB from 110 to 534 members
  - What accessibility taught me about better AI products
  - How student branches become leadership systems

Priority 4: Proof packaging

- Keep `/press-kit/` current.
- Keep `/achievements/` tied to public sources.
- Add downloadable/resizable press headshot options.
- Add short speaking topics inside achievements or press kit now that `/speaking/` is removed.

Priority 5: Distribution

- Share every new case study on LinkedIn.
- Repost summaries on Medium with canonical links back to robinfrancis.in.
- Use UTM links for social campaigns.
- Track top landing pages, contact submits, article audio plays, shares, project clicks, and press kit visits monthly.

## Performance

Score: 8.0 / 10

Improved:

- Vercel image optimization is now enabled again.
- Key visual surfaces moved to `next/image`.
- Image assets are already heavily WebP-based.
- Build tracing excludes local-only generated folders from production traces.
- Dev-server Lighthouse probes on 2026-07-07 scored well for accessibility, best practices, and SEO, but production scores still need a clean `next build` and deployed run.
  - `/`: Performance 73, Accessibility 100, Best Practices 100, SEO 100.
  - `/projects/`: Performance 74, Accessibility 94, Best Practices 100, SEO 100.
  - `/blog/`: Performance 73, Accessibility 94, Best Practices 100, SEO 100.
  - `/achievements/`: Performance 70, Accessibility 94, Best Practices 100, SEO 100.
  - `/gallery/`: Performance 74, Accessibility 100, Best Practices 100, SEO 100.

Remaining performance work:

- Audit animated sections on low-end mobile devices.
- Keep gallery image counts intentional; the gallery should prove the brand, not become a slow archive.
- Consider blur placeholders for the largest hero/gallery images.
- Ensure only the currently visible hero portrait is priority-preloaded; the dev Lighthouse LCP element was the dark hero portrait.
- Add route smoke tests and Lighthouse checks for `/`, `/projects/`, `/blog/`, `/achievements/`, and `/gallery/`.

## Accessibility

Score: 7.9 / 10

Strengths:

- Most important images now have meaningful alt text.
- Form fields have labels.
- Core routes use semantic headings and sections.
- Achievements page has better anchored navigation and proof source labels.

Remaining work:

- Validate the normal keyboard-friendly contact submit button across desktop and mobile after deployment.
- Confirm focus order around floating nav, theme toggle, modals, and carousel controls.
- Add active nav state.
- Review contrast for blue-on-dark secondary text and small proof labels.

## Security And Code Quality

Score: 7.7 / 10

Strengths:

- TypeScript typecheck passes.
- Unsafe CMS link protocols are filtered.
- Vercel deployment path is the real production path.
- `RESEND_API_KEY` stays server-side.
- GA4 loader is environment gated.

Remaining issues:

- `npm audit --omit=dev` previously reported two moderate advisories through Next's bundled PostCSS path. npm's suggested fix downgraded Next drastically, so it should not be applied blindly.
- `npm audit --omit=dev --prefix portfolio-cms` reported no CMS production advisories in the latest probe, but the CMS dependency stack still deserves a separate maintenance upgrade pass.
- Contact API uses the connected Upstash Redis resource for durable serverless rate limiting. Local development still falls back to in-memory limiting when no Redis credentials are available, while production fails closed with `503` if the integration is disconnected.
- CSP is still broad and includes `unsafe-inline`, but `unsafe-eval` has been removed. Further tightening should be narrowed in report-only mode first.
- Production deploy verification should continue to include both a clean local build and a Vercel deployment check.

Recommended fixes:

- Track Next releases and apply the safe PostCSS advisory fix when available.
- Periodically verify the Upstash integration remains connected across Production, Preview, and Development.
- Add Turnstile or equivalent lightweight bot protection for the contact form.
- Move CSP tightening through report-only first, then enforcement.
- Add smoke tests for route rendering and contact API validation.

## Developer Experience

Score: 8.0 / 10

Strengths:

- Source-backed profile data is centralized in `src/data/profileProof.ts`.
- Static blog content is centralized in `src/data/blogPosts.ts`.
- Sitemap, schema, metadata, and proof data are now easier to maintain.
- Typecheck is fast and clean.

Remaining work:

- Keep the local build and production route smoke checks in the release workflow.
- Keep `NEXT_PUBLIC_GA_ID` documented and environment-gated; do not enable a second pageview source through GTM without duplicate-event testing.
- Add route smoke tests:
  - home renders
  - `/achievements/` renders
  - `/gallery/` renders
  - `/blog/ieee-r10-volunteer-award/` renders
  - `/api/contact` rejects invalid payloads
- Document required env vars in README:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
  - `NEXT_PUBLIC_GA_ID`
  - `KV_REST_API_URL` (or legacy `UPSTASH_REDIS_REST_URL`)
  - `KV_REST_API_TOKEN` (or legacy `UPSTASH_REDIS_REST_TOKEN`)

## Highest Priority Next Actions

This week:

- Get GA4 Measurement ID and add `NEXT_PUBLIC_GA_ID` to Vercel.
- Create and verify Google Search Console Domain Property.
- Submit `https://robinfrancis.in/sitemap.xml`.
- Deploy the current code to production.
- Add active nav state and contact submit fallback.

Monthly dashboard spec:

- Branded search impressions: Google Search Console query impressions for `Robin Francis`, `Robin Francis AI`, `Robin Francis IEEE`, `Robin Francis Kerala`, `Argus QA agent`, `BulkyFi`, and `STRIDE Kerala website`.
- Top landing pages: GA4 landing page report with sessions, engaged sessions, engagement rate, and conversions.
- Contact form submissions: GA4 event count and key-event count for `contact_submit_success`.
- Resume downloads: GA4 event count for `resume_download`, grouped by `file_name` and `link_location`.
- Project outbound clicks: GA4 event count for `project_outbound_click`, grouped by `project_name`, `destination_type`, and `link_location`.
- Press kit visits: GA4 page views and sessions for `/press-kit/`, plus `press_kit_view`.
- Press kit downloads and proof clicks: `press_kit_download`, `press_kit_proof_click`, `press_kit_outbound_click`, and `press_kit_contact_click`.
- Blog audio and shares: `article_audio_play` and `article_share_click`, grouped by `article_slug` or `article_title`.
- Search Console health: clicks, impressions, CTR, average position, indexed pages, sitemap status, and top pages gaining or losing impressions.

GA4 key events to consider marking after data starts flowing:

- `contact_submit_success`
- `resume_download`
- `project_outbound_click`
- `press_kit_download`
- `press_kit_contact_click`

Connection workflow:

1. Create GA4 property and web stream for `https://robinfrancis.in`.
2. Enable enhanced measurement for page views, scrolls, outbound clicks, site search, form interactions, video engagement, and file downloads where applicable.
3. Add `NEXT_PUBLIC_GA_ID` to Vercel Production, Preview, and Development.
4. Deploy and confirm the GA4 Realtime report receives page views.
5. Create a Google Search Console Domain Property for `robinfrancis.in` and verify with DNS TXT.
6. Submit `https://robinfrancis.in/sitemap.xml`.
7. Link Search Console to GA4 from GA4 Admin so query and landing-page data can be reviewed together.
8. Build the monthly dashboard in Looker Studio or GA4 Explorations using the metrics above.

Next two weeks:

- Publish Argus, BulkyFi, STRIDE Kerala, and IEEE Sahrdaya case study pages.
- Add GitHub README backlinks to the relevant website pages.
- Add more structured proof blocks on the homepage.
- Create a simple analytics dashboard using GA4 and Search Console data.

Next month:

- Publish four source-backed blog posts.
- Update all external profiles with the same bio and link set.
- Ask partner/source pages to link to Robin's press kit or case studies.
- Review Search Console query growth and improve titles/meta based on real impressions.
