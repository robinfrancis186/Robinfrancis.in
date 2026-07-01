import type { Metadata } from "next";
import { ProjectsRoute } from "../_components/route-clients";

const projectDescription = "Explore AI, accessibility, product, and engineering projects built by Robin Francis.";

const projects = [
  {
    name: "Argus",
    category: "AI QA browser agent",
    description:
      "A local-first autonomous QA agent that scouts websites, deploys synthetic user personas, and returns evidence-backed bug reports.",
    url: "https://github.com/robinfrancis186/argus.git",
  },
  {
    name: "BulkyFi",
    category: "Local-first certificate generator",
    description:
      "A browser-based tool for generating professional certificates from templates and recipient spreadsheets, with PDF and PNG export.",
    url: "https://bulkyfi.vercel.app/",
  },
  {
    name: "STRIDE Website",
    category: "Accessible public-interest website",
    description:
      "The official STRIDE Kerala website, built as a modern platform for assistive technology, social impact, ecosystem stories, and engagement.",
    url: "https://stride.kerala.gov.in/",
  },
  {
    name: "SoulSync",
    category: "AI wellness companion",
    description:
      "An AI companion concept for cognitive wellness with emotion tracking, memory recall, and privacy-conscious caregiver support.",
    url: "https://www.robinfrancis.in/projects/",
  },
  {
    name: "FoodLoop",
    category: "Responsible food redistribution",
    description:
      "A sustainability platform concept using surplus prediction to reduce food waste and improve redistribution workflows.",
    url: "https://www.robinfrancis.in/projects/",
  },
];

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects | Robin Francis",
  description: projectDescription,
  url: "https://www.robinfrancis.in/projects/",
  hasPart: projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    genre: project.category,
    url: project.url,
    creator: {
      "@type": "Person",
      name: "Robin Francis",
      url: "https://www.robinfrancis.in/",
    },
  })),
};

export const metadata: Metadata = {
  title: "Projects | Robin Francis",
  description: projectDescription,
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
    url: "/projects/",
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
    </>
  );
}
