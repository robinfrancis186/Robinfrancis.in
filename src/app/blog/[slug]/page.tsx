import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRoute } from "@/app/_components/route-clients";
import { findStaticBlogPost, STATIC_BLOG_POSTS } from "@/data/blogPosts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findStaticBlogPost(slug);

  if (!post) {
    return {
      title: "Robin Francis Journal",
      description: "Read articles by Robin Francis.",
    };
  }

  const canonical = `/blog/${post.slug}/`;

  return {
    title: `${post.title} | Robin Francis Journal`,
    description: post.excerpt,
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
      url: canonical,
      images: [post.image],
      publishedTime: post.date,
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
  const canonicalUrl = post ? `https://www.robinfrancis.in/blog/${post.slug}/` : "";
  const imageUrl = post?.image
    ? `https://www.robinfrancis.in${post.image}`
    : "https://www.robinfrancis.in/images/card/robin-francis-primary.jpg";
  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Robin Francis",
          url: "https://www.robinfrancis.in/",
        },
        publisher: {
          "@type": "Organization",
          name: "Robin Francis",
          logo: {
            "@type": "ImageObject",
            url: "https://www.robinfrancis.in/images/favicon-r.png",
          },
        },
        datePublished: post.date,
        dateModified: post.date,
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
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
            <img src={post.image} alt={`Cover image for ${post.title}`} />
            {post.content.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </noscript>
      )}
      <BlogPostRoute post={post} slug={slug} />
    </>
  );
}
