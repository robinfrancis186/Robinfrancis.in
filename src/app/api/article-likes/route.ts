import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { consume } from "@/lib/askLimits";
import { articleLikes, isArticleSlug, type ArticleLikes } from "@/lib/articleLikes";

export const runtime = "nodejs";
const COOKIE = "rf-article-reader";
const readerId = (request: NextRequest) => {
    const value = request.cookies.get(COOKIE)?.value;
    return value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) ? value : "";
};
const reply = (body: unknown, status = 200) => NextResponse.json(body, {
    status, headers: { "Cache-Control": "no-store" },
});
const unavailable = () => reply({ error: "Likes are temporarily unavailable. Please try again." }, 503);
function readerResponse(request: NextRequest, reader: string, state: ArticleLikes) {
    const response = reply(state);
    response.cookies.set(COOKIE, reader, {
        httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax",
        path: "/api/article-likes", maxAge: 365 * 24 * 60 * 60,
    });
    return response;
}

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");
    if (!isArticleSlug(slug)) return reply({ error: "Article not found." }, 404);
    try {
        const reader = readerId(request) || randomUUID();
        return readerResponse(request, reader, await articleLikes(slug, reader));
    } catch {
        return unavailable();
    }
}

export async function POST(request: NextRequest) {
    if (request.headers.get("origin") !== request.nextUrl.origin) return reply({ error: "Invalid request origin." }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "JSON is required." }, 415);
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
    if (!isArticleSlug(body.slug)) return reply({ error: "Article not found." }, 404);
    if (typeof body.liked !== "boolean") return reply({ error: "A like choice is required." }, 400);
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
        if (await consume("article-likes", ip, { windowMs: 60_000, max: 30 })) {
            return reply({ error: "Too many attempts. Please try again in a minute." }, 429);
        }
        // shortcut: identity is per browser, not per person; add accounts before using likes for rewards.
        const reader = readerId(request) || randomUUID();
        return readerResponse(request, reader, await articleLikes(body.slug, reader, body.liked));
    } catch {
        return unavailable();
    }
}
