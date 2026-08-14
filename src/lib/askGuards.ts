/**
 * Input and output guards for the visitor assistant.
 *
 * The endpoint is public and spends money per call, so the cheap checks all
 * happen before the model is ever reached: anything that is abusive, obviously
 * off-topic, or answerable from retrieval alone never becomes a paid request.
 */

/** Attempts to talk to the system prompt rather than about Robin. */
const INJECTION_PATTERNS: RegExp[] = [
    /ignore\s+(all\s+|any\s+|the\s+)?(previous|prior|above|earlier)\s+(instruction|prompt|rule|direction)/i,
    /disregard\s+(all\s+|any\s+|the\s+)?(previous|prior|above|earlier)/i,
    /(reveal|show|print|repeat|output|dump)\s+(me\s+)?(your|the)\s+(system\s+)?(prompt|instruction|rule)/i,
    /what\s+(is|are)\s+your\s+(system\s+)?(prompt|instructions)/i,
    /you\s+are\s+now\s+(a|an|no longer)/i,
    /(act|behave|pretend|roleplay)\s+as\s+(if\s+you\s+are\s+)?(a|an)\s/i,
    /\b(developer|system|admin)\s+mode\b/i,
    /forget\s+(everything|all|your\s+instructions)/i,
    /<\s*\/?\s*(system|instructions?)\s*>/i,
];

/** Things this assistant has no business doing, however it is asked. */
const OFF_TASK_PATTERNS: RegExp[] = [
    /\bwrite\s+(me\s+)?(a\s+)?(essay|poem|song|story|script|code|program|function)\b/i,
    /\b(translate|summarise|summarize)\s+this\b/i,
    /\b(solve|calculate|compute)\b.*\b(equation|integral|homework)\b/i,
    /\bhow\s+do\s+i\s+(hack|exploit|bypass)\b/i,
];

export type GuardVerdict =
    | { ok: true; question: string }
    | { ok: false; reason: "empty" | "too_long" | "injection" | "off_task"; reply: string };

const CANNED = {
    injection:
        "I only answer questions about Robin Francis and what is published on this site. Ask me about his projects, writing, or recognitions.",
    off_task:
        "That is outside what I do. I answer questions about Robin's work using what is published on this site.",
};

/** Strip control characters and collapse whitespace before anything else sees it. */
export const sanitizeQuestion = (raw: string) =>
    raw
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

export function guardQuestion(raw: string, maxLength: number): GuardVerdict {
    const question = sanitizeQuestion(raw);

    if (!question) return { ok: false, reason: "empty", reply: "" };
    if (question.length > maxLength) return { ok: false, reason: "too_long", reply: "" };

    if (INJECTION_PATTERNS.some((pattern) => pattern.test(question))) {
        return { ok: false, reason: "injection", reply: CANNED.injection };
    }

    if (OFF_TASK_PATTERNS.some((pattern) => pattern.test(question))) {
        return { ok: false, reason: "off_task", reply: CANNED.off_task };
    }

    return { ok: true, question };
}

/** Greetings and pleasantries do not need a model call. */
const SMALL_TALK =
    /^(hi|hey|hello|yo|sup|hiya|howdy|good\s+(morning|afternoon|evening)|thanks?|thank\s+you|ty|ok|okay|cool|nice|bye|goodbye)[\s!.?]*$/i;

export const isSmallTalk = (question: string) => SMALL_TALK.test(question);

export const SMALL_TALK_REPLY =
    "Hello. Ask me anything about Robin's projects, writing, or recognitions and I will answer from what is published on this site.";

/**
 * Last line of defence on the way out. The model is instructed not to leak its
 * instructions, but a public endpoint should not depend on that holding.
 */
const LEAK_MARKERS = [/SOURCES\s*\n/i, /^system\s*:/im, /<\/?(system|instructions?)>/i];

export function sanitizeAnswer(answer: string, maxLength = 1200) {
    let cleaned = answer.replace(/<\/?(system|instructions?)[^>]*>/gi, "").trim();

    for (const marker of LEAK_MARKERS) {
        const match = marker.exec(cleaned);
        if (match) cleaned = cleaned.slice(0, match.index).trim();
    }

    if (cleaned.length > maxLength) {
        const cut = cleaned.slice(0, maxLength);
        const lastStop = cut.lastIndexOf(". ");
        cleaned = lastStop > maxLength * 0.5 ? cut.slice(0, lastStop + 1) : `${cut.trim()}...`;
    }

    return cleaned;
}
