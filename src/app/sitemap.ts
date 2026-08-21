import type { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { awards, mediaKit } from "@/data/profileProof";
import { absoluteUrl } from "@/lib/seo";

const defaultLastModified = "2026-08-18";
const blogTemplateLastModified = "2026-07-19";

/*
 * Hand-maintained because a build timestamp would tell crawlers every page
 * changed on every deploy, which devalues the signal. Bump the entry you
 * actually edited. Blog posts derive theirs from the post data instead.
 */
const routeLastModified = {
  home: "2026-08-18",
  projects: "2026-08-18",
  achievements: "2026-08-03",
  pressKit: "2026-07-29",
  gallery: "2026-08-03",
  card: "2026-08-18",
  resume: "2026-07-06",
} as const;

const homeAchievementImages = [
  "/images/blog/blog2/1731994207232.webp",
  "/images/blog/1720937570476.webp",
  "/images/gallery/gallery-sdg-hackathon-recognition.webp",
  "/images/gallery/gallery-techx-infinia-audience.webp",
  "/images/gallery/gallery-stride-inclusive-innovation-summit-2025.webp",
  "/images/blog/ncc-thal-sainik-camp/ncc-kerala-contingent-trophies.webp",
  "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
];

const homeProjectImages = [
  "/images/project-soulsync.webp",
  "/images/project-foodloop.webp",
  "/images/gallery/gallery-techx-infinia-audience.webp",
  "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-participation-outcomes.webp",
  "/images/projects/stride-website.webp",
];

const projectImages = [
  "/images/projects/argus.webp",
  "/images/projects/bulkyfi-landing-v2.webp",
  "/images/projects/bulkyfi-dashboard-v2.webp",
  "/images/projects/stride-website.webp",
];

function uniqueImages(images: string[]) {
  return [...new Set(images)];
}

function latestDate(...dates: string[]) {
  return dates.sort().at(-1) ?? defaultLastModified;
}

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  images: string[] = [],
  lastModified: string | Date = defaultLastModified,
): MetadataRoute.Sitemap[number] {
  const deduplicatedImages = uniqueImages(images);

  return {
    url: absoluteUrl(path),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    ...(deduplicatedImages.length > 0
      ? { images: deduplicatedImages.map((image) => absoluteUrl(image)) }
      : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogDate = latestDate(
    blogTemplateLastModified,
    ...STATIC_BLOG_POSTS.map((post) => post.updatedAt ?? post.date),
  );

  const coreRoutes: MetadataRoute.Sitemap = [
    sitemapEntry("/", 1, "weekly", [
      mediaKit.headshot,
      "/images/about/robin-light.webp",
      "/images/about/robin-dark.webp",
      ...homeAchievementImages,
      ...homeProjectImages,
      ...STATIC_BLOG_POSTS.map((post) => post.image),
    ], routeLastModified.home),
    sitemapEntry("/projects/", 0.85, "monthly", projectImages, routeLastModified.projects),
    sitemapEntry(
      "/achievements/",
      0.82,
      "monthly",
      awards.map((award) => award.image),
      routeLastModified.achievements,
    ),
    sitemapEntry("/press-kit/", 0.8, "monthly", [mediaKit.headshot], routeLastModified.pressKit),
    sitemapEntry(
      "/blog/",
      0.8,
      "weekly",
      STATIC_BLOG_POSTS.map((post) => post.image),
      latestBlogDate,
    ),
    sitemapEntry(
      "/gallery/",
      0.75,
      "weekly",
      GALLERY_ITEMS.map((item) => item.img),
      routeLastModified.gallery,
    ),
    sitemapEntry(
      "/card/",
      0.6,
      "monthly",
      [mediaKit.headshot, "/images/card/robin-francis-3d.png"],
      routeLastModified.card,
    ),
    sitemapEntry("/images/robin-francis-resume.pdf", 0.5, "monthly", [], routeLastModified.resume),
  ];

  const blogRoutes = STATIC_BLOG_POSTS.map((post) =>
    sitemapEntry(`/blog/${post.slug}/`, 0.7, "monthly", [
      post.image,
      ...(post.gallery?.map((image) => image.src) ?? []),
    ], latestDate(blogTemplateLastModified, post.updatedAt ?? post.date)),
  );

  return [...coreRoutes, ...blogRoutes];
}
