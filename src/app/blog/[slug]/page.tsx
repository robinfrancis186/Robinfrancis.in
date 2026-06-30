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

  return <BlogPostRoute post={findStaticBlogPost(slug)} slug={slug} />;
}
