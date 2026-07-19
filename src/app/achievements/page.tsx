import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  Trophy,
} from "lucide-react";
import { awards, findProofLinks, proofLinks } from "@/data/profileProof";
import { absoluteUrl, defaultSeoKeywords, personJsonLd, siteUrl } from "@/lib/seo";

const awardsDescription =
  "Achievements, awards, public recognitions, and source-backed proof links for Robin Francis across IEEE leadership, IBM watsonx GenAI work, and inclusive innovation.";
const primaryAwardImage = awards[0]?.image ?? "/images/blog/blog2/1731994207232.webp";
const awardImages = awards.map((award) => award.image);
const proofSourceTitles = new Set(awards.flatMap((award) => award.proofTitles));

const achievementMetrics = [
  {
    value: "2024",
    label: "IEEE R10 recognition",
    detail: "Listed by IEEE Region 10 among Outstanding Volunteer Award recipients.",
  },
  {
    value: "534",
    label: "SB members grown",
    detail: "IEEE Sahrdaya Student Branch growth from 110 to 534 members.",
  },
  {
    value: "136+",
    label: "programs led",
    detail: "Volunteer-led programs across campus, society, and impact tracks.",
  },
  {
    value: "3x",
    label: "hackathon wins",
    detail: "Student and community product-building competitions.",
  },
];

const recognitionDetails: Record<
  string,
  {
    impact: string;
    role: string;
    proof: string;
  }
> = {
  "IEEE Region 10 Outstanding Volunteer Award": {
    impact:
      "Regional recognition for volunteer leadership and sustained IEEE community contribution.",
    role: "Community builder and IEEE Sahrdaya Student Branch leader.",
    proof: "Verified through IEEE Region 10's public past recipients page.",
  },
  "IBM watsonx GenAI Challenge second prize": {
    impact:
      "Built SoulSync, a GenAI companion concept for seniors, with Team Bits & Bytes.",
    role: "Product builder and hackathon team member.",
    proof: "Verified through The Week coverage and YouTube video reporting.",
  },
  "Outstanding Humanitarian Volunteer Award": {
    impact:
      "Recognition connected to humanitarian technology, accessibility, and public-interest work.",
    role: "K-DISC and IEEE volunteer working across inclusive innovation.",
    proof: "Verified in IEEE Kerala Section's Region 10 report.",
  },
};

const availability = [
  "AI product collaborations",
  "Inclusive innovation and accessibility talks",
  "IEEE and student leadership sessions",
  "Public-interest web platform work",
];

