# Complete Website SEO Guide 2026

This project is already configured with route metadata, canonical URLs, structured data, a sitemap, robots rules, security headers, optimized images, and AI discovery files. Use this guide when publishing new pages, updating content, or submitting the site to search engines.

## Google Search Console Setup

1. Open Google Search Console.
2. Add the domain property for `robinfrancis.in`.
3. Verify ownership using DNS or the provided HTML verification method.
4. Submit `https://robinfrancis.in/sitemap.xml`.
5. Request indexing for changed pages after deploys.
6. Review indexing status, page experience, search queries, and crawl issues weekly.

## Technical SEO Checklist

- Canonical domain is `https://robinfrancis.in`.
- `www.robinfrancis.in` redirects to the apex domain.
- HTTPS is enabled.
- Public routes are generated from `src/app/sitemap.ts` and served at `https://robinfrancis.in/sitemap.xml`.
- `public/robots.txt` points to the sitemap and blocks `/cms/`.
- Main pages use Next.js route metadata.
- Pages include Open Graph and Twitter card metadata.
- Structured data is included for profile, website, projects, blog posts, gallery images, and FAQs.
- Images use compressed WebP/JPG assets with descriptive alt text.
- The contact API and CMS routes are separated from public crawl surfaces.

## Content SEO Checklist

- Match each page to a clear user intent.
- Use one primary H1 per visible page.
- Use descriptive H2 and H3 headings.
- Add internal links between home, projects, blog, gallery, card, and contact sections.
- Keep meta descriptions concise and factual.
- Avoid generic AI-generated copy.
- Add useful examples, outcomes, metrics, and project evidence.
- Update `src/app/sitemap.ts` whenever a public page or blog URL changes.

## Image SEO Checklist

- Use meaningful filenames.
- Prefer compressed WebP or JPG assets.
- Add descriptive `alt` text.
- Keep image dimensions stable in layout.
- Add important images to the sitemap when they support ranking or image search discovery.

## Backlink Plan

- Link to the site from GitHub profile and project READMEs.
- Share project posts on LinkedIn and Medium.
- Add live projects to relevant product directories.
- Publish writeups for Argus, BulkyFi, STRIDE, accessibility work, and community leadership.
- Reference the site in talks, event pages, and award profiles when possible.

## AI SEO Optimization Prompt

Use this prompt with ChatGPT, Claude, Gemini, Cursor, Windsurf, or similar AI tools when auditing future updates:

```text
You are an advanced SEO analyst, technical SEO engineer, conversion copywriter, semantic search optimizer, and Google ranking specialist.

Analyze my complete website thoroughly.

Website: https://robinfrancis.in

Tasks:
- Analyze all pages
- Find high-ranking SEO keywords
- Generate SEO optimized headings and content
- Improve semantic relevance
- Suggest internal links
- Suggest schema markup
- Optimize readability
- Detect weak sections
- Improve technical SEO
- Rewrite AI-generic copy
- Generate metadata
- Suggest blog ideas
- Prioritize fixes by impact

Output:
- SEO audit summary
- Critical issues
- Keyword opportunities
- Technical SEO improvements
- Content improvements
- Final SEO score
```

## Ongoing Publishing Ideas

- How I built Argus, a local-first browser QA agent.
- Building BulkyFi as a local-first certificate generator.
- Lessons from developing the STRIDE Kerala website.
- People-centric AI design for accessibility.
- Community systems behind the IEEE R10 volunteer journey.
- Practical accessibility checks for AI products.
