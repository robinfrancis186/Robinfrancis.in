import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsRoute } from "../_components/projects-route";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, ogDefaults, siteUrl, twitterDefaults } from "@/lib/seo";

const projectDescription =
  "Explore Robin Francis's AI, accessibility and community projects, with case studies, screenshots, implementation details and live demos.";

const projects = PROJECT_DETAILS.map((project) => ({
  name: project.title,
  category: project.category,
  description: project.summary,
  url: absoluteUrl(`/projects/${project.slug}/`),
  image: absoluteUrl(project.image),
  type: "CreativeWork",
  sameAs: [project.live, project.repo].filter(Boolean),
}));

const projectsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects/#projects"),
    name: "Projects | Robin Francis",
    description: projectDescription,
    url: absoluteUrl("/projects/"),
    isPartOf: { "@id": `${siteUrl}/#website` },
    inLanguage: "en",
    hasPart: projects.map((project) => ({
      "@type": project.type,
      name: project.name,
      description: project.description,
      genre: project.category,
      url: project.url,
      image: project.image,
      sameAs: project.sameAs,
      creator: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
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
      <nav aria-labelledby="project-case-studies-heading" className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <h2 id="project-case-studies-heading" className="text-2xl font-semibold text-foreground">Explore project case studies</h2>
        <p className="mt-2 text-muted-foreground">Go straight to the details, screenshots and implementation notes.</p>
        <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_DETAILS.map((project) => <li key={project.slug}>
            <Link href={`/projects/${project.slug}/`} className="flex min-h-12 items-center rounded-xl border border-border px-4 py-3 text-primary transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{project.title}</Link>
          </li>)}
        </ul>
      </nav>
    </>
  );
}
