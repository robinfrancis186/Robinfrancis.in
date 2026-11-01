import type { Metadata } from "next";
import { BlogRoute } from "../_components/blog-route";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { blogPostingJsonLd } from "@/lib/contentSeo";
import { absoluteUrl, defaultSeoKeywords, ogDefaults, siteUrl, twitterDefaults } from "@/lib/seo";

const blogDescription =
  "Read Robin Francis's notes on AI engineering, accessible technology, product building, and community leadership from Kerala and beyond.";

const blogJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog/#blog"),
    isPartOf: { "@id": `${siteUrl}/#website` },
    inLanguage: "en",
    name: "Robin Francis Journal",
    description: blogDescription,
    url: absoluteUrl("/blog/"),
    author: {
      "@type": "Person",
      name: "Robin Francis",
      url: `${siteUrl}/`,
    },
    blogPost: STATIC_BLOG_POSTS.map(blogPostingJsonLd),
  },
  breadcrumbJsonLd([homeBreadcrumb, { name: "Blog", path: "/blog/" }]),
];

export const metadata: Metadata = {
  title: "Robin Francis Blog | AI, Leadership & Building",
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
    ...ogDefaults,
    title: "Robin Francis Blog | AI, Leadership & Building",
    description: blogDescription,
    url: absoluteUrl("/blog/"),
    images: ["/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp"],
  },
  twitter: {
    ...twitterDefaults,
    card: "summary_large_image",
    title: "Robin Francis Blog | AI, Leadership & Building",
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
    </>
  );
}
