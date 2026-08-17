"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { buildGridEdges, buildPiecePath } from "@/lib/puzzlePath";
import { trackEvent } from "@/lib/analytics";

type ProofPiece = {
    /** What the source establishes, in my words. These are citations, not quotes. */
    body: string;
    outlet: string;
    meta: string;
    href: string;
};

/**
 * Two clearly-separated tints of the site's own primary, picked by grid parity
 * so neighbouring pieces always contrast; the three steps inside each group add
 * variety without muddying the checkerboard. Alpha over the section background
 * means one set covers both themes, with no theme read and no hydration flash.
 */
const TONES = [
    { face: "bg-[hsl(var(--primary)/0.06)]", edge: "bg-[hsl(var(--primary)/0.30)]" },
    { face: "bg-[hsl(var(--primary)/0.09)]", edge: "bg-[hsl(var(--primary)/0.33)]" },
    { face: "bg-[hsl(var(--primary)/0.075)]", edge: "bg-[hsl(var(--primary)/0.31)]" },
    { face: "bg-[hsl(var(--primary)/0.21)]", edge: "bg-[hsl(var(--primary)/0.46)]" },
    { face: "bg-[hsl(var(--primary)/0.25)]", edge: "bg-[hsl(var(--primary)/0.50)]" },
    { face: "bg-[hsl(var(--primary)/0.23)]", edge: "bg-[hsl(var(--primary)/0.48)]" },
] as const;

/** Light group for even cells, dark group for odd: a guaranteed checkerboard. */
const toneFor = (col: number, row: number, index: number) =>
    TONES[((col + row) % 2) * 3 + (index % 3)];

const PIECES: ProofPiece[] = [
    {
        body: "IEEE Region 10 lists Robin Francis, Kerala Section, among the 2024 Outstanding Volunteer Award recipients.",
        outlet: "IEEE Region 10",
        meta: "Award · 2024",
        href: "https://www.ieeer10.org/past-recipients-of-ieee-region-10-awards/",
    },
    {
        body: "The Week reports Team Bits & Bytes taking second prize at the IBM watsonx GenAI Challenge with SoulSync, built for the silver economy.",
        outlet: "The Week",
        meta: "Press · 2024",
        href: "https://www.theweek.in/education/latest/2024/07/13/amal-jyothi-college-aces-hackathon-at-genai-conclave.html",
    },
    {
        body: "The IEEE Kerala Section Region 10 report lists Robin Francis, K-DISC, under the Outstanding Humanitarian Volunteer Award.",
        outlet: "IEEE Kerala Section",
        meta: "Award · 2025",
        href: "https://www.ieeer10.org/wp-content/uploads/2026/02/2026-IEEE-Kerala-Section-Region-10-Report-Nandan-S.pdf",
    },
    {
        body: "The Hindu BusinessLine covers Codex Nightline, the after-hours AI build sprint held inside a moving Kochi Metro.",
        outlet: "The Hindu BusinessLine",
        meta: "Press · 2025",
        href: "https://www.thehindubusinessline.com/info-tech/kochi-to-host-codex-nightline-ai-build-sprint-in-moving-metro-system-on-july-18/article71192353.ece",
    },
    {
        body: "K-DISC names Robin Francis as Junior Programme Executive in its Social Enterprises and Inclusion division.",
        outlet: "K-DISC Kerala",
        meta: "Role · Current",
        href: "https://kdisc.kerala.gov.in/en/social-enterprises-and-inclusion/",
    },
    {
        body: "IEEE IES ITeN names Robin Francis a session contributor at the Kochi FDP on innovation ecosystems and assistive technology.",
        outlet: "IEEE IES ITeN",
        meta: "Speaking · 2026",
        href: "https://iten.ieee-ies.org/featured-news/2026/hubs-nodes-initiative-faculty-development-programme-on-activity-based-pedagogy-in-kochi-india/",
    },
];

/**
 * Where each piece waits before it snaps home, in pixels.
 *
 * Pixels rather than percentages on purpose: a percentage transform has to be
 * resolved against the element's measured size, and at mount that measurement
 * is not available yet, so the animation starts from NaN% and snaps instead of
 * springing. Pixel offsets need no measurement.
 */
const SCATTER = [
    { x: -95, y: 118, rotate: -8 },
    { x: 55, y: -76, rotate: 6 },
    { x: 116, y: 104, rotate: 10 },
    { x: -116, y: -62, rotate: 5 },
    { x: 31, y: 132, rotate: -11 },
    { x: 129, y: -69, rotate: 7 },
];

