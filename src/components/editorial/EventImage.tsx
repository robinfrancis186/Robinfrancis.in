"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { EVENT_IMAGE_SIZES } from "@/data/eventImageSizes";
import type { MyEvent } from "@/data/myEvents";

export function EventImage({ image, title, priority = false, compact = false }: {
  image: NonNullable<MyEvent["image"]>;
  title: string;
  priority?: boolean;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [width, height] = EVENT_IMAGE_SIZES[image.src] ?? [800, 600];
  return (
    <figure className="bg-muted/40">
      <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge image: ${title}`}
        className={`relative block w-full p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${compact ? "h-56" : ""}`}>
        <Image src={image.src} alt={image.alt} width={width} height={height} priority={priority}
          sizes={compact ? "(max-width: 640px) 100vw, 340px" : `(max-width: 768px) 100vw, ${Math.min(width, 1024)}px`}
          className={`mx-auto h-auto w-auto max-w-full object-contain ${compact ? "max-h-48" : "max-h-[65vh]"}`} />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-2 text-xs font-medium shadow-sm">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" /> Enlarge
        </span>
      </button>
      <figcaption className="px-4 pb-3 text-center text-xs leading-5 text-muted-foreground">
        {image.alt}
        <a href={image.src} target="_blank" rel="noopener noreferrer" className="mx-auto flex min-h-11 w-fit items-center text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open original image <span className="sr-only">in a new tab</span></a>
      </figcaption>
      {open && <Lightbox items={[{ img: image.src, alt: image.alt, title, imageWidth: width, imageHeight: height }]}
        index={0} onClose={() => setOpen(false)} onNavigate={() => {}} />}
    </figure>
  );
}
