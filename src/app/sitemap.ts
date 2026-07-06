import type { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { mediaKit } from "@/data/profileProof";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-07-06");

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  images: string[] = [],
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    ...(images.length > 0 ? { images: images.map((image) => absoluteUrl(image)) } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    sitemapEntry("/", 1, "weekly", [mediaKit.headshot]),
    sitemapEntry("/projects/", 0.85, "monthly", [
      "/images/projects/argus.webp",
      "/images/projects/bulkyfi-landing-v2.webp",
      "/images/projects/stride-website.webp",
    ]),
    sitemapEntry("/achievements/", 0.82, "monthly", [
      "/images/blog/ieee-award.webp",
      "/images/project-soulsync.webp",
      "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
    ]),
    sitemapEntry("/press-kit/", 0.8, "monthly", [mediaKit.headshot]),
    sitemapEntry("/blog/", 0.8, "weekly", [
      "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp",
    ]),
    sitemapEntry("/gallery/", 0.75, "weekly", [
      "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
      "/images/gallery/gallery-stride-inclusive-innovation-summit-2025.webp",
      "/images/gallery/gallery-techx-infinia-opening-panel.webp",
      "/images/gallery/gallery-codex-community-meetup-kochi.webp",
    ]),
    sitemapEntry("/card/", 0.6, "monthly", [mediaKit.headshot]),
    sitemapEntry("/images/robin-francis-resume.pdf", 0.5, "monthly"),
  ];

  const blogRoutes = STATIC_BLOG_POSTS.map((post) =>
    sitemapEntry(`/blog/${post.slug}/`, 0.7, "monthly", [
      post.image,
      ...(post.gallery?.slice(0, 2).map((image) => image.src) ?? []),
    ]),
  );

  return [...coreRoutes, ...blogRoutes];
}
