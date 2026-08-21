"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * An endless runner for the 404 page, in the spirit of Chrome's dinosaur game,
 * starring the site's blob mascot.
 *
 * Everything lives on one canvas driven by a single rAF loop. State that the
 * loop mutates every frame is held in refs, not React state, so a 60fps game
 * never triggers a re-render; only the score and phase surface to React.
 */

type Phase = "ready" | "running" | "over";

const WIDTH = 720;
const HEIGHT = 220;
const GROUND_Y = HEIGHT - 42;

const GRAVITY = 2100;      // px/s^2
const JUMP_VELOCITY = -720; // px/s
const START_SPEED = 300;    // px/s
const MAX_SPEED = 720;
const SPEED_RAMP = 11;      // px/s per second survived

type Obstacle = { x: number; w: number; h: number; kind: "low" | "tall" };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function BlobRunner() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [phase, setPhase] = useState<Phase>("ready");
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);

    // Mutable game state, deliberately outside React.
    const game = useRef({
        y: GROUND_Y,
        vy: 0,
        grounded: true,
        speed: START_SPEED,
        distance: 0,
        obstacles: [] as Obstacle[],
        nextSpawn: 320,
        t: 0,
        phase: "ready" as Phase,
    });

    const reducedMotion = useRef(false);

    useEffect(() => {
        reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        try {
            const stored = window.localStorage.getItem("rf-runner-best");
            if (stored) setBest(Number(stored) || 0);
        } catch {
            /* storage unavailable; best score just stays session-local */
        }
    }, []);

    const reset = useCallback(() => {
        const g = game.current;
        g.y = GROUND_Y;
        g.vy = 0;
        g.grounded = true;
        g.speed = START_SPEED;
        g.distance = 0;
        g.obstacles = [];
        g.nextSpawn = 320;
        g.t = 0;
        setScore(0);
    }, []);

    const start = useCallback(() => {
        reset();
        game.current.phase = "running";
        setPhase("running");
    }, [reset]);

    const jump = useCallback(() => {
        const g = game.current;
        if (g.phase === "running") {
            if (g.grounded) {
                g.vy = JUMP_VELOCITY;
                g.grounded = false;
            }
            return;
        }
        start();
    }, [start]);

    // Input: keyboard anywhere, pointer on the canvas.
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.code === "Space" || event.code === "ArrowUp" || event.key === "Enter") {
                // Only swallow the key when the game is what the user is aiming at.
                const active = document.activeElement;
                const typing =
                    active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
                if (typing) return;
                event.preventDefault();
                jump();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [jump]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = WIDTH * dpr;
        canvas.height = HEIGHT * dpr;
        ctx.scale(dpr, dpr);

        const styles = getComputedStyle(document.documentElement);
        const readVar = (name: string, fallback: string) =>
            styles.getPropertyValue(name).trim() || fallback;
        const ink = `hsl(${readVar("--foreground", "222 84% 5%")})`;
        const accent = `hsl(${readVar("--primary", "210 100% 42%")})`;
        const muted = `hsl(${readVar("--muted-foreground", "215 16% 47%")})`;

        let raf = 0;
        let last = performance.now();

        const drawBlob = (cx: number, cy: number, r: number, t: number) => {
            // Same four-lobe silhouette as the site mascot, squashed while rising.
            const squash = game.current.grounded ? 1 + Math.sin(t * 9) * 0.03 : 1.08;
            ctx.beginPath();
            const steps = 40;
            for (let i = 0; i <= steps; i += 1) {
                const a = (i / steps) * Math.PI * 2;
                const lobe = 1 + 0.16 * Math.cos(4 * a + t * 0.8);
                const x = cx + Math.cos(a) * r * lobe * squash;
                const y = cy + Math.sin(a) * r * lobe * (2 - squash);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = ink;
            ctx.fill();

            // Eyes, looking the way it travels.
            ctx.fillStyle = "#fff";
            for (const dx of [-0.28, 0.16]) {
                ctx.beginPath();
                ctx.ellipse(cx + r * dx + r * 0.2, cy - r * 0.05, r * 0.15, r * 0.22, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const frame = (now: number) => {
            const g = game.current;
            const dt = Math.min((now - last) / 1000, 1 / 20);
            last = now;
            g.t += dt;

            if (g.phase === "running") {
                g.speed = Math.min(MAX_SPEED, START_SPEED + g.distance * 0.0006 * SPEED_RAMP * 60);
                g.distance += g.speed * dt;

                g.vy += GRAVITY * dt;
                g.y += g.vy * dt;
                if (g.y >= GROUND_Y) {
                    g.y = GROUND_Y;
                    g.vy = 0;
                    g.grounded = true;
                }

                g.nextSpawn -= g.speed * dt;
                if (g.nextSpawn <= 0) {
                    const tall = Math.random() > 0.68;
                    g.obstacles.push({
                        x: WIDTH + 20,
                        w: tall ? rand(16, 22) : rand(20, 34),
                        h: tall ? rand(46, 62) : rand(24, 36),
                        kind: tall ? "tall" : "low",
                    });
                    // Gap scales with speed so the game stays clearable.
                    g.nextSpawn = rand(260, 430) * (g.speed / START_SPEED);
                }

                for (const o of g.obstacles) o.x -= g.speed * dt;
                g.obstacles = g.obstacles.filter((o) => o.x + o.w > -40);

                // Collision, with a forgiving inset so near-misses read as misses.
                const bx = 92;
                const br = 17;
                for (const o of g.obstacles) {
                    const hitX = bx + br - 5 > o.x && bx - br + 5 < o.x + o.w;
                    const hitY = g.y + br - 6 > GROUND_Y - o.h;
                    if (hitX && hitY) {
                        g.phase = "over";
                        setPhase("over");
                        const finalScore = Math.floor(g.distance / 10);
                        setScore(finalScore);
                        setBest((prevBest) => {
                            const next = Math.max(prevBest, finalScore);
                            try {
                                window.localStorage.setItem("rf-runner-best", String(next));
                            } catch {
                                /* non-fatal */
                            }
                            return next;
                        });
                        break;
                    }
                }

                if (Math.floor(g.distance / 10) !== score) setScore(Math.floor(g.distance / 10));
            }

            // ---- draw ----
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            ctx.strokeStyle = muted;
            ctx.globalAlpha = 0.45;
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y + 18);
            ctx.lineTo(WIDTH, GROUND_Y + 18);
            ctx.stroke();

            // Ground speckle, offset by distance so it reads as motion.
            const offset = g.distance % 40;
            for (let x = -offset; x < WIDTH; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, GROUND_Y + 26);
                ctx.lineTo(x + 12, GROUND_Y + 26);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            for (const o of g.obstacles) {
                ctx.fillStyle = o.kind === "tall" ? accent : ink;
                ctx.globalAlpha = o.kind === "tall" ? 0.9 : 0.75;
                const y = GROUND_Y + 18 - o.h;
                const r = 4;
                ctx.beginPath();
                ctx.moveTo(o.x + r, y);
                ctx.arcTo(o.x + o.w, y, o.x + o.w, y + o.h, r);
                ctx.arcTo(o.x + o.w, y + o.h, o.x, y + o.h, r);
                ctx.arcTo(o.x, y + o.h, o.x, y, r);
                ctx.arcTo(o.x, y, o.x + o.w, y, r);
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            drawBlob(92, g.y - 2, 17, g.t);

            raf = requestAnimationFrame(frame);
        };

        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
        // score is read only to avoid redundant setState; re-running on it would
        // restart the loop 60 times a second.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span>Score {String(score).padStart(4, "0")}</span>
                <span>Best {String(best).padStart(4, "0")}</span>
            </div>

            <div className="liquid-glass relative overflow-hidden rounded-2xl">
                <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label={`Endless runner game. Score ${score}. Press space or tap to jump.`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        jump();
                    }}
                    className="block h-auto w-full cursor-pointer touch-none"
                    style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
                />

                {phase !== "running" && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/55 text-center backdrop-blur-[2px]">
                        <p className="text-sm font-semibold text-foreground">
                            {phase === "ready" ? "While you are here" : `Run over at ${score}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Press space, or tap, to {phase === "ready" ? "start" : "try again"}
                        </p>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={jump}
                className="sr-only focus:not-sr-only focus:mt-3 focus:inline-block focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
            >
                {phase === "running" ? "Jump" : "Start the game"}
            </button>
        </div>
    );
}
