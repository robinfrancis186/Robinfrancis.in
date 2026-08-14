"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import BlobMascot, { type MascotMood } from "@/components/ui/BlobMascot";
import { trackEvent } from "@/lib/analytics";

type Source = { title: string; href: string };

type Turn = {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: Source[];
};

const SUGGESTIONS = [
    "What has Robin built?",
    "What is Robin recognised for?",
    "Can Robin speak at our event?",
];

const GREETING: Turn = {
    id: "greeting",
    role: "assistant",
    content:
        "Hi, I'm Robin's site assistant. Ask me about his projects, writing, or recognitions and I'll answer from what's published here.",
};

/** The mascot looks toward the input while you type, and up at its own replies. */
const GAZE_INPUT = { x: 0, y: 0.85 };
const GAZE_ANSWER = { x: 0, y: -0.35 };

const MascotAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [turns, setTurns] = useState<Turn[]>([GREETING]);
    const [draft, setDraft] = useState("");
    const [status, setStatus] = useState<"idle" | "asking" | "error">("idle");
    const [isTyping, setIsTyping] = useState(false);

    const reduceMotion = useReducedMotion();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const launcherRef = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const logRef = useRef<HTMLDivElement | null>(null);
    const turnCounter = useRef(0);

    const mood: MascotMood =
        status === "asking" ? "thinking" : status === "error" ? "sad" : isOpen ? "happy" : "idle";

    const gaze = status === "asking" ? GAZE_ANSWER : isTyping ? GAZE_INPUT : null;

    // Keep the newest turn in view without yanking the whole page around.
    useEffect(() => {
        const log = logRef.current;
        if (log) log.scrollTop = log.scrollHeight;
    }, [turns, status]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    // Escape closes and returns focus to the launcher, the way a dialog should.
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                launcherRef.current?.focus();
            }
        };

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (panelRef.current?.contains(target) || launcherRef.current?.contains(target)) return;
            setIsOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [isOpen]);

    const ask = useCallback(
        async (question: string) => {
            const trimmed = question.trim();
            if (!trimmed || status === "asking") return;

            turnCounter.current += 1;
            const userTurn: Turn = {
                id: `u${turnCounter.current}`,
                role: "user",
                content: trimmed,
            };

            // Snapshot before the state update so the request carries this turn's history.
            const history = turns
                .filter((turn) => turn.id !== "greeting")
                .map((turn) => ({ role: turn.role, content: turn.content }));

            setTurns((current) => [...current, userTurn]);
            setDraft("");
            setStatus("asking");
            trackEvent("assistant_question", { length: trimmed.length });

            try {
                const response = await fetch("/api/ask/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: trimmed, history }),
                });

                const payload = await response.json().catch(() => null);

                if (!response.ok) {
                    throw new Error(payload?.error || "I could not answer that right now.");
                }

                turnCounter.current += 1;
                setTurns((current) => [
                    ...current,
                    {
                        id: `a${turnCounter.current}`,
                        role: "assistant",
                        content: payload?.answer ?? "I could not answer that right now.",
                        sources: Array.isArray(payload?.sources) ? payload.sources : undefined,
                    },
                ]);
                setStatus("idle");
            } catch (error) {
                turnCounter.current += 1;
                setTurns((current) => [
                    ...current,
                    {
                        id: `a${turnCounter.current}`,
                        role: "assistant",
                        content:
                            error instanceof Error
                                ? error.message
                                : "I could not answer that right now.",
                    },
                ]);
                setStatus("error");
                window.setTimeout(() => setStatus("idle"), 2500);
            }
        },
        [status, turns]
    );

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        void ask(draft);
    };

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[5000] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="false"
                        aria-label="Ask about Robin Francis"
                        className="pointer-events-auto flex h-[min(30rem,70vh)] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    >
                        <div className="flex items-center justify-between border-b border-border px-4 py-3">
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    Ask about Robin
                                </p>
                                <p className="text-[0.7rem] text-muted-foreground">
                                    Answers come from this site
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    launcherRef.current?.focus();
                                }}
                                aria-label="Close the assistant"
                                className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div
                            ref={logRef}
                            role="log"
                            aria-live="polite"
                            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
                        >
                            {turns.map((turn) => (
                                <div
                                    key={turn.id}
                                    className={
                                        turn.role === "user" ? "flex justify-end" : "flex justify-start"
                                    }
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                            turn.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">{turn.content}</p>

                                        {turn.sources && turn.sources.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1.5 border-t border-border/60 pt-2">
                                                {turn.sources.map((source) => (
                                                    <a
                                                        key={source.href}
                                                        href={source.href}
                                                        className="rounded-full bg-background/70 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                                    >
                                                        {source.title}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {status === "asking" && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl bg-muted px-3 py-2">
                                        <span className="sr-only">Thinking</span>
                                        <span className="flex gap-1" aria-hidden="true">
                                            {[0, 1, 2].map((dot) => (
                                                <motion.span
                                                    key={dot}
                                                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                                    animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                                                    transition={{
                                                        duration: 1.1,
                                                        repeat: Infinity,
                                                        delay: dot * 0.18,
                                                    }}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {turns.length === 1 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {SUGGESTIONS.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => void ask(suggestion)}
                                            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form onSubmit={onSubmit} className="border-t border-border p-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="assistant-input" className="sr-only">
                                    Ask a question about Robin Francis
                                </label>
                                <input
                                    id="assistant-input"
                                    ref={inputRef}
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    maxLength={400}
                                    autoComplete="off"
                                    placeholder="Ask a question…"
                                    className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!draft.trim() || status === "asking"}
                                    aria-label="Send question"
                                    className="shrink-0 rounded-full bg-primary p-2 text-primary-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                ref={launcherRef}
                type="button"
                onClick={() => {
                    setIsOpen((open) => {
                        if (!open) trackEvent("assistant_open");
                        return !open;
                    });
                }}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close the assistant" : "Ask a question about Robin"}
                className="pointer-events-auto rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
                <BlobMascot size={64} mood={mood} focusTarget={gaze} label="" />
            </button>
        </div>
    );
};

export default MascotAssistant;
