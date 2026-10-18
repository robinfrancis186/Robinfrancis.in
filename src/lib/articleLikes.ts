import { STATIC_BLOG_POSTS } from "../data/blogPosts.ts";

export type ArticleLikes = { count: number; liked: boolean };

export const isArticleSlug = (slug: unknown): slug is string =>
    typeof slug === "string" && STATIC_BLOG_POSTS.some(post => post.slug === slug);

export async function articleLikes(slug: string, reader: string, liked?: boolean): Promise<ArticleLikes> {
    if (!isArticleSlug(slug)) throw new Error("Unknown article");
    const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
    if (!url || !token) throw new Error("Like storage is not configured");
    const response = await fetch(url.replace(/\/$/, ""), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", `
            if ARGV[2] == 'like' then redis.call('SADD', KEYS[1], ARGV[1]) end
            if ARGV[2] == 'unlike' then redis.call('SREM', KEYS[1], ARGV[1]) end
            return {redis.call('SCARD', KEYS[1]), redis.call('SISMEMBER', KEYS[1], ARGV[1])}
        `, 1, `article-likes:v1:${slug}`, reader, liked === undefined ? "read" : liked ? "like" : "unlike"]),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
    });
    const data = await response.json() as { result?: [number, number]; error?: string };
    if (!response.ok || data.error || !Array.isArray(data.result)
        || !Number.isSafeInteger(data.result[0]) || data.result[0] < 0
        || ![0, 1].includes(data.result[1])) throw new Error("Like storage is unavailable");
    return { count: data.result[0], liked: data.result[1] === 1 };
}
