import type { Metadata } from "next";
import { GalleryRoute } from "../_components/gallery-route";
import { GALLERY_ITEMS } from "@/data/galleryItems";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, siteUrl } from "@/lib/seo";

const galleryDescription =
  "Explore Robin Francis's gallery of AI community events, IEEE leadership, STRIDE inclusive innovation work, speaking sessions, awards, and student mentorship moments.";

const galleryJsonLd = [
  {
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
      description: item.description,
      caption: item.alt,
      contentUrl: absoluteUrl(item.img),
      url: absoluteUrl(item.img),
      dateCreated: item.date,
      keywords: [item.category, "Robin Francis", "AI community", "IEEE", "inclusive innovation"],
      width: item.imageWidth,
      height: item.imageHeight,
      author: {
        "@type": "Person",
        name: "Robin Francis",
      },
    })),
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Gallery", path: "/gallery/" }]),
];

export const metadata: Metadata = {
  title: "Gallery | Robin Francis",
  description: galleryDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis gallery",
    "AI community events",
    "technology leadership photos",
    "IEEE award gallery",
    "Robin Francis speaking photos",
    "STRIDE inclusive innovation photos",
    "student mentorship gallery",
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
    images: ["/images/gallery/gallery-ieee-kerala-public-awards-2025.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Robin Francis",
    description: galleryDescription,
    images: ["/images/gallery/gallery-ieee-kerala-public-awards-2025.webp"],
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
              <li key={item.id}>
                <figure>
                  <img
                    src={item.img}
                    alt={item.alt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                  />
                  <figcaption>
                    {item.title} - {item.date}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <GalleryRoute />
    </>
  );
}
