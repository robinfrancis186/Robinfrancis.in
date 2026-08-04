import NextImage from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ensureRobinFrancisAlt } from '@/lib/imageSeo';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface MasonryItem {
    id: string;
    img: string;
    url?: string;
    height: number;
    title?: string;
    alt?: string;
    description?: string;
    category?: string;
    date?: string;
    imageWidth?: number;
    imageHeight?: number;
}

export interface MasonryGalleryProps {
    items: MasonryItem[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
    className?: string;
    itemClassName?: string;
}

function getAspectRatio(item: MasonryItem) {
    if (item.imageWidth && item.imageHeight) {
        return `${item.imageWidth} / ${item.imageHeight}`;
    }

    return `400 / ${item.height || 400}`;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
    items,
    scaleOnHover = true,
    colorShiftOnHover = false,
    className,
    itemClassName
}) => {
    return (
        <div
            className={cn(
                'columns-1 gap-6 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5',
                className
            )}
        >
            {items.map((item, index) => {
                const content = (
                    <figure
                        className={cn(
                            'group mb-6 break-inside-avoid overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-2xl dark:border-neutral-800 dark:bg-slate-950',
                            item.url && 'focus-within:ring-2 focus-within:ring-primary',
                            itemClassName
                        )}
                    >
                        <div
                            className="relative w-full overflow-hidden bg-neutral-100 dark:bg-slate-900"
                            style={{ aspectRatio: getAspectRatio(item) }}
                        >
                            <NextImage
                                src={item.img}
                                alt={ensureRobinFrancisAlt(item.alt || item.title || 'Gallery image', 'portfolio')}
                                fill
                                sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className={cn(
                                    'object-cover transition duration-500',
                                    scaleOnHover && 'group-hover:scale-[0.98] group-focus-within:scale-[0.98]'
                                )}
                                priority={index < 2}
                            />
                            {colorShiftOnHover && (
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                            )}
                        </div>
                        {(item.title || item.date) && (
                            <figcaption className="flex items-start justify-between gap-4 p-4">
                                {item.title && (
                                    <span className="min-w-0 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-neutral-900 dark:text-white">
                                        {item.title}
                                    </span>
                                )}
                                {item.date && (
                                    <time className="shrink-0 text-xs font-semibold leading-5 text-primary">
                                        {item.date}
                                    </time>
                                )}
                            </figcaption>
                        )}
                    </figure>
                );

                if (item.url) {
                    return (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl outline-none"
                            aria-label={item.title ? `${item.title}: ${item.description || item.alt || 'Open gallery item'}` : item.alt}
                        >
                            {content}
                        </a>
                    );
                }

                return <div key={item.id}>{content}</div>;
            })}
        </div>
    );
};

export default MasonryGallery;
