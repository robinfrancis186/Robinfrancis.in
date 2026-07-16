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
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <figure>
                  <img
                    src={item.img}
                    alt={item.alt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                  />
                  <figcaption>
                    {item.category} - {item.date}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <GalleryRoute />
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8" aria-labelledby="gallery-seo-heading">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Visual proof
          </p>
          <h2 id="gallery-seo-heading" className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Public moments across IEEE, STRIDE, awards, and mentoring
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {GALLERY_ITEMS.slice(0, 6).map((item) => (
              <li key={item.id} className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.category} · {item.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