const achievementPageLinks = [
  {
    href: "#featured-recognition",
    label: "Featured recognition",
    detail: "IEEE Region 10 source-backed award record",
  },
  {
    href: "#recognition-cards",
    label: "Awards and proof",
    detail: "IBM watsonx, IEEE, and humanitarian recognition",
  },
  {
    href: "#proof-library",
    label: "Proof library",
    detail: "Outbound sources for press and collaborators",
  },
];

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
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Achievements",
        item: absoluteUrl("/achievements/"),
      },
    ],
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
  const featuredProof = proofLinks.filter((proof) => proofSourceTitles.has(proof.title));
  const featuredAward = awards[0];
  const featuredAwardLinks = findProofLinks(featuredAward.proofTitles);
  const supportingAwards = awards.slice(1);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background pb-20 pt-28 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(awardsJsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-neutral-800 dark:text-neutral-200">Achievements</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.86fr] lg:items-start">
          <div>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-6xl">
              Robin Francis achievements, awards, and public proof.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              A source-backed record of leadership, product building, and public-interest
              technology work across IEEE, IBM watsonx GenAI, STRIDE Kerala, and inclusive
              innovation ecosystems.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/press-kit/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 sm:w-auto"
              >
                Open press kit
                <FileText className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-white sm:w-auto"
              >
                Discuss a collaboration
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <aside className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-slate-950">
            <div className="relative aspect-[4/3] min-h-[340px] bg-neutral-100 dark:bg-slate-900">
              <Image
                src={featuredAward.image}
                alt={featuredAward.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Featured recognition
                </p>
                <p className="mt-2 text-2xl font-bold leading-tight text-white">
                  {featuredAward.title}
                </p>
                <p className="mt-2 text-sm font-medium text-white/80">
                  {featuredAward.issuer} · {featuredAward.year}
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                Verification path
              </p>
              <div className="mt-4 grid gap-3">
                {featuredProof.slice(0, 3).map((proof) => (
                  <a
                    key={proof.href}
                    href={proof.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-lg border border-neutral-200 px-4 py-3 transition hover:border-primary hover:bg-primary/5 dark:border-neutral-800"
                  >
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {proof.label}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-sm font-semibold text-neutral-900 group-hover:text-primary dark:text-white">
                        {proof.title}
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400 group-hover:text-primary" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Achievement metrics">
          {achievementMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-slate-950"
            >
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-950 dark:text-white">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 md:px-8" aria-label="Achievement evidence summary">
        <div className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-slate-950 md:grid-cols-3">
          {[
            {
              title: "Verified",
              copy: "Every major claim links to an external source, not a private resume line.",
            },
            {
              title: "Applied",
              copy: "Recognition connects back to shipped AI, accessibility, and student-community work.",
            },
            {
              title: "Reusable",
              copy: "Press kit, bio, proof links, and gallery evidence are ready for organizers and media.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 md:px-8" aria-label="Achievements page sections">
        <div className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-slate-950 md:grid-cols-3">
          {achievementPageLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-transparent p-4 transition hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-neutral-950 dark:text-white">
                {item.label}
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="mt-2 block text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {item.detail}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 md:px-8" aria-label="Public verification sources">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-slate-950">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
            Verified by public sources
          </p>
          <div className="grid gap-3 md:grid-cols-4">
            {featuredProof.map((proof) => (
              <a
                key={proof.href}
                href={proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 flex-col justify-between rounded-lg border border-neutral-200 p-4 transition hover:border-primary hover:bg-primary/5 dark:border-neutral-800"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {proof.label}
                </span>
                <span className="mt-3 text-sm font-semibold leading-6 text-neutral-900 group-hover:text-primary dark:text-white">
                  {proof.title}
                </span>
                <span className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  {proof.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-recognition" className="scroll-mt-28 mx-auto mt-12 max-w-7xl px-4 md:px-8" aria-label="Featured achievement">
        <article className="grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[320px] border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-slate-900 lg:border-b-0 lg:border-r">
            <Image
              src={featuredAward.image}
              alt={featuredAward.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/55 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Featured recognition
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                {featuredAward.issuer}
              </span>
              <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200">
                {featuredAward.year}
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {featuredAward.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-300">
              {recognitionDetails[featuredAward.title].impact}
            </p>
            <div className="mt-7 space-y-5 border-y border-neutral-200 py-6 dark:border-neutral-800">
              {[
                ["Role", recognitionDetails[featuredAward.title].role],
                ["Proof", recognitionDetails[featuredAward.title].proof],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-2 sm:grid-cols-[120px_1fr]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {label}
                  </p>
                  <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {featuredAwardLinks.map((proof) => (
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
      </section>

      <section id="recognition-cards" className="scroll-mt-28 mx-auto mt-8 grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8" aria-label="Achievements and awards">
        {supportingAwards.map((award) => {
          const links = findProofLinks(award.proofTitles);
          const details = recognitionDetails[award.title];

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
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-7">
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
                  {details.impact}
                </p>
                <div className="mt-5 space-y-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
                  <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold text-neutral-950 dark:text-white">Role:</span>{" "}
                    {details.role}
                  </p>
                  <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold text-neutral-950 dark:text-white">Proof:</span>{" "}
                    {details.proof}
                  </p>
                </div>
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

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8" aria-labelledby="availability-heading">
        <div className="grid gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-slate-950 md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Work With Robin
            </p>
            <h2
              id="availability-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
            >
              Recognition is strongest when it opens the next conversation.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
              These awards connect to practical work: AI product building, accessible web
              platforms, volunteer systems, and public-interest technology programs.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {availability.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-200">
                  {item}
                </p>
              </div>
            ))}
            <Link
              href="/#contact"
              className="inline-flex items-center justify-between rounded-lg border border-primary bg-primary px-4 py-4 text-sm font-semibold text-white transition hover:bg-primary/90 sm:col-span-2"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="proof-library" className="scroll-mt-28 mx-auto mt-16 max-w-7xl px-4 md:px-8" aria-labelledby="proof-library-heading">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Independent Proof
            </p>
            <h2
              id="proof-library-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
            >
              Public sources behind the claims
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              Every major recognition on this page is paired with an external source, so press,
              event organizers, and collaborators can verify the context quickly.
            </p>
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
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Verify source
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
