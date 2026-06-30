"use client";

import Home from "@/views/Home";
import ProjectsPage from "@/views/ProjectsPage";
import BlogPage from "@/views/BlogPage";
import BlogPostPage from "@/views/BlogPostPage";
import GalleryPage from "@/views/GalleryPage";
import CardPage from "@/views/CardPage";
import type { StaticBlogPost } from "@/data/blogPosts";

export function HomeRoute() {
  return <Home />;
}

export function ProjectsRoute() {
  return <ProjectsPage />;
}

export function BlogRoute() {
  return <BlogPage />;
}

export function BlogPostRoute({ post, slug }: { post?: StaticBlogPost | null; slug: string }) {
  return <BlogPostPage initialPost={post} slugOverride={slug} />;
}

export function GalleryRoute() {
  return <GalleryPage />;
}

export function CardRoute() {
  return <CardPage />;
}
