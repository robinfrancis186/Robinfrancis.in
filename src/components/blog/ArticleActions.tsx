import { useEffect, useMemo, useRef, useState } from "react";
import { Link2, Pause, Play, RotateCcw, RotateCw, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import ArticleLike from "@/components/blog/ArticleLike";

type ListenState = "idle" | "loading" | "playing" | "paused";
type PlaybackRate = 0.85 | 1 | 1.25 | 1.5;

type ArticleActionsProps = {
    title: string;
    text: string;
    articleSlug?: string;
    shareUrl?: string;
    className?: string;
    /**
     * Pre-generated narration (see scripts/generate-blog-audio.mjs). When present the
     * player streams this file; otherwise it falls back to browser speech synthesis.
     */
    audioSrc?: string;
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

const ArticleActions = ({ title, text, articleSlug, shareUrl, className, audioSrc }: ArticleActionsProps) => {
    const [listenState, setListenState] = useState<ListenState>("idle");
    const [shareStatus, setShareStatus] = useState("");
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1);
    const [supportsNativeShare, setSupportsNativeShare] = useState(false);
    const [narrationSeconds, setNarrationSeconds] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [recordingFailed, setRecordingFailed] = useState(false);
    const hasNarration = Boolean(audioSrc) && !recordingFailed;
    const mountedRef = useRef(true);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
    const voiceRequestAbortRef = useRef<AbortController | null>(null);
    const speechRequestRef = useRef(0);
    const elapsedRef = useRef(0);
    const timerRef = useRef<number | null>(null);
    const articleWords = useMemo(() => tokenize(`${title}. ${text}`), [title, text]);
    const estimatedSeconds = useMemo(() => estimateAudioSeconds(articleWords.length, 1), [articleWords.length]);
    // Real narration reports its own duration once metadata loads; until then the
    // word-count estimate keeps the label from flashing 0:00.
    const totalSeconds = hasNarration && narrationSeconds > 0 ? Math.round(narrationSeconds) : estimatedSeconds;
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
            audioRef.current?.pause();
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

    const startTimer = (rate: PlaybackRate) => {
        clearTimer();
        timerRef.current = window.setInterval(() => {
            setElapsedSeconds((current) => {
                const next = Math.min(totalSeconds, current + rate);
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
            setListenState("idle");
            return;
        }

        const requestId = speechRequestRef.current + 1;
        speechRequestRef.current = requestId;
        const previousUtterance = utteranceRef.current;
        if (previousUtterance) {
            previousUtterance.onend = null;
            previousUtterance.onerror = null;
        }
        utteranceRef.current = null;
        window.speechSynthesis.cancel();
        clearTimer();
        setListenState("loading");
        setShareStatus("Preparing narration…");
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
        const wordsPerSecond = (WORDS_PER_MINUTE * NATURAL_SPEECH_RATE) / 60;
        const startWord = Math.min(articleWords.length - 1, Math.floor(safeSeconds * wordsPerSecond));
        setElapsedSeconds(safeSeconds);
        elapsedRef.current = safeSeconds;
        setShareStatus("");

        let wordIndex = Math.max(0, startWord);
        const playChunk = () => {
        if (requestId !== speechRequestRef.current || !mountedRef.current) return;
        const chunkStart = wordIndex;
        let spokenText = "";
        // Short utterances avoid browsers silently stopping long articles mid-way.
        while (wordIndex < articleWords.length && spokenText.length < 800) {
            spokenText += `${spokenText ? " " : ""}${articleWords[wordIndex++]}`;
        }
        const utterance = new window.SpeechSynthesisUtterance(spokenText);
        if (bestVoice) {
            utterance.voice = bestVoice;
        }
        utterance.lang = bestVoice?.lang ?? "en-IN";
        utterance.rate = rate * NATURAL_SPEECH_RATE;
        utterance.pitch = NATURAL_SPEECH_PITCH;
        utterance.volume = 1;
        utterance.onboundary = (event) => {
            if (utteranceRef.current !== utterance || event.name !== "word") return;
            const position = Math.min(totalSeconds, (chunkStart + tokenize(spokenText.slice(0, event.charIndex)).length) / wordsPerSecond);
            elapsedRef.current = position;
            setElapsedSeconds(position);
        };
        utterance.onend = () => {
            if (mountedRef.current && utteranceRef.current === utterance) {
                if (wordIndex < articleWords.length) { playChunk(); return; }
                utteranceRef.current = null;
                clearTimer();
                setElapsedSeconds(totalSeconds);
                elapsedRef.current = totalSeconds;
                setListenState("idle");
                trackEvent("article_audio_complete", { article_slug: articleSlug, engine: "browser" });
            }
        };
        utterance.onerror = (event) => {
            if (event.error === "canceled" || event.error === "interrupted") return;
            if (mountedRef.current && utteranceRef.current === utterance) {
                utteranceRef.current = null;
                clearTimer();
                setListenState("idle");
                setShareStatus("Unable to play this article right now.");
                trackEvent("article_audio_error", { article_slug: articleSlug, engine: "browser", error: event.error });
            }
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        };
        playChunk();
        setListenState("playing");
        startTimer(rate);
    };

    const handleListen = () => {
        if (hasNarration) {
            const audio = audioRef.current;
            if (!audio) {
                return;
            }

            if (listenState === "playing") {
                audio.pause();
                setListenState("paused");
                return;
            }

            if (listenState === "idle") {
                trackEvent("article_audio_play", {
                    article_title: title,
                    article_slug: articleSlug,
                    playback_rate: playbackRate,
                });
            }

            audio.playbackRate = playbackRate;
            if (audio.ended) audio.currentTime = 0;
            setListenState("loading");
            void audio.play().then(
                () => {
                    setShareStatus("");
                    setListenState(audio.paused ? "paused" : "playing");
                },
                (error: unknown) => {
                    // Pausing or seeking can abort a pending play without a broken recording.
                    if (error instanceof DOMException && error.name === "AbortError") {
                        setListenState(audio.paused ? "paused" : "loading");
                        return;
                    }
                    setRecordingFailed(true);
                    setShareStatus("Saved narration is unavailable. Using your browser voice.");
                    void speakFrom(elapsedRef.current);
                }
            );
            return;
        }

        if (listenState === "playing") {
            speechRequestRef.current += 1;
            voiceRequestAbortRef.current?.abort();
            if (utteranceRef.current) {
                utteranceRef.current.onend = null;
                utteranceRef.current.onerror = null;
            }
            utteranceRef.current = null;
            window.speechSynthesis.cancel();
            clearTimer();
            setListenState("paused");
            return;
        }

        if (listenState === "paused") {
            void speakFrom(elapsedRef.current);
            return;
        }

        trackEvent("article_audio_play", {
            article_title: title,
            article_slug: articleSlug,
            playback_rate: playbackRate,
        });
        void speakFrom(elapsedRef.current >= totalSeconds ? 0 : elapsedRef.current);
    };

    const handleSeek = (direction: -1 | 1) => {
        handleSeekTo(elapsedRef.current + direction * SEEK_SECONDS);
    };

    const handleSeekTo = (seconds: number) => {
        const nextElapsed = Math.min(Math.max(seconds, 0), totalSeconds);
        elapsedRef.current = nextElapsed;
        setElapsedSeconds(nextElapsed);
        if (hasNarration && audioRef.current) {
            if (Number.isFinite(audioRef.current.duration)) audioRef.current.currentTime = Math.min(nextElapsed, audioRef.current.duration);
        } else if (listenState === "playing" || listenState === "loading") {
            void speakFrom(nextElapsed);
        }
    };

    const handleSpeedChange = () => {
        const currentIndex = PLAYBACK_RATES.indexOf(playbackRate);
        const nextRate = PLAYBACK_RATES[(currentIndex + 1) % PLAYBACK_RATES.length];
        setPlaybackRate(nextRate);

        if (hasNarration) {
            if (audioRef.current) {
                audioRef.current.playbackRate = nextRate;
            }
            return;
        }

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

    const listenLabel = listenState === "playing" ? "Pause article" : listenState === "paused" ? "Resume article" : listenState === "loading" ? "Preparing narration" : "Listen to article";
    const ListenIcon = listenState === "playing" ? Pause : Play;
    const speedLabel = playbackRate === 1 ? "1x" : `${playbackRate}x`;

    return (
        <div
            className={cn(
                "my-10 border-y border-neutral-200 py-5 dark:border-neutral-800",
                className
            )}
        >
            {audioSrc && (
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    preload="none"
                    onLoadedMetadata={(event) => setNarrationSeconds(event.currentTarget.duration || 0)}
                    onDurationChange={(event) => { if (Number.isFinite(event.currentTarget.duration)) setNarrationSeconds(event.currentTarget.duration); }}
                    onTimeUpdate={(event) => {
                        if (recordingFailed || event.currentTarget.error) return;
                        const elapsed = Math.floor(event.currentTarget.currentTime);
                        elapsedRef.current = elapsed;
                        setElapsedSeconds(elapsed);
                    }}
                    onPlaying={(event) => { if (!recordingFailed && !event.currentTarget.error) { setListenState("playing"); setShareStatus(""); } }}
                    onWaiting={(event) => { if (!recordingFailed && !event.currentTarget.error) { setListenState("loading"); setShareStatus("Buffering narration…"); } }}
                    onPause={(event) => { if (!recordingFailed && !event.currentTarget.error) setListenState((current) => (current === "playing" ? "paused" : current)); }}
                    onEnded={(event) => {
                        if (recordingFailed || event.currentTarget.error) return;
                        setListenState("idle");
                        setElapsedSeconds(totalSeconds);
                        elapsedRef.current = totalSeconds;
                        trackEvent("article_audio_complete", { article_slug: articleSlug, engine: "recording" });
                    }}
                    onError={() => { setRecordingFailed(true); setShareStatus("Saved narration is unavailable. Press Play to use your browser voice."); }}
                    className="hidden"
                />
            )}
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
                        disabled={listenState === "loading"}
                    >
                        <ListenIcon className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                    </button>

                    {!isActive && (
                        <>
                            <span className="font-medium text-neutral-800 dark:text-neutral-100">Listen to article</span>
                            <span className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
                            <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">{hasNarration && narrationSeconds > 0 ? "" : "About "}{formatTime(totalSeconds)}</span>
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

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                    {articleSlug && <ArticleLike key={articleSlug} slug={articleSlug} />}
                    <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex min-h-11 w-fit items-center gap-3 text-base font-semibold text-neutral-800 transition-colors hover:text-primary dark:text-neutral-100"
                    >
                        {supportsNativeShare ? <Share2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                        Share
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{formatTime(elapsedSeconds)}</span>
                <input
                    type="range"
                    min={0}
                    max={totalSeconds}
                    step={1}
                    value={Math.min(elapsedSeconds, totalSeconds)}
                    onChange={(event) => handleSeekTo(Number(event.currentTarget.value))}
                    aria-label="Article playback position"
                    className="h-6 w-full cursor-pointer accent-primary"
                />
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    {hasNarration && narrationSeconds > 0 ? "−" : "About "}{formatTime(Math.max(0, totalSeconds - elapsedSeconds) / playbackRate)} remaining
                </span>
            </div>

            <p className="mt-3 min-h-5 text-sm text-neutral-500 dark:text-neutral-400" aria-live="polite">
                {shareStatus}
            </p>
        </div>
    );
};

export default ArticleActions;
