import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "crypto";
import Anthropic from "@anthropic-ai/sdk";
import { formatContext, retrievePassages, type RetrievedPassage } from "@/lib/askRetrieval";

const MAX_QUESTION_LENGTH = 400;
const MAX_HISTORY_TURNS = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_QUESTIONS_PER_WINDOW = 15;

const isProduction = process.env.NODE_ENV === "production";
const questionAttempts = new Map<string, { count: number; resetAt: number }>();

let anthropicClient: Anthropic | null = null;

function getAnthropic() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;

    if (!anthropicClient) {
        anthropicClient = new Anthropic({ apiKey });
    }

    return anthropicClient;
}

const SYSTEM_PROMPT = `You answer questions about Robin Francis on his personal portfolio site, robinfrancis.in. Visitors are recruiters, collaborators, event organisers, and fellow builders.

Answer only from the SOURCES block in the user turn. It is drawn from Robin's own site: his projects, writing, achievements, and the press and award records he cites.

If the sources do not cover the question, say so plainly and point the visitor to the contact form at /#contact. Never guess at facts about Robin. Do not invent dates, employers, figures, or credentials. If you are unsure whether the sources support a claim, leave the claim out.

Write in a warm, direct voice, in the third person ("Robin builds…"), 2-4 sentences for most questions. No headers or bullet lists unless the visitor asks for a list. Do not include internal or system XML tags in your response.

You may answer general questions about how to reach Robin or what the site contains. Decline anything unrelated to Robin or his work, briefly and without lecturing.`;

const readString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getClientIp = (request: NextRequest) => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

    return request.headers.get("x-real-ip") || "unknown";
};

const getRateLimitKey = (value: string) =>
    `ask:${createHash("sha256").update(value).digest("hex").slice(0, 24)}`;

const isMemoryRateLimited = (key: string) => {
    const now = Date.now();

    for (const [attemptKey, attempt] of questionAttempts) {
        if (attempt.resetAt <= now) {
            questionAttempts.delete(attemptKey);
        }
    }

    const current = questionAttempts.get(key);
    if (!current || current.resetAt <= now) {
        questionAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (current.count >= MAX_QUESTIONS_PER_WINDOW) {
        return true;
    }

    current.count += 1;
    return false;
};

const runRedisCommand = async <T>(command: unknown[]) => {
    const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
        return null;
    }

    const response = await fetch(redisUrl.replace(/\/$/, ""), {
        method: "POST",
        headers: {
            Authorization: `Bearer ${redisToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Redis rate-limit command failed with ${response.status}`);
    }

    return (await response.json()) as { result?: T };
};

const isRateLimited = async (value: string) => {
    const key = getRateLimitKey(value);

    try {
        const increment = await runRedisCommand<number>(["INCR", key]);
        if (increment) {
            const count = Number(increment.result);
            if (count === 1) {
                await runRedisCommand<number>([
                    "EXPIRE",
                    key,
                    Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
                ]);
            }
            return count > MAX_QUESTIONS_PER_WINDOW;
        }
    } catch (error) {
        if (isProduction) throw error;
        console.warn("Redis ask rate limit unavailable; falling back to memory.", error);
    }

    return isMemoryRateLimited(key);
};

/** Several documents can point at one page, so show each destination once. */
const toSources = (passages: RetrievedPassage[]) => {
    const seen = new Set<string>();
    const sources: Array<{ title: string; href: string }> = [];

    for (const passage of passages) {
        if (seen.has(passage.href)) continue;
        seen.add(passage.href);
        sources.push({ title: passage.title, href: passage.href });
        if (sources.length === 3) break;
    }

    return sources;
};

/**
 * Without an API key the endpoint still answers, from retrieval alone. It is a
 * worse answer, but it is never a wrong one: the visitor gets the matching
 * passage and the link, rather than an error.
 */
const retrievalOnlyAnswer = (passages: RetrievedPassage[]) => {
    if (!passages.length) {
        return "I could not find anything about that on this site. The contact form at /#contact reaches Robin directly.";
    }

    const best = passages[0];
    const sentences = best.text.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
    return `The closest match on the site is ${best.title}: ${sentences}`;
};

export async function POST(request: NextRequest) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const question = readString(payload.question);

    if (!question) {
        return NextResponse.json({ error: "A question is required." }, { status: 400 });
    }

    if (question.length > MAX_QUESTION_LENGTH) {
        return NextResponse.json(
            { error: `Please keep questions under ${MAX_QUESTION_LENGTH} characters.` },
            { status: 400 }
        );
    }

    const rawHistory = Array.isArray(payload.history) ? payload.history : [];
    const history = rawHistory
        .slice(-MAX_HISTORY_TURNS)
        .map((turn) => {
            const entry = turn && typeof turn === "object" ? (turn as Record<string, unknown>) : {};
            const role = entry.role === "assistant" ? "assistant" : "user";
            const content = readString(entry.content).slice(0, MAX_QUESTION_LENGTH * 3);
            return content ? { role: role as "user" | "assistant", content } : null;
        })
        .filter((turn): turn is { role: "user" | "assistant"; content: string } => Boolean(turn));

    try {
        if (await isRateLimited(`ip:${getClientIp(request)}`)) {
            return NextResponse.json(
                { error: "That is a lot of questions. Please try again in a few minutes." },
                { status: 429 }
            );
        }
    } catch (error) {
        console.error("Ask rate limit unavailable", error);
        return NextResponse.json({ error: "Ask is temporarily unavailable." }, { status: 503 });
    }

    const passages = retrievePassages(question);
    const sources = toSources(passages);
    const anthropic = getAnthropic();

    if (!anthropic) {
        return NextResponse.json({
            answer: retrievalOnlyAnswer(passages),
            sources,
            grounded: false,
        });
    }

    try {
        const response = await anthropic.messages.create({
            model: "claude-opus-5",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            output_config: { effort: "low" },
            messages: [
                ...history,
                {
                    role: "user",
                    content: passages.length
                        ? `SOURCES\n${formatContext(passages)}\n\nQUESTION\n${question}`
                        : `SOURCES\n(no matching pages on the site)\n\nQUESTION\n${question}`,
                },
            ],
        });

        if (response.stop_reason === "refusal") {
            return NextResponse.json({
                answer: "I cannot answer that one. Try asking about Robin's projects, writing, or how to get in touch.",
                sources: [],
                grounded: false,
            });
        }

        const answer = response.content
            .filter((block): block is Anthropic.TextBlock => block.type === "text")
            .map((block) => block.text)
            .join("\n")
            .trim();

        if (!answer) {
            return NextResponse.json({
                answer: retrievalOnlyAnswer(passages),
                sources,
                grounded: false,
            });
        }

        return NextResponse.json({ answer, sources, grounded: true });
    } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
            return NextResponse.json(
                { error: "Busy right now. Please try again in a moment." },
                { status: 429 }
            );
        }

        console.error("Ask request failed", error);
        // A model outage shouldn't take the feature down; retrieval still answers.
        return NextResponse.json({
            answer: retrievalOnlyAnswer(passages),
            sources,
            grounded: false,
        });
    }
}

export function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405, headers: { Allow: "POST" } }
    );
}
