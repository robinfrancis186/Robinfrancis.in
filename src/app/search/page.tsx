import type { Metadata } from "next";
import { SearchPage } from "@/components/search/SearchPage";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords } from "@/lib/seo";

const searchDescription =
  "Search Robin Francis's projects, articles, achievements, public proof, press resources, and gallery stories.";

export const metadata: Metadata = {
  title: "Search | Robin Francis",
  description: searchDescription,
  keywords: [...defaultSeoKeywords, "Robin Francis search", "portfolio search"],
  alternates: {
    canonical: "/search/",
    languages: {
      en: "/search/",
      "x-default": "/search/",
    },
  },
  openGraph: {
    title: "Search | Robin Francis",
    description: searchDescription,
    url: absoluteUrl("/search/"),
  },
  twitter: {
    card: "summary",
    title: "Search | Robin Francis",
    description: searchDescription,
  },
  robots: {
    index: false,
    follow: true,
  },
};

const searchJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Search Robin Francis's website",
    description: searchDescription,
    url: absoluteUrl("/search/"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Search", path: "/search/" }]),
];

type SearchRouteProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const params = await searchParams;
  const initialQuery = Array.isArray(params.q) ? (params.q[0] ?? "") : (params.q ?? "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchJsonLd) }}
      />
      <SearchPage initialQuery={initialQuery.slice(0, 200)} />
    </>
  );
}
