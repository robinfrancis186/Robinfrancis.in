"use client";

import { useCallback, useEffect, useRef } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ensureRobinFrancisAlt } from "@/lib/imageSeo";

export type LightboxItem = {
    img: string;
    alt: string;
    title?: string;
    date?: string;
    imageWidth?: number;
    imageHeight?: number;
};

interface LightboxProps {
    items: LightboxItem[];
    index: number | null;
    onClose: () => void;
    onNavigate: (nextIndex: number) => void;
}

/**
 * Full-size viewer for gallery images.
 *
 * Keyboard driven (arrows, Escape), focus is moved into the dialog and
 * restored on close, and body scroll is locked while it is open so the page
 * behind does not move under the overlay.
 */
export const Lightbox = ({ items, index, onClose, onNavigate }: LightboxProps) => {
    const isOpen = index !== null;
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const closeRef = useRef<HTMLButtonElement | null>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);

    const goPrev = useCallback(() => {
        if (index === null) return;
        onNavigate((index - 1 + items.length) % items.length);
    }, [index, items.length, onNavigate]);

    const goNext = useCallback(() => {
        if (index === null) return;
        onNavigate((index + 1) % items.length);
    }, [index, items.length, onNavigate]);

    useEffect(() => {
        if (!isOpen) return;

        const dialog = dialogRef.current;
        if (!dialog) return;
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        if (!dialog.open) dialog.showModal();
        closeRef.current?.focus();

        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = overflow;
            if (dialog.open) dialog.close();
            restoreFocusRef.current?.focus?.();
        };
    }, [isOpen]);

    const item = index === null ? null : items[index];

    return (
        <dialog
            ref={dialogRef}
            aria-label={item?.title ? `${item.title}, full size` : "Image, full size"}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[6000] m-0 h-full max-h-none w-full max-w-none border-0 bg-black/90 p-4 text-white backdrop:backdrop-blur-sm sm:p-8"
        >
            <motion.div
                key={item?.img ?? "closed"}
                className="flex h-full w-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: item ? 1 : 0 }}
                transition={{ duration: 0.18 }}
                onKeyDown={(event) => {
                    if (event.key === "ArrowLeft") goPrev();
                    else if (event.key === "ArrowRight") goNext();
                }}
            >
                {item && (
                    <>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close full size view"
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {items.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Previous image"
                                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:p-3"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next image"
                                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:p-3"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                        </>
                    )}

                    <figure
                        className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-3"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative w-full" style={{ maxHeight: "78vh" }}>
                            <NextImage
                                key={item.img}
                                src={item.img}
                                alt={ensureRobinFrancisAlt(item.alt, "gallery")}
                                width={item.imageWidth || 1600}
                                height={item.imageHeight || 1200}
                                sizes="(min-width: 1024px) 1024px, 100vw"
                                className="mx-auto h-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
                                priority
                            />
                        </div>
                        {(item.title || item.date) && (
                            <figcaption className="flex flex-wrap items-center justify-center gap-x-3 text-center text-sm text-white/80">
                                {item.title && <span className="font-medium">{item.title}</span>}
                                {item.date && <span className="text-white/55">{item.date}</span>}
                                <span className="text-white/40">
                                    {(index ?? 0) + 1} of {items.length}
                                </span>
                            </figcaption>
                        )}
                    </figure>
                    </>
                )}
            </motion.div>
        </dialog>
    );
};

export default Lightbox;
