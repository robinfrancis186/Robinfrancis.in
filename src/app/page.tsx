import type { Metadata } from "next";
import { HomeRoute } from "./_components/home-route";
import { absoluteUrl, defaultSeoDescription, defaultSeoImage, defaultSeoKeywords, ogDefaults, organizationJsonLd, personJsonLd, siteUrl, twitterDefaults, websiteJsonLd } from "@/lib/seo";

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
    ...ogDefaults,
    title: "Robin Francis | AI Innovator & Community Leader",
    description: homeDescription,
    url: siteUrl,
    images: [defaultSeoImage],
  },
  twitter: {
    ...twitterDefaults,
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
    </>
  );
}
