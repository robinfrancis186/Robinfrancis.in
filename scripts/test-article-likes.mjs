import assert from "node:assert/strict";
import { articleLikes, isArticleSlug } from "../src/lib/articleLikes.ts";
import { STATIC_BLOG_POSTS } from "../src/data/blogPosts.ts";

// Run with: node --experimental-strip-types scripts/test-article-likes.mjs
const slug = STATIC_BLOG_POSTS[0].slug;
assert.equal(isArticleSlug(slug), true);
for (const invalid of [null, {}, "", "../../scores", "not-an-article"]) assert.equal(isArticleSlug(invalid), false);
await assert.rejects(() => articleLikes("../../scores", "reader"), /Unknown article/);

process.env.UPSTASH_REDIS_REST_URL = "https://redis.invalid/";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-only";
const originalFetch = globalThis.fetch;
const sets = new Map();
globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://redis.invalid");
    assert.equal(options.cache, "no-store");
    const [command, script, keyCount, key, reader, action] = JSON.parse(options.body);
    assert.equal(command, "EVAL");
    assert.equal(keyCount, 1);
    assert.equal(key, `article-likes:v1:${slug}`);
    assert.match(script, /SADD/);
    assert.match(script, /SREM/);
    assert.match(script, /SCARD/);
    assert.match(script, /SISMEMBER/);
    const readers = sets.get(key) ?? new Set();
    sets.set(key, readers);
    if (action === "like") readers.add(reader);
    else if (action === "unlike") readers.delete(reader);
    else assert.equal(action, "read");
    return Response.json({ result: [readers.size, Number(readers.has(reader))] });
};
try {
    assert.deepEqual(await articleLikes(slug, "reader-a"), { count: 0, liked: false });
    assert.deepEqual(await articleLikes(slug, "reader-a", true), { count: 1, liked: true });
    assert.deepEqual(await articleLikes(slug, "reader-a", true), { count: 1, liked: true });
    assert.deepEqual(await articleLikes(slug, "reader-b"), { count: 1, liked: false });
    assert.deepEqual(await articleLikes(slug, "reader-b", true), { count: 2, liked: true });
    assert.deepEqual(await articleLikes(slug, "reader-a", false), { count: 1, liked: false });
    assert.deepEqual(await articleLikes(slug, "reader-a", false), { count: 1, liked: false });
    for (const result of [null, [-1, 0], [1.1, 1], [0, 3], ["1", 0]]) {
        globalThis.fetch = async () => Response.json({ result });
        await assert.rejects(() => articleLikes(slug, "reader-a"), /unavailable/);
    }
    globalThis.fetch = async () => Response.json({ error: "storage error" });
    await assert.rejects(() => articleLikes(slug, "reader-a"), /unavailable/);
    globalThis.fetch = async () => { throw new Error("network error"); };
    await assert.rejects(() => articleLikes(slug, "reader-a"), /network error/);
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.KV_REST_API_TOKEN;
    await assert.rejects(() => articleLikes(slug, "reader-a"), /not configured/);
} finally {
    globalThis.fetch = originalFetch;
}
console.log("Article likes checks passed: article allowlist, idempotent writes, shared counts, reader state and storage failures. Redis execution is verified separately against the deployed API.");
