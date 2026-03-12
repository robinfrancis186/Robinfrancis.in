import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import MasonryGallery, { MasonryItem } from '@/components/ui/MasonryGallery';

const GALLERY_ITEMS: MasonryItem[] = [
    {
        id: '1',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
        height: 400,
        title: 'Mountain Lake'
    },
    {
        id: '2',
        img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=600',
        height: 250,
        title: 'Alpine Meadow'
    },
    {
        id: '3',
        img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600',
        height: 600,
        title: 'Forest Trail'
    },
    {
        id: '4',
        img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600',
        height: 350,
        title: 'Coastal Cliffs'
    },
    {
        id: '5',
        img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
        height: 500,
        title: 'Desert Dunes'
    },
    {
        id: '6',
        img: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=600',
        height: 300,
        title: 'Northern Lights'
    },
    {
        id: '7',
        img: 'https://images.unsplash.com/photo-1426604966848-d7adac402bdb?auto=format&fit=crop&q=80&w=600',
        height: 450,
        title: 'Rocky Falls'
    },
    {
        id: '8',
        img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600',
        height: 280,
        title: 'Green Hills'
    },
    {
        id: '9',
        img: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&q=80&w=600',
        height: 550,
        title: 'Sunrise Peak'
    },
    {
        id: '10',
        img: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=600',
        height: 320,
        title: 'Sunset Valley'
    },
    {
        id: '11',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
        height: 380,
        title: 'Tropical Beach'
    },
    {
        id: '12',
        img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600',
        height: 460,
        title: 'Starry Mountains'
    },
];

const GalleryPage = () => {
    const [items, setItems] = useState(GALLERY_ITEMS);
    const [key, setKey] = useState(0);

    const handleShuffle = () => {
        const shuffled = [...GALLERY_ITEMS].sort(() => Math.random() - 0.5);
        setItems(shuffled);
        setKey(prev => prev + 1);
    };

    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
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
                </motion.div>

                {/* Shuffle / Re-animate Button */}
                <button
                    onClick={handleShuffle}
                    className="fixed bottom-10 right-10 z-50 p-4 bg-foreground text-background rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
                    title="Shuffle Gallery"
                >
                    <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>
        </main>
    );
};

export default GalleryPage;
