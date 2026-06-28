import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@sanity/client';

const BASE_URL = 'https://www.robinfrancis.in';
const DOCS_DIR = path.resolve('docs');
const ROOT_ROUTES = ['/', '/projects', '/blog', '/gallery', '/card'];
const EXTRA_URLS = ['/images/robin-francis-resume.pdf'];
const ROUTE_META = {
  '/projects': {
    title: 'Projects | Robin Francis',
    description: 'Explore AI, accessibility, product, and engineering projects built by Robin Francis.',
  },
  '/blog': {
    title: 'Blog | Robin Francis',
    description: 'Insights on AI engineering, accessibility, product building, and community leadership by Robin Francis.',
  },
  '/gallery': {
    title: 'Gallery | Robin Francis',
    description: 'Explore a curated collection of moments, landscapes, and visual stories by Robin Francis.',
  },
  '/card': {
    title: 'Robin Francis Card | AI Innovator & Community Leader',
    description: 'A focused digital profile card for Robin Francis, AI innovator, software builder, and community leader from Kerala, India.',
  },
};
const LOCAL_BLOG_POSTS = [
  {
    slug: 'soulsync-emotional-wellness',
    title: 'SoulSync: Building AI for Emotional & Cognitive Wellness',
    excerpt: 'A deep dive into creating AI-enabled tools for elders and caregivers.',
    image: '/images/blog/1720937570476.jpeg',
    date: '2026-01-12',
  },
  {
    slug: 'ieee-r10-volunteer-award',
    title: 'IEEE R10 Outstanding Volunteer Award: My Journey of Impact',
    excerpt: 'Reflections on leadership, community-building, and global recognition.',
    image: '/images/blog/ieee-award.webp',
    date: '2025-12-18',
  },
  {
    slug: 'future-of-accessible-technology',
    title: 'The Future of Accessible Technology',
    excerpt: 'How AI, multimodal interfaces, and affordable computing can empower millions.',
    image: '/images/blog/accessible-tech.webp',
    date: '2025-11-26',
  },
  {
    slug: 'scalable-systems-with-communities',
    title: 'Building Scalable Systems with Student Communities',
    excerpt: 'Lessons from leading 100+ programs and growing organizations.',
    image: '/images/blog/scalable-systems.webp',
    date: '2025-10-14',
  },
  {
    slug: 'people-centric-ai',
    title: 'Designing People-Centric AI Solutions',
    excerpt: 'Balancing tech innovation with empathy and social awareness.',
    image: '/images/blog/people-centric-ai.webp',
    date: '2025-09-08',
  },
];

const client = createClient({
  projectId: 'so8fb28i',
  dataset: 'image',
  useCdn: true,
  apiVersion: '2023-05-03',
});

function withTrailingSlash(route) {
  if (route === '/') return route;
  return route.endsWith('/') ? route : `${route}/`;
}

function toLastMod(value, fallback) {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toISOString().slice(0, 10);
}

function mergeBlogPosts(remotePosts, localPosts) {
  const postsBySlug = new Map();

  for (const post of [...localPosts, ...remotePosts]) {
    postsBySlug.set(post.slug, post);
  }

  return [...postsBySlug.values()];
}

async function fetchBlogPosts() {
  try {
    const posts = await client.fetch(
      `*[_type == "blogPost"]{
        "_id": _id,
        "slug": slug.current,
        "date": coalesce(date, _updatedAt)
      }`
    );

    return (posts || [])
      .map((post) => ({
        pathSegment: (post.slug || post._id || '').trim(),
        date: post.date,
      }))
      .filter((post) => post.pathSegment.length > 0)
      .map((post) => ({
        slug: post.pathSegment,
        date: post.date,
      }));
  } catch (error) {
    console.warn('Skipping blog slug route generation:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

function buildSitemapXml(entries) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

  for (const entry of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${entry.loc}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    lines.push(`    <priority>${entry.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

function buildRouteHtml(baseHtml, route) {
  if (route === '/') return baseHtml;

  const routeUrl = `${BASE_URL}${withTrailingSlash(route)}`;
  let html = baseHtml
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${routeUrl}" />`);

  const meta = ROUTE_META[route];
  if (!meta) return html;

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  return html;
}

function buildNotFoundHtml(baseHtml) {
  return baseHtml
    .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found | Robin Francis</title>')
    .replace(
      /<meta name="robots" content="[^"]*" \/>/,
      '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />'
    );
}

async function main() {
  const indexPath = path.join(DOCS_DIR, 'index.html');
  const html = await readFile(indexPath, 'utf8');

  // Preserve SPA fallback for unknown routes and prevent 404 indexing.
  await writeFile(path.join(DOCS_DIR, '404.html'), buildNotFoundHtml(html), 'utf8');

  const today = new Date().toISOString().slice(0, 10);
  const blogPosts = mergeBlogPosts(await fetchBlogPosts(), LOCAL_BLOG_POSTS);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const allRoutes = [...new Set([...ROOT_ROUTES, ...blogRoutes])];

  for (const route of allRoutes) {
    if (route === '/') continue;
    const routeDir = path.join(DOCS_DIR, route.replace(/^\//, ''));
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, 'index.html'), buildRouteHtml(html, route), 'utf8');
  }

  const sitemapEntries = [
    { loc: `${BASE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE_URL}/projects/`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE_URL}/blog/`, lastmod: today, changefreq: 'daily', priority: '0.8' },
    { loc: `${BASE_URL}/gallery/`, lastmod: today, changefreq: 'weekly', priority: '0.7' },
    { loc: `${BASE_URL}/card/`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
    ...blogPosts.map((post) => ({
      loc: `${BASE_URL}/blog/${post.slug}/`,
      lastmod: toLastMod(post.date, today),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    { loc: `${BASE_URL}${EXTRA_URLS[0]}`, lastmod: today, changefreq: 'monthly', priority: '0.5' },
  ];

  await writeFile(path.join(DOCS_DIR, 'sitemap.xml'), buildSitemapXml(sitemapEntries), 'utf8');
  console.log(`Generated static routes: ${allRoutes.length - 1}. Blog pages: ${blogPosts.length}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
