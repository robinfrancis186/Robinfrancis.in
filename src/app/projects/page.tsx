import type { Metadata } from "next";
import { ProjectsRoute } from "../_components/projects-route";
import { TrackedLink } from "@/components/analytics/AnalyticsEvents";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, siteUrl } from "@/lib/seo";

const projectDescription = "Explore AI, accessibility, product, and engineering projects built by Robin Francis.";

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
    category: "Responsible food redistribution",
    description:
      "A sustainability platform concept using surplus prediction to reduce food waste and improve redistribution workflows.",
    url: absoluteUrl("/projects/"),
    image: absoluteUrl("/images/project-foodloop.webp"),
    type: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
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
  title: "Projects | Robin Francis",
  description: projectDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis projects",
    "AI QA browser agent",
    "Argus autonomous QA",
    "BulkyFi certificate generator",
    "STRIDE Kerala website",
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
    title: "Projects | Robin Francis",
    description: projectDescription,
    url: absoluteUrl("/projects/"),
    images: ["/images/projects/stride-website.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Robin Francis",
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
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8" aria-labelledby="projects-seo-heading">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Project evidence
          </p>
          <h2 id="projects-seo-heading" className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            AI, accessibility, and local-first products by Robin Francis
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">{project.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {project.category}
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>
                <TrackedLink
                  className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primary/80"
                  href={project.url}
                  eventName="project_outbound_click"
                  eventParams={{
                    project_name: project.name,
                    destination_type: project.codeRepository ? "repository_or_demo" : "proof_link",
                    link_text: "Open proof link",
                    link_location: "projects_server_evidence",
                  }}
                >
                  Open proof link
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
