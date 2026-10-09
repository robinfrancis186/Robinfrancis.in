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

// A dated, curated snapshot of linked public accounts. Keep summaries brief and
// attributable so RoSi does not imply that it has a complete or live feed.
const publicPresenceDocuments: SearchDocument[] = [
  {
    id: "public-presence-profiles",
    title: "Robin Francis on public platforms",
    href: "/press-kit/",
    type: "Resource",
    section: "Public profiles · checked 9 October 2026",
    description:
      "Robin's site links to his GitHub, Medium, X, Instagram, YouTube, and LinkedIn profiles, but the LinkedIn profile links conflict and the correct account could not be verified. RoSi uses selected public posts and articles, not a complete live archive.",
    content:
      "Robin's portfolio links GitHub github.com/robinfrancis186, Medium medium.com/@robinfrancis186, X x.com/robinfrancis186, Instagram instagram.com/robinfrancis186, YouTube youtube.com/@robinfrancis186, and LinkedIn. The LinkedIn URL linked from the portfolio does not match the LinkedIn URL linked from Robin's GitHub profile, and profile content could not be independently checked during this snapshot. Do not attribute LinkedIn profile details until Robin confirms the correct account. Public profile content can change; this is not an exhaustive or live crawl.",
    keywords: ["social media", "online", "internet", "accounts", "profiles", "LinkedIn", "Medium", "X", "Twitter"],
  },
  {
    id: "public-x-profile",
    title: "Robin Francis on X",
    href: "https://x.com/robinfrancis186",
    type: "Resource",
    section: "X profile · checked 9 October 2026",
    description:
      "Robin's public X profile describes him as an inclusive AI builder and community organizer focused on accessible technology and broader participation.",
    content:
      "The X profile linked from Robin's portfolio uses the handle @robinfrancis186. Its public bio describes an inclusive AI builder and community organizer building accessible technology and pathways for more people to create, participate, and thrive.",
    keywords: ["social media", "Twitter", "bio", "profile", "inclusive AI", "community organizer"],
  },
  {
    id: "x-post-aisywlc-2026",
    title: "AISYWLC 2026 in Bengaluru",
    href: "https://x.com/robinfrancis186/status/2107838404931010942",
    type: "Resource",
    section: "X post · 7 October 2026",
    description:
      "In a public post, Robin shared that he attended AISYWLC 2026 in Bengaluru and reconnected with IEEE friends and volunteers.",
    content: "Robin's 7 October 2026 post reflects on attending AISYWLC 2026 in Bengaluru and reconnecting with IEEE friends and volunteers.",
    keywords: ["X", "Twitter", "AISYWLC", "IEEE", "Bengaluru", "community"],
    date: "2026-10-07",
  },
  {
    id: "x-post-indiafoss-volunteer",
    title: "IndiaFOSS 2026 and open source",
    href: "https://x.com/robinfrancis186/status/2104618440438988931",
    type: "Resource",
    section: "X post · 28 September 2026",
    description:
      "Robin's public post describes attending his first IndiaFOSS, volunteering, learning, and engaging with open source.",
    content: "Robin's 28 September 2026 post reflects on his first IndiaFOSS, volunteering, learning, and open source.",
    keywords: ["X", "Twitter", "IndiaFOSS", "open source", "volunteer"],
    date: "2026-09-28",
  },
  {
    id: "x-post-indiafoss-bengaluru",
    title: "IndiaFOSS meetup in Bengaluru",
    href: "https://x.com/robinfrancis186/status/2103686793237512459",
    type: "Resource",
    section: "X post · 26 September 2026",
    description:
      "Robin posted from IndiaFOSS 2026 in Bengaluru.",
    content: "Robin's public post on 26 September 2026 says he was at IndiaFOSS 2026 in Bengaluru.",
    keywords: ["X", "Twitter", "IndiaFOSS", "Bengaluru", "meetup"],
    date: "2026-09-26",
  },
  {
    id: "x-post-devday-bengaluru",
    title: "OpenAI DevDay Exchange in Bengaluru",
    href: "https://x.com/robinfrancis186/status/2102783132412137879",
    type: "Resource",
    section: "X post · 23 September 2026",
    description:
      "Robin's public post says he was attending his first OpenAI DevDay Exchange in Bengaluru.",
    content: "Robin's public post on 23 September 2026 says he attended his first OpenAI DevDay Exchange in Bengaluru.",
    keywords: ["X", "Twitter", "OpenAI DevDay Exchange", "Bengaluru", "AI"],
    date: "2026-09-23",
  },
  {
    id: "medium-enterprise-hackathons",
    title: "Why enterprises are watching hackathons more closely than ever",
    href: "https://robinfrancis186.medium.com/why-enterprises-are-watching-hackathons-more-closely-than-ever-e0a40ba39323",
    type: "Article",
    section: "Medium · 7 January 2026",
    description:
      "Robin's Medium article discusses how enterprise hackathons can reveal problem-solving, teamwork, and innovation under constraints.",
    content:
      "In this article, Robin explores enterprise hackathons as a way to observe how people solve practical problems, collaborate, and innovate under constraints. This is the article's perspective, not a claim about a particular employer.",
    keywords: ["Medium", "hackathon", "enterprise", "innovation", "teamwork"],
    date: "2026-01-07",
  },
  {
    id: "medium-stride-inclusive-design",
    title: "STRIDE: Social Technology Research for Inclusive Design Excellence",
    href: "https://robinfrancis186.medium.com/stride-social-technology-research-for-inclusive-design-excellence-a0416552109e",
    type: "Article",
    section: "Medium · 4 January 2026",
    description:
      "Robin's Medium reflection on STRIDE Makeathon 2025 emphasizes co-design, testing with users, and inclusive assistive technology.",
    content:
      "Robin's first-person reflection on STRIDE Makeathon 2025 focuses on co-design, learning from users, and developing inclusive assistive technology. For current STRIDE project details, see the portfolio project page.",
    keywords: ["Medium", "STRIDE", "assistive technology", "inclusive design", "co-design", "accessibility"],
    date: "2026-01-04",
  },
];

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
  ...publicPresenceDocuments,
];
