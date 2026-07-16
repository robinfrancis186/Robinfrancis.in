import type { Metadata } from "next";
import { HomeRoute } from "./_components/home-route";
import {
  absoluteUrl,
  defaultSeoDescription,
  defaultSeoImage,
  defaultSeoKeywords,
  organizationJsonLd,
  personJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

const homeDescription = defaultSeoDescription;

const homeJsonLd = [
  personJsonLd,
  organizationJsonLd,
  websiteJsonLd,
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    name: "Robin Francis portfolio",
    url: `${siteUrl}/`,
    description: homeDescription,
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Home", "About", "Projects", "Blog", "Achievements", "Gallery", "Press Kit", "Search", "Contact"],
    url: [
      absoluteUrl("/"),
      absoluteUrl("/#about"),
      absoluteUrl("/projects/"),
      absoluteUrl("/blog/"),
      absoluteUrl("/achievements/"),
      absoluteUrl("/gallery/"),
      absoluteUrl("/press-kit/"),
      absoluteUrl("/search/"),
      absoluteUrl("/#contact"),
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Robin Francis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Robin Francis is an AI innovator, software engineer, and community leader focused on accessible, people-centric technology.",
        },
      },
      {
        "@type": "Question",
        name: "What does Robin Francis build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Robin builds AI-powered products, accessible web platforms, local-first tools, and community programs for social impact.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Robin Francis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the contact form on robinfrancis.in or email robinfrancis186@gmail.com.",
        },
      },
    ],
  },
];

const noScriptSummary = `
  <section id="portfolio-summary" aria-labelledby="portfolio-summary-heading">
    <h2 id="portfolio-summary-heading">AI innovator and software engineer building accessible technology</h2>
    <p>Robin Francis designs and builds AI-powered products, scalable web systems, and community programs focused on accessibility, social impact, and people-centric technology.</p>
    <p>Featured work includes SoulSync for cognitive wellness, FoodLoop for responsible food redistribution, BulkyFi for local-first certificate generation, Argus for autonomous browser QA, and the official STRIDE Kerala website.</p>
    <p>Explore the portfolio through <a href="/projects/">projects</a>, <a href="/achievements/">achievements</a>, <a href="/press-kit/">press kit</a>, <a href="/blog/">blog stories</a>, <a href="/gallery/">gallery moments</a>, or <a href="/#contact">contact</a>.</p>
  </section>
`;

const homeProofHighlights = [
  {
    label: "Achievements",
    title: "IEEE and IBM watsonx recognition",
    description:
      "Source-backed record covering IEEE Region 10 recognition, IBM watsonx GenAI Challenge work, and humanitarian technology awards.",
    href: "/achievements/",
  },
  {
    label: "Projects",
    title: "AI, accessibility, and local-first products",
    description:
      "Explore Argus, BulkyFi, STRIDE Kerala, SoulSync, FoodLoop, and product evidence with live links and repositories where available.",
    href: "/projects/",
  },
  {
    label: "Press Kit",
    title: "Bio, headshot, proof links, and contact",
    description:
      "A reusable media kit for organizers, collaborators, and press with official bios, downloadable headshot, and verification links.",
    href: "/press-kit/",
  },
];

const homeEvidenceLinks = [
  {
    title: "Source-backed achievements",
    href: "/achievements/",
    description: "IEEE Region 10, IBM watsonx, STRIDE, and humanitarian technology recognition.",
  },
  {
    title: "Project portfolio",
    href: "/projects/",
    description: "Argus, BulkyFi, STRIDE Kerala, SoulSync, FoodLoop, and accessibility/product work.",
  },
  {
    title: "Blog and leadership notes",
    href: "/blog/",
    description: "Writing on IEEE leadership, accessible technology, people-centric AI, and community systems.",
  },
  {
    title: "Gallery evidence",
    href: "/gallery/",
    description: "Real event, award, speaking, education, and inclusive innovation moments.",
  },
  {
    title: "Media and collaboration kit",
    href: "/press-kit/",
    description: "Official bio, headshot, proof links, achievements, and contact details.",
  },
];

export const metadata: Metadata = {
  title: "Robin Francis | AI Innovator & Community Leader",
  description: homeDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis portfolio",
    "AI product builder",
    "accessible web systems",
    "community technology leader",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Robin Francis | AI Innovator & Community Leader",
    description: homeDescription,
    url: siteUrl,
    images: [defaultSeoImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Francis | AI Innovator & Community Leader",
    description: homeDescription,
    images: [defaultSeoImage],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <noscript dangerouslySetInnerHTML={{ __html: noScriptSummary }} />
      <HomeRoute />
      <section
        className="mx-auto max-w-7xl px-4 pb-20 pt-4 md:px-8"
        aria-labelledby="home-proof-heading"
      >
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Verified portfolio paths
          </p>
          <h2
            id="home-proof-heading"
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
          >
            Start with the pages that prove Robin Francis&apos;s work.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
            The portfolio is organized around verifiable achievements, shipped products,
            public-interest platforms, and reusable media details for collaborators and event
            organizers.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {homeProofHighlights.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg border border-neutral-200 p-5 transition hover:border-primary hover:bg-primary/5 dark:border-neutral-800"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.label}
                </span>
                <h3 className="mt-3 text-xl font-bold text-neutral-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
              Crawlable evidence map
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {homeEvidenceLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-neutral-200 p-4 transition hover:border-primary hover:bg-primary/5 dark:border-neutral-800"
                >
                  <span className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {item.title}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
