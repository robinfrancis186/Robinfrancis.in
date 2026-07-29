import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import MasonryGallery from '@/components/ui/MasonryGallery';
import { GALLERY_ITEMS } from '@/data/galleryItems';
import { homeBreadcrumb } from '@/lib/breadcrumbs';

const GalleryPage = () => {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs
                    items={[homeBreadcrumb, { name: 'Gallery', path: '/gallery/' }]}
                    className="mb-8"
                />
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
                        A curated collection of awards, speaking sessions, IEEE leadership, STRIDE work, and student mentorship moments.
                    </p>
                </motion.div>

                {/* Masonry Gallery */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {GALLERY_ITEMS.length > 0 ? (
                        <MasonryGallery
                            key="local-gallery"
                            items={GALLERY_ITEMS}
                            animateFrom="bottom"
                            blurToFocus={false}
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
