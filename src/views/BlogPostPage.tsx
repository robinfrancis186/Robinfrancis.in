import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ArticleActions from '@/components/blog/ArticleActions';
import { findStaticBlogPost, type StaticBlogPost } from '@/data/blogPosts';
import { absoluteUrl } from '@/lib/seo';

function getSafePortableTextHref(href: unknown) {
    const value = typeof href === "string" ? href.trim() : "";

    if (!value) {
        return null;
    }

    if (value.startsWith("/") && !value.startsWith("//")) {
        return value;
    }

    try {
        const url = new URL(value);
        return ["https:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
    } catch {
        return null;
    }
}

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <Image
                    alt={value.alt || 'Blog content image'}
                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                    width={800}
                    height={520}
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="rounded-lg my-8 w-full max-w-3xl mx-auto"
                />
            );
        }
    },
    marks: {
        link: ({ children, value }: any) => {
            const href = getSafePortableTextHref(value?.href);
            if (!href) {
                return <span>{children}</span>;
            }

            const isInternal = href.startsWith('/');
            const rel = !isInternal ? 'noreferrer noopener' : undefined;
            const target = !isInternal ? '_blank' : undefined;
            return (
                <a href={href} rel={rel} target={target} className="text-primary hover:underline font-medium">
                    {children}
                </a>
            );
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6 font-geist">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-5 font-geist">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 font-geist">{children}</h3>,
        normal: ({ children }: any) => <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 text-lg">{children}</p>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-xl text-neutral-600 dark:text-neutral-400">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 text-neutral-700 dark:text-neutral-300 text-lg space-y-2">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 text-neutral-700 dark:text-neutral-300 text-lg space-y-2">{children}</ol>,
    },
};

function portableTextToPlainText(value: unknown): string {
    if (!value) {
        return "";
    }

    if (typeof value === "string") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(portableTextToPlainText).filter(Boolean).join("\n\n");
    }

    if (typeof value === "object") {
        const node = value as { text?: unknown; children?: unknown; [key: string]: unknown };

        if (typeof node.text === "string") {
            return node.text;
        }

        if (node.children) {
            return portableTextToPlainText(node.children);
        }
    }

    return "";
}

const staticSectionHeadings = new Set([
    "The Responsibility of Continuing a Legacy",
    "Building Leaders, Not Just Events",
    "Growth That Was Built Step by Step",
    "TechX Infinia, ALTAIR 2.0, and the Spirit of Thinking Big",
    "The Strength of Societies and Volunteers",
    "The Challenges No One Sees",
    "A Journey That Changed Me",
    "Gratitude to the People Who Made It Possible",
    "More Than a Tenure",
    "The Legacy Continues",
]);

const BlogPostPage = ({ initialPost, slugOverride }: { initialPost?: StaticBlogPost | null; slugOverride?: string }) => {
    const params = useParams<{ slug?: string }>();
    const slug = slugOverride ?? params?.slug;
    const [post, setPost] = useState<any>(initialPost ?? null);
    const [loading, setLoading] = useState(!initialPost);

    useEffect(() => {
        if (!slug) return;

        window.scrollTo(0, 0);

        if (initialPost && initialPost.slug === slug) {
            setPost(initialPost);
            setLoading(false);
            return;
        }

        const localPost = findStaticBlogPost(slug);
        if (localPost) {
            setPost(localPost);
            setLoading(false);
            return;
        }

        setPost(null);
        setLoading(false);
    }, [initialPost, slug]);

    if (loading) {
        return (
            <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto bg-background text-foreground flex justify-center items-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto bg-background text-foreground text-center">
                <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Journal
                </Link>
            </main>
        );
    }

    const imageUrl = typeof post.image === 'string' ? post.image : post.image && post.image.asset ? urlFor(post.image).width(1200).url() : '';
    const mainImageAlt = post.imageAlt || post.image?.alt || `Cover image for ${post.title}`;
    const date = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
    const tag = post.tags && post.tags.length > 0 ? post.tags[0] : '';
    const excerpt = post.excerpt || `Read the full article ${post.title} on Robin Francis's Journal.`;
    const resolvedSlug = post.slug?.current || slug || post._id;
    const canonicalUrl = absoluteUrl(`/blog/${resolvedSlug}/`);
    const articleText = portableTextToPlainText(post.content) || excerpt;
    const relatedLinks = Array.isArray(post.internalLinks) ? post.internalLinks : [];
    const staticParagraphs = typeof post.content === 'string'
        ? post.content.split(/\n{2,}/).map((paragraph: string) => paragraph.trim()).filter(Boolean)
        : [];

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto bg-background text-foreground">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-10">
                <Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Journal
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        {tag && <span className="text-xs font-bold tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">{tag.toUpperCase()}</span>}
                        {date && <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">{date}</span>}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] font-geist">
                        {post.title}
                    </h1>
                </div>

                {imageUrl && (
                    <div className="w-full rounded-2xl overflow-hidden mb-12 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-800">
                        <Image
                            src={imageUrl}
                            alt={mainImageAlt}
                            width={1200}
                            height={720}
                            priority
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="w-full h-auto max-h-[600px] object-cover"
                        />
                    </div>
                )}

                <ArticleActions title={post.title} text={articleText} articleSlug={resolvedSlug} shareUrl={canonicalUrl} />

                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:font-geist prose-headings:font-geist">
                    {Array.isArray(post.content) ? (
                        <PortableText value={post.content} components={ptComponents} />
                    ) : staticParagraphs.length > 0 ? (
                        staticParagraphs.map((paragraph: string) => (
                            staticSectionHeadings.has(paragraph) ? (
                                <h2 key={paragraph} className="text-3xl font-bold mt-10 mb-5 font-geist text-neutral-950 dark:text-neutral-50">
                                    {paragraph}
                                </h2>
                            ) : (
                                <p key={paragraph} className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 text-lg whitespace-pre-line">
                                    {paragraph}
                                </p>
                            )
                        ))
                    ) : (
                        <p className="text-neutral-500 italic">This post has no content yet.</p>
                    )}
                </div>

                {Array.isArray(post.gallery) && post.gallery.length > 0 && (
                    <section aria-label={`${post.title} photo gallery`} className="mt-14">
                        <h2 className="text-3xl font-bold mb-6 font-geist">Moments from the journey</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {post.gallery.map((image: { src: string; alt: string }, index: number) => (
                                <figure
                                    key={image.src}
                                    className={index === 2 ? "sm:col-span-2 overflow-hidden rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 bg-neutral-100 dark:bg-neutral-900" : "overflow-hidden rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 bg-neutral-100 dark:bg-neutral-900"}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={900}
                                        height={560}
                                        sizes="(min-width: 768px) 384px, 100vw"
                                        className="h-full max-h-[520px] w-full object-cover"
                                    />
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {relatedLinks.length > 0 && (
                    <section aria-label="Related evidence and next steps" className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-slate-950 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Related evidence</p>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                            Continue with source-backed context
                        </h2>
                        <div className="mt-5 grid gap-3">
                            {relatedLinks.map((related: { href: string; label: string; description: string }) => (
                                <Link
                                    key={related.href}
                                    href={related.href}
                                    className="group rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-primary hover:bg-primary/5 dark:border-neutral-800 dark:bg-slate-900"
                                >
                                    <span className="flex items-center justify-between gap-3 text-base font-semibold text-neutral-950 dark:text-white">
                                        {related.label}
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                    </span>
                                    <span className="mt-2 block text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                                        {related.description}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </motion.article>
        </main>
    );
};

export default BlogPostPage;
