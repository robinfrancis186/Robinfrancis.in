import type { Metadata } from "next";
import { ProjectsRoute } from "../_components/projects-route";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, ogDefaults, siteUrl, twitterDefaults } from "@/lib/seo";

const projectDescription =
  "Explore Robin Francis projects in AI engineering, accessibility, product strategy, autonomous QA, mobile-first food rescue, and public-interest technology.";

const projects = [
  {
    name: "Argus",
    category: "AI QA browser agent",
    description:
      "A local-first autonomous QA agent that scouts websites, deploys synthetic user personas, and returns evidence-backed bug reports.",
    url: "https://github.com/robinfrancis186/argus.git",
    image: absoluteUrl("/images/projects/argus.webp"),
    type: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    codeRepository: "https://github.com/robinfrancis186/argus.git",
  },
  {
    name: "BulkyFi",
    category: "Local-first certificate generator",
    description:
      "A browser-based tool for generating professional certificates from templates and recipient spreadsheets, with PDF and PNG export.",
    url: "https://bulkyfi.vercel.app/",
    image: absoluteUrl("/images/projects/bulkyfi-landing-v2.webp"),
    type: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    codeRepository: "https://github.com/robinfrancis186/bulkyfi",
    sameAs: ["https://github.com/robinfrancis186/bulkyfi"],
  },
  {
    name: "STRIDE Website",
    category: "Accessible public-interest website",
    description:
      "The official STRIDE Kerala website, built as a modern platform for assistive technology, social impact, ecosystem stories, and engagement.",
    url: "https://stride.kerala.gov.in/",
    image: absoluteUrl("/images/projects/stride-website.webp"),
    type: "WebSite",
    sameAs: ["https://kdisc.kerala.gov.in/en/social-enterprises-and-inclusion/"],
  },
  {
    name: "IEEE SIGHT Kerala Website",
    category: "Humanitarian technology website",
    description:
      "The official IEEE Kerala Section SIGHT website with 2026 leadership, mission, community projects, events, funding opportunities, and contact information.",
    url: "https://sight.ieeekerala.org/",
    image: absoluteUrl("/images/projects/ieee-sight-website.webp"),
    type: "WebSite",
    sameAs: ["https://github.com/robinfrancis186/ieee-sight-website-2026"],
  },
  {
    name: "Readit",
    category: "Local-first personal library",
    description:
      "A private library and reader for books, periodicals, and PDFs, with searchable reading notes and bundled Malayalam and English dictionaries.",
    url: "https://readit-opal.vercel.app/",
    image: absoluteUrl("/images/projects/readit.webp"),
    type: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    codeRepository: "https://github.com/robinfrancis186/readit",
    sameAs: [
      "https://github.com/robinfrancis186/readit",
      "https://robinfrancis186.github.io/readit/",
    ],
  },
  {
    name: "Crown of Bharat",
    category: "Indian-inspired 3D strategy game",
    description:
      "An Indian-inspired 3D strategy game for building a kingdom, upgrading buildings, preparing troops and heroes, and playing campaign, practice, or asynchronous online battles.",
    url: "https://crown-of-bharat.vercel.app/",
    image: absoluteUrl("/images/projects/crown-of-bharat.webp"),
    type: "VideoGame",
    applicationCategory: "GameApplication",
    codeRepository: "https://github.com/robinfrancis186/crown-of-bharat",
    sameAs: ["https://github.com/robinfrancis186/crown-of-bharat"],
  },
  {
    name: "floodRISE",
    category: "Flood-intelligence and emergency decision-support demo",
    description:
      "A human-verified flood-intelligence MVP demonstrated through a deterministic Chennai replay. The hosted preview is labeled demo data and is not a live emergency service.",
    url: "https://floodrise.vercel.app/",
    image: absoluteUrl("/images/projects/floodrise-preview.webp"),
    type: "SoftwareApplication",
    codeRepository: "https://github.com/robinfrancis186/floodRISE",
    sameAs: ["https://github.com/robinfrancis186/floodRISE"],
  },
  {
    name: "Rofin UI",
    category: "Dependency-free vanilla web UI library",
    description:
      "An open-source, framework-independent UI library built with HTML, CSS, and vanilla JavaScript, with a live gallery of reusable components, effects, and page sections.",
    url: "https://rofin-ui.vercel.app/",
    image: absoluteUrl("/images/projects/rofin-ui-preview.webp"),
    type: "SoftwareSourceCode",
    codeRepository: "https://github.com/robinfrancis186/rofin-ui",
    sameAs: ["https://github.com/robinfrancis186/rofin-ui"],
  },
  {
    name: "SoulSync",
    category: "AI wellness companion",
    description:
      "An AI companion concept for cognitive wellness with emotion tracking, memory recall, and privacy-conscious caregiver support.",
    url: absoluteUrl("/projects/"),
    image: absoluteUrl("/images/project-soulsync.webp"),
    type: "SoftwareApplication",
    applicationCategory: "HealthApplication",
  },
  {
    name: "FoodLoop",
    category: "Mobile-first food rescue pilot for India",
    description:
      "A mobile-first Flutter pilot that helps kitchens share edible surplus, lets nearby community members reserve portions for free, and supports pickup handover. Project screenshots show fictional local-demo data, not live listings or confirmed pickups.",
    url: "https://robinfrancis186.github.io/foodloop/",
    image: absoluteUrl("/images/project-foodloop.webp"),
    type: "SoftwareApplication",
    applicationCategory: "MobileApplication",
    codeRepository: "https://github.com/robinfrancis186/foodloop",
    sameAs: ["https://github.com/robinfrancis186/foodloop"],
  },
  {
    name: "TechX Infinia",
    category: "Emerging technology flagship event",
    description:
      "An emerging technology festival founded and led for more than 450 participants, spanning talks, an expo, and school outreach.",
    url: absoluteUrl("/gallery/"),
    image: absoluteUrl("/images/gallery/gallery-techx-infinia-audience.webp"),
    type: "CreativeWork",
  },
  {
    name: "IEEE Global Career Fair",
    category: "Global virtual career fair",
    description:
      "Operations and Platform Team Lead, and Recruiter Outreach Team Lead for South India, for the 27-hour follow-the-sun IEEE Global Career Fair 2026: 11,020 candidates from 131 countries, 700+ jobs across 163 hiring locations, and 8,169 applications.",
    url: absoluteUrl("/projects/ieee-global-career-fair/"),
    image: absoluteUrl("/images/projects/ieee-global-career-fair-results.webp"),
    type: "CreativeWork",
  },
  {
    name: "IEEE R10 Career Fair",
    category: "International virtual career fair",
    description:
      "Co-led IEEE Region 10's first international Virtual Career Fair in 2025, connecting 245 registrants with 31 global recruiters across 2,578 booth visits and 310 applications.",
    url: absoluteUrl("/blog/ieee-region-10-international-virtual-career-fair-2025/"),
    image: absoluteUrl("/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-participation-outcomes.webp"),
    type: "CreativeWork",
  },
];

const projectsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Robin Francis",
    description: projectDescription,
    url: absoluteUrl("/projects/"),
    hasPart: projects.map((project) => ({
      "@type": project.type,
      name: project.name,
      description: project.description,
      genre: project.category,
      url: project.url,
      image: project.image,
      applicationCategory: project.applicationCategory,
      codeRepository: project.codeRepository,
      sameAs: project.sameAs,
      creator: {
        "@type": "Person",
        name: "Robin Francis",
        url: `${siteUrl}/`,
      },
    })),
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Projects", path: "/projects/" }]),
];

export const metadata: Metadata = {
  title: "Robin Francis Projects | AI & Accessibility",
  description: projectDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis projects",
    "AI QA browser agent",
    "Argus autonomous QA",
    "BulkyFi certificate generator",
    "STRIDE Kerala website",
    "IEEE SIGHT Kerala website",
    "humanitarian technology website",
    "IEEE Global Career Fair",
    "Readit personal library",
    "local-first reading app",
    "Malayalam English dictionary",
    "Crown of Bharat",
    "Indian strategy game",
    "mobile landscape strategy game",
    "floodRISE flood intelligence demo",
    "Rofin UI vanilla JavaScript component library",
    "FoodLoop India food rescue pilot",
    "Flutter food surplus donation and pickup",
    "assistive technology projects",
  ],
  alternates: {
    canonical: "/projects/",
    languages: {
      en: "/projects/",
      "x-default": "/projects/",
    },
  },
  openGraph: {
    ...ogDefaults,
    title: "Robin Francis Projects | AI & Accessibility",
    description: projectDescription,
    url: absoluteUrl("/projects/"),
    images: ["/images/projects/stride-website.webp"],
  },
  twitter: {
    ...twitterDefaults,
    card: "summary_large_image",
    title: "Robin Francis Projects | AI & Accessibility",
    description: projectDescription,
    images: ["/images/projects/stride-website.webp"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <noscript>
        <section aria-labelledby="projects-fallback-heading">
          <h2 id="projects-fallback-heading">Projects by Robin Francis</h2>
          <p>{projectDescription}</p>
          <ul>
            {projects.map((project) => (
              <li key={project.name}>
                <h2>{project.name}</h2>
                <p>
                  {project.category}: {project.description}
                </p>
                <a href={project.url}>Open {project.name}</a>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <ProjectsRoute />
    </>
  );
}
