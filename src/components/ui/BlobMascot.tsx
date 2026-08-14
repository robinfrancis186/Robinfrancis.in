"use client";

import { useEffect, useId, useRef, useState } from "react";

export type MascotMood = "idle" | "thinking" | "happy" | "sad";

interface BlobMascotProps {
    size?: number;
    mood?: MascotMood;
    /** Where the mascot should look when there is no pointer to follow. */
    focusTarget?: { x: number; y: number } | null;
    className?: string;
    label?: string;
}

const VIEW = 200;
const CENTER = VIEW / 2;
/** Four lobes, sampled densely enough that the Catmull-Rom fit stays smooth. */
const LOBES = 4;
const SAMPLES = 48;
const BASE_RADIUS = 74;

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

/** Closed Catmull-Rom through the sampled points, emitted as cubic beziers. */
const smoothClosedPath = (points: Array<[number, number]>): string => {
    const n = points.length;
    const at = (i: number) => points[((i % n) + n) % n];
    let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;

    for (let i = 0; i < n; i += 1) {
        const p0 = at(i - 1);
        const p1 = at(i);
        const p2 = at(i + 1);
        const p3 = at(i + 2);
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
    }

    return `${d} Z`;
};

interface BlobShape {
    /** Depth of the lobes: 0 is a circle, higher pinches the waists. */
    amplitude: number;
    /** Rotation of the lobe pattern, radians. */
    phase: number;
    /** >1 stretches horizontally, <1 squashes. */
    squash: number;
    /** A slow secondary wobble so the silhouette never repeats exactly. */
    wobble: number;
}

const blobPath = ({ amplitude, phase, squash, wobble }: BlobShape): string => {
    const points: Array<[number, number]> = [];

    for (let i = 0; i < SAMPLES; i += 1) {
        const theta = (i / SAMPLES) * Math.PI * 2;
        const lobe = Math.cos(LOBES * theta + phase);
        // Just enough asymmetry to keep the silhouette from reading as a decal.
        const drift = Math.sin(3 * theta + wobble) * 0.016;
        const r = BASE_RADIUS * (1 + amplitude * lobe + drift);
        points.push([
            CENTER + Math.cos(theta) * r * squash,
            CENTER + Math.sin(theta) * r * (2 - squash),
        ]);
    }

    return smoothClosedPath(points);
};

