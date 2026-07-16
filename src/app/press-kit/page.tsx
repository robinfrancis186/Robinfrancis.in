import type { Metadata } from "next";
import Image from "next/image";
import { Download, ExternalLink, Mail } from "lucide-react";
import { TrackPageEvent, TrackedLink } from "@/components/analytics/AnalyticsEvents";
import { awards, mediaKit, proofLinks } from "@/data/profileProof";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, personJsonLd, siteUrl } from "@/lib/seo";

const pressKitDescription =
  "Official media kit for Robin Francis with headshot, bios, achievements, contact details, and verified links for press and speaking use.";

const pressKitJsonLd = [
  personJsonLd,
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/press-kit/#page`,
    name: "Press Kit | Robin Francis",
    url: absoluteUrl("/press-kit/"),
    description: pressKitDescription,
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "MediaObject",
    name: "Robin Francis press headshot",
    contentUrl: absoluteUrl(mediaKit.headshot),
    creator: {
      "@id": `${siteUrl}/#person`,
    },
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Press Kit", path: "/press-kit/" }]),
];

export const metadata: Metadata = {
  title: "Press Kit | Robin Francis",
  description: pressKitDescription,
  keywords: [
    ...defaultSeoKeywords,
    "Robin Francis press kit",
    "Robin Francis media kit",
    "Robin Francis bio",
    "Robin Francis headshot",
    "Robin Francis achievements",
  ],
  alternates: {
    canonical: "/press-kit/",
    languages: {
      en: "/press-kit/",
      "x-default": "/press-kit/",
    },
  },
  openGraph: {
    title: "Press Kit | Robin Francis",
    description: pressKitDescription,
    url: absoluteUrl("/press-kit/"),
    images: [mediaKit.headshot],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit | Robin Francis",
    description: pressKitDescription,
    images: [mediaKit.headshot],
  },
};

export default function PressKitPage() {
  const featuredProof = proofLinks.filter((proof) =>
    ["press", "project", "product", "publication"].includes(proof.category),
  );

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-32 text-foreground md:px-8">
      <TrackPageEvent
        eventName="press_kit_view"
        eventParams={{
          page_path: "/press-kit/",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressKitJsonLd) }}
      />

      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Media Kit
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-slate-950">
            <Image
              src={mediaKit.headshot}
              alt={mediaKit.headshotAlt}
              width={760}
              height={950}
              priority
              sizes="(min-width: 1024px) 380px, 100vw"
              className="aspect-[4/5] w-full rounded-lg object-cover object-center"
            />
            <TrackedLink
              href={mediaKit.headshot}
              download
              eventName="press_kit_download"
              eventParams={{
                asset_type: "headshot",
                file_name: mediaKit.headshot.split("/").at(-1),
                file_extension: "webp",
                link_text: "Download headshot",
              }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download headshot
            </TrackedLink>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-6xl">
              Robin Francis press kit
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Official bio, achievements, proof links, and contact details for press, event
              organizers, collaborators, and public-interest technology partners.
            </p>

            <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">80-word bio</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600 dark:text-neutral-300">
                {mediaKit.shortBio}
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">Long bio</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600 dark:text-neutral-300">
                {mediaKit.longBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Achievements
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Highlights to cite
          </h2>
          <ul className="mt-6 space-y-4">
            {awards.map((award) => (
              <li key={award.title} className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <p className="font-semibold text-neutral-950 dark:text-white">
                  {award.title} · {award.year}
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {award.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Official links
          </h2>
          <TrackedLink
            href={`mailto:${mediaKit.contactEmail}`}
            eventName="press_kit_contact_click"
            eventParams={{
              contact_method: "email",
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {mediaKit.contactEmail}
          </TrackedLink>
          <div className="mt-6 grid gap-3">
            {mediaKit.links.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                eventName="press_kit_outbound_click"
                eventParams={{
                  link_label: link.label,
                  link_area: "official_links",
                }}
                className="inline-flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200"
              >
                {link.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto mt-12 max-w-6xl" aria-labelledby="proof-links-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Verification
        </p>
        <h2
          id="proof-links-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
        >
          Proof and product links
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredProof.map((proof) => (
            <TrackedLink
              key={proof.href}
              href={proof.href}
              target="_blank"
              rel="noopener noreferrer"
              eventName="press_kit_proof_click"
              eventParams={{
                proof_title: proof.title,
                proof_category: proof.category,
                link_label: proof.label,
              }}
              className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-primary dark:border-neutral-800 dark:bg-slate-950"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {proof.label}
              </span>
              <h3 className="mt-3 text-lg font-bold text-neutral-950 dark:text-white">
                {proof.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {proof.description}
              </p>
            </TrackedLink>
          ))}
        </div>
      </section>
    </main>
  );
}
