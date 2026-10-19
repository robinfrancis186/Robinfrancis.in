import assert from "node:assert/strict";
import { STATIC_BLOG_POSTS } from "../src/data/blogPosts.ts";
import { BLOG_AUDIO, findBlogAudio } from "../src/data/blogAudio.ts";
import { blogNarrationHash, blogNarrationText } from "../src/lib/blogNarration.ts";

const voices = new Set();
assert.equal(Object.keys(BLOG_AUDIO).length, STATIC_BLOG_POSTS.length);
for (const post of STATIC_BLOG_POSTS) {
    const text = blogNarrationText(post.title, post.content);
    const hash = blogNarrationHash(text);
    const audio = findBlogAudio(post.slug, hash);
    assert.ok(audio, `Missing or stale narration: ${post.slug}`);
    assert.equal(audio.contentHash, hash);
    assert.equal(audio.characters, text.length);
    assert.ok(audio.bytes > 1000);
    const url = new URL(audio.src);
    assert.equal(url.protocol, "https:");
    assert.ok(url.pathname.endsWith(`-${audio.voice}-${hash}.mp3`));
    assert.equal(findBlogAudio(post.slug, "stale"), null);
    voices.add(`${audio.provider}:${audio.voice}`);
}
assert.equal(voices.size, 1);
console.log(`Narration checks passed: ${STATIC_BLOG_POSTS.length} current, versioned recordings with one consistent voice.`);
