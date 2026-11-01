const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const cache = new Map();
function loadSource(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  new Function("require", "exports", outputText)((name) => {
    if (!name.startsWith(".") && !name.startsWith("@/")) return require(name);
    let target = name.startsWith("@/") ? path.resolve("src", name.slice(2)) : path.resolve(path.dirname(filename), name);
    if (!path.extname(target)) target += ".ts";
    return loadSource(target);
  }, exports);
  return exports;
}

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(nodes)];
}

function decode(text = "") {
  return text.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" };
    return named[entity] ?? String.fromCodePoint(parseInt(entity.slice(entity[2] === "x" ? 3 : 2, -1), entity[2] === "x" ? 16 : 10));
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]));
}

async function main() {
  const { MY_EVENTS } = loadSource("src/data/myEvents.ts");
  const { STATIC_BLOG_POSTS } = loadSource("src/data/blogPosts.ts");
  const { PROJECT_DETAILS } = loadSource("src/data/projectDetails.ts");
  const { blogPostingJsonLd, eventPageJsonLd } = loadSource("src/lib/contentSeo.ts");
  const { seoDescription, serializeJsonLd, siteUrl } = loadSource("src/lib/seo.ts");
  const { llmsIndex, llmsFull } = loadSource("src/lib/llms.ts");
  const { ensureRobinFrancisAlt } = loadSource("src/lib/imageSeo.ts");
  const { SITE_FAQS } = loadSource("src/data/siteFaqs.ts");
  const sitemap = loadSource("src/app/sitemap.ts").default();
  const index = llmsIndex();
  const full = llmsFull();
  const eventDescriptions = new Set();
  assert(!serializeJsonLd({ headline: '</script><script>alert("x")</script>' }).includes("<"));
  assert.equal(JSON.parse(serializeJsonLd({ title: "A < B" })).title, "A < B");
  assert.equal(seoDescription("  A short\nsummary. "), "A short summary.");
  assert.equal(ensureRobinFrancisAlt("AI concept illustration", "project"), "AI concept illustration");
  assert(seoDescription("A long description ".repeat(30)).length <= 160);
  assert.equal(new Set(sitemap.map((entry) => entry.url)).size, sitemap.length);
  for (const event of MY_EVENTS) {
    const schema = eventPageJsonLd(event);
    const article = schema.find((node) => node["@type"] === "Article");
    const page = schema.find((node) => node["@type"] === "WebPage");
    const breadcrumbs = schema.find((node) => node["@type"] === "BreadcrumbList");
    assert(article && page && breadcrumbs, `Incomplete event schema: ${event.id}`);
    assert.equal(article.headline, event.title);
    assert.equal(article.author["@id"], `${siteUrl}/#person`);
    assert.equal(page.mainEntity["@id"], article["@id"]);
    assert(!article.datePublished && !article.startDate, `Do not invent publication or event timestamps: ${event.id}`);
    assert(!nodes(schema).some((node) => node["@type"] === "Event"));
    assert(article.image.every((image) => image.caption && image.contentUrl && image.width && image.height));
    assert(index.includes(page.url) && full.includes(event.story.summary));
    const description = seoDescription(event.story.summary);
    assert(description.length <= 160 && !eventDescriptions.has(description), `Non-unique event description: ${event.id}`);
    eventDescriptions.add(description);
  }
  for (const post of STATIC_BLOG_POSTS) {
    const schema = blogPostingJsonLd(post);
    assert(schema.url.endsWith(`/blog/${post.slug}/`));
    assert(schema.wordCount > 0 && schema.inLanguage === "en" && schema.isAccessibleForFree);
    assert(schema.datePublished && schema.dateModified >= schema.datePublished);
    assert(schema.image.every((image) => image.caption && image.contentUrl));
    assert(index.includes(schema.url) && full.includes(post.excerpt));
  }
  for (const project of PROJECT_DETAILS) assert(index.includes(`${siteUrl}/projects/${project.slug}/`));
  assert(!/drive\.google\.com|docs\.google\.com|file:\/\/|\/Users\//.test(index + full), "Private source link in AI-readable content");
  console.log(`PASS: ${MY_EVENTS.length} event schemas and unique descriptions, ${STATIC_BLOG_POSTS.length} blog schemas, ${PROJECT_DETAILS.length} projects, current AI-readable content and private-link checks.`);

  if (!process.env.SEO_TEST_URL) return;
  const base = process.env.SEO_TEST_URL.replace(/\/$/, "");
  const failures = new Map();
  function check(condition, issue, route) {
    if (condition) return;
    failures.set(issue, [...(failures.get(issue) ?? []), route]);
  }
  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const xml = await sitemapResponse.text();
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(decode(match[1])).pathname).filter((route) => !path.extname(route));
  const titles = new Map();
  const descriptions = new Map();
  let checked = 0;
  const linkedRoutes = new Set();
  for (let offset = 0; offset < routes.length; offset += 5) {
    await Promise.all(routes.slice(offset, offset + 5).map(async (route) => {
      const response = await fetch(base + route, { signal: AbortSignal.timeout(60000) });
      check(response.status === 200, "HTTP status", route);
      const html = await response.text();
      const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map((match) => attributes(match[0]));
      const meta = (name) => tags.find((tag) => tag.name === name || tag.property === name)?.content;
      const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
      const canonical = tags.filter((tag) => tag.rel === "canonical");
      check(Boolean(title) && !titles.has(title), "Missing or duplicate title", route);
      titles.set(title, route);
      const description = meta("description");
      check(Boolean(description) && !descriptions.has(description), "Missing or duplicate description", route);
      descriptions.set(description, route);
      check(canonical.length === 1 && canonical[0].href === siteUrl + route, "Canonical mismatch", route);
      check(!/noindex/.test((meta("robots") ?? "") + (response.headers.get("x-robots-tag") ?? "")), "Indexing blocked", route);
      check(meta("og:url") === siteUrl + route && Boolean(meta("og:image")), "Social metadata missing", route);
      check(Boolean(meta("twitter:card")), "Twitter card missing", route);
      check(/max-image-preview:large/.test(meta("robots") ?? "") || /max-image-preview:large/.test(meta("googlebot") ?? ""), "Image previews limited", route);
      const content = html.replace(/<(script|noscript)\b[^>]*>[\s\S]*?<\/\1>/g, "");
      check((content.match(/<h1\b/g) ?? []).length === 1, "Main heading not server-rendered exactly once", route);
      check(!/next-error-h1|Internal Server Error/.test(content), "Framework error", route);
      for (const link of content.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const href = decode(link[1]);
        if (href.startsWith("/") && !href.startsWith("//")) linkedRoutes.add(new URL(href, siteUrl).pathname);
      }
      const imageTags = [...content.matchAll(/<img\b[^>]*>/g)].map((match) => attributes(match[0]));
      check(imageTags.every((image) => "alt" in image), "Image without alt", route);
      let schemas = [];
      try {
        schemas = nodes([...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1])));
      } catch { check(false, "Invalid JSON-LD", route); }
      check(schemas.some((schema) => schema["@type"] === "WebSite") && schemas.some((schema) => schema["@id"] === `${siteUrl}/#person`), "Missing shared entity context", route);
      if (route !== "/") check(schemas.some((schema) => schema["@type"] === "BreadcrumbList"), "Missing breadcrumbs", route);
      if (route === "/") for (const faq of SITE_FAQS) {
        check(decode(content).includes(faq.question) && decode(content).includes(faq.answer), "FAQ text missing from initial HTML", faq.question);
        check(schemas.some((schema) => schema["@type"] === "Question" && schema.name === faq.question && schema.acceptedAnswer?.text === faq.answer), "FAQ schema differs from visible text", faq.question);
      }
      for (const schema of schemas.filter((schema) => schema["@type"] === "Event")) check(schema.startDate && schema.location, "Incomplete Event markup", route);
      if (route.startsWith("/my-events/") && route !== "/my-events/") {
        check(schemas.some((schema) => schema["@type"] === "Article" && schema.mainEntityOfPage?.["@id"] === siteUrl + route), "Missing event recap schema", route);
        check(content.includes('rel="author"') && content.includes("About the event"), "Missing event attribution or summary", route);
      }
      if (route.startsWith("/blog/") && route !== "/blog/") {
        check(schemas.some((schema) => schema["@type"] === "BlogPosting" && schema.datePublished && schema.wordCount), "Blog article schema lacks enhanced fields", route);
        check(content.includes('rel="author"') && content.includes("<time"), "Missing blog byline or date", route);
      }
      checked++;
    }));
    if (checked % 25 === 0) console.log(`Checked ${checked}/${routes.length} HTML routes...`);
  }
  for (const route of routes.filter((route) => route !== "/")) check(linkedRoutes.has(route), "Orphaned page", route);
  const imageUrls = [...new Set([...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => decode(match[1])))];
  for (let offset = 0; offset < imageUrls.length; offset += 10) {
    await Promise.all(imageUrls.slice(offset, offset + 10).map(async (url) => {
      const imagePath = new URL(url).pathname;
      const response = await fetch(base + imagePath, { method: "HEAD", signal: AbortSignal.timeout(15000) });
      check(response.status === 200 && response.headers.get("content-type")?.startsWith("image/"), "Sitemap image unavailable", imagePath);
    }));
  }
  for (const endpoint of ["llms.txt", "llms-full.txt"]) {
    const response = await fetch(`${base}/${endpoint}`);
    const text = await response.text();
    check(response.status === 200 && response.headers.get("content-type")?.startsWith("text/plain"), "AI file unavailable", endpoint);
    for (const route of routes.filter((route) => /^\/(my-events|blog|projects)\/.+/.test(route))) check(text.includes(siteUrl + route), "AI file missing page", `${endpoint}: ${route}`);
  }
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  check(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`) && robots.includes("User-agent: OAI-SearchBot") && robots.includes("Disallow: /api/"), "Robots rules incomplete", "/robots.txt");
  const api = await fetch(`${base}/api/ask/`);
  check(/noindex/.test(api.headers.get("x-robots-tag") ?? ""), "API missing noindex header", "/api/ask/");
  for (const route of ["/search/?q=Robin", ...STATIC_BLOG_POSTS.map((post) => `/medium-import/${post.slug}/`)]) {
    const response = await fetch(base + route);
    check(response.status === 200, "Utility page unavailable", route);
    const html = await response.text();
    check(/<meta name="robots" content="[^"]*noindex/.test(html), "Utility page unexpectedly indexable", route);
    if (route.startsWith("/medium-import/")) check(html.includes(siteUrl + route.replace("/medium-import/", "/blog/")), "Import canonical mismatch", route);
  }
  const missing = await fetch(`${base}/seo-audit-missing-page/`);
  check(missing.status === 404, "Missing page is a soft 404", "/seo-audit-missing-page/");
  if (failures.size) {
    for (const [issue, paths] of failures) console.error(`FAIL: ${issue} (${paths.length}): ${paths.slice(0, 5).join(", ")}`);
    process.exitCode = 1;
  } else console.log(`PASS: ${checked} HTML routes checked individually for metadata, server-rendered headings, JSON-LD, breadcrumbs, author attribution, image alts and internal discovery; ${imageUrls.length} sitemap images, robots, AI files, noindex pages and 404 verified.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
