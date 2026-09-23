import type { Metadata } from "next";
import { CardRoute } from "../_components/card-route";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoImage, defaultSeoKeywords, ogDefaults, siteUrl, socialProfiles, twitterDefaults } from "@/lib/seo";

const cardDescription =
  "Connect with Robin Francis, AI innovator and software engineer, for AI products, accessible technology, community leadership, or speaking.";

const cardJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Robin Francis Profile Card",
    url: absoluteUrl("/card/"),
    mainEntity: {
      "@type": "Person",
      name: "Robin Francis",
      url: `${siteUrl}/`,
      jobTitle: "AI Innovator and Community Leader",
      sameAs: [...socialProfiles],
    },
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Card", path: "/card/" }]),
];

export const metadata: Metadata = {
  title: "Robin Francis Contact Card | AI Collaborator",
  description: cardDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis contact",
    "Robin Francis business card",
    "AI collaborator",
    "technology mentor",
  ],
  alternates: {
    canonical: "/card/",
    languages: {
      en: "/card/",
      "x-default": "/card/",
    },
  },
  openGraph: {
    ...ogDefaults,
    title: "Robin Francis Contact Card | AI Collaborator",
    description: cardDescription,
    url: absoluteUrl("/card/"),
    images: [defaultSeoImage],
  },
  twitter: {
    ...twitterDefaults,
    card: "summary_large_image",
    title: "Robin Francis Contact Card | AI Collaborator",
    description: cardDescription,
    images: [defaultSeoImage],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cardJsonLd) }}
      />
      <noscript>
        <section aria-labelledby="card-fallback-heading">
          <h2 id="card-fallback-heading">Robin Francis Card</h2>
          <p>{cardDescription}</p>
          <ul>
            <li>
              <a href="https://github.com/robinfrancis186">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/robin-francis-b43565175">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/robinfrancis186">Instagram</a>
            </li>
            <li>
              <a href="https://x.com/robinfrancis186">X</a>
            </li>
            <li>
              <a href="https://www.youtube.com/@robinfrancis186">YouTube</a>
              <a href="https://medium.com/@robinfrancis186">Medium</a>
            </li>
          </ul>
        </section>
      </noscript>
      <CardRoute />
    </>
  );
}
