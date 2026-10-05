import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { awards, mediaKit, proofLinks, speakingItems } from "@/data/profileProof";
import { stripInlineMarkup } from "@/lib/inlineText";
import type { SearchDocument } from "@/lib/search";

/*
 * Built from the same data as the project pages, so a project added there is
 * searchable, and answerable by the assistant, without a second list to keep
 * in step.
 */
const projectDocuments: SearchDocument[] = PROJECT_DETAILS.map((project) => ({
  id: `project-${project.slug}`,
  title: project.title,
  href: `/projects/${project.slug}/`,
  type: "Project",
  section: project.category,
  description: project.summary,
  content: [
    project.category,
    project.summary,
    ...project.highlights,
    ...project.details.map((detail) => `${detail.heading}. ${detail.body}`),
  ].join(" "),
  keywords: [...project.stack],
}));

const articleDocuments: SearchDocument[] = STATIC_BLOG_POSTS.map((post) => ({
  id: `article-${post.slug}`,
  title: post.title,
  href: `/blog/${post.slug}/`,
  type: "Article",
  section: post.category,
  description: post.excerpt,
  content: stripInlineMarkup(post.content),
  keywords: post.tags,
  date: post.updatedAt ?? post.date,
}));

const achievementDocuments: SearchDocument[] = awards.map((award) => ({
  id: `achievement-${award.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  title: award.title,
  href: "/achievements/#recognition-cards",
  type: "Achievement",
  section: `${award.issuer} · ${award.year}`,
  description: award.summary,
  content: `${award.summary} ${award.proofTitles.join(" ")}`,
  keywords: [award.issuer, award.year, "award", "recognition"],
  date: award.year,
}));

const galleryText = GALLERY_ITEMS.map(
  (item) => `${item.title}. ${item.description} ${item.alt}. ${item.category}. ${item.date}.`,
).join(" ");

const speakingText = speakingItems
  .map(
    (item) =>
      `${item.title}. ${item.context}. ${item.audience}. ${item.summary}. ${item.proofTitles.join(" ")}.`,
  )
  .join(" ");

const proofDocuments: SearchDocument[] = proofLinks.map((proof) => {
  const href = ["award", "press"].includes(proof.category)
    ? "/achievements/#proof-library"
    : ["project", "product"].includes(proof.category)
      ? "/projects/"
      : "/press-kit/";

  return {
    id: `resource-${proof.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: proof.title,
    href,
    type: "Resource",
    section: proof.label,
    description: proof.description,
    content: `${proof.category} ${proof.label} ${proof.description}`,
    keywords: [proof.category, proof.label, "proof", "source", "evidence"],
  };
});

const pageDocuments: SearchDocument[] = [
  {
    id: "page-home",
    title: "Robin Francis",
    href: "/",
    type: "Page",
    section: "Home",
    description:
      "AI product builder, software engineer, and community leader creating accessible, people-centric technology in Kerala, India.",
    content: mediaKit.longBio,
    keywords: ["portfolio", "AI innovator", "software engineer", "Kerala", "community leader"],
  },
  {
    id: "page-about",
    title: "About Robin Francis",
    href: "/#about",
    type: "Page",
    section: "About",
    description:
      "Robin's background across applied AI, accessibility, public-interest platforms, software engineering, and community leadership.",
    content: `${mediaKit.shortBio} ${mediaKit.longBio}`,
    keywords: ["about", "bio", "experience", "background", "skills"],
  },
  {
    id: "page-projects",
    title: "Projects",
    href: "/projects/",
    type: "Page",
    section: "Portfolio",
    description:
      "AI, accessibility, local-first, product design, and engineering projects built by Robin Francis.",
    content: PROJECT_DETAILS.map((project) => `${project.title}. ${project.summary}`).join(" "),
    keywords: ["portfolio", "products", "software", "case studies", "GitHub"],
  },
  {
    id: "page-blog",
    title: "Blog",
    href: "/blog/",
    type: "Page",
    section: "Journal",
    description:
      "Writing on AI engineering, accessible technology, product building, IEEE, and community leadership.",
    content: STATIC_BLOG_POSTS.map((post) => `${post.title}. ${post.excerpt}`).join(" "),
    keywords: ["articles", "stories", "journal", "writing", "insights"],
  },
  {
    id: "page-achievements",
    title: "Achievements",
    href: "/achievements/",
    type: "Page",
    section: "Awards and recognition",
    description:
      "Source-backed IEEE, IBM watsonx, volunteer leadership, and humanitarian technology achievements.",
    content: awards.map((award) => `${award.title}. ${award.summary}`).join(" "),
    keywords: ["awards", "recognition", "IEEE Region 10", "IBM watsonx", "humanitarian"],
  },
  {
    id: "page-gallery",
    title: "Gallery",
    href: "/gallery/",
    type: "Gallery",
    section: "Visual stories",
    description:
      "Event, award, speaking, education, IEEE leadership, STRIDE, and student mentorship photographs.",
    content: galleryText,
    keywords: ["photos", "images", "events", "speaking", "mentoring", "community"],
  },
  {
    id: "page-press-kit",
    title: "Press Kit",
    href: "/press-kit/",
    type: "Page",
    section: "Media resources",
    description:
      "Official headshot, 80-word bio, long bio, achievements, proof links, and contact details for Robin Francis.",
    content: `${mediaKit.shortBio} ${mediaKit.longBio} ${speakingText}`,
    keywords: ["media kit", "headshot", "bio", "speaker", "contact", "press"],
  },
  {
    id: "page-contact",
    title: "Contact Robin Francis",
    href: "/#contact",
    type: "Page",
    section: "Get in touch",
    description:
      "Contact Robin for AI product collaborations, mentorship, community projects, speaking, or public-interest technology work.",
    content: `Email ${mediaKit.contactEmail}. AI product collaborations, mentorship, community projects, accessibility talks, IEEE leadership sessions, and meaningful technology opportunities.`,
    keywords: ["email", "collaboration", "speaking", "mentorship", "hire", "contact"],
  },
];

export const SEARCH_DOCUMENTS: readonly SearchDocument[] = [
  ...pageDocuments,
  ...articleDocuments,
  ...projectDocuments,
  ...achievementDocuments,
  ...proofDocuments,
];
