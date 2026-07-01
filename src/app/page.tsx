import type { Metadata } from "next";
import { HomeRoute } from "./_components/route-clients";

const homeDescription =
  "Robin Francis builds accessible AI products, scalable web systems, and community programs for people-centric technology.";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robin Francis",
    url: "https://www.robinfrancis.in/",
    image: "https://www.robinfrancis.in/images/card/robin-francis-primary.jpg",
    jobTitle: "AI Innovator and Software Engineer",
    email: "mailto:robinfrancis186@gmail.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sahrdaya College of Engineering & Technology",
    },
    knowsAbout: [
      "Artificial intelligence",
      "Accessible technology",
      "Software engineering",
      "Community leadership",
      "Product strategy",
    ],
    sameAs: [
      "https://github.com/robinfrancis186",
      "https://www.linkedin.com/in/robin-francis-b43565175",
      "https://www.instagram.com/robinfrancis186",
      "https://medium.com/@robinfrancis186",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Robin Francis",
    url: "https://www.robinfrancis.in/",
    description: homeDescription,
  },
];

const noScriptSummary = `
  <section id="portfolio-summary" aria-labelledby="portfolio-summary-heading">
    <h2 id="portfolio-summary-heading">AI innovator and software engineer building accessible technology</h2>
    <p>Robin Francis designs and builds AI-powered products, scalable web systems, and community programs focused on accessibility, social impact, and people-centric technology.</p>
    <p>Featured work includes SoulSync for cognitive wellness, FoodLoop for responsible food redistribution, BulkyFi for local-first certificate generation, Argus for autonomous browser QA, and the official STRIDE Kerala website.</p>
    <p>Explore the portfolio through <a href="/projects/">projects</a>, <a href="/blog/">blog stories</a>, <a href="/gallery/">gallery moments</a>, or <a href="/#contact">contact</a>.</p>
  </section>
`;

export const metadata: Metadata = {
  title: "Robin Francis | AI Innovator & Community Leader",
  description: homeDescription,
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
    url: "https://www.robinfrancis.in/",
    images: ["/images/card/robin-francis-primary.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Francis | AI Innovator & Community Leader",
    description: homeDescription,
    images: ["/images/card/robin-francis-primary.jpg"],
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
