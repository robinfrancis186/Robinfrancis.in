import type { Metadata } from "next";
import { BlogRoute } from "../_components/blog-route";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoKeywords, siteUrl } from "@/lib/seo";

const blogDescription =
  "Insights on AI engineering, accessible technology, product building, and community leadership by Robin Francis.";

const blogJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Robin Francis Journal",
    description: blogDescription,
    url: absoluteUrl("/blog/"),
    author: {
      "@type": "Person",
      name: "Robin Francis",
      url: `${siteUrl}/`,
    },
    blogPost: STATIC_BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}/`),
      datePublished: post.date,
      dateModified: post.updatedAt ?? post.date,
      image: absoluteUrl(post.image),
    })),
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Blog", path: "/blog/" }]),
];

export const metadata: Metadata = {
  title: "Blog | Robin Francis",
  description: blogDescription,
  keywords: [
    ...defaultSeoKeywords,
    "AI blog",
    "accessible technology blog",
    "community leadership stories",
    "software engineering articles",
    "people-centric AI writing",
  ],
  alternates: {
    canonical: "/blog/",
    languages: {
      en: "/blog/",
      "x-default": "/blog/",
    },
  },
  openGraph: {
    title: "Blog | Robin Francis",
    description: blogDescription,
    url: absoluteUrl("/blog/"),
    images: ["/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Robin Francis",
    description: blogDescription,
    images: ["/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <noscript>
        <section aria-labelledby="blog-fallback-heading">
          <h2 id="blog-fallback-heading">Robin Francis Journal</h2>
          <p>{blogDescription}</p>
          <ul>
            {STATIC_BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <a href={`/blog/${post.slug}/`}>Read {post.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <BlogRoute />
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8" aria-labelledby="journal-seo-heading">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Journal index
          </p>
          <h2 id="journal-seo-heading" className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Writing on AI products, accessibility, and community leadership
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {STATIC_BLOG_POSTS.slice(0, 4).map((post) => (
              <li key={post.slug} className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
                <a href={`/blog/${post.slug}/`} className="text-lg font-bold text-neutral-950 hover:text-primary dark:text-white">
                  {post.title}
                </a>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {post.excerpt}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
