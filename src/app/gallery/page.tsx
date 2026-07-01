import type { Metadata } from "next";
import { GalleryRoute } from "../_components/route-clients";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { absoluteUrl, defaultSeoKeywords, siteUrl } from "@/lib/seo";

const galleryDescription =
  "Explore a curated collection of moments, landscapes, and visual stories by Robin Francis.";

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Robin Francis Gallery",
  description: galleryDescription,
  url: absoluteUrl("/gallery/"),
  creator: {
    "@type": "Person",
    name: "Robin Francis",
    url: `${siteUrl}/`,
  },
  hasPart: GALLERY_ITEMS.map((item) => ({
    "@type": "ImageObject",
    name: item.title,
    description: item.alt,
    url: absoluteUrl(item.img),
    author: {
      "@type": "Person",
      name: "Robin Francis",
    },
  })),
};

export const metadata: Metadata = {
  title: "Gallery | Robin Francis",
  description: galleryDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis gallery",
    "AI community events",
    "technology leadership photos",
    "IEEE award gallery",
    "portfolio images",
  ],
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
    url: absoluteUrl("/gallery/"),
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
            {GALLERY_ITEMS.map((item) => (
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.alt}</p>
                <img src={item.img} alt={item.alt} />
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <GalleryRoute />
    </>
  );
}
