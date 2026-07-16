"use client";

import BlogPostPage from "@/views/BlogPostPage";
import type { StaticBlogPost } from "@/data/blogPosts";

export function BlogPostRoute({ post, slug }: { post?: StaticBlogPost | null; slug: string }) {
  return <BlogPostPage initialPost={post} slugOverride={slug} />;
}
