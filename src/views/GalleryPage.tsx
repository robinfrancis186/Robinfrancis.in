import { useState } from 'react';
import { motion } from 'framer-motion';
import MasonryGallery, { MasonryItem } from '@/components/ui/MasonryGallery';
import PageSeo from '@/components/seo/PageSeo';

const fallbackGalleryItems: MasonryItem[] = [
    {
        id: 'gallery-ieee-award',
        img: '/images/blog/ieee-award.webp',
        height: 520,
        title: 'IEEE Awards Gala',
        alt: 'Robin Francis at an IEEE awards gala',
    },
    {
        id: 'gallery-watsonx',
        img: '/images/project-techx.webp',
        height: 460,
        title: 'TechX Infinia',
        alt: 'Emerging technology event visual for TechX Infinia',
    },
    {
        id: 'gallery-community-tech',
        img: '/images/blog/accessible-tech.webp',
        height: 500,
        title: 'Accessible Technology',
        alt: 'Human-centered technology illustration',
    },
    {
        id: 'gallery-foodloop',
        img: '/images/project-foodloop.webp',
        height: 360,
        title: 'FoodLoop',
        alt: 'FoodLoop project visual',
    },
    {
        id: 'gallery-soulsync',
        img: '/images/project-soulsync.webp',
        height: 430,
        title: 'SoulSync',
        alt: 'SoulSync project visual',
    },
    {
        id: 'gallery-scalable-systems',
        img: '/images/blog/scalable-systems.webp',
        height: 390,
        title: 'Scalable Systems',
        alt: 'Scalable software systems visual',
    },
    {
        id: 'gallery-people-centric-ai',
        img: '/images/blog/people-centric-ai.webp',
        height: 470,
        title: 'People-Centric AI',
        alt: 'People-centric artificial intelligence visual',
    },
    {
        id: 'gallery-cinque-terre',
        img: '/images/blog/cinque_terre.webp',
        height: 560,
        title: 'Cinque Terre',
        alt: 'Colorful coastal buildings in Cinque Terre',
    },
    {
        id: 'gallery-lake-district',
        img: '/images/blog/lake_district.webp',
        height: 420,
        title: 'Lake District',
        alt: 'Landscape from the Lake District',
    },
    {
        id: 'gallery-autumn-camping',
        img: '/images/blog/autumn_camping.webp',
        height: 340,
        title: 'Autumn Camping',
        alt: 'Autumn camping landscape',
    },
    {
        id: 'gallery-moment-one',
        img: '/images/blog/1720937571684.webp',
        height: 500,
        title: 'Visual Story',
        alt: 'A curated visual story from Robin Francis gallery',
    },
    {
        id: 'gallery-moment-two',
        img: '/images/blog/1720937573469.webp',
        height: 380,
        title: 'Creative Moment',
        alt: 'A creative moment from Robin Francis gallery',
    },
];

const GalleryPage = () => {
    const [items] = useState<MasonryItem[]>(fallbackGalleryItems);

    // Generate JSON-LD for Answer Engine Optimization
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Robin Francis Gallery",
        "description": "A curated collection of moments, landscapes, and visual stories by Robin Francis.",
        "url": "https://www.robinfrancis.in/gallery/",
        "creator": {
            "@type": "Person",
            "name": "Robin Francis",
            "url": "https://www.robinfrancis.in/"
        },
        "hasPart": items.map(item => ({
            "@type": "ImageObject",
            "url": item.img.startsWith('http') ? item.img : `https://www.robinfrancis.in${item.img}`,
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
            <PageSeo
                title="Gallery | Robin Francis"
                description="Explore a curated collection of moments, landscapes, and visual stories by Robin Francis."
                canonical="https://www.robinfrancis.in/gallery/"
                ogDescription="Explore a curated collection of moments, landscapes, and visual stories by AI Innovator Robin Francis."
                jsonLd={jsonLd}
            />

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
                    {items.length > 0 ? (
                        <MasonryGallery
                            key="local-gallery"
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
                            Gallery images are unavailable right now. Please refresh in a moment.
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
};

export default GalleryPage;
