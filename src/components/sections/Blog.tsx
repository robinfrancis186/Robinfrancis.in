"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel3D, CarouselItem } from "@/components/ui/carousel-3d";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ArticleActions from "@/components/blog/ArticleActions";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";

const INITIAL_STATIC_POSTS: CarouselItem[] = STATIC_BLOG_POSTS;

const Blog = () => {
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const posts = INITIAL_STATIC_POSTS;

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith("#/blog/")) {
            const slug = hash.replace("#/blog/", "");
            if (posts.find((p) => p.slug === slug)) {
                setSelectedSlug(slug);
            }
        }
    }, [posts]);

    useEffect(() => {
        if (selectedSlug) {
            window.location.hash = `#/blog/${selectedSlug}`;
        }
    }, [selectedSlug]);

    const selectedPost = selectedSlug
        ? posts.find((p) => p.slug === selectedSlug) ?? null
        : null;

    const handleSelect = (item: CarouselItem) => {
        if (item.slug) {
            setSelectedSlug(item.slug);
            const el = document.getElementById("blog");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleBack = () => {
        setSelectedSlug(null);
        window.location.hash = "#blog";
        const el = document.getElementById("blog");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="blog" className="py-32 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {!selectedPost && (
                    <>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Latest <span className="text-primary">Updates</span>
                            </h2>
                            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-6">
                                Thoughts, achievements, and insights from my journey in tech.
                            </p>
                            
                            <Link
                                href="/blog"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:text-primary/80 transition-colors"
                            >
                                View All Stories
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {posts.length > 0 && (
                             <Carousel3D items={posts} onSelect={handleSelect} />
                        )}
                    </>
                )}

                {selectedPost && (
                    <div className="relative max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden mt-12">
                        <div className="relative">
                            <img
                                src={selectedPost.image}
                                alt={selectedPost.title}
                                className="w-full h-[320px] md:h-[420px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/20 mb-3 backdrop-blur-md">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span>{selectedPost.category}</span>
                                </span>
                                <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                                    {selectedPost.title}
                                </h3>
                            </div>
                        </div>

                        <div className="p-6 md:p-10 space-y-6">
                            <ArticleActions
                                title={selectedPost.title}
                                text={selectedPost.content || selectedPost.excerpt || ""}
                                className="my-0"
                            />
                            <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                                {selectedPost.content || selectedPost.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-8">
                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 transition"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to overview
                                </button>
                                {/* Only link to Sanity posts if the ID doesn't indicate static fallback */}
                                {!String(selectedPost.id).startsWith("static-") && (
                                    <Link
                                        href={`/blog/${selectedPost.slug || selectedPost.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition shadow-md"
                                    >
                                        Read Full Article
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
