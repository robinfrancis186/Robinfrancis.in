import type { StaticBlogPost } from "@/data/blogPosts";
import { EVENT_IMAGE_SIZES } from "@/data/eventImageSizes";
import { eventUnitName, type MyEvent } from "@/data/myEvents";
import { findProofLinks } from "@/data/profileProof";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { stripInlineMarkup } from "@/lib/inlineMarkup";
import { absoluteUrl, seoReviewedAt, siteUrl } from "@/lib/seo";

const author = { "@type": "Person", "@id": `${siteUrl}/#person`, name: "Robin Francis", url: `${siteUrl}/` };
const publisher = { "@id": `${siteUrl}/#organization` };

export function blogPostingJsonLd(post: StaticBlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url }, isPartOf: { "@id": `${siteUrl}/blog/#blog` },
    headline: post.title, description: post.metaDescription ?? post.excerpt, abstract: post.excerpt,
    image: [
      { "@type": "ImageObject", contentUrl: absoluteUrl(post.image), url: absoluteUrl(post.image), caption: post.imageAlt ?? post.title },
      ...(post.gallery ?? []).map((image) => ({
        "@type": "ImageObject", contentUrl: absoluteUrl(image.src), url: absoluteUrl(image.src),
        caption: image.caption ?? image.alt, width: image.width, height: image.height,
      })),
    ],
    author, publisher, datePublished: post.date, dateModified: post.updatedAt ?? post.date,
    inLanguage: "en", isAccessibleForFree: true,
    wordCount: stripInlineMarkup(post.content).trim().split(/\s+/).length,
    keywords: post.tags, articleSection: post.category,
    citation: findProofLinks(post.proofTitles ?? []).map((source) => source.href),
  };
}

export function eventPageJsonLd(event: MyEvent) {
  const path = `/my-events/${event.id}/`;
  const url = absoluteUrl(path);
  const images = [event.image, ...(event.gallery ?? []), ...(event.sessions ?? []).map((session) => session.image)]
    .filter((image): image is NonNullable<MyEvent["image"]> => Boolean(image))
    .map((image) => ({
      "@type": "ImageObject", contentUrl: absoluteUrl(image.src), url: absoluteUrl(image.src), caption: image.alt,
      width: EVENT_IMAGE_SIZES[image.src]?.[0], height: EVENT_IMAGE_SIZES[image.src]?.[1],
    }));
  return [
    {
      "@context": "https://schema.org", "@type": "WebPage", "@id": url,
      name: event.title, url, description: event.story?.summary ?? event.title, inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` }, breadcrumb: { "@id": `${url}#breadcrumbs` },
      mainEntity: { "@id": `${url}#event-story` }, primaryImageOfPage: images[0],
    },
    {
      // Historical accounts are not ticket listings; missing event dates or addresses must not be invented.
      "@context": "https://schema.org", "@type": "Article", "@id": `${url}#event-story`,
      url, headline: event.title, description: event.story?.summary ?? event.title,
      mainEntityOfPage: { "@id": url }, isPartOf: { "@id": `${siteUrl}/my-events/#directory` },
      author, publisher, inLanguage: "en", isAccessibleForFree: true, image: images,
      dateModified: seoReviewedAt,
      temporalCoverage: event.date ? `${event.date}/${event.endDate ?? event.date}` : String(event.year),
      articleSection: "Event recaps", keywords: [event.title, eventUnitName(event.unit), event.group, String(event.year)],
      about: { "@type": "Organization", name: eventUnitName(event.unit) },
      ...(event.story?.sourceUrl ? { citation: [absoluteUrl(event.story.sourceUrl)] } : {}),
    },
    { ...breadcrumbJsonLd([homeBreadcrumb, { name: "My Events Directory", path: "/my-events/" }, { name: event.title, path }]), "@id": `${url}#breadcrumbs` },
  ];
}
