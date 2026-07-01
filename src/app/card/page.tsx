import type { Metadata } from "next";
import { CardRoute } from "../_components/route-clients";

const cardDescription =
  "Robin Francis is an AI innovator and community leader available for meaningful AI, product, accessibility, and community collaborations.";

const cardJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Robin Francis Profile Card",
  url: "https://www.robinfrancis.in/card/",
  mainEntity: {
    "@type": "Person",
    name: "Robin Francis",
    url: "https://www.robinfrancis.in/",
    jobTitle: "AI Innovator and Community Leader",
    sameAs: [
      "https://github.com/robinfrancis186",
      "https://www.linkedin.com/in/robin-francis-b43565175",
      "https://www.instagram.com/robinfrancis186",
      "https://medium.com/@robinfrancis186",
    ],
  },
};

export const metadata: Metadata = {
  title: "Robin Francis Card | AI Innovator & Community Leader",
  description: cardDescription,
  alternates: {
    canonical: "/card/",
    languages: {
      en: "/card/",
      "x-default": "/card/",
    },
  },
  openGraph: {
    title: "Robin Francis Card | AI Innovator & Community Leader",
    description: cardDescription,
    url: "/card/",
    images: ["/images/card/robin-francis-primary.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Francis Card | AI Innovator & Community Leader",
    description: cardDescription,
    images: ["/images/card/robin-francis-primary.jpg"],
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
              <a href="https://medium.com/@robinfrancis186">Medium</a>
            </li>
          </ul>
        </section>
      </noscript>
      <CardRoute />
    </>
  );
}
