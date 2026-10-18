import { randomUUID } from "node:crypto";

const PREFIX = "jetpack:v1";
const SCORES = `${PREFIX}:scores`;
const PLAYERS = `${PREFIX}:players`;
const RUN_SECONDS = 2 * 60 * 60;

export type LeaderboardEntry = { name: string; score: number };
type Run = { player: string; name: string; startedAt: number };

export const isPlayerId = (value: unknown): value is string =>
    typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export function playerName(value: unknown): string | null {
    if (typeof value !== "string" || value.length > 100) return null;
    const name = value.normalize("NFC").trim().replace(/\s+/g, " ");
    return name.length > 0 && name.length <= 24 && /^[\p{L}\p{M}\p{N} ._'’-]+$/u.test(name)
        ? name : null;
}

export function validScore(score: unknown, durationMs: unknown, elapsedMs: number): boolean {
    return typeof score === "number" && Number.isSafeInteger(score) && score >= 0 && score <= 10_000_000
        && typeof durationMs === "number" && Number.isSafeInteger(durationMs)
        && durationMs >= 1000 && durationMs <= RUN_SECONDS * 1000
        && elapsedMs >= 0 && durationMs <= elapsedMs + 2000 && elapsedMs <= RUN_SECONDS * 1000
        && score <= durationMs * 1.5;
}

async function redis<T>(command: unknown[]): Promise<T> {
    const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
    if (!url || !token) throw new Error("Leaderboard storage is not configured");
    const response = await fetch(url.replace(/\/$/, ""), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(command),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
    });
    const data = await response.json() as { result: T; error?: string };
    if (!response.ok || data.error) throw new Error("Leaderboard storage is unavailable");
    return data.result;
}

export async function leaderboard(): Promise<LeaderboardEntry[]> {
    const rows = await redis<string[]>(["EVAL", `
        local ids = redis.call('ZREVRANGE', KEYS[1], 0, 9)
        local rows = {}
        for _, id in ipairs(ids) do
            local row = redis.call('HGET', KEYS[2], id)
            if row then table.insert(rows, row) end
        end
        return rows
    `, 2, SCORES, PLAYERS]);
    return rows.map(row => JSON.parse(row) as LeaderboardEntry);
}

export async function startRun(player: string, name: string): Promise<string> {
    const runId = randomUUID();
    await redis(["SET", `${PREFIX}:run:${runId}`, JSON.stringify({ player, name, startedAt: Date.now() }), "EX", RUN_SECONDS]);
    return runId;
}

export async function finishRun(player: string, runId: string, score: unknown, durationMs: unknown): Promise<boolean> {
    if (!isPlayerId(runId)) return false;
    const key = `${PREFIX}:run:${runId}`;
    const raw = await redis<string | null>(["GET", key]);
    if (!raw) return false;
    const run = JSON.parse(raw) as Run;
    if (run.player !== player || !validScore(score, durationMs, Date.now() - run.startedAt)) return false;

    // shortcut: scores are client-reported; use server-simulated runs before offering prizes.
    const saved = await redis<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local run = cjson.decode(raw)
        if run.player ~= ARGV[1] then return 0 end
        local score = tonumber(ARGV[2])
        local duration = tonumber(ARGV[3])
        if run.score then
            if run.score == score and run.durationMs == duration then return 1 end
            return 0
        end
        local best = tonumber(redis.call('ZSCORE', KEYS[2], run.player) or '-1')
        if score > best then
            redis.call('ZADD', KEYS[2], score, run.player)
            redis.call('HSET', KEYS[3], run.player, cjson.encode({ name = run.name, score = score }))
        end
        run.score = score
        run.durationMs = duration
        redis.call('SET', KEYS[1], cjson.encode(run), 'KEEPTTL')
        local removed = redis.call('ZREVRANGE', KEYS[2], 100, -1)
        for _, id in ipairs(removed) do
            redis.call('ZREM', KEYS[2], id)
            redis.call('HDEL', KEYS[3], id)
        end
        return 1
    `, 3, key, SCORES, PLAYERS, player, score, durationMs]);
    return saved === 1;
}
