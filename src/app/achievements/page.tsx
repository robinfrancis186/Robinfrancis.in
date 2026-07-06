import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { awards, findProofLinks, proofLinks } from "@/data/profileProof";
import { absoluteUrl, defaultSeoKeywords, personJsonLd, siteUrl } from "@/lib/seo";

const awardsDescription =
  "Achievements, awards, public recognitions, and source-backed proof links for Robin Francis across IEEE leadership, IBM watsonx GenAI work, and inclusive innovation.";
const primaryAwardImage = "/images/blog/ieee-award.webp";
const awardImages = awards.map((award) => award.image);

const awardsJsonLd = [
  personJsonLd,
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/achievements/#page`,
    name: "Achievements | Robin Francis",
    url: absoluteUrl("/achievements/"),
    description: awardsDescription,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: awards.map((award, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: award.title,
          description: award.summary,
          award: award.title,
          provider: award.issuer,
          temporalCoverage: award.year,
          url: absoluteUrl("/achievements/"),
          image: absoluteUrl(award.image),
          sameAs: findProofLinks(award.proofTitles).map((proof) => proof.href),
        },
      })),
    },
  },
];

export const metadata: Metadata = {
  title: "Achievements | Robin Francis",
  description: awardsDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis achievements",
    "Robin Francis awards",
    "IEEE Region 10 Outstanding Volunteer Award",
    "IEEE Kerala Section Outstanding Humanitarian Volunteer Award",
    "IBM watsonx GenAI Challenge",
    "IEEE Sahrdaya",
    "Kerala AI innovator",
  ],
  alternates: {
    canonical: "/achievements/",
    languages: {
      en: "/achievements/",
      "x-default": "/achievements/",
    },
  },
  openGraph: {
    title: "Achievements | Robin Francis",
    description: awardsDescription,
    url: absoluteUrl("/achievements/"),
    images: awardImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Robin Francis",
    description: awardsDescription,
    images: [primaryAwardImage],
  },
};

export default function AchievementsPage() {
  const highlightedProof = proofLinks.filter((proof) =>
    ["award", "press", "publication"].includes(proof.category),
  );

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-32 text-foreground md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(awardsJsonLd) }}
      />

      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Recognition and Proof
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-6xl">
              Achievements that show the work.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              A source-backed record of leadership, product-building, and public-interest
              technology recognition across IEEE, GenAI, and inclusive innovation ecosystems.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["2024", "IEEE R10 award"],
              ["136+", "programs led"],
              ["534", "SB members grown"],
              ["3x", "hackathon wins"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-slate-950"
              >
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">{label}</dt>
                <dd className="mt-2 text-3xl font-bold text-neutral-950 dark:text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2" aria-label="Achievements and awards">
        {awards.map((award, index) => {
          const links = findProofLinks(award.proofTitles);

          return (
            <article
              key={award.title}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-slate-950"
            >
              <div className="relative aspect-[16/9] w-full border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-slate-900">
                <Image
                  src={award.image}
                  alt={award.imageAlt}
                  fill
                  priority={index < 2}
                  sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      {award.issuer}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                      {award.title}
                    </h2>
                  </div>
                  <span className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200">
                    {award.year}
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  {award.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {links.map((proof) => (
                    <a
                      key={proof.href}
                      href={proof.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200"
                    >
                      {proof.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mx-auto mt-16 max-w-6xl" aria-labelledby="proof-library-heading">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Source Library
            </p>
            <h2
              id="proof-library-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
            >
              Outbound proof links
            </h2>
          </div>
          <a
            href="/press-kit/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            Open press kit
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {highlightedProof.map((proof) => (
            <a
              key={proof.href}
              href={proof.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-primary dark:border-neutral-800 dark:bg-slate-950"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {proof.label}
              </span>
              <h3 className="mt-3 text-lg font-bold text-neutral-950 dark:text-white">
                {proof.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {proof.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
