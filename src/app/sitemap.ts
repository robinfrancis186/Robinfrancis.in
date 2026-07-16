import type { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { mediaKit } from "@/data/profileProof";
import { absoluteUrl } from "@/lib/seo";

const defaultLastModified = "2026-07-07";

const routeLastModified = {
  home: "2026-07-07",
  projects: "2026-07-07",
  achievements: "2026-07-07",
  pressKit: "2026-07-07",
  search: "2026-07-16",
  gallery: "2026-07-07",
  card: "2026-07-06",
  resume: "2026-07-06",
} as const;

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  images: string[] = [],
  lastModified: string | Date = defaultLastModified,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    ...(images.length > 0 ? { images: images.map((image) => absoluteUrl(image)) } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogDate =
    STATIC_BLOG_POSTS.map((post) => post.updatedAt ?? post.date).sort().at(-1) ?? defaultLastModified;

  const coreRoutes: MetadataRoute.Sitemap = [
    sitemapEntry("/", 1, "weekly", [mediaKit.headshot], routeLastModified.home),
    sitemapEntry("/projects/", 0.85, "monthly", [
      "/images/projects/argus.webp",
      "/images/projects/bulkyfi-landing-v2.webp",
      "/images/projects/stride-website.webp",
    ], routeLastModified.projects),
    sitemapEntry("/achievements/", 0.82, "monthly", [
      "/images/blog/blog2/1731994207232.webp",
      "/images/blog/1720937580394.webp",
      "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
    ], routeLastModified.achievements),
    sitemapEntry("/press-kit/", 0.8, "monthly", [mediaKit.headshot], routeLastModified.pressKit),
    sitemapEntry("/search/", 0.5, "monthly", [], routeLastModified.search),
    sitemapEntry("/blog/", 0.8, "weekly", [
      "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp",
    ], latestBlogDate),
    sitemapEntry("/gallery/", 0.75, "weekly", [
      "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
      "/images/gallery/gallery-stride-inclusive-innovation-summit-2025.webp",
      "/images/gallery/gallery-techx-infinia-opening-panel.webp",
      "/images/gallery/gallery-codex-community-meetup-kochi.webp",
    ], routeLastModified.gallery),
    sitemapEntry("/card/", 0.6, "monthly", [mediaKit.headshot], routeLastModified.card),
    sitemapEntry("/images/robin-francis-resume.pdf", 0.5, "monthly", [], routeLastModified.resume),
  ];

  const blogRoutes = STATIC_BLOG_POSTS.map((post) =>
    sitemapEntry(`/blog/${post.slug}/`, 0.7, "monthly", [
      post.image,
      ...(post.gallery?.slice(0, 2).map((image) => image.src) ?? []),
    ], post.updatedAt ?? post.date),
  );

  return [...coreRoutes, ...blogRoutes];
}
