import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { ensureRobinFrancisAlt } from "@/lib/imageSeo";
import { absoluteUrl, ogDefaults, siteUrl, twitterDefaults } from "@/lib/seo";
import { findProjectDetail, PROJECT_DETAILS } from "@/data/projectDetails";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECT_DETAILS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectDetail(slug);

  if (!project) {
    notFound();
  }

  const canonical = `/projects/${project.slug}/`;
  const images = [project.image, ...(project.images?.map((image) => image.src) ?? [])];

  return {
    title: `${project.title} | Robin Francis Projects`,
    description: project.summary,
    keywords: ["Robin Francis", project.title, project.category, ...project.stack],
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
    openGraph: {
      ...ogDefaults,
      type: "website",
      title: `${project.title} | Robin Francis Projects`,
      description: project.summary,
      url: absoluteUrl(canonical),
      images,
    },
    twitter: {
      ...twitterDefaults,
      card: "summary_large_image",
      title: `${project.title} | Robin Francis Projects`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function Page({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProjectDetail(slug);

  if (!project) {
    notFound();
  }

  const canonicalUrl = absoluteUrl(`/projects/${project.slug}/`);
  const allProjectImages = [
    { src: project.image, alt: project.imageAlt },
    ...(project.images ?? []),
  ];
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: canonicalUrl,
    image: allProjectImages.map((image) => absoluteUrl(image.src)),
    genre: project.category,
    creator: {
      "@type": "Person",
      name: "Robin Francis",
      url: `${siteUrl}/`,
    },
    sameAs: [project.repo, project.live].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <main className="min-h-screen bg-background px-4 pb-20 pt-32 text-foreground md:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              homeBreadcrumb,
              { name: "Projects", path: "/projects/" },
              { name: project.title, path: `/projects/${project.slug}/` },
            ]}
            className="mb-8"
          />

          <Link
            href="/projects/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <article>
            <header className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary font-geist">
                  {project.category}
                </p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight font-geist sm:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live App
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </a>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl ring-1 ring-border shadow-xl">
                <Image
                  src={project.image}
                  alt={ensureRobinFrancisAlt(project.imageAlt, "project")}
                  width={1200}
                  height={750}
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </header>

            <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,0.5fr)]">
              <div className="space-y-12">
                {project.details.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-3xl font-semibold tracking-tight font-geist">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>

              <aside className="h-fit rounded-2xl border border-border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary font-geist">
                  Project snapshot
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground font-geist">
                    Focus
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            {project.images && project.images.length > 0 && (
              <section className="mt-16" aria-labelledby="project-gallery-heading">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-primary font-geist">
                      In the work
                    </p>
                    <h2 id="project-gallery-heading" className="mt-2 text-3xl font-semibold tracking-tight font-geist">
                      Project images
                    </h2>
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 text-muted-foreground sm:block" aria-hidden="true" />
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {project.images.map((image, index) => (
                    <figure
                      key={image.src}
                      className={index === 0 && project.images && project.images.length > 2 ? "overflow-hidden rounded-2xl border border-border sm:col-span-2" : "overflow-hidden rounded-2xl border border-border"}
                    >
                      <Image
                        src={image.src}
                        alt={ensureRobinFrancisAlt(image.alt, "project")}
                        width={1200}
                        height={750}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="h-full max-h-[620px] w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <footer className="mt-16 border-t border-border pt-8">
              <Link
                href="/projects/"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Explore all projects
              </Link>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
