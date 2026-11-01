import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { eventUnitName, MY_EVENTS } from "@/data/myEvents";
import { mediaKit, proofLinks } from "@/data/profileProof";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { stripInlineMarkup } from "@/lib/inlineMarkup";
import { absoluteUrl, defaultSeoDescription, seoReviewedAt, socialProfiles } from "@/lib/seo";

export function llmsIndex() {
  return [
    "# Robin Francis",
    `> ${defaultSeoDescription}`,
    "Generated from the same public content as the website. Cite the specific event, article or project page for its claims. These optional files are not a substitute for crawling the HTML pages.",
    `SEO review: ${seoReviewedAt}. Event dates are dates of the activities, not publication dates. Roles and outcomes are described in the context of each programme.`,
    "## Main pages",
    ...[["Home", "/"], ["My Events Directory", "/my-events/"], ["Blog", "/blog/"], ["Projects", "/projects/"], ["Gallery", "/gallery/"], ["Achievements", "/achievements/"], ["Press kit", "/press-kit/"], ["Contact card", "/card/"], ["Sitemap", "/sitemap.xml"], ["Full public context", "/llms-full.txt"]]
      .map(([name, path]) => `- [${name}](${absoluteUrl(path)})`),
    "## Projects",
    ...PROJECT_DETAILS.map((project) => `- [${project.title}](${absoluteUrl(`/projects/${project.slug}/`)}): ${project.summary}`),
    "## Articles",
    ...STATIC_BLOG_POSTS.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}/`)}): ${post.excerpt}`),
    `## Events (${MY_EVENTS.length})`,
    ...MY_EVENTS.map((event) => `- [${event.title}](${absoluteUrl(`/my-events/${event.id}/`)}): ${event.dateLabel ?? event.date ?? event.year}. ${event.story?.summary ?? ""}`),
    "## Public profiles", ...socialProfiles.map((url) => `- ${url}`),
    "## Contact", "- robinfrancis186@gmail.com",
  ].join("\n\n") + "\n";
}

export function llmsFull() {
  return [
    llmsIndex(), "## Biography", mediaKit.shortBio,
    "## Project details",
    ...PROJECT_DETAILS.map((project) => [
      `### ${project.title}`, absoluteUrl(`/projects/${project.slug}/`), project.summary,
      ...project.details.map((section) => `${section.heading}\n${section.body}`),
    ].join("\n\n")),
    "## Article text",
    ...STATIC_BLOG_POSTS.map((post) => [
      `### ${post.title}`, absoluteUrl(`/blog/${post.slug}/`), `By Robin Francis. Published: ${post.date}. Updated: ${post.updatedAt ?? post.date}.`,
      post.excerpt, stripInlineMarkup(post.content),
    ].join("\n\n")),
    "## Event stories",
    ...MY_EVENTS.map((event) => [
      `### ${event.title}`, absoluteUrl(`/my-events/${event.id}/`),
      `Date: ${event.dateLabel ?? event.date ?? event.year}. Organising unit: ${eventUnitName(event.unit)}.${event.role ? ` Robin's role: ${event.role}.` : ""}${event.story?.venue ? ` Venue: ${event.story.venue}.` : ""}`,
      event.story?.summary, ...(event.story?.paragraphs ?? []),
      ...(event.sessions ?? []).map((session) => `${session.title}: ${session.summary ?? ""}`),
      ...(event.story?.sourceUrl ? [`Public source: ${event.story.sourceUrl}`] : []),
    ].filter(Boolean).join("\n\n")),
    "## Gallery captions",
    ...GALLERY_ITEMS.map((item) => `- ${item.title}: ${item.description} Image: ${absoluteUrl(item.img)}`),
    "## Public evidence and further reading",
    ...proofLinks.map((proof) => `- [${proof.title}](${proof.href}): ${proof.description}`),
  ].join("\n\n") + "\n";
}
