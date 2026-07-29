import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { STATIC_BLOG_POSTS } from '@/data/blogPosts';
import { homeBreadcrumb } from '@/lib/breadcrumbs';

const BlogPage = () => {
    const renderPost = (post: (typeof STATIC_BLOG_POSTS)[number], index: number) => {
        const imageUrl = post.image;
        const title = post.title || 'Untitled Post';
        const excerpt = post.excerpt || '';
        const date = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
        const tag = post.tags.length > 0 ? post.tags[0] : post.category;
        const slug = post.slug;
        const imageAlt = post.imageAlt || `Cover image for ${title}`;

        return (
            <div key={post.id}>
                <Link href={`/blog/${slug}/`} className="group flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
                    <div className="w-full sm:w-[280px] shrink-0 overflow-hidden rounded-lg bg-white dark:bg-slate-900 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                        {imageUrl ? (
                            <div className="relative h-48 w-full sm:h-36">
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    priority={index === 0}
                                    sizes="(min-width: 640px) 280px, 100vw"
                                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                                />
                            </div>
                        ) : <div className="w-full h-48 sm:h-36 bg-neutral-100 dark:bg-neutral-800" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0 pr-4 relative">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="text-xs font-bold tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">{tag.toUpperCase()}</span>
                            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">{date}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary text-neutral-900 dark:text-neutral-100 transition-colors">
                            {title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm line-clamp-2">
                            {excerpt}
                        </p>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>
                <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-8 md:my-12"></div>
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto bg-background text-foreground">
            <Breadcrumbs
                items={[homeBreadcrumb, { name: 'Blog', path: '/blog/' }]}
                className="mb-8"
            />
            <motion.section
                id="blog-feed"
                className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left Column - Header Area */}
                <div className="flex flex-col h-full">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Latest from<br /> the Journal
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-sm mb-12">
                            Articles on AI systems, accessibility, leadership, and practical lessons from building real products.
                        </p>

                        <a
                            href="#blog-feed"
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:text-primary/80 transition-colors"
                        >
                            View All Stories
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Bottom aligned text on desktop */}
                    <div className="mt-24 lg:mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
                        <p className="text-neutral-500 text-xs tracking-widest uppercase font-mono">
                            Updated Daily
                        </p>
                    </div>
                </div>

                {/* Right Column - Article Feed */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {STATIC_BLOG_POSTS.map(renderPost)}
                </div>
            </motion.section>
        </main>
    );
};

export default BlogPage;
