"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Jetpack: the 404 page's endless flyer.
 *
 * One input, hold to climb and release to fall, which is the whole control
 * surface. Everything else is pacing.
 *
 * Three design rules the rest of this file follows:
 *
 *  1. Hazards arrive as authored patterns, never as loose random boxes. A
 *     pattern places its obstacles and then threads a line of collectibles
 *     along the route through them, so the greedy line and the safe line are
 *     the same line and the player learns to read the level by chasing loot.
 *  2. Every third pattern is a breather with no hazard at all. Constant
 *     pressure reads as noise; pressure with rests reads as rhythm.
 *  3. The hitbox is a circle noticeably smaller than the sprite, and touching
 *     the floor or ceiling costs speed rather than the run. Deaths should feel
 *     earned, so the ambiguous cases resolve in the player's favour.
 *
 * The loop is a single rAF. State it mutates every frame lives in a ref, and
 * the HUD is painted onto the canvas, so a 60fps game causes no React renders
 * at all between phase changes.
 */

type Phase = "ready" | "running" | "paused" | "over";

const WIDTH = 760;
const HEIGHT = 280;
const CEIL = 14;
const FLOOR = HEIGHT - 26;
const PLAYER_X = 138;

const SPRITE_H = 76;
const SPRITE_W = Math.round((SPRITE_H * 215) / 256);
/** Deliberately about a third of the sprite: the art may clip, the body may not. */
const HIT_R = 16;

const GRAVITY = 1750;
const THRUST = -3450;
const VY_UP_MAX = -545;
const VY_DOWN_MAX = 650;

const START_SPEED = 250;
const MAX_SPEED = 520;
const SPEED_GAIN = 0.0125; // px/s of speed per px travelled

const OVERDRIVE_MS = 4200;
const COMBO_DECAY_MS = 3000;
/* Leaves a ~14px band between clipping the lip and taking the safe line. */
const NEAR_MISS_PX = 30;

const GOLD = "hsl(42 96% 55%)";
const DANGER = "hsl(0 84% 60%)";

type Gate = {
    kind: "gate";
    x: number;
    w: number;
    gapY: number;
    gapH: number;
    passed: boolean;
};
type Drone = {
    kind: "drone";
    x: number;
    y: number;
    baseY: number;
    r: number;
    amp: number;
    freq: number;
    phase: number;
};
type Beam = { kind: "beam"; x: number; y: number; w: number; h: number };
type Obstacle = Gate | Drone | Beam;

type Bit = { x: number; y: number; taken: boolean; spin: number };
type Pickup = { x: number; y: number; taken: boolean };
type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    r: number;
    hue: "flame" | "gold" | "debris" | "accent";
};
type Popup = { x: number; y: number; text: string; life: number; color: string };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------------------------------------------ *
 * Pattern library
 *
 * Each builder receives the spawn x and a 0..1 difficulty, and returns the
 * pieces plus how far to travel before the next pattern. `bits` is the taught
 * line: place them where you want the player to fly.
 * ------------------------------------------------------------------ */

type Spawn = {
    obstacles: Obstacle[];
    bits: Bit[];
    pickups: Pickup[];
    length: number;
};

const bitsAlong = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    count: number
): Bit[] =>
    Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        return {
            x: lerp(x0, x1, t),
            y: lerp(y0, y1, t),
            taken: false,
            spin: Math.random() * Math.PI,
        };
    });

const gate = (x: number, d: number, gapY?: number): Gate => {
    const gapH = lerp(120, 86, d);
    return {
        kind: "gate",
        x,
        w: 26,
        gapY: gapY ?? rand(CEIL + 24, FLOOR - gapH - 24),
        gapH,
        passed: false,
    };
};

