# Monthly Visibility Dashboard

Purpose: track whether `robinfrancis.in` is increasing Robin Francis's digital visibility, proof discovery, and collaboration intent.

Status: GA4, Google Search Console, sitemap submission, first indexing requests, and durable Upstash Redis contact throttling are active. Live charts started collecting GA4 data on July 7, 2026; Search Console query data usually lags by 24 to 48 hours or more. GA4-Search Console linking still requires account-level confirmation.

## Current Production Setup

| Item | Status | Notes |
| --- | --- | --- |
| GA4 property | Active | Property label: `websitte`; web stream: `robinfrancis`; stream URL: `https://www.robinfrancis.in/`. |
| GA4 measurement ID | Active | `G-J6M7KWQMHP`. |
| Vercel env var | Active | `NEXT_PUBLIC_GA_ID` is set for Production and Development. Preview is not set because Vercel requires a preview branch separate from the production branch. |
| Production deployment | Active | Production was redeployed after adding the GA4 ID. |
| Enhanced measurement | Active | Page views, scrolls, outbound clicks, and additional enhanced measurement events are enabled in GA4. |
| Search Console property | Active | Domain property `sc-domain:robinfrancis.in` is DNS verified. |
| Sitemap | Submitted | `https://www.robinfrancis.in/sitemap.xml` submitted on July 7, 2026, read successfully, with 14 discovered pages. |
| Indexing requests | Queued | Requested for `/`, `/projects/`, `/blog/`, `/gallery/`, `/achievements/`, `/press-kit/`, and `/blog/ieee-sahrdaya-student-branch-movement/`. |
| GA4-GSC product link | Pending | Requires final Google account confirmation because it creates a persistent product link. |
| Upstash Redis | Active | Free managed Redis resource connected to Production, Preview, and Development on July 16, 2026. |

## Required Account Setup

1. Done: create a GA4 property for `https://robinfrancis.in`.
2. Done: add `NEXT_PUBLIC_GA_ID=G-J6M7KWQMHP` to Vercel Production and Development.
3. Done: enable GA4 enhanced measurement for page views, scrolls, outbound clicks, and related default web stream events.
4. Done: create a Google Search Console Domain Property for `robinfrancis.in`.
5. Done: verify Search Console with DNS TXT.
6. Done: submit `https://www.robinfrancis.in/sitemap.xml`.
7. Pending: link GA4 and Search Console from the GA4 Admin product links section.
8. Done: connect Upstash Redis to Vercel for Production, Preview, and Development; the integration supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN`.

## Dashboard Filters

- Date range: current month, previous month, previous 90 days.
- Device category: desktop, mobile, tablet.
- Country: India, United States, all countries.
- Page group:
  - Home: `/`
  - Projects: `/projects/`
  - Achievements: `/achievements/`
  - Press kit: `/press-kit/`
  - Blog: `/blog/` and `/blog/*`
  - Gallery: `/gallery/`

## KPI Cards

| KPI | Source | Definition |
| --- | --- | --- |
| Branded search impressions | Search Console | Impressions where query contains `robin francis`, `robin francis ai`, `robin francis ieee`, or `robin francis kerala`. |
| Top landing pages | GA4 | Sessions by landing page plus engagement rate. |
| Contact form submissions | GA4 | Event count for `contact_submit_success`. |
| Resume downloads | GA4 | Event count for `resume_download`, grouped by `file_name` and `link_location`. |
| Project outbound clicks | GA4 | Event count for `project_outbound_click`, grouped by `project_name`, `destination_type`, and `link_location`. |
| Press kit visits | GA4 | Views and sessions where page path is `/press-kit/`. |
| Blog audio plays | GA4 | Event count for `article_audio_play`, grouped by `article_slug`. |
| Blog shares | GA4 | Event count for `article_share_click`, grouped by `article_slug`, `share_method`, and `share_status`. |

## Search Console Query Panels

Track impressions, clicks, CTR, and average position for:

- `Robin Francis`
- `Robin Francis AI`
- `Robin Francis IEEE`
- `Robin Francis Kerala`
- `Argus QA agent`
- `BulkyFi`
- `STRIDE Kerala website`

## Monthly Review Questions

- Which branded queries increased or declined month over month?
- Which landing pages produce the most engaged sessions?
- Which proof pages drive collaboration intent: `/achievements/`, `/press-kit/`, `/projects/`, or `/gallery/`?
- Which projects receive outbound clicks, and are those clicks to live demos or GitHub repositories?
- Which blog posts earn audio plays or shares?
- Which public proof links should be promoted more prominently?

## Suggested Looker Studio Layout

1. Overview: KPI cards, branded impressions trend, top landing pages.
2. Search visibility: query table, page table, country/device breakdown.
3. Conversion intent: contact submissions, resume downloads, press kit actions.
4. Project interest: project outbound clicks by project and destination.
5. Content engagement: blog audio plays, shares, and top article landing pages.

## GA4 Events Already Implemented

- `contact_submit_success`
- `resume_download`
- `project_summary_open`
- `project_outbound_click`
- `press_kit_view`
- `press_kit_download`
- `press_kit_contact_click`
- `press_kit_outbound_click`
- `press_kit_proof_click`
- `article_audio_play`
- `article_share_click`
