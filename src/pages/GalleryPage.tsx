import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MasonryGallery, { MasonryItem } from '@/components/ui/MasonryGallery';
import { client, urlFor } from '../lib/sanity';
import { Helmet } from 'react-helmet-async';

const GalleryPage = () => {
    const [items, setItems] = useState<MasonryItem[]>([]);
    const [key, setKey] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await client.fetch(`*[_type == "galleryItem"] | order(_createdAt desc)`);
                const formattedItems: MasonryItem[] = data.map((item: any) => ({
                    id: item._id,
                    img: item.image && item.image.asset ? urlFor(item.image).url() : '',
                    height: item.height || 400,
                    title: item.title || '',
                    alt: item.alt || `Robin Francis - ${item.title || 'Gallery Image'}`,
                })).filter((item: MasonryItem) => item.img !== '');
                
                setItems(formattedItems);
                setKey(prev => prev + 1);
            } catch (error) {
                console.error("Failed to fetch gallery items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Generate JSON-LD for Answer Engine Optimization
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Robin Francis Gallery",
        "description": "A curated collection of moments, landscapes, and visual stories by Robin Francis.",
        "url": "https://www.robinfrancis.in/gallery",
        "creator": {
            "@type": "Person",
            "name": "Robin Francis",
            "url": "https://www.robinfrancis.in/"
        },
        "hasPart": items.map(item => ({
            "@type": "ImageObject",
            "url": item.img,
            "name": item.title || "Robin Francis Gallery Image",
            "description": item.alt || `Image from the Robin Francis gallery`,
            "author": {
                "@type": "Person",
                "name": "Robin Francis"
            }
        }))
    };

    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Gallery | Robin Francis</title>
                <meta name="description" content="Explore a curated collection of moments, landscapes, and visual stories by Robin Francis." />
                <link rel="canonical" href="https://www.robinfrancis.in/gallery" />
                <meta property="og:title" content="Gallery | Robin Francis" />
                <meta property="og:description" content="Explore a curated collection of moments, landscapes, and visual stories by AI Innovator Robin Francis." />
                <meta property="og:url" content="https://www.robinfrancis.in/gallery" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Gallery
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        A curated collection of moments, landscapes, and visual stories
                    </p>
                </motion.div>

                {/* Masonry Gallery */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center p-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : items.length > 0 ? (
                        <MasonryGallery
                            key={key}
                            items={items}
                            animateFrom="bottom"
                            blurToFocus={true}
                            stagger={0.08}
                            scaleOnHover={true}
                            hoverScale={0.96}
                            colorShiftOnHover={true}
                        />
                    ) : (
                        <div className="text-center text-muted-foreground py-20 italic">
                            No gallery items found. Add some in the Sanity CMS!
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
};

export default GalleryPage;