const PATTERNS: Array<{
    id: string;
    tier: number;
    build: (x: number, d: number) => Spawn;
}> = [
    {
        id: "single-gate",
        tier: 0,
        build: (x, d) => {
            const g = gate(x, d);
            const mid = g.gapY + g.gapH / 2;
            return {
                obstacles: [g],
                // Bits start well before the gate so the gap is legible early.
                bits: bitsAlong(x - 130, mid, x + 70, mid, 5),
                pickups: [],
                length: 330,
            };
        },
    },
    {
        id: "offset-pair",
        tier: 0,
        build: (x, d) => {
            const first = gate(x, d);
            const firstMid = first.gapY + first.gapH / 2;
            // Second gap pushed to the far side of the band, so the pair reads
            // as one S-curve rather than two unrelated walls.
            const high = firstMid > HEIGHT / 2;
            const secondGapH = lerp(126, 94, d);
            const secondY = high
                ? rand(CEIL + 20, CEIL + 60)
                : rand(FLOOR - secondGapH - 60, FLOOR - secondGapH - 20);
            const second: Gate = { ...gate(x + 230, d, secondY), gapH: secondGapH };
            const secondMid = second.gapY + second.gapH / 2;
            return {
                obstacles: [first, second],
                bits: [
                    ...bitsAlong(x - 110, firstMid, x + 40, firstMid, 4),
                    ...bitsAlong(x + 90, lerp(firstMid, secondMid, 0.4), x + 270, secondMid, 5),
                ],
                pickups: [],
                length: 560,
            };
        },
    },
    {
        id: "drone-column",
        tier: 1,
        build: (x, d) => {
            const count = d > 0.6 ? 3 : 2;
            const amp = lerp(24, 46, d);
            const obstacles: Obstacle[] = [];
            for (let i = 0; i < count; i += 1) {
                const baseY = rand(CEIL + 50, FLOOR - 50);
                obstacles.push({
                    kind: "drone",
                    x: x + i * 150,
                    y: baseY,
                    baseY,
                    r: 15,
                    amp,
                    freq: rand(1.1, 1.9),
                    phase: Math.random() * Math.PI * 2,
                });
            }
            // Loot hugs the band the drones sweep out of, not the band they
            // sweep into, so the reward line is survivable at full speed.
            const lane = obstacles[0].kind === "drone" ? obstacles[0].baseY : HEIGHT / 2;
            const safe = lane > HEIGHT / 2 ? CEIL + 52 : FLOOR - 52;
            return {
                obstacles,
                bits: bitsAlong(x - 60, safe, x + (count - 1) * 150 + 60, safe, count * 2 + 2),
                pickups: [],
                length: 240 + count * 150,
            };
        },
    },
    {
        id: "beam-weave",
        tier: 2,
        build: (x, d) => {
            const len = lerp(140, 210, d);
            const highY = CEIL + rand(58, 84);
            const lowY = FLOOR - rand(58, 84);
            return {
                obstacles: [
                    { kind: "beam", x, y: highY, w: len, h: 9 },
                    { kind: "beam", x: x + len + 120, y: lowY, w: len, h: 9 },
                ],
                bits: [
                    ...bitsAlong(x + 20, highY + 46, x + len - 10, highY + 46, 3),
                    ...bitsAlong(x + len + 140, lowY - 46, x + len * 2 + 100, lowY - 46, 3),
                ],
                pickups: [],
                length: len * 2 + 380,
            };
        },
    },
    {
        id: "corridor",
        tier: 2,
        build: (x, d) => {
            const gapH = lerp(112, 88, d);
            const gapY = rand(CEIL + 30, FLOOR - gapH - 30);
            const mid = gapY + gapH / 2;
            // One wide gate is a tunnel: the same collision shape, but it
            // demands held precision instead of a single timed dodge.
            return {
                obstacles: [{ kind: "gate", x, w: 210, gapY, gapH, passed: false }],
                bits: bitsAlong(x + 20, mid, x + 190, mid, 5),
                pickups: [],
                length: 520,
            };
        },
    },
];

/** The no-hazard breather, and the only place the overdrive ring appears. */
const breather = (x: number, score: number): Spawn => {
    const amp = rand(46, 70);
    const centre = rand(CEIL + 90, FLOOR - 90);
    const bits: Bit[] = Array.from({ length: 9 }, (_, i) => ({
        x: x + i * 46,
        y: centre + Math.sin((i / 8) * Math.PI * 2) * amp,
        taken: false,
        spin: Math.random() * Math.PI,
    }));
    const pickups: Pickup[] =
        score > 350 && Math.random() < 0.45
            ? [{ x: x + 4 * 46, y: centre + Math.sin(Math.PI) * amp, taken: false }]
            : [];
    return { obstacles: [], bits, pickups, length: 560 };
};

/* ------------------------------------------------------------------ *
 * Background
 * ------------------------------------------------------------------ */

type Building = { x: number; w: number; h: number };

/** Seeded so a layer's skyline is stable for the life of the component. */
const makeSkyline = (seed: number, minH: number, maxH: number): Building[] => {
    let s = seed;
    const next = () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
    const out: Building[] = [];
    let x = 0;
    while (x < WIDTH * 1.6) {
        const w = 26 + next() * 54;
        out.push({ x, w, h: minH + next() * (maxH - minH) });
        x += w + 6 + next() * 20;
    }
    return out;
};

