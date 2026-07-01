import type { Metadata } from "next";
import { GalleryRoute } from "../_components/route-clients";

const galleryDescription =
  "Explore a curated collection of moments, landscapes, and visual stories by Robin Francis.";

const galleryItems = [
  {
    title: "IEEE Awards Gala",
    image: "/images/blog/ieee-award.webp",
    description: "Robin Francis at an IEEE awards gala.",
  },
  {
    title: "TechX Infinia",
    image: "/images/project-techx.webp",
    description: "Emerging technology event visual for TechX Infinia.",
  },
  {
    title: "Accessible Technology",
    image: "/images/blog/accessible-tech.webp",
    description: "Human-centered technology and accessibility visual.",
  },
  {
    title: "FoodLoop",
    image: "/images/project-foodloop.webp",
    description: "FoodLoop project visual.",
  },
  {
    title: "SoulSync",
    image: "/images/project-soulsync.webp",
    description: "SoulSync project visual.",
  },
  {
    title: "People-Centric AI",
    image: "/images/blog/people-centric-ai.webp",
    description: "People-centric artificial intelligence visual.",
  },
];

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Robin Francis Gallery",
  description: galleryDescription,
  url: "https://www.robinfrancis.in/gallery/",
  creator: {
    "@type": "Person",
    name: "Robin Francis",
    url: "https://www.robinfrancis.in/",
  },
  hasPart: galleryItems.map((item) => ({
    "@type": "ImageObject",
    name: item.title,
    description: item.description,
    url: `https://www.robinfrancis.in${item.image}`,
    author: {
      "@type": "Person",
      name: "Robin Francis",
    },
  })),
};

export const metadata: Metadata = {
  title: "Gallery | Robin Francis",
  description: galleryDescription,
  alternates: {
    canonical: "/gallery/",
    languages: {
      en: "/gallery/",
      "x-default": "/gallery/",
    },
  },
  openGraph: {
    title: "Gallery | Robin Francis",
    description: galleryDescription,
    url: "/gallery/",
    images: ["/images/blog/ieee-award.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Robin Francis",
    description: galleryDescription,
    images: ["/images/blog/ieee-award.webp"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <noscript>
        <section aria-labelledby="gallery-fallback-heading">
          <h2 id="gallery-fallback-heading">Robin Francis Gallery</h2>
          <p>{galleryDescription}</p>
          <ul>
            {galleryItems.map((item) => (
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img src={item.image} alt={item.description} />
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <GalleryRoute />
    </>
  );
}
