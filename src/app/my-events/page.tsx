import type { Metadata } from "next";
import { MyEventsRoute } from "@/app/_components/my-events-route";
import { MY_EVENTS } from "@/data/myEvents";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, ogDefaults, siteUrl, twitterDefaults } from "@/lib/seo";

const description =
  "Explore events Robin Francis organises and helps bring to life, from technical workshops and builder meetups to community programmes and flagship gatherings.";

export const metadata: Metadata = {
  title: "My Events Directory | Robin Francis",
  description,
  keywords: [...defaultSeoKeywords, "Robin Francis events", "technical workshops", "builder meetups", "community events", "IEEE Sahrdaya Student Branch events", "TechX Infinia 2024"],
  alternates: { canonical: "/my-events/", languages: { en: "/my-events/", "x-default": "/my-events/" } },
  openGraph: {
    ...ogDefaults,
    title: "My Events Directory | Robin Francis",
    description,
    url: absoluteUrl("/my-events/"),
    images: ["/images/events/2024/techx-infinia-inauguration-original.webp"],
  },
  twitter: { ...twitterDefaults, card: "summary_large_image", title: "My Events Directory | Robin Francis", description, images: ["/images/events/2024/techx-infinia-inauguration-original.webp"] },
};

const eventsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "My Events Directory | Robin Francis",
    description,
    url: absoluteUrl("/my-events/"),
    isPartOf: { "@type": "WebSite", name: "Robin Francis", url: `${siteUrl}/` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: MY_EVENTS.length,
      itemListElement: MY_EVENTS.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: event.title,
          description: event.story?.summary,
          url: absoluteUrl(`/my-events/${event.id}/`),
          ...(event.image ? { image: absoluteUrl(event.image.src) } : {}),
        },
      })),
    },
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "My Events Directory", path: "/my-events/" }]),
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />
      <noscript>
        <section aria-labelledby="events-fallback-heading">
          <h1 id="events-fallback-heading">My Events Directory</h1>
          <p>{description}</p>
          <ul>{MY_EVENTS.map((event) => <li key={event.id}>{event.date ? <time dateTime={event.date}>{event.dateLabel ?? event.date}</time> : event.dateLabel ?? event.year} · {event.title} · {event.unit}</li>)}</ul>
        </section>
      </noscript>
      <MyEventsRoute />
    </>
  );
}

export const dynamic = "force-static";