/**
 * cols, how wide each cell is relative to its height, and how far the scatter
 * is allowed to throw a piece sideways, since wide cells fly off a narrow screen.
 */
const LAYOUTS = {
    lg: { cols: 3, cellAspect: 1.28, spread: 1 },
    md: { cols: 2, cellAspect: 1.16, spread: 0.65 },
    sm: { cols: 1, cellAspect: 1.75, spread: 0.3 },
} as const;

type LayoutKey = keyof typeof LAYOUTS;

const useLayout = (): LayoutKey => {
    const [key, setKey] = useState<LayoutKey>("lg");

    useEffect(() => {
        const large = window.matchMedia("(min-width: 1024px)");
        const medium = window.matchMedia("(min-width: 640px)");
        const sync = () => setKey(large.matches ? "lg" : medium.matches ? "md" : "sm");

        sync();
        large.addEventListener("change", sync);
        medium.addEventListener("change", sync);
        return () => {
            large.removeEventListener("change", sync);
            medium.removeEventListener("change", sync);
        };
    }, []);

    return key;
};

const ProofPuzzle = () => {
    const layoutKey = useLayout();
    const reduceMotion = useReducedMotion();
    const clipId = useId().replace(/:/g, "");
    const boardRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(boardRef, { once: true, amount: 0.35 });

    const geometry = useMemo(() => {
        const { cols, cellAspect, spread } = LAYOUTS[layoutKey];
        const rows = Math.ceil(PIECES.length / cols);
        const boardAspect = (cols / rows) * cellAspect;

        // Work in a board that is 1 wide; height falls out of the aspect ratio.
        const boardW = 1;
        const boardH = 1 / boardAspect;
        const cellW = boardW / cols;
        const cellH = boardH / rows;
        const tab = 0.115 * Math.min(cellW, cellH);

        const boxW = cellW + tab * 2;
        const boxH = cellH + tab * 2;
        // Knob depth as a fraction of the piece box, per axis.
        const mx = tab / boxW;
        const my = tab / boxH;

        const edges = buildGridEdges(cols, rows);

        const pieces = PIECES.map((piece, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            return {
                ...piece,
                tone: toneFor(col, row, index),
                clip: buildPiecePath({ x0: mx, y0: my, x1: 1 - mx, y1: 1 - my }, mx, my, edges[index]),
                // Same outline again, this time in 0..100 board space for the slot ghosts.
                slot: buildPiecePath(
                    {
                        x0: (col * cellW * 100) / boardW,
                        y0: (row * cellH * 100) / boardH,
                        x1: ((col + 1) * cellW * 100) / boardW,
                        y1: ((row + 1) * cellH * 100) / boardH,
                    },
                    (tab * 100) / boardW,
                    (tab * 100) / boardH,
                    edges[index]
                ),
                style: {
                    left: `${((col * cellW - tab) * 100) / boardW}%`,
                    top: `${((row * cellH - tab) * 100) / boardH}%`,
                    width: `${(boxW * 100) / boardW}%`,
                    height: `${(boxH * 100) / boardH}%`,
                },
            };
        });

        return { boardAspect, mx, my, pieces, spread };
    }, [layoutKey]);

    return (
        <section id="proof" className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-20 max-w-2xl text-center md:mb-24">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        Proof
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
                        What the record shows.
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Six independent sources, each one a link you can open. No piece here is my
                        own claim about myself.
                    </p>
                </div>

                <div
                    ref={boardRef}
                    className="relative mx-auto w-full max-w-5xl"
                    style={{ aspectRatio: `${geometry.boardAspect}` }}
                >
                    {/*
                     * Slot outlines: strong while the pieces are loose, then settling
                     * to a hairline. On a single-hue palette the seam line is what
                     * keeps the jigsaw readable once everything is in place.
                     */}
                    <motion.svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible text-primary"
                        initial={{ opacity: reduceMotion ? 0.3 : 1 }}
                        animate={{ opacity: inView ? 0.3 : reduceMotion ? 0.3 : 1 }}
                        transition={{ duration: 0.6, delay: inView ? 1.1 : 0 }}
                    >
                        {geometry.pieces.map((piece) => (
                            <path
                                key={`slot-${piece.href}`}
                                d={piece.slot}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1}
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                    </motion.svg>

                    <svg aria-hidden="true" className="absolute h-0 w-0">
                        <defs>
                            {geometry.pieces.map((piece, index) => (
                                <clipPath
                                    key={`clip-${piece.href}`}
                                    id={`${clipId}-${layoutKey}-${index}`}
                                    clipPathUnits="objectBoundingBox"
                                >
                                    <path d={piece.clip} />
                                </clipPath>
                            ))}
                        </defs>
                    </svg>

                    {geometry.pieces.map((piece, index) => {
                        const tone = piece.tone;
                        const base = SCATTER[index % SCATTER.length];
                        const scatter = {
                            x: base.x * geometry.spread,
                            y: base.y * geometry.spread,
                            rotate: base.rotate * geometry.spread,
                        };
                        const clip = `url(#${clipId}-${layoutKey}-${index})`;

                        return (
                            <motion.div
                                key={piece.href}
                                className="absolute"
                                style={piece.style}
                                initial={
                                    reduceMotion
                                        ? { opacity: 0 }
                                        : {
                                              x: scatter.x,
                                              y: scatter.y,
                                              rotate: scatter.rotate,
                                              scale: 0.94,
                                          }
                                }
                                animate={
                                    reduceMotion
                                        ? { opacity: inView ? 1 : 0 }
                                        : inView
                                          ? { x: 0, y: 0, rotate: 0, scale: 1 }
                                          : {
                                                x: scatter.x,
                                                y: scatter.y,
                                                rotate: scatter.rotate,
                                                scale: 0.94,
                                            }
                                }
                                transition={
                                    reduceMotion
                                        ? { duration: 0.4, delay: index * 0.06 }
                                        : {
                                              type: "spring",
                                              stiffness: 120,
                                              damping: 16,
                                              mass: 0.9,
                                              delay: 0.08 * index,
                                          }
                                }
                            >
                                {/*
                                 * `filter` has to live on a wrapper: applied to the same element
                                 * as `clip-path`, the drop shadow gets clipped away with it.
                                 */}
                                <motion.div
                                    className="absolute inset-0"
                                    initial={
                                        reduceMotion
                                            ? undefined
                                            : { filter: "drop-shadow(0 14px 16px rgba(15,23,42,0.22))" }
                                    }
                                    animate={{
                                        filter: inView
                                            ? "drop-shadow(0 0px 0px rgba(15,23,42,0))"
                                            : "drop-shadow(0 14px 16px rgba(15,23,42,0.22))",
                                    }}
                                    transition={{ duration: 0.5, delay: 0.08 * index + 0.35 }}
                                >
                                    {/* Slab edge: reads as piece thickness while it floats. */}
                                    <motion.div
                                        aria-hidden="true"
                                        className={`absolute inset-0 ${tone.edge}`}
                                        style={{ clipPath: clip, WebkitClipPath: clip }}
                                        initial={reduceMotion ? { opacity: 0 } : { opacity: 1, y: 7 }}
                                        animate={
                                            inView || reduceMotion
                                                ? { opacity: 0, y: 0 }
                                                : { opacity: 1, y: 7 }
                                        }
                                        transition={{ duration: 0.5, delay: 0.08 * index + 0.35 }}
                                    />

                                    <a
                                        href={piece.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            trackEvent("proof_source_open", {
                                                outlet: piece.outlet,
                                            })
                                        }
                                        className={`group absolute inset-0 block focus:outline-none ${tone.face}`}
                                        style={{ clipPath: clip, WebkitClipPath: clip }}
                                    >
                                        <div
                                            className="absolute flex flex-col justify-between"
                                            style={{
                                                left: `${(geometry.mx + 0.062) * 100}%`,
                                                right: `${(geometry.mx + 0.062) * 100}%`,
                                                top: `${(geometry.my + 0.075) * 100}%`,
                                                bottom: `${(geometry.my + 0.075) * 100}%`,
                                            }}
                                        >
                                            <p className="text-[0.78rem] leading-snug text-foreground sm:text-sm sm:leading-relaxed">
                                                {piece.body}
                                            </p>

                                            <div className="flex items-end justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="truncate text-[0.78rem] font-semibold text-foreground">
                                                        {piece.outlet}
                                                    </p>
                                                    <p className="mt-0.5 truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                                                        {piece.meta}
                                                    </p>
                                                </div>
                                                <ArrowUpRight
                                                    aria-hidden="true"
                                                    className="h-4 w-4 shrink-0 text-foreground opacity-50 transition-all group-hover:opacity-100 group-focus-visible:opacity-100"
                                                />
                                            </div>
                                        </div>
                                        <span className="sr-only">
                                            {`Open the source: ${piece.outlet}`}
                                        </span>
                                    </a>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProofPuzzle;
