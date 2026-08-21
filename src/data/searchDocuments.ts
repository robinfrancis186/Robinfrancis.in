import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { awards, mediaKit, proofLinks, speakingItems } from "@/data/profileProof";
import { stripInlineMarkup } from "@/lib/inlineText";
import type { SearchDocument } from "@/lib/search";

const projects = [
  {
    id: "argus",
    title: "Argus",
    category: "AI QA browser agent",
    description:
      "A local-first autonomous QA agent that scouts websites, understands the product, deploys synthetic user personas, and returns evidence-backed bug reports with screenshots, logs, and run summaries.",
    keywords: ["autonomous QA", "browser agent", "synthetic users", "testing", "GitHub"],
  },
  {
    id: "bulkyfi",
    title: "BulkyFi",
    category: "Local-first certificate generator",
    description:
      "A browser-based bulk certificate generator for templates and recipient spreadsheets with local project storage and high-quality PDF or PNG export.",
    keywords: ["certificates", "spreadsheet", "PDF", "PNG", "local-first", "GitHub"],
  },
  {
    id: "stride",
    title: "STRIDE Website",
    category: "Accessibility and social impact",
    description:
      "The official STRIDE Kerala website, built as an accessible platform for assistive technology, inclusive innovation, ecosystem stories, products, media, and public engagement.",
    keywords: ["K-DISC", "assistive technology", "inclusive innovation", "Kerala", "accessibility"],
  },
  {
    id: "soulsync",
    title: "SoulSync",
    category: "AI wellness companion",
    description:
      "An AI companion concept for emotional and cognitive wellness with emotion tracking, memory recall, and privacy-conscious caregiver support for seniors.",
    keywords: ["IBM watsonx", "GenAI", "silver economy", "caregivers", "seniors", "wellness"],
  },
  {
    id: "foodloop",
    title: "FoodLoop",
    category: "Responsible food redistribution",
    description:
      "A sustainability platform concept using surplus prediction to reduce food waste and improve food redistribution workflows.",
    keywords: ["sustainability", "food waste", "surplus prediction", "redistribution"],
  },
] as const;

const projectDocuments: SearchDocument[] = projects.map((project) => ({
  id: `project-${project.id}`,
  title: project.title,
  href: "/projects/#portfolio",
  type: "Project",
  section: project.category,
  description: project.description,
  content: `${project.category}. ${project.description}`,
  keywords: project.keywords,
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
    content: projects.map((project) => `${project.title}. ${project.description}`).join(" "),
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
