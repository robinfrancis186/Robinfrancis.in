import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { STATIC_BLOG_POSTS } from '@/data/blogPosts';
import { homeBreadcrumb } from '@/lib/breadcrumbs';
import { ensureRobinFrancisAlt } from '@/lib/imageSeo';

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
            <div key={post.id} className="h-full">
                <Link href={`/blog/${slug}/`} className="group flex h-full flex-col gap-5">
                    <div className="w-full shrink-0 overflow-hidden rounded-xl bg-white dark:bg-slate-900 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                        {imageUrl ? (
                            <div className="relative aspect-[16/10] w-full">
                                <Image
                                    src={imageUrl}
                                    alt={ensureRobinFrancisAlt(imageAlt, 'article')}
                                    fill
                                    priority={index < 3}
                                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                                />
                            </div>
                        ) : <div className="aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-800" />}
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="text-xs font-bold tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">{tag.toUpperCase()}</span>
                            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">{date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary text-neutral-900 dark:text-neutral-100 transition-colors">
                            {title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm line-clamp-2">
                            {excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Read
                            <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto bg-background text-foreground">
            <Breadcrumbs
                items={[homeBreadcrumb, { name: 'Blog', path: '/blog/' }]}
                className="mb-8"
            />
            {/*
              * Previously a 1fr/2fr split with a mostly-empty left rail, which
              * left roughly half the viewport unused on desktop. The intro now
              * runs full width above a real grid, so the posts get the space.
              */}
            <motion.header
                className="mt-10 max-w-3xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
                    Latest from the Journal
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Articles on AI systems, accessibility, leadership, and practical lessons from building real products.
                </p>
                <p className="mt-6 text-xs tracking-widest uppercase font-mono text-muted-foreground">
                    {STATIC_BLOG_POSTS.length} stories
                </p>
            </motion.header>

            <motion.section
                id="blog-feed"
                aria-label="All articles"
                className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
            >
                {STATIC_BLOG_POSTS.map(renderPost)}
            </motion.section>
        </main>
    );
};

export default BlogPage;