export default function JetpackRunner() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [phase, setPhase] = useState<Phase>("ready");
    const [result, setResult] = useState({ score: 0, bits: 0 });
    const [best, setBest] = useState(0);

    const game = useRef({
        phase: "ready" as Phase,
        t: 0,
        y: HEIGHT / 2,
        vy: 0,
        holding: false,
        speed: START_SPEED,
        distance: 0,
        score: 0,
        bitCount: 0,
        combo: 0,
        comboTimer: 0,
        multiplier: 1,
        obstacles: [] as Obstacle[],
        bits: [] as Bit[],
        pickups: [] as Pickup[],
        particles: [] as Particle[],
        popups: [] as Popup[],
        trail: [] as Array<{ x: number; y: number; a: number }>,
        nextSpawn: 460,
        sinceBreather: 0,
        lastPattern: "",
        overdrive: 0,
        shake: 0,
        hitStop: 0,
        restartAt: 0,
        needRelease: false,
        best: 0,
    });

    const reduced = useRef(false);

    useEffect(() => {
        reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        try {
            const stored = Number(window.localStorage.getItem("rf-jetpack-best")) || 0;
            setBest(stored);
            game.current.best = stored;
        } catch {
            /* storage unavailable; best stays session-local */
        }
    }, []);

    const reset = useCallback(() => {
        const g = game.current;
        Object.assign(g, {
            t: 0,
            y: HEIGHT / 2,
            vy: 0,
            speed: START_SPEED,
            distance: 0,
            score: 0,
            bitCount: 0,
            combo: 0,
            comboTimer: 0,
            multiplier: 1,
            obstacles: [],
            bits: [],
            pickups: [],
            particles: [],
            popups: [],
            trail: [],
            nextSpawn: 460,
            sinceBreather: 0,
            lastPattern: "",
            overdrive: 0,
            shake: 0,
            hitStop: 0,
        });
    }, []);

    const press = useCallback(() => {
        const g = game.current;
        if (g.phase === "running") {
            g.holding = true;
            return;
        }
        if (g.phase === "paused") {
            g.phase = "running";
            g.holding = true;
            setPhase("running");
            return;
        }
        // Two locks after death: a short cooldown, and a required release.
        // Keydown auto-repeats while a key is held, so without the release the
        // fatal input would restart the run before the score could be read.
        if (g.phase === "over" && (g.t < g.restartAt || g.needRelease)) return;
        reset();
        g.phase = "running";
        g.holding = true;
        setPhase("running");
    }, [reset]);

    const release = useCallback(() => {
        game.current.holding = false;
        game.current.needRelease = false;
    }, []);

    useEffect(() => {
        const isTyping = () => {
            const a = document.activeElement;
            return a instanceof HTMLInputElement || a instanceof HTMLTextAreaElement;
        };
        const keys = new Set(["Space", "ArrowUp", "KeyW", "Enter"]);

        const onDown = (e: KeyboardEvent) => {
            if (!keys.has(e.code) || isTyping()) return;
            e.preventDefault();
            press();
        };
        const onUp = (e: KeyboardEvent) => {
            if (!keys.has(e.code)) return;
            release();
        };
        const onBlur = () => {
            release();
            const g = game.current;
            if (g.phase === "running") {
                g.phase = "paused";
                setPhase("paused");
            }
        };

        const onVisibility = () => {
            if (document.hidden) onBlur();
        };

        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        window.addEventListener("blur", onBlur);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
            window.removeEventListener("blur", onBlur);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [press, release]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = WIDTH * dpr;
        canvas.height = HEIGHT * dpr;
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingQuality = "high";

        const thrustImg = new Image();
        thrustImg.src = "/images/game/robin-jetpack.png";
        const glideImg = new Image();
        glideImg.src = "/images/game/robin-jetpack-glide.png";

        /* Colours come from the same CSS variables the site uses, and are
         * re-read when the theme class flips so the game repaints with it. */
        let ink = "#0b1220";
        let accent = "#0a84ff";
        let muted = "#6b7280";
        let bg = "#ffffff";
        const readTheme = () => {
            const s = getComputedStyle(document.documentElement);
            const v = (name: string, fallback: string) =>
                s.getPropertyValue(name).trim() || fallback;
            ink = `hsl(${v("--foreground", "222 84% 5%")})`;
            accent = `hsl(${v("--primary", "210 100% 42%")})`;
            muted = `hsl(${v("--muted-foreground", "215 16% 47%")})`;
            bg = `hsl(${v("--background", "0 0% 100%")})`;
        };
        readTheme();
        const themeWatcher = new MutationObserver(readTheme);
        themeWatcher.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const far = makeSkyline(9137, 42, 96);
        const mid = makeSkyline(4421, 66, 140);
        const farW = far[far.length - 1].x + far[far.length - 1].w;
        const midW = mid[mid.length - 1].x + mid[mid.length - 1].w;
        const stars = Array.from({ length: 46 }, () => ({
            x: Math.random() * WIDTH,
            y: rand(CEIL, FLOOR - 40),
            r: rand(0.6, 1.7),
            tw: Math.random() * Math.PI * 2,
        }));

        const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
            const rr = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + rr, y);
            ctx.arcTo(x + w, y, x + w, y + h, rr);
            ctx.arcTo(x + w, y + h, x, y + h, rr);
            ctx.arcTo(x, y + h, x, y, rr);
            ctx.arcTo(x, y, x + w, y, rr);
            ctx.closePath();
        };

        const burst = (
            x: number,
            y: number,
            count: number,
            hue: Particle["hue"],
            power: number
        ) => {
            if (reduced.current) count = Math.ceil(count / 3);
            const g = game.current;
            for (let i = 0; i < count; i += 1) {
                const a = Math.random() * Math.PI * 2;
                const sp = rand(0.3, 1) * power;
                g.particles.push({
                    x,
                    y,
                    vx: Math.cos(a) * sp,
                    vy: Math.sin(a) * sp,
                    life: rand(0.3, 0.75),
                    max: 0.75,
                    r: rand(1.4, 3.2),
                    hue,
                });
            }
        };

        const spawnPattern = () => {
            const g = game.current;
            const x = WIDTH + 60;
            const d = clamp(g.distance / 26000, 0, 1);
            const tier = g.score < 220 ? 0 : g.score < 620 ? 1 : 2;

            let s: Spawn;
            if (g.sinceBreather >= 3) {
                s = breather(x, g.score);
                g.sinceBreather = 0;
                g.lastPattern = "breather";
            } else {
                const pool = PATTERNS.filter(
                    (p) => p.tier <= tier && p.id !== g.lastPattern
                );
                const pick = pool[Math.floor(Math.random() * pool.length)];
                s = pick.build(x, d);
                g.lastPattern = pick.id;
                g.sinceBreather += 1;
            }

            g.obstacles.push(...s.obstacles);
            g.bits.push(...s.bits);
            g.pickups.push(...s.pickups);
            // Spacing is measured in px but scaled toward the current speed, so
            // the gaps stay readable as the world accelerates without ever
            // fully cancelling the ramp in difficulty.
            g.nextSpawn = s.length * (0.72 + 0.28 * (g.speed / START_SPEED));
        };

        const die = () => {
            const g = game.current;
            if (g.overdrive > 0) return;
            g.phase = "over";
            g.hitStop = 0.13;
            g.shake = reduced.current ? 0 : 16;
            burst(PLAYER_X, g.y, 26, "debris", 320);
            g.restartAt = g.t + 0.55;
            g.needRelease = g.holding;

            const final = Math.floor(g.score);
            const nextBest = Math.max(g.best, final);
            g.best = nextBest;
            try {
                window.localStorage.setItem("rf-jetpack-best", String(nextBest));
            } catch {
                /* non-fatal */
            }
            setPhase("over");
            setResult({ score: final, bits: g.bitCount });
            setBest(nextBest);
        };

        /** Circle vs axis-aligned rect, via the closest point on the rect. */
        const hitsRect = (
            cx: number,
            cy: number,
            r: number,
            x: number,
            y: number,
            w: number,
            h: number
        ) => {
            const nx = clamp(cx, x, x + w);
            const ny = clamp(cy, y, y + h);
            const dx = cx - nx;
            const dy = cy - ny;
            return dx * dx + dy * dy < r * r;
        };

        const update = (dt: number) => {
            const g = game.current;
            g.t += dt;

            if (g.hitStop > 0) {
                g.hitStop -= dt;
                return;
            }
            if (g.phase !== "running") {
                // Idle bob on the start screen so the sprite reads as alive.
                if (g.phase === "ready") g.y = HEIGHT / 2 + Math.sin(g.t * 2.2) * 12;
                return;
            }

            if (g.overdrive > 0) g.overdrive = Math.max(0, g.overdrive - dt * 1000);

            const boost = g.overdrive > 0 ? 1.45 : 1;
            g.speed = Math.min(MAX_SPEED, START_SPEED + g.distance * SPEED_GAIN) * boost;
            g.distance += g.speed * dt;
            g.score += (g.speed * dt) / 14 * g.multiplier * (g.overdrive > 0 ? 2 : 1);

            g.vy += (g.holding ? GRAVITY + THRUST : GRAVITY) * dt;
            g.vy = clamp(g.vy, VY_UP_MAX, VY_DOWN_MAX);
            g.y += g.vy * dt;

            // Walls cost momentum rather than the run.
            if (g.y < CEIL + 20) {
                g.y = CEIL + 20;
                g.vy = Math.max(g.vy, 0) * 0.2;
            }
            if (g.y > FLOOR - 20) {
                g.y = FLOOR - 20;
                g.vy = Math.min(g.vy, 0) * 0.2;
                if (!reduced.current && Math.random() < 0.4) {
                    burst(PLAYER_X - 10, FLOOR - 4, 1, "debris", 90);
                }
            }

            // Thrust exhaust, emitted at the nozzle and left behind in the air.
            if (g.holding && !reduced.current) {
                for (let i = 0; i < 2; i += 1) {
                    g.particles.push({
                        x: PLAYER_X - 16 + rand(-3, 3),
                        y: g.y + 8 + rand(-3, 3),
                        vx: -g.speed * 0.35 - rand(70, 190),
                        vy: rand(30, 150),
                        life: rand(0.18, 0.42),
                        max: 0.42,
                        r: rand(1.8, 4),
                        hue: "flame",
                    });
                }
            }

            g.comboTimer -= dt * 1000;
            if (g.comboTimer <= 0 && g.combo > 0) {
                g.combo = 0;
                g.multiplier = 1;
            }

            g.nextSpawn -= g.speed * dt;
            if (g.nextSpawn <= 0) spawnPattern();

            for (const o of g.obstacles) {
                o.x -= g.speed * dt;
                if (o.kind === "drone") {
                    o.y = o.baseY + Math.sin(g.t * o.freq + o.phase) * o.amp;
                }
            }
            for (const b of g.bits) b.x -= g.speed * dt;
            for (const p of g.pickups) p.x -= g.speed * dt;

            // Collisions and near-miss scoring.
            for (const o of g.obstacles) {
                if (o.kind === "gate") {
                    const topH = o.gapY - CEIL;
                    const botY = o.gapY + o.gapH;
                    if (
                        hitsRect(PLAYER_X, g.y, HIT_R, o.x, CEIL, o.w, topH) ||
                        hitsRect(PLAYER_X, g.y, HIT_R, o.x, botY, o.w, FLOOR - botY)
                    ) {
                        die();
                        return;
                    }
                    if (!o.passed && o.x + o.w < PLAYER_X - HIT_R) {
                        o.passed = true;
                        const edge = Math.min(
                            Math.abs(g.y - o.gapY),
                            Math.abs(g.y - botY)
                        );
                        if (edge < NEAR_MISS_PX) {
                            g.score += 25 * g.multiplier;
                            g.popups.push({
                                x: PLAYER_X + 30,
                                y: g.y - 26,
                                text: "THREADED",
                                life: 0.9,
                                color: accent,
                            });
                            if (!reduced.current) g.shake = Math.max(g.shake, 4);
                        }
                    }
                } else if (o.kind === "drone") {
                    const dx = PLAYER_X - o.x;
                    const dy = g.y - o.y;
                    if (dx * dx + dy * dy < (HIT_R + o.r) ** 2) {
                        die();
                        return;
                    }
                } else if (hitsRect(PLAYER_X, g.y, HIT_R, o.x, o.y, o.w, o.h)) {
                    die();
                    return;
                }
            }

            for (const b of g.bits) {
                if (b.taken) continue;
                b.spin += dt * 3;
                const dx = PLAYER_X - b.x;
                const dy = g.y - b.y;
                if (dx * dx + dy * dy < 26 * 26) {
                    b.taken = true;
                    g.bitCount += 1;
                    g.combo += 1;
                    g.comboTimer = COMBO_DECAY_MS;
                    g.multiplier = Math.min(4, 1 + Math.floor(g.combo / 8));
                    g.score += 10 * g.multiplier;
                    burst(b.x, b.y, 6, "gold", 150);
                }
            }

            for (const p of g.pickups) {
                if (p.taken) continue;
                const dx = PLAYER_X - p.x;
                const dy = g.y - p.y;
                if (dx * dx + dy * dy < 30 * 30) {
                    p.taken = true;
                    g.overdrive = OVERDRIVE_MS;
                    burst(p.x, p.y, 22, "accent", 260);
                    if (!reduced.current) g.shake = 10;
                    g.popups.push({
                        x: PLAYER_X + 20,
                        y: g.y - 34,
                        text: "OVERDRIVE",
                        life: 1.3,
                        color: accent,
                    });
                }
            }

            g.obstacles = g.obstacles.filter((o) =>
                o.kind === "drone" ? o.x > -60 : o.x + o.w > -60
            );
            g.bits = g.bits.filter((b) => !b.taken && b.x > -40);
            g.pickups = g.pickups.filter((p) => !p.taken && p.x > -40);

            if (g.overdrive > 0) {
                g.trail.unshift({ x: PLAYER_X, y: g.y, a: 1 });
                if (g.trail.length > 6) g.trail.pop();
            } else if (g.trail.length) {
                g.trail.pop();
            }
        };

        const stepEffects = (dt: number) => {
            const g = game.current;
            for (const p of g.particles) {
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.vy += 240 * dt;
                p.life -= dt;
            }
            g.particles = g.particles.filter((p) => p.life > 0);
            for (const p of g.popups) {
                p.y -= 34 * dt;
                p.life -= dt;
            }
            g.popups = g.popups.filter((p) => p.life > 0);
            g.shake *= Math.pow(0.0025, dt);
            if (g.shake < 0.3) g.shake = 0;
        };

        /* ---------------- drawing ---------------- */

        const drawBackground = (g: typeof game.current) => {
            // Overdrawn by the shake amplitude so no transparent edge shows
            // while the camera is kicking after a crash.
            const BLEED = 24;
            ctx.fillStyle = bg;
            ctx.fillRect(-BLEED, -BLEED, WIDTH + BLEED * 2, HEIGHT + BLEED * 2);

            const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
            sky.addColorStop(0, accent);
            sky.addColorStop(1, "transparent");
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = sky;
            ctx.fillRect(-BLEED, -BLEED, WIDTH + BLEED * 2, HEIGHT + BLEED * 2);
            ctx.globalAlpha = 1;

            ctx.fillStyle = ink;
            for (const s of stars) {
                const x = (s.x - g.distance * 0.04) % WIDTH;
                ctx.globalAlpha =
                    0.1 + 0.14 * (0.5 + 0.5 * Math.sin(g.t * 1.6 + s.tw));
                ctx.beginPath();
                ctx.arc(x < 0 ? x + WIDTH : x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            const layer = (
                buildings: Building[],
                total: number,
                factor: number,
                alpha: number,
                baseY: number
            ) => {
                const offset = (g.distance * factor) % total;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = ink;
                for (let k = 0; k < 2; k += 1) {
                    for (const b of buildings) {
                        const x = b.x - offset + k * total;
                        if (x > WIDTH || x + b.w < 0) continue;
                        ctx.fillRect(x, baseY - b.h, b.w, b.h);
                    }
                }
                ctx.globalAlpha = 1;
            };
            layer(far, farW, 0.12, 0.07, FLOOR);
            layer(mid, midW, 0.3, 0.13, FLOOR);
        };

        const drawEdges = (g: typeof game.current) => {
            ctx.globalAlpha = 0.16;
            ctx.fillStyle = ink;
            ctx.fillRect(0, FLOOR, WIDTH, HEIGHT - FLOOR);
            ctx.fillRect(0, 0, WIDTH, CEIL);
            ctx.globalAlpha = 1;

            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, FLOOR);
            ctx.lineTo(WIDTH, FLOOR);
            ctx.moveTo(0, CEIL);
            ctx.lineTo(WIDTH, CEIL);
            ctx.stroke();

            // Dashes on the deck, offset by distance, to sell ground speed.
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 3;
            const off = g.distance % 46;
            ctx.beginPath();
            for (let x = -off; x < WIDTH; x += 46) {
                ctx.moveTo(x, FLOOR + 12);
                ctx.lineTo(x + 22, FLOOR + 12);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        };

        const drawObstacles = (g: typeof game.current) => {
            for (const o of g.obstacles) {
                if (o.kind === "gate") {
                    const botY = o.gapY + o.gapH;
                    const grad = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
                    grad.addColorStop(0, accent);
                    grad.addColorStop(1, ink);
                    ctx.globalAlpha = 0.82;
                    ctx.fillStyle = grad;
                    roundRect(o.x, CEIL, o.w, o.gapY - CEIL, 5);
                    ctx.fill();
                    roundRect(o.x, botY, o.w, FLOOR - botY, 5);
                    ctx.fill();
                    ctx.globalAlpha = 1;

                    // Hot lips on the gap edges: the only part the player must
                    // actually track, so it gets the loudest colour.
                    ctx.fillStyle = DANGER;
                    ctx.fillRect(o.x, o.gapY - 4, o.w, 4);
                    ctx.fillRect(o.x, botY, o.w, 4);
                } else if (o.kind === "drone") {
                    ctx.globalAlpha = 0.9;
                    ctx.fillStyle = ink;
                    ctx.beginPath();
                    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = accent;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = DANGER;
                    ctx.beginPath();
                    ctx.arc(
                        o.x + Math.cos(g.t * 3) * 4,
                        o.y + Math.sin(g.t * 3) * 2,
                        3.4,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                } else {
                    ctx.globalAlpha = 0.25;
                    ctx.fillStyle = DANGER;
                    ctx.fillRect(o.x, o.y - 6, o.w, o.h + 12);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = DANGER;
                    ctx.fillRect(o.x, o.y, o.w, o.h);
                    ctx.fillStyle = ink;
                    roundRect(o.x - 8, o.y - 7, 12, o.h + 14, 3);
                    ctx.fill();
                    roundRect(o.x + o.w - 4, o.y - 7, 12, o.h + 14, 3);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const drawBits = (g: typeof game.current) => {
            for (const b of g.bits) {
                const s = 6 + Math.sin(b.spin) * 1.6;
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.spin * 0.6);
                ctx.fillStyle = GOLD;
                ctx.globalAlpha = 0.25;
                ctx.beginPath();
                ctx.arc(0, 0, s * 2.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.moveTo(0, -s);
                ctx.lineTo(s, 0);
                ctx.lineTo(0, s);
                ctx.lineTo(-s, 0);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            for (const p of g.pickups) {
                const pulse = 1 + Math.sin(g.t * 6) * 0.12;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.scale(pulse, pulse);
                ctx.strokeStyle = accent;
                ctx.lineWidth = 4;
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.arc(0, 0, 14, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 0.22;
                ctx.fillStyle = accent;
                ctx.beginPath();
                ctx.arc(0, 0, 24, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            ctx.globalAlpha = 1;
        };

        const drawParticles = (g: typeof game.current) => {
            for (const p of g.particles) {
                const t = clamp(p.life / p.max, 0, 1);
                if (p.hue === "flame") {
                    // Hot core to cool tail, which is what sells thrust.
                    ctx.fillStyle =
                        t > 0.66 ? "#fff2c4" : t > 0.33 ? "#ffa640" : "#ff5a2b";
                } else if (p.hue === "gold") {
                    ctx.fillStyle = GOLD;
                } else if (p.hue === "accent") {
                    ctx.fillStyle = accent;
                } else {
                    ctx.fillStyle = ink;
                }
                ctx.globalAlpha = t;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * t, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const drawPlayer = (g: typeof game.current) => {
            const img = g.holding && g.phase === "running" ? thrustImg : glideImg;
            const ready = img.complete && img.naturalWidth > 0;
            const tilt = clamp(g.vy / 1500, -0.3, 0.42);

            if (g.overdrive > 0) {
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = accent;
                ctx.beginPath();
                ctx.arc(PLAYER_X, g.y, 46 + Math.sin(g.t * 9) * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                for (let i = g.trail.length - 1; i >= 0; i -= 1) {
                    const gh = g.trail[i];
                    ctx.globalAlpha = 0.1 * (1 - i / g.trail.length);
                    if (ready) {
                        ctx.drawImage(
                            img,
                            gh.x - SPRITE_W / 2 - i * 9,
                            gh.y - SPRITE_H / 2,
                            SPRITE_W,
                            SPRITE_H
                        );
                    }
                }
                ctx.globalAlpha = 1;
            }

            ctx.save();
            ctx.translate(PLAYER_X, g.y);
            ctx.rotate(g.phase === "over" ? tilt + g.t * 0.4 : tilt);
            if (ready) {
                ctx.drawImage(img, -SPRITE_W / 2, -SPRITE_H / 2, SPRITE_W, SPRITE_H);
            } else {
                ctx.fillStyle = ink;
                ctx.beginPath();
                ctx.arc(0, 0, HIT_R, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        };

        let hudScale = 1;
        const measureHud = () => {
            const shown = canvas.clientWidth || WIDTH;
            hudScale = clamp(WIDTH / shown, 1, 1.9);
        };
        measureHud();
        const sizeWatcher = new ResizeObserver(measureHud);
        sizeWatcher.observe(canvas);

        const drawHud = (g: typeof game.current) => {
            const s = hudScale;
            ctx.font = `600 ${Math.round(13 * s)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
            ctx.textBaseline = "top";
            // A halo in the page colour, so the readout survives passing over a
            // lit gate without needing an opaque plate behind it.
            ctx.shadowColor = bg;
            ctx.shadowBlur = 6 * s;

            ctx.textAlign = "left";
            ctx.fillStyle = ink;
            ctx.globalAlpha = 0.9;
            ctx.fillText(String(Math.floor(g.score)).padStart(5, "0"), 14 * s, 20 * s);

            ctx.globalAlpha = 0.55;
            ctx.fillStyle = muted;
            ctx.textAlign = "right";
            ctx.fillText(
                `BEST ${String(g.best).padStart(5, "0")}`,
                WIDTH - 14 * s,
                20 * s
            );
            ctx.globalAlpha = 1;

            ctx.textAlign = "left";
            ctx.fillStyle = GOLD;
            ctx.fillText(`◆ ${g.bitCount}`, 14 * s, 38 * s);

            if (g.multiplier > 1) {
                ctx.fillStyle = accent;
                ctx.fillText(`×${g.multiplier}`, 62 * s, 38 * s);
                // The bar is the combo clock: it is the only warning that the
                // multiplier is about to lapse.
                const w = 40 * s * clamp(g.comboTimer / COMBO_DECAY_MS, 0, 1);
                ctx.globalAlpha = 0.35;
                ctx.fillRect(62 * s, 54 * s, w, 3);
                ctx.globalAlpha = 1;
            }

            if (g.overdrive > 0) {
                const full = 120 * s;
                const x = WIDTH / 2 - full / 2;
                ctx.fillStyle = accent;
                ctx.globalAlpha = 0.4;
                ctx.fillRect(x, 22 * s, full, 4);
                ctx.globalAlpha = 0.85;
                ctx.fillRect(x, 22 * s, full * (g.overdrive / OVERDRIVE_MS), 4);
                ctx.globalAlpha = 1;
            }

            ctx.textAlign = "center";
            for (const p of g.popups) {
                ctx.globalAlpha = clamp(p.life, 0, 1);
                ctx.fillStyle = p.color;
                ctx.fillText(p.text, p.x, p.y);
            }
            ctx.globalAlpha = 1;
            ctx.textAlign = "left";
            ctx.shadowBlur = 0;
        };

        let raf = 0;
        let last = performance.now();

        const frame = (now: number) => {
            const g = game.current;
            const dt = clamp((now - last) / 1000, 0, 1 / 20);
            last = now;

            update(dt);
            stepEffects(dt);

            const sx = g.shake ? rand(-g.shake, g.shake) : 0;
            const sy = g.shake ? rand(-g.shake, g.shake) : 0;

            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.save();
            ctx.translate(sx, sy);
            drawBackground(g);
            drawEdges(g);
            drawObstacles(g);
            drawBits(g);
            drawParticles(g);
            drawPlayer(g);
            ctx.restore();
            drawHud(g);

            raf = requestAnimationFrame(frame);
        };

        raf = requestAnimationFrame(frame);
        return () => {
            cancelAnimationFrame(raf);
            themeWatcher.disconnect();
            sizeWatcher.disconnect();
        };
    }, []);

    const overlay = (() => {
        if (phase === "running") return null;
        if (phase === "paused") {
            return { title: "Paused", body: "Press space, or tap, to resume" };
        }
        if (phase === "over") {
            const beaten = result.score >= best && result.score > 0;
            return {
                title: beaten ? `New best: ${result.score}` : `Down at ${result.score}`,
                body: `${result.bits} bits collected. Press space, or tap, to fly again`,
            };
        }
        return {
            title: "Hold to fly",
            body: "Space, or tap and hold. Thread the gates, grab the gold",
        };
    })();

    return (
        <div className="w-full">
            <div className="liquid-glass relative overflow-hidden rounded-2xl">
                <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label="Jetpack, a small flying game. Hold space or tap and hold to climb, release to descend, and avoid the gates."
                    onPointerDown={(event) => {
                        event.preventDefault();
                        press();
                    }}
                    onPointerUp={release}
                    onPointerLeave={release}
                    onPointerCancel={release}
                    onContextMenu={(event) => event.preventDefault()}
                    className="block h-auto w-full cursor-pointer touch-none select-none"
                    style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
                />

                {overlay && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/55 text-center backdrop-blur-[2px]">
                        <p className="text-base font-semibold text-foreground">
                            {overlay.title}
                        </p>
                        <p className="px-6 text-xs text-muted-foreground">{overlay.body}</p>
                    </div>
                )}
            </div>

            <p aria-live="polite" className="sr-only">
                {phase === "over"
                    ? `Game over. Score ${result.score}, ${result.bits} bits. Best ${best}.`
                    : ""}
            </p>

            <button
                type="button"
                onPointerDown={press}
                onPointerUp={release}
                className="sr-only focus:not-sr-only focus:mt-3 focus:inline-block focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
            >
                {phase === "running" ? "Hold to fly" : "Start the game"}
            </button>
        </div>
    );
}
