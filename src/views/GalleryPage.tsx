"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import MasonryGallery from '@/components/ui/MasonryGallery';
import Lightbox from '@/components/ui/Lightbox';
import { GALLERY_ITEMS } from '@/data/galleryItems';
import { homeBreadcrumb } from '@/lib/breadcrumbs';
import { ensureRobinFrancisAlt } from '@/lib/imageSeo';

/*
 * Rendering all 51 tiles at once meant 51 concurrent image optimisations on a
 * cold cache, which is what made this page take ~15s and still show gaps.
 * A page at a time keeps the first paint cheap. Image discovery is unaffected:
 * the page's CollectionPage JSON-LD already lists every item as an ImageObject
 * with its contentUrl, and all 51 are in the sitemap.
 */
const PAGE_SIZE = 12;

const GalleryPage = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const visibleItems = useMemo(
        () => GALLERY_ITEMS.slice(0, visibleCount),
        [visibleCount]
    );

    const lightboxItems = useMemo(
        () =>
            GALLERY_ITEMS.map((item) => ({
                img: item.img,
                alt: ensureRobinFrancisAlt(item.alt || item.title || 'Gallery image', 'gallery'),
                title: item.title,
                date: item.date,
                imageWidth: item.imageWidth,
                imageHeight: item.imageHeight,
            })),
        []
    );

    const remaining = GALLERY_ITEMS.length - visibleCount;

    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs
                    items={[homeBreadcrumb, { name: 'Gallery', path: '/gallery/' }]}
                    className="mb-8"
                />
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Gallery
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        A curated collection of awards, speaking sessions, IEEE leadership, STRIDE work, and student mentorship moments.
                    </p>
                </motion.div>

                {GALLERY_ITEMS.length > 0 ? (
                    <>
                        <MasonryGallery
                            key="local-gallery"
                            items={visibleItems}
                            animateFrom="bottom"
                            blurToFocus={false}
                            stagger={0.08}
                            scaleOnHover={true}
                            hoverScale={0.96}
                            colorShiftOnHover={true}
                            onItemActivate={setLightboxIndex}
                        />

                        {remaining > 0 && (
                            <div className="mt-12 flex flex-col items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setVisibleCount((count) =>
                                            Math.min(count + PAGE_SIZE, GALLERY_ITEMS.length)
                                        )
                                    }
                                    className="liquid-glass liquid-glass-primary rounded-full px-6 py-3 text-sm font-semibold text-primary outline-none"
                                >
                                    Show more photos
                                </button>
                                <p className="text-xs text-muted-foreground">
                                    Showing {visibleCount} of {GALLERY_ITEMS.length}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-muted-foreground py-20 italic">
                        Gallery images are unavailable right now. Please refresh in a moment.
                    </div>
                )}
            </div>

            <Lightbox
                items={lightboxItems}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={setLightboxIndex}
            />
        </main>
    );
};

export default GalleryPage;
