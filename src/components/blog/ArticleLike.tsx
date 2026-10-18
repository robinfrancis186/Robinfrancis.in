"use client";

import { useEffect, useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { ArticleLikes } from "@/lib/articleLikes";

async function requestLikes(slug: string, liked?: boolean, signal?: AbortSignal): Promise<ArticleLikes> {
    const response = await fetch(`/api/article-likes/?slug=${encodeURIComponent(slug)}`, {
        method: liked === undefined ? "GET" : "POST",
        headers: liked === undefined ? undefined : { "Content-Type": "application/json" },
        body: liked === undefined ? undefined : JSON.stringify({ slug, liked }),
        cache: "no-store", signal: signal ?? AbortSignal.timeout(8000),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Couldn't load likes. Please try again.");
    return data;
}

export default function ArticleLike({ slug }: { slug: string }) {
    const [value, setValue] = useState<ArticleLikes | null>(null);
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        let disposed = false;
        void requestLikes(slug, undefined, controller.signal).then(
            data => { if (!disposed) setValue(data); },
            () => { if (!disposed) setError("Couldn't load likes. Try again."); },
        ).finally(() => { if (!disposed) setBusy(false); });
        return () => { disposed = true; clearTimeout(timer); controller.abort(); };
    }, [slug]);

    async function handleClick() {
        if (busy) return;
        setBusy(true);
        setError("");
        try {
            const next = await requestLikes(slug, value ? !value.liked : undefined);
            setValue(next);
            if (value) trackEvent("article_like", { article_slug: slug, liked: next.liked });
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Couldn't save your like. Try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex max-w-64 flex-col items-start gap-2">
            <button
                type="button"
                onClick={handleClick}
                disabled={busy}
                aria-pressed={value?.liked ?? false}
                aria-busy={busy}
                aria-label={value ? `${value.liked ? "Unlike" : "Like"} this article, ${value.count} ${value.count === 1 ? "like" : "likes"}` : busy ? "Loading likes" : "Retry loading likes"}
                className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60",
                    value?.liked ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300" : "border-neutral-300 text-neutral-800 hover:border-rose-400 hover:text-rose-600 dark:border-neutral-700 dark:text-neutral-100 dark:hover:text-rose-300",
                )}
            >
                {busy ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Heart className="h-4 w-4" fill={value?.liked ? "currentColor" : "none"} aria-hidden="true" />}
                {value ? value.liked ? "Liked" : "Like" : busy ? "Likes" : "Retry likes"}
                {value && <span className="tabular-nums" aria-hidden="true">{value.count}</span>}
            </button>
            <span className="sr-only" role="status">{value ? `${value.count} ${value.count === 1 ? "like" : "likes"}${value.liked ? ". You liked this article." : "."}` : ""}</span>
            {error && <p className="text-xs text-neutral-600 dark:text-neutral-400" role="alert">{error}</p>}
        </div>
    );
}
