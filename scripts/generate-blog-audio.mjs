#!/usr/bin/env node
// Narrates blog posts and writes MP3s to public/audio/blog/.
//
//   node --experimental-strip-types scripts/generate-blog-audio.mjs --slug=<slug>
//   node --experimental-strip-types scripts/generate-blog-audio.mjs --all
//   node --experimental-strip-types scripts/generate-blog-audio.mjs --provider=openai --slug=<slug>
//
// Two providers are supported: sarvam (bulbul:v3, voice "aditya") and openai
// (gpt-4o-mini-tts, voice "ash" at speed 1.07, tuned to match aditya's pace).
// Reads SARVAM_API_KEY or OPENAI_API_KEY from .env.local. Posts already having an
// MP3 from the same provider and voice are skipped unless --force is passed, so
// re-runs never spend credit twice on the same text.
//
// The MP3s are gitignored and served from Vercel Blob, so after generating:
//
//   vercel blob put public/audio/blog/<slug>.mp3 --pathname audio/blog/<slug>.mp3
//   node --experimental-strip-types scripts/generate-blog-audio.mjs --manifest-only \
//     --base-url=https://<store>.public.blob.vercel-storage.com
//
// --manifest-only rewrites src/data/blogAudio.ts from the files already on disk
// without calling the API, so pointing the site at the CDN costs no credit.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STATIC_BLOG_POSTS } from '../src/data/blogPosts.ts';
import { stripInlineMarkup } from '../src/lib/inlineMarkup.ts';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const audioDir = path.join(rootDir, 'public/audio/blog');
const manifestPath = path.join(rootDir, 'src/data/blogAudio.ts');

// Two providers so a post can be narrated with whichever account has credit.
// The OpenAI defaults are tuned to match Sarvam's "aditya": measured on the same
// sentence, aditya runs 135 wpm and ash at speed 1.07 runs 134 wpm.
const PROVIDERS = {
  sarvam: {
    endpoint: 'https://api.sarvam.ai/text-to-speech',
    model: 'bulbul:v3',
    maxChars: 2500, // hard API limit per request
    defaultVoice: 'aditya',
    keyEnv: 'SARVAM_API_KEY',
  },
  openai: {
    endpoint: 'https://api.openai.com/v1/audio/speech',
    model: 'gpt-4o-mini-tts',
    maxChars: 4000, // API limit is 4096
    defaultVoice: 'ash',
    defaultSpeed: 1.07,
    keyEnv: 'OPENAI_API_KEY',
    instructions:
      'Speak in Indian English with a warm, measured, reflective tone. Steady pace, calm and sincere, ' +
      'like someone narrating a personal memoir. Do not sound theatrical or newsy.',
  },
};

const SAMPLE_RATE = 24000;

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const providerName = flag('provider', 'sarvam');
const provider = PROVIDERS[providerName];
if (!provider) throw new Error(`Unknown provider "${providerName}". Use sarvam or openai.`);

const MAX_CHARS = provider.maxChars;
const speaker = flag('speaker', provider.defaultVoice);
const speed = Number(flag('speed', provider.defaultSpeed ?? 1));
const language = flag('language', 'en-IN');
const only = flag('slug', null);
const charBudget = Number(flag('max-chars', Infinity));
const force = args.includes('--force');
const manifestOnly = args.includes('--manifest-only');
// Absolute CDN origin for the hosted MP3s. Falls back to the local public/ path,
// which only works when the files are committed.
const baseUrl = flag('base-url', process.env.BLOG_AUDIO_BASE_URL ?? '').replace(/\/$/, '');

const audioUrl = (slug) => `${baseUrl}/audio/blog/${slug}.mp3`;

function readApiKey() {
  const name = provider.keyEnv;
  if (process.env[name]) return process.env[name];
  const envFile = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envFile)) throw new Error(`${name} not set and .env.local is missing`);
  const match = fs.readFileSync(envFile, 'utf8').match(new RegExp(`^${name}=(.+)$`, 'm'));
  if (!match) throw new Error(`${name} not found in .env.local`);
  return match[1].trim();
}

