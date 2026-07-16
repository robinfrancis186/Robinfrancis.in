import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRoute } from "@/app/_components/blog-post-route";
import { findStaticBlogPost, STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, defaultSeoImage, siteUrl } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findStaticBlogPost(slug);

  if (!post) {
    notFound();
  }

  const canonical = `/blog/${post.slug}/`;

  return {
    title: `${post.title} | Robin Francis Journal`,
    description: post.excerpt,
    keywords: [
      "Robin Francis",
      post.title,
      post.category,
      ...post.tags,
      "AI engineering",
      "accessible technology",
      "community leadership",
    ],
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(canonical),
      images: [post.image],
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: ["Robin Francis"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function Page({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = findStaticBlogPost(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = post ? absoluteUrl(`/blog/${post.slug}/`) : "";
  const blogPostPath = post ? `/blog/${post.slug}/` : `/blog/${slug}/`;
  const blogPostBreadcrumbJsonLd = breadcrumbJsonLd([
    homeBreadcrumb,
    { name: "Blog", path: "/blog/" },
    { name: post?.title ?? "Journal Article", path: blogPostPath },
  ]);
  const articleImages = post?.image
    ? [post.image, ...(post.gallery?.map((image) => image.src) ?? [])].map((image) => absoluteUrl(image))
    : [absoluteUrl(defaultSeoImage)];
  const articleJsonLd = post
    ? [
        {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        headline: post.title,
        description: post.excerpt,
        image: articleImages,
        author: {
          "@type": "Person",
          name: "Robin Francis",
          url: `${siteUrl}/`,
        },
        publisher: {
          "@type": "Organization",
          name: "Robin Francis",
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/images/favicon-r.png"),
          },
        },
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        keywords: post.tags.join(", "),
        articleSection: post.category,
        },
        blogPostBreadcrumbJsonLd,
      ]
    : [blogPostBreadcrumbJsonLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post && (
        <noscript>
          <article>
            <a href="/blog/">Back to Journal</a>
            <h2>Article overview</h2>
            <p>
              <strong>{post.title}</strong>
            </p>
            <p>{post.excerpt}</p>
            <p>
              Published on{" "}
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </p>
            <img src={post.image} alt={post.imageAlt || `Cover image for ${post.title}`} />
            {post.content.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {post.internalLinks && post.internalLinks.length > 0 ? (
              <section aria-label="Related evidence">
                <h2>Related evidence</h2>
                <ul>
                  {post.internalLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>: {link.description}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {post.gallery?.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </article>
        </noscript>
      )}
      <BlogPostRoute post={post} slug={slug} />
    </>
  );
}