const BlobMascot = ({
    size = 132,
    mood = "idle",
    focusTarget = null,
    className = "",
    label = "A small mascot that follows your cursor",
}: BlobMascotProps) => {
    const uid = useId().replace(/:/g, "");
    const hostRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const eyesRef = useRef<SVGGElement | null>(null);
    const frameRef = useRef<number | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    // Everything the animation loop reads lives in refs so it never re-renders.
    const gaze = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    // Seed the first blink off the instance id so two mascots never blink in unison.
    const blink = useRef({
        open: 1,
        next: 1200 + ([...uid].reduce((a, c) => a + c.charCodeAt(0), 0) % 17) * 130,
    });
    const moodRef = useRef<MascotMood>(mood);
    const hoverRef = useRef(false);
    const focusRef = useRef<{ x: number; y: number } | null>(null);

    moodRef.current = mood;
    hoverRef.current = isHovered;
    focusRef.current = focusTarget;

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setReduceMotion(query.matches);
        sync();
        query.addEventListener("change", sync);
        return () => query.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const onPointerMove = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            // Normalise against a generous radius so the gaze eases off with distance.
            gaze.current.tx = clamp((event.clientX - cx) / (rect.width * 2.4), -1, 1);
            gaze.current.ty = clamp((event.clientY - cy) / (rect.height * 2.4), -1, 1);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", onPointerMove);
    }, []);

    useEffect(() => {
        const path = pathRef.current;
        const eyes = eyesRef.current;
        if (!path || !eyes) return;

        if (reduceMotion) {
            path.setAttribute(
                "d",
                blobPath({ amplitude: 0.19, phase: 0, squash: 1, wobble: 0 })
            );
            eyes.setAttribute("transform", "translate(0 0)");
            return;
        }

        const eyeShapes = Array.from(eyes.querySelectorAll("ellipse"));
        let start: number | null = null;

        const tick = (now: number) => {
            if (start === null) start = now;
            const t = (now - start) / 1000;
            const currentMood = moodRef.current;

            // --- silhouette -------------------------------------------------
            const excited = currentMood === "happy";
            const shrunk = currentMood === "sad";
            const amplitude =
                0.19 +
                Math.sin(t * 0.9) * 0.022 +
                (hoverRef.current ? 0.03 : 0) +
                (excited ? 0.05 : 0) -
                (shrunk ? 0.04 : 0);
            const squash =
                1 +
                Math.sin(t * 1.35) * 0.035 +
                (excited ? Math.sin(t * 7) * 0.05 : 0);

            path.setAttribute(
                "d",
                blobPath({
                    amplitude,
                    phase: t * (currentMood === "thinking" ? 0.55 : 0.22),
                    squash,
                    wobble: t * 1.7,
                })
            );

            // --- gaze -------------------------------------------------------
            const focus = focusRef.current;
            if (focus) {
                gaze.current.tx = clamp(focus.x, -1, 1);
                gaze.current.ty = clamp(focus.y, -1, 1);
            }
            gaze.current.x += (gaze.current.tx - gaze.current.x) * 0.09;
            gaze.current.y += (gaze.current.ty - gaze.current.y) * 0.09;

            const bobY = Math.sin(t * 1.6) * 1.6 + (excited ? Math.sin(t * 9) * 2.4 : 0);
            eyes.setAttribute(
                "transform",
                `translate(${(gaze.current.x * 13).toFixed(2)} ${(gaze.current.y * 10 + bobY).toFixed(2)})`
            );

            // --- blink ------------------------------------------------------
            const ms = t * 1000;
            if (ms > blink.current.next) {
                blink.current.open = Math.max(0, blink.current.open - 0.22);
                if (blink.current.open <= 0) {
                    // Irregular spacing reads as alive; regular blinking reads as a loop.
                    blink.current.next = ms + 1600 + Math.sin(t * 3.1) * 900 + 900;
                    blink.current.open = 0.001;
                }
            } else if (blink.current.open < 1) {
                blink.current.open = Math.min(1, blink.current.open + 0.16);
            }

            const squint = hoverRef.current ? 0.62 : currentMood === "thinking" ? 0.45 : 1;
            const openness = Math.max(0.05, blink.current.open * squint);
            for (const eye of eyeShapes) {
                eye.setAttribute("ry", (19 * openness).toFixed(2));
            }

            frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => {
            if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        };
    }, [reduceMotion]);

    return (
        <div
            ref={hostRef}
            className={`mascot-body relative select-none ${className}`}
            style={{ width: size, height: size }}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <svg
                viewBox={`0 0 ${VIEW} ${VIEW}`}
                width={size}
                height={size}
                // An empty label means a parent already names this control.
                {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
                className="overflow-visible"
            >
                <defs>
                    <radialGradient id={`${uid}-body`} cx="50%" cy="38%" r="72%">
                        <stop offset="0%" stopColor="var(--mascot-core)" />
                        <stop offset="55%" stopColor="var(--mascot-mid)" />
                        <stop offset="100%" stopColor="var(--mascot-edge)" />
                    </radialGradient>
                    <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/*
                     * The silhouette is defined once and drawn twice: the loop
                     * only ever rewrites this one `d`.
                     */}
                    <path
                        ref={pathRef}
                        id={`${uid}-shape`}
                        d={blobPath({ amplitude: 0.19, phase: 0, squash: 1, wobble: 0 })}
                    />
                </defs>

                {/* Rim light, revealed on hover. */}
                <use
                    href={`#${uid}-shape`}
                    fill="none"
                    stroke="#5cc8ff"
                    strokeWidth={7}
                    filter={`url(#${uid}-glow)`}
                    className="transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0.9 : 0 }}
                />

                <use href={`#${uid}-shape`} fill={`url(#${uid}-body)`} />

                <g ref={eyesRef}>
                    <ellipse cx={CENTER - 19} cy={CENTER + 4} rx={13} ry={19} fill="#ffffff" />
                    <ellipse cx={CENTER + 19} cy={CENTER + 4} rx={13} ry={19} fill="#ffffff" />
                </g>
            </svg>
        </div>
    );
};

export default BlobMascot;
