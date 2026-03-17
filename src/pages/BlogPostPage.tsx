import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    alt={value.alt || 'Blog content image'}
                    loading="lazy"
                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                    className="rounded-lg my-8 w-full max-w-3xl mx-auto"
                />
            );
        }
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary hover:underline font-medium">
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

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        window.scrollTo(0, 0);

        const query = `*[_type == "blogPost" && (slug.current == $slug || _id == $slug)][0]`;
        client.fetch(query, { slug }).then((data) => {
            setPost(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [slug]);

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
                <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Journal
                </Link>
            </main>
        );
    }

    const imageUrl = post.image && post.image.asset ? urlFor(post.image).width(1200).url() : '';
    const mainImageAlt = post.image?.alt || `Cover image for ${post.title}`;
    const date = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
    const isoDate = post.date ? new Date(post.date).toISOString() : '';
    const tag = post.tags && post.tags.length > 0 ? post.tags[0] : '';
    const excerpt = post.excerpt || `Read the full article ${post.title} on Robin Francis's Journal.`;
    const resolvedSlug = post.slug?.current || slug || post._id;
    const canonicalUrl = `https://www.robinfrancis.in/blog/${resolvedSlug}`;

    // Schema.org JSON-LD for Answer Engines (AEO) and Generative Engines (GEO)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "headline": post.title,
        "description": excerpt,
        "image": imageUrl || "https://www.robinfrancis.in/images/og-image.png",
        "author": {
            "@type": "Person",
            "name": "Robin Francis",
            "url": "https://www.robinfrancis.in/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Robin Francis",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.robinfrancis.in/images/favicon.png"
            }
        },
        "datePublished": isoDate,
        "dateModified": isoDate
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto bg-background text-foreground">
            <Helmet>
                <title>{post.title} | Robin Francis Journal</title>
                <meta name="description" content={excerpt} />
                <link rel="canonical" href={canonicalUrl} />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:url" content={canonicalUrl} />
                {imageUrl && <meta property="og:image" content={imageUrl} />}
                <meta property="og:type" content="article" />
                
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={excerpt} />
                {imageUrl && <meta name="twitter:image" content={imageUrl} />}
                
                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-10">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-8">
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
                        <img src={imageUrl} alt={mainImageAlt} className="w-full h-auto max-h-[600px] object-cover" />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:font-geist prose-headings:font-geist">
                    {post.content ? (
                        <PortableText value={post.content} components={ptComponents} />
                    ) : (
                        <p className="text-neutral-500 italic">This post has no content yet.</p>
                    )}
                </div>
            </motion.article>
        </main>
    );
};

export default BlogPostPage;