// The narration reads the title, then the body with markdown syntax removed.
// Section headings already sit on their own line, so they read as natural pauses.
function narrationText(post) {
  return stripInlineMarkup(`${post.title}.\n\n${post.content}`)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Split on paragraph boundaries first, then sentences, so chunk seams land in
// natural pauses rather than mid-word.
function chunkText(text) {
  const chunks = [];
  let current = '';

  const flush = () => {
    if (current.trim()) chunks.push(current.trim());
    current = '';
  };

  for (const paragraph of text.split(/\n{2,}/)) {
    const block = paragraph.trim();
    if (!block) continue;

    if (block.length > MAX_CHARS) {
      flush();
      let sentenceRun = '';
      for (const sentence of block.match(/[^.!?]+[.!?]*\s*/g) ?? [block]) {
        if ((sentenceRun + sentence).length > MAX_CHARS) {
          if (sentenceRun.trim()) chunks.push(sentenceRun.trim());
          sentenceRun = '';
        }
        sentenceRun += sentence;
      }
      if (sentenceRun.trim()) chunks.push(sentenceRun.trim());
      continue;
    }

    if ((current ? current.length + 2 : 0) + block.length > MAX_CHARS) flush();
    current = current ? `${current}\n\n${block}` : block;
  }

  flush();
  return chunks;
}

class QuotaError extends Error {}

function requestFor(apiKey, text) {
  if (providerName === 'openai') {
    return {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: {
        model: provider.model,
        voice: speaker,
        input: text,
        instructions: provider.instructions,
        response_format: 'mp3',
        speed,
      },
    };
  }

  return {
    headers: { 'api-subscription-key': apiKey, 'Content-Type': 'application/json' },
    body: {
      text,
      target_language_code: language,
      model: provider.model,
      speaker,
      output_audio_codec: 'mp3',
      speech_sample_rate: SAMPLE_RATE,
    },
  };
}

async function synthesize(apiKey, text, attempt = 1) {
  const { headers, body } = requestFor(apiKey, text);
  const response = await fetch(provider.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    // OpenAI streams raw audio; Sarvam returns base64 chunks in JSON.
    if (providerName === 'openai') {
      return Buffer.from(await response.arrayBuffer());
    }
    const payload = await response.json();
    return Buffer.concat(payload.audios.map((audio) => Buffer.from(audio, 'base64')));
  }

  const errorText = await response.text();

  // 402/403 here means the credit ran out, so stop rather than burn retries.
  if (response.status === 402 || /quota|credit|insufficient|exhaust/i.test(errorText)) {
    throw new QuotaError(`credit exhausted (${response.status}): ${errorText.slice(0, 200)}`);
  }

  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    const waitMs = 2000 * attempt;
    console.log(`      retry ${attempt} after ${waitMs}ms (${response.status})`);
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    return synthesize(apiKey, text, attempt + 1);
  }

  throw new Error(`${response.status}: ${errorText.slice(0, 300)}`);
}

function writeManifest(entries) {
  const rows = Object.entries(entries)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([slug, meta]) =>
        `    "${slug}": {\n        src: "${meta.src}",\n        bytes: ${meta.bytes},\n        characters: ${meta.characters},\n        voice: "${meta.voice}",\n        provider: "${meta.provider ?? 'sarvam'}",\n    },`
    )
    .join('\n');

  fs.writeFileSync(
    manifestPath,
    `// Generated by scripts/generate-blog-audio.mjs. Do not edit by hand.\n` +
      `export type BlogAudio = {\n    src: string;\n    bytes: number;\n    characters: number;\n    voice: string;\n    provider: string;\n};\n\n` +
      `export const BLOG_AUDIO: Record<string, BlogAudio> = {\n${rows}\n};\n\n` +
      `export function findBlogAudio(slug?: string) {\n    return slug ? BLOG_AUDIO[slug] ?? null : null;\n}\n`
  );
}

