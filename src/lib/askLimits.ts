import { createHash } from "crypto";

/**
 * Spend controls for the assistant endpoint.
 *
 * Three layers, because they fail differently. Per-IP catches casual hammering.
 * Per-visitor catches one person opening the widget repeatedly. The global daily
 * budget is the one that actually protects the bill: it caps paid model calls
 * for the whole site, so a distributed scrape cannot run the balance down.
 */

export const LIMITS = {
    /** Short burst window, per IP. */
    burst: { windowMs: 5 * 60 * 1000, max: 8 },
    /** Rolling day, per IP. */
    daily: { windowMs: 24 * 60 * 60 * 1000, max: 40 },
    /** Rolling day, per browser-issued visitor id. */
    visitor: { windowMs: 24 * 60 * 60 * 1000, max: 25 },
    /** Rolling day, whole site. Only paid model calls count against this. */
    global: {
        windowMs: 24 * 60 * 60 * 1000,
        max: Number(process.env.ASK_DAILY_MODEL_CALLS ?? 400),
    },
} as const;

type Counter = { count: number; resetAt: number };

const memory = new Map<string, Counter>();

const hash = (value: string) =>
    createHash("sha256").update(value).digest("hex").slice(0, 24);

const isProduction = process.env.NODE_ENV === "production";

const redisConfig = () => {
    const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
    return url && token ? { url: url.replace(/\/$/, ""), token } : null;
};

const runRedis = async <T>(command: unknown[]): Promise<{ result?: T } | null> => {
    const config = redisConfig();
    if (!config) return null;

    const response = await fetch(config.url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Redis command failed with ${response.status}`);
    }

    return (await response.json()) as { result?: T };
};

const memoryHit = (key: string, windowMs: number, max: number) => {
    const now = Date.now();

    for (const [existing, counter] of memory) {
        if (counter.resetAt <= now) memory.delete(existing);
    }

    const current = memory.get(key);
    if (!current || current.resetAt <= now) {
        memory.set(key, { count: 1, resetAt: now + windowMs });
        return false;
    }

    if (current.count >= max) return true;

    current.count += 1;
    return false;
};

/**
 * Counts one hit against a bucket and reports whether it is now over budget.
 * Redis when configured so limits hold across serverless instances, in-memory
 * otherwise (correct locally, best-effort on a single warm instance).
 */
export async function consume(
    bucket: string,
    identity: string,
    { windowMs, max }: { windowMs: number; max: number }
): Promise<boolean> {
    const key = `ask:${bucket}:${hash(identity)}`;

    try {
        const increment = await runRedis<number>(["INCR", key]);
        if (increment) {
            const count = Number(increment.result);
            if (count === 1) {
                await runRedis(["EXPIRE", key, Math.ceil(windowMs / 1000)]);
            }
            return count > max;
        }
    } catch (error) {
        if (isProduction) throw error;
        console.warn(`Redis unavailable for ${bucket}; using memory.`, error);
    }

    return memoryHit(key, windowMs, max);
}

/** Peek at a bucket without counting against it. */
export async function isExhausted(
    bucket: string,
    identity: string,
    { max }: { max: number }
): Promise<boolean> {
    const key = `ask:${bucket}:${hash(identity)}`;

    try {
        const current = await runRedis<string | null>(["GET", key]);
        if (current) return Number(current.result ?? 0) > max;
    } catch (error) {
        if (isProduction) throw error;
    }

    const counter = memory.get(key);
    return Boolean(counter && counter.resetAt > Date.now() && counter.count >= max);
}
