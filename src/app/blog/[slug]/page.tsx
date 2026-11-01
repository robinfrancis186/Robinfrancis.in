import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRoute } from "@/app/_components/blog-post-route";
import { findStaticBlogPost, STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { findProofLinks } from "@/data/profileProof";
import { breadcrumbJsonLd, homeBreadcrumb } from "@/lib/breadcrumbs";
import { stripInlineMarkup } from "@/lib/inlineText";
import { ensureRobinFrancisAlt } from "@/lib/imageSeo";
import { blogPostingJsonLd } from "@/lib/contentSeo";
import { absoluteUrl, ogDefaults, seoDescription, serializeJsonLd, twitterDefaults } from "@/lib/seo";

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
  const description = seoDescription(post.metaDescription ?? post.excerpt);
  const metadataTitle = post.seoTitle ?? post.title;

  return {
    title: metadataTitle,
    description,
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
      ...ogDefaults,
      type: "article",
      title: post.title,
      description,
      url: absoluteUrl(canonical),
      images: [{ url: post.image, alt: post.imageAlt ?? post.title }],
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [absoluteUrl("/")],
      tags: post.tags,
    },
    twitter: {
      ...twitterDefaults,
      card: "summary_large_image",
      title: post.title,
      description,
      images: [{ url: post.image, alt: post.imageAlt ?? post.title }],
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

  const blogPostPath = post ? `/blog/${post.slug}/` : `/blog/${slug}/`;
  const blogPostBreadcrumbJsonLd = breadcrumbJsonLd([
    homeBreadcrumb,
    { name: "Blog", path: "/blog/" },
    { name: post?.title ?? "Journal Article", path: blogPostPath },
  ]);
  const articleSources = post?.proofTitles ? findProofLinks(post.proofTitles) : [];
  const articleJsonLd = [blogPostingJsonLd(post), blogPostBreadcrumbJsonLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
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
            <img
              src={post.image}
              alt={ensureRobinFrancisAlt(post.imageAlt || `Cover image for ${post.title}`, "article")}
            />
            {stripInlineMarkup(post.content)
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            {post.gallery?.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={ensureRobinFrancisAlt(image.alt, "article")}
              />
            ))}
            {articleSources.length > 0 && (
              <section aria-labelledby="noscript-article-sources-heading">
                <h2 id="noscript-article-sources-heading">Sources and further reading</h2>
                <ul>
                  {articleSources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href}>{source.title}</a>
                      <p>{source.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </noscript>
      )}
      <BlogPostRoute post={post} slug={slug} />
    </>
  );
}