function loadManifest() {
  if (!fs.existsSync(manifestPath)) return {};
  const source = fs.readFileSync(manifestPath, 'utf8');
  const entries = {};
  for (const match of source.matchAll(
    /"([^"]+)":\s*\{\s*src:\s*"([^"]+)",\s*bytes:\s*(\d+),\s*characters:\s*(\d+),\s*voice:\s*"([^"]+)",(?:\s*provider:\s*"([^"]+)",)?/g
  )) {
    entries[match[1]] = {
      src: match[2],
      bytes: Number(match[3]),
      characters: Number(match[4]),
      voice: match[5],
      provider: match[6] ?? 'sarvam',
    };
  }
  return entries;
}

async function main() {
  const apiKey = readApiKey();
  fs.mkdirSync(audioDir, { recursive: true });

  const manifest = loadManifest();
  const queue = only ? STATIC_BLOG_POSTS.filter((post) => post.slug === only) : STATIC_BLOG_POSTS;

  if (only && queue.length === 0) throw new Error(`No post with slug "${only}"`);

  // Repoint the manifest at whatever host now serves the files. No API calls.
  if (manifestOnly) {
    let repointed = 0;
    for (const post of STATIC_BLOG_POSTS) {
      const localPath = path.join(audioDir, `${post.slug}.mp3`);
      if (!fs.existsSync(localPath)) continue;
      manifest[post.slug] = {
        src: audioUrl(post.slug),
        bytes: fs.statSync(localPath).size,
        characters: narrationText(post).length,
        voice: manifest[post.slug]?.voice ?? speaker,
        provider: manifest[post.slug]?.provider ?? providerName,
      };
      repointed += 1;
    }
    writeManifest(manifest);
    console.log(`\n🔗 manifest rewritten for ${repointed} post(s) → ${baseUrl || '(local /audio/blog)'}\n`);
    return;
  }

  let spent = 0;
  let stopped = null;

  console.log(`\n🎙  ${providerName} ${provider.model} · voice "${speaker}" · speed ${speed}\n`);

  for (const post of queue) {
    const outPath = path.join(audioDir, `${post.slug}.mp3`);

    const existing = manifest[post.slug];
    if (!force && fs.existsSync(outPath) && existing?.voice === speaker && existing?.provider === providerName) {
      console.log(`⏭  ${post.slug} — already generated, skipping`);
      continue;
    }

    const text = narrationText(post);
    const chunks = chunkText(text);

    if (spent + text.length > charBudget) {
      stopped = `character budget (${charBudget}) would be exceeded by ${post.slug}`;
      break;
    }

    console.log(`▶  ${post.slug}\n   ${text.length.toLocaleString()} chars in ${chunks.length} chunk(s)`);

    const parts = [];
    try {
      for (const [index, chunk] of chunks.entries()) {
        process.stdout.write(`   chunk ${index + 1}/${chunks.length} (${chunk.length} chars) ... `);
        const audio = await synthesize(apiKey, chunk);
        parts.push(audio);
        spent += chunk.length;
        console.log(`${(audio.length / 1024).toFixed(0)}KB`);
      }
    } catch (error) {
      if (error instanceof QuotaError) {
        stopped = error.message;
        console.log(`\n⛔ ${error.message}`);
        break;
      }
      throw error;
    }

    const mp3 = Buffer.concat(parts);
    fs.writeFileSync(outPath, mp3);
    manifest[post.slug] = {
      src: audioUrl(post.slug),
      bytes: mp3.length,
      characters: text.length,
      voice: speaker,
      provider: providerName,
    };
    writeManifest(manifest);
    console.log(`✅ ${outPath.replace(rootDir + '/', '')} — ${(mp3.length / 1024 / 1024).toFixed(2)}MB\n`);
  }

  writeManifest(manifest);
  console.log(`\n📊 characters sent this run: ${spent.toLocaleString()}`);
  console.log(`   posts with audio: ${Object.keys(manifest).length}/${STATIC_BLOG_POSTS.length}`);
  if (stopped) console.log(`   stopped early — ${stopped}`);
}

main().catch((error) => {
  console.error(`\n❌ ${error.message}`);
  process.exit(1);
});
