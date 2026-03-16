/**
 * MasonryGallery - High-performance Masonry layout component.
 * Uses CSS transitions + IntersectionObserver instead of GSAP to eliminate
 * the massive 164KB GSAP dependency from the critical rendering path.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Hook to handle media queries for responsive columns */
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
    const get = () => {
        if (typeof window === 'undefined') return defaultValue;
        const match = queries.findIndex(q => window.matchMedia(q).matches);
        return values[match] !== undefined ? values[match] : defaultValue;
    };

    const [value, setValue] = useState<number>(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    }, []);

    return value;
};

/** Hook to measure element size via ResizeObserver */
const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};

/** Utility to ensure images are loaded before layout */
const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            src =>
                new Promise<void>(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

export interface MasonryItem {
    id: string;
    img: string;
    url?: string;
    height: number;
    title?: string;
    alt?: string;
}

interface GridItem extends MasonryItem {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface MasonryGalleryProps {
    items: MasonryItem[];
    stagger?: number;
    scaleOnHover?: boolean;
    hoverScale?: number;
    className?: string;
    itemClassName?: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
    items,
    stagger = 0.05,
    scaleOnHover = true,
    hoverScale = 0.95,
    className,
    itemClassName
}) => {
    const columns = useMedia(
        ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)', '(min-width: 400px)'],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);
    const hasMounted = useRef(false);

    useEffect(() => {
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    const { grid, containerHeight } = useMemo(() => {
        if (!width) return { grid: [] as GridItem[], containerHeight: 0 };

        const colHeights = new Array(columns).fill(0);
        const gap = 24;
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        const gridItems = items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const height = (child.height / 400) * columnWidth;
            const y = colHeights[col];
            colHeights[col] += height + gap;
            return { ...child, x, y, w: columnWidth, h: height };
        });

        return { grid: gridItems, containerHeight: Math.max(...colHeights) };
    }, [columns, items, width]);

    // Apply positions directly via DOM style for smooth CSS transitions instead of GSAP
    useLayoutEffect(() => {
        if (!imagesReady || !grid.length) return;

        grid.forEach((item, index) => {
            const element = document.querySelector<HTMLElement>(`[data-key="${item.id}"]`);
            if (!element) return;

            // On first mount, animate in with CSS via stagger
            if (!hasMounted.current) {
                element.style.opacity = '0';
                element.style.transform = `translate(${item.x}px, ${item.y + 30}px)`;
                element.style.width = `${item.w}px`;
                element.style.height = `${item.h}px`;
                element.style.filter = 'blur(8px)';

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        element.style.transition = `opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease`;
                        element.style.opacity = '1';
                        element.style.transform = `translate(${item.x}px, ${item.y}px)`;
                        element.style.filter = 'blur(0px)';
                    }, index * (stagger * 1000));
                });
            } else {
                // On re-layout (resize), just update position smoothly
                element.style.transition = `transform 0.4s ease, width 0.4s ease, height 0.4s ease`;
                element.style.transform = `translate(${item.x}px, ${item.y}px)`;
                element.style.width = `${item.w}px`;
                element.style.height = `${item.h}px`;
            }
        });

        if (grid.length > 0) hasMounted.current = true;
    }, [grid, imagesReady, stagger]);

    return (
        <div
            ref={containerRef}
            className={cn('relative w-full', className)}
            style={{ height: containerHeight, minHeight: '400px' }}
        >
            {grid.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className={cn(
                        'absolute overflow-hidden cursor-pointer rounded-xl',
                        itemClassName
                    )}
                    style={{
                        willChange: 'transform, opacity',
                        opacity: 0, // starts invisible, animates in via useLayoutEffect
                        transform: `translate(${item.x}px, ${item.y}px)`,
                        width: item.w,
                        height: item.h,
                        transition: `transform ${scaleOnHover ? '0.3s ease' : 'none'}`
                    }}
                    onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
                    onMouseEnter={e => {
                        if (scaleOnHover) e.currentTarget.style.transform = `translate(${item.x}px, ${item.y}px) scale(${hoverScale})`;
                    }}
                    onMouseLeave={e => {
                        if (scaleOnHover) e.currentTarget.style.transform = `translate(${item.x}px, ${item.y}px) scale(1)`;
                    }}
                >
                    <div className="w-full h-full relative">
                        <img
                            src={item.img}
                            alt={item.alt || item.title || 'Gallery image'}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs font-medium uppercase tracking-wider">{item.title}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
