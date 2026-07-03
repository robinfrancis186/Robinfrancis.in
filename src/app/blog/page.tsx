import type { Metadata } from "next";
import { BlogRoute } from "../_components/route-clients";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { absoluteUrl, defaultSeoKeywords, siteUrl } from "@/lib/seo";

const blogDescription =
  "Insights on AI engineering, accessible technology, product building, and community leadership by Robin Francis.";

const blogJsonLd = {
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
    image: absoluteUrl(post.image),
  })),
};

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
    </>
  );
}
