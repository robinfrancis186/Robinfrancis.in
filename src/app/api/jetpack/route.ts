import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { consume } from "@/lib/askLimits";
import { finishRun, isPlayerId, leaderboard, playerName, startRun } from "@/lib/jetpackLeaderboard";

export const runtime = "nodejs";
const COOKIE = "rf-jetpack-player";
const reply = (body: unknown, status = 200) => NextResponse.json(body, {
    status, headers: { "Cache-Control": "no-store" },
});
const unavailable = () => reply({ error: "The leaderboard is temporarily unavailable. Please try again." }, 503);

export async function GET() {
    try {
        return reply({ entries: await leaderboard() });
    } catch {
        console.error("Jetpack leaderboard could not be loaded");
        return unavailable();
    }
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get("origin");
    if (origin && origin !== request.nextUrl.origin) return reply({ error: "Invalid request origin." }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
        return reply({ error: "JSON is required." }, 415);
    }
    let body: Record<string, unknown>;
    try {
        if (Number(request.headers.get("content-length")) > 512) return reply({ error: "Request is too large." }, 413);
        const text = await request.text();
        if (text.length > 512) return reply({ error: "Request is too large." }, 413);
        body = JSON.parse(text);
        if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    } catch {
        return reply({ error: "Invalid request." }, 400);
    }
    if (body.action !== "start" && body.action !== "finish") return reply({ error: "Invalid action." }, 400);
    const name = playerName(body.name);
    if (body.action === "start" && !name) {
        return reply({ error: "Use 1 to 24 letters, numbers, spaces, dots, apostrophes or hyphens for your name." }, 400);
    }
    const existingPlayer = request.cookies.get(COOKIE)?.value;
    if (body.action === "finish" && (!isPlayerId(existingPlayer) || !isPlayerId(body.runId))) {
        return reply({ error: "This run has expired. Please reload to start again." }, 400);
    }

    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || request.headers.get("x-real-ip") || "unknown";
        if (await consume(`jetpack-${body.action}`, ip, { windowMs: 5 * 60 * 1000, max: 60 })) {
            return reply({ error: "Too many attempts. Please try again in a few minutes." }, 429);
        }
        if (body.action === "start") {
            const player = isPlayerId(existingPlayer) ? existingPlayer : randomUUID();
            const runId = await startRun(player, name!);
            const response = reply({ runId, name });
            response.cookies.set(COOKIE, player, {
                httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax",
                path: "/api/jetpack", maxAge: 365 * 24 * 60 * 60,
            });
            return response;
        }
        if (!await finishRun(existingPlayer!, body.runId as string, body.score, body.durationMs)) {
            return reply({ error: "This score could not be verified. Please reload to start a new run." }, 400);
        }
        return reply({ entries: await leaderboard() });
    } catch {
        console.error("Jetpack leaderboard request failed");
        return unavailable();
    }
}
