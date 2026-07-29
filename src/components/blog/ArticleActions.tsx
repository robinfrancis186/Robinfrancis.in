import { useEffect, useMemo, useRef, useState } from "react";
import { Link2, Pause, Play, RotateCcw, RotateCw, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type ListenState = "idle" | "playing" | "paused";
type PlaybackRate = 0.85 | 1 | 1.25 | 1.5;

type ArticleActionsProps = {
    title: string;
    text: string;
    articleSlug?: string;
    shareUrl?: string;
    className?: string;
};

type ShareCapableNavigator = Navigator & {
    share?: (data: ShareData) => Promise<void>;
    clipboard?: Clipboard;
};

const WORDS_PER_MINUTE = 150;
const PLAYBACK_RATES: PlaybackRate[] = [1, 1.25, 1.5, 0.85];
const SEEK_SECONDS = 15;
const NATURAL_SPEECH_RATE = 0.94;
const NATURAL_SPEECH_PITCH = 0.98;
const VOICE_LOAD_TIMEOUT_MS = 800;
const PREFERRED_MALE_VOICE_NAMES = [
    "microsoft prabhat online",
    "prabhat",
    "aman",
    "rishi",
    "microsoft ryan online",
    "microsoft guy online",
    "microsoft christopher online",
    "microsoft eric online",
    "microsoft andrew online",
    "google uk english male",
    "google us english male",
    "daniel",
    "arthur",
    "oliver",
    "jamie",
    "eddy",
    "reed",
    "aaron",
    "evan",
    "alex",
];
const FEMALE_VOICE_NAMES = [
    "aria",
    "ava",
    "hazel",
    "heera",
    "jenny",
    "karen",
    "libby",
    "maisie",
    "moira",
    "natasha",
    "samantha",
    "serena",
    "sonia",
    "susan",
    "tessa",
    "veena",
    "victoria",
    "zira",
];
const LOW_QUALITY_VOICE_NAMES = ["compact", "espeak", "festival", "novelty", "robot"];

function voiceNameMatches(name: string, candidate: string) {
    if (candidate.includes(" ")) {
        return name.includes(candidate);
    }

    return name.split(/[^a-z]+/).includes(candidate);
}

function tokenize(text: string) {
    return text.trim().split(/\s+/).filter(Boolean);
}

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function estimateAudioSeconds(wordCount: number, rate: PlaybackRate) {
    return Math.max(30, Math.ceil((wordCount / (WORDS_PER_MINUTE * rate * NATURAL_SPEECH_RATE)) * 60));
}

function getShareUrl(shareUrl?: string) {
    if (shareUrl) {
        return shareUrl;
    }

    return window.location.href;
}

async function copyText(value: string) {
    const browserNavigator = navigator as ShareCapableNavigator;

    if (browserNavigator.clipboard?.writeText) {
        await browserNavigator.clipboard.writeText(value);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

function selectBestVoice(voices: SpeechSynthesisVoice[]) {
    const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));

    return englishVoices
        .map((voice) => {
            const name = voice.name.toLowerCase();
            const language = voice.lang.toLowerCase();
            const preferredIndex = PREFERRED_MALE_VOICE_NAMES.findIndex((preferredName) =>
                voiceNameMatches(name, preferredName)
            );
            let score = 0;

            if (language === "en-in") score += 220;
            if (language === "en-gb") score += 100;
            if (language === "en-au") score += 85;
            if (language === "en-ie") score += 80;
            if (language === "en-us") score += 70;
            if (preferredIndex >= 0) score += 520 - preferredIndex * 16;
            if (name.includes("male")) score += 320;
            if (name.includes("natural")) score += 150;
            if (name.includes("neural")) score += 140;
            if (name.includes("premium")) score += 110;
            if (name.includes("enhanced")) score += 100;
            if (name.includes("online")) score += 70;
            if (FEMALE_VOICE_NAMES.some((femaleName) => voiceNameMatches(name, femaleName))) score -= 700;
            if (name.includes("female")) score -= 700;
            if (LOW_QUALITY_VOICE_NAMES.some((lowQualityName) => voiceNameMatches(name, lowQualityName))) {
                score -= 250;
            }
            if (voice.default) score += 10;

            return { voice, score };
        })
        .sort((a, b) => b.score - a.score)[0]?.voice;
}

function waitForPreferredVoice(speechSynthesis: SpeechSynthesis, signal: AbortSignal) {
    const immediateVoice = selectBestVoice(speechSynthesis.getVoices());

    if (immediateVoice || signal.aborted) {
        return Promise.resolve(immediateVoice);
    }

    return new Promise<SpeechSynthesisVoice | undefined>((resolve) => {
        let timeoutId: number | undefined;

        const cleanup = () => {
            speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            signal.removeEventListener("abort", handleAbort);
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };

        const finish = (voice?: SpeechSynthesisVoice) => {
            cleanup();
            resolve(voice);
        };

        const handleVoicesChanged = () => {
            const voice = selectBestVoice(speechSynthesis.getVoices());
            if (voice) {
                finish(voice);
            }
        };

        const handleAbort = () => finish();

        speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
        signal.addEventListener("abort", handleAbort, { once: true });
        timeoutId = window.setTimeout(
            () => finish(selectBestVoice(speechSynthesis.getVoices())),
            VOICE_LOAD_TIMEOUT_MS
        );
    });
}

const ArticleActions = ({ title, text, articleSlug, shareUrl, className }: ArticleActionsProps) => {
    const [listenState, setListenState] = useState<ListenState>("idle");
    const [shareStatus, setShareStatus] = useState("");
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1);
    const [supportsNativeShare, setSupportsNativeShare] = useState(false);
    const mountedRef = useRef(true);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
    const voiceRequestAbortRef = useRef<AbortController | null>(null);
    const speechRequestRef = useRef(0);
    const elapsedRef = useRef(0);
    const timerRef = useRef<number | null>(null);
    const articleWords = useMemo(() => tokenize(`${title}. ${text}`), [title, text]);
    const totalSeconds = useMemo(() => estimateAudioSeconds(articleWords.length, playbackRate), [articleWords.length, playbackRate]);
    const isActive = listenState !== "idle";

    useEffect(() => {
        elapsedRef.current = elapsedSeconds;
    }, [elapsedSeconds]);

    useEffect(() => {
        mountedRef.current = true;
        setSupportsNativeShare(typeof (navigator as ShareCapableNavigator).share === "function");

        return () => {
            mountedRef.current = false;
            speechRequestRef.current += 1;
            voiceRequestAbortRef.current?.abort();
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
            }
            window.speechSynthesis?.cancel();
        };
    }, []);

    useEffect(() => {
        if (typeof window.speechSynthesis?.getVoices !== "function") {
            return;
        }

        const loadVoice = () => {
            selectedVoiceRef.current = selectBestVoice(window.speechSynthesis.getVoices()) ?? null;
        };

        loadVoice();
        window.speechSynthesis.addEventListener("voiceschanged", loadVoice);

        return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoice);
    }, []);

    const clearTimer = () => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer();
        timerRef.current = window.setInterval(() => {
            setElapsedSeconds((current) => {
                const next = Math.min(totalSeconds, current + 1);
                elapsedRef.current = next;
                return next;
            });
        }, 1000);
    };

    const speakFrom = async (seconds: number, rate: PlaybackRate = playbackRate) => {
        if (
            typeof window.speechSynthesis?.speak !== "function" ||
            typeof window.SpeechSynthesisUtterance !== "function"
        ) {
            setShareStatus("Audio playback is not supported in this browser.");
            return;
        }

        const requestId = speechRequestRef.current + 1;
        speechRequestRef.current = requestId;
        voiceRequestAbortRef.current?.abort();
        const voiceRequestAbort = new AbortController();
        voiceRequestAbortRef.current = voiceRequestAbort;
        const bestVoice =
            selectedVoiceRef.current ??
            await waitForPreferredVoice(window.speechSynthesis, voiceRequestAbort.signal);

        if (!mountedRef.current || requestId !== speechRequestRef.current || voiceRequestAbort.signal.aborted) {
            return;
        }

        selectedVoiceRef.current = bestVoice ?? null;
        voiceRequestAbortRef.current = null;
        const safeSeconds = Math.min(Math.max(seconds, 0), totalSeconds);
        const wordsPerSecond = (WORDS_PER_MINUTE * rate * NATURAL_SPEECH_RATE) / 60;
        const startWord = Math.min(articleWords.length - 1, Math.floor(safeSeconds * wordsPerSecond));
        const spokenText = articleWords.slice(Math.max(0, startWord)).join(" ");

        window.speechSynthesis.cancel();
        clearTimer();
        setElapsedSeconds(safeSeconds);

        const utterance = new window.SpeechSynthesisUtterance(spokenText || `${title}. ${text}`);
        if (bestVoice) {
            utterance.voice = bestVoice;
        }
        utterance.lang = bestVoice?.lang ?? "en-IN";
        utterance.rate = rate * NATURAL_SPEECH_RATE;
        utterance.pitch = NATURAL_SPEECH_PITCH;
        utterance.volume = 1;
        utterance.onend = () => {
            if (mountedRef.current) {
                clearTimer();
                setElapsedSeconds(0);
                setListenState("idle");
            }
        };
        utterance.onerror = () => {
            if (mountedRef.current) {
                clearTimer();
                setListenState("idle");
                setShareStatus("Unable to play this article right now.");
            }
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setListenState("playing");
        startTimer();
    };

    const handleListen = () => {
        if (listenState === "playing") {
            window.speechSynthesis.pause();
            clearTimer();
            setListenState("paused");
            return;
        }

        if (listenState === "paused") {
            window.speechSynthesis.resume();
            setListenState("playing");
            startTimer();
            return;
        }

        trackEvent("article_audio_play", {
            article_title: title,
            article_slug: articleSlug,
            playback_rate: playbackRate,
        });
        void speakFrom(elapsedRef.current);
    };

    const handleSeek = (direction: -1 | 1) => {
        const nextElapsed = elapsedRef.current + direction * SEEK_SECONDS;
        void speakFrom(nextElapsed);
    };

    const handleSpeedChange = () => {
        const currentIndex = PLAYBACK_RATES.indexOf(playbackRate);
        const nextRate = PLAYBACK_RATES[(currentIndex + 1) % PLAYBACK_RATES.length];
        setPlaybackRate(nextRate);

        if (listenState === "playing") {
            void speakFrom(elapsedRef.current, nextRate);
        }
    };

    const handleShare = async () => {
        const url = getShareUrl(shareUrl);
        const payload = {
            title,
            text: `Read ${title} by Robin Francis`,
            url,
        };

        try {
            const browserNavigator = navigator as ShareCapableNavigator;

            if (browserNavigator.share) {
                await browserNavigator.share(payload);
                trackEvent("article_share_click", {
                    article_title: title,
                    article_slug: articleSlug,
                    share_method: "native",
                    share_status: "success",
                });
                return;
            }

            await copyText(url);
            trackEvent("article_share_click", {
                article_title: title,
                article_slug: articleSlug,
                share_method: "copy_link",
                share_status: "success",
            });
            setShareStatus("Link copied");
            window.setTimeout(() => {
                if (mountedRef.current) {
                    setShareStatus("");
                }
            }, 2000);
        } catch {
            trackEvent("article_share_click", {
                article_title: title,
                article_slug: articleSlug,
                share_method: supportsNativeShare ? "native" : "copy_link",
                share_status: "cancelled_or_failed",
            });
            setShareStatus("Share was cancelled.");
            window.setTimeout(() => {
                if (mountedRef.current) {
                    setShareStatus("");
                }
            }, 2000);
        }
    };

    const listenLabel = listenState === "playing" ? "Pause article" : listenState === "paused" ? "Resume article" : "Listen to article";
    const ListenIcon = listenState === "playing" ? Pause : Play;
    const speedLabel = playbackRate === 1 ? "1x" : `${playbackRate}x`;

    return (
        <div
            className={cn(
                "my-10 border-y border-neutral-200 py-5 dark:border-neutral-800",
                className
            )}
        >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        onClick={handleListen}
                        className={cn(
                            "inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
                            isActive ? "h-12 w-12" : "h-10 w-10"
                        )}
                        aria-label={listenLabel}
                        aria-pressed={listenState === "playing"}
                    >
                        <ListenIcon className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                    </button>

                    {!isActive && (
                        <>
                            <span className="font-medium text-neutral-800 dark:text-neutral-100">Listen to article</span>
                            <span className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
                            <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">{formatTime(totalSeconds)}</span>
                        </>
                    )}

                    {isActive && (
                        <>
                            <span className="min-w-14 font-mono text-lg text-neutral-900 dark:text-neutral-100">
                                {formatTime(elapsedSeconds)}
                            </span>
                            <span className="h-7 w-px bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
                            <button
                                type="button"
                                onClick={() => handleSeek(-1)}
                                className="group inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-900"
                                aria-label="Go back 15 seconds"
                            >
                                <span className="relative">
                                    <RotateCcw className="h-5 w-5" aria-hidden="true" />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] text-[9px] font-bold leading-none">15</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSeek(1)}
                                className="group inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-900"
                                aria-label="Go forward 15 seconds"
                            >
                                <span className="relative">
                                    <RotateCw className="h-5 w-5" aria-hidden="true" />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] text-[9px] font-bold leading-none">15</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={handleSpeedChange}
                                className="inline-flex min-w-16 items-center justify-center rounded-2xl border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-neutral-950"
                                aria-label={`Playback speed ${speedLabel}`}
                            >
                                {speedLabel}
                            </button>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex w-fit items-center gap-3 text-base font-semibold text-neutral-800 transition-colors hover:text-primary dark:text-neutral-100"
                >
                    {supportsNativeShare ? <Share2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    Share
                </button>
            </div>

            <p className="mt-3 min-h-5 text-sm text-neutral-500 dark:text-neutral-400" aria-live="polite">
                {shareStatus}
            </p>
        </div>
    );
};

export default ArticleActions;
