import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findStaticBlogPost, STATIC_BLOG_POSTS } from "@/data/blogPosts";
import { absoluteUrl } from "@/lib/seo";
import { stripInlineMarkup } from "@/lib/inlineText";

type MediumImportPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: MediumImportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findStaticBlogPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

function isLikelyHeading(text: string) {
  const value = text.trim();
  return value.length > 0 && value.length <= 90 && !/[.!?:]$/.test(value);
}

export default async function Page({ params }: MediumImportPageProps) {
  const { slug } = await params;
  const post = findStaticBlogPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((paragraph) => stripInlineMarkup(paragraph).trim())
    .filter(Boolean);

  return (
    <main>
      <article>
        <a href="/blog/">Back to Journal</a>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <p>
          Published on <time dateTime={post.date}>{post.date}</time>
        </p>
        <img
          src={absoluteUrl(post.image)}
          alt={post.imageAlt ?? `Cover image for ${post.title}`}
          width="1200"
          height="720"
        />
        {paragraphs.map((paragraph, index) =>
          isLikelyHeading(paragraph) ? (
            <h2 key={`heading-${index}`}>{paragraph}</h2>
          ) : (
            <p key={`paragraph-${index}`}>{paragraph}</p>
          ),
        )}
        {post.gallery?.map((image) => (
          <img
            key={image.src}
            src={absoluteUrl(image.src)}
            alt={image.alt}
            width="900"
            height="560"
            loading="lazy"
          />
        ))}
        <p>
          Originally published at <a href={absoluteUrl(`/blog/${post.slug}/`)}>{absoluteUrl(`/blog/${post.slug}/`)}</a>.
        </p>
      </article>
    </main>
  );
}
