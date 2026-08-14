import { SEARCH_DOCUMENTS } from "@/data/searchDocuments";
import type { SearchDocument } from "@/lib/search";

/**
 * Retrieval for the assistant. The site search in `search.ts` requires every
 * term to match, which is right for a search box and wrong for a question:
 * "what awards has Robin won?" would match nothing. This scores loosely over
 * the same corpus so a natural-language question still finds its sources.
 */

export type RetrievedPassage = {
    title: string;
    href: string;
    section: string;
    text: string;
    score: number;
};

/** Question words and filler that would otherwise dominate the term list. */
const STOPWORDS = new Set([
    "a", "about", "all", "am", "an", "and", "any", "are", "as", "at", "be",
    "been", "but", "by", "can", "could", "did", "do", "does", "for", "from",
    "get", "given", "had", "has", "have", "he", "her", "him", "his", "how", "i",
    "if", "in", "into", "is", "it", "its", "just", "know", "like", "me", "more",
    "most", "much", "my", "of", "on", "one", "or", "other", "our", "out", "over",
    "please", "robin", "robins", "said", "say", "should", "so", "some", "tell",
    "than", "that", "the", "their", "them", "then", "there", "these", "they",
    "this", "those", "to", "under", "up", "us", "use", "was", "we", "were",
    "what", "whats", "when", "where", "which", "who", "why", "will", "with",
    "would", "you", "your",
]);

const normalize = (value: string) =>
    value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

const termsOf = (query: string) => {
    const all = normalize(query).split(" ").filter(Boolean);
    const meaningful = all.filter((term) => term.length > 2 && !STOPWORDS.has(term));
    // A question made entirely of stopwords ("who is he?") still deserves a shot.
    return Array.from(new Set(meaningful.length ? meaningful : all));
};

/**
 * Whole-word (or prefix) matching, not substring. Substring matching lets an
 * incidental word inside a long title outrank a directly relevant page:
 * "what has Robin built?" scoring a post titled "…That Built Me" over Projects.
 */
const wordsOf = (value: string) => normalize(value).split(" ").filter(Boolean);

/** Shared-prefix length needed to treat two words as the same root. */
const STEM_PREFIX = 6;

const sharedPrefixLength = (a: string, b: string) => {
    const max = Math.min(a.length, b.length);
    let i = 0;
    while (i < max && a[i] === b[i]) i += 1;
    return i;
};

/**
 * 1 for an exact or prefix hit, 0.6 for a shared root, 0 otherwise. The partial
 * tier is what connects a visitor's wording to the site's, mapping "recognised"
 * to "recognition", without pulling in a stemmer for a corpus this small.
 */
const matchStrength = (word: string, term: string) => {
    if (word === term || word.startsWith(term)) return 1;
    return sharedPrefixLength(word, term) >= STEM_PREFIX ? 0.6 : 0;
};

const countMatches = (words: string[], term: string) =>
    words.reduce((count, word) => count + matchStrength(word, term), 0);

const scoreDocument = (doc: SearchDocument, terms: string[]) => {
    const fields = {
        title: wordsOf(doc.title),
        keywords: wordsOf((doc.keywords ?? []).join(" ")),
        section: wordsOf(doc.section),
        description: wordsOf(doc.description),
        content: wordsOf(doc.content),
    };

    let score = 0;
    let hits = 0;

    for (const term of terms) {
        let termScore = 0;
        if (countMatches(fields.title, term)) termScore += 26;
        if (countMatches(fields.keywords, term)) termScore += 18;
        if (countMatches(fields.section, term)) termScore += 12;
        if (countMatches(fields.description, term)) termScore += 8;

        // Repeats matter a little, but a long document shouldn't win on length.
        const contentMatches = countMatches(fields.content, term);
        if (contentMatches) termScore += 3 + Math.min(contentMatches, 5);

        if (termScore > 0) hits += 1;
        score += termScore;
    }

    // Reward documents that cover more of the question, not just one term loudly.
    return hits === 0 ? 0 : score * (1 + (hits - 1) * 0.35);
};

/** Top passages for a question, trimmed to a budget the model can read cheaply. */
export function retrievePassages(query: string, limit = 6): RetrievedPassage[] {
    const terms = termsOf(query);
    if (!terms.length) return [];

    return SEARCH_DOCUMENTS.map((doc) => ({
        title: doc.title,
        href: doc.href,
        section: doc.section,
        text: `${doc.description} ${doc.content}`.replace(/\s+/g, " ").trim().slice(0, 1200),
        score: scoreDocument(doc, terms),
    }))
        .filter((passage) => passage.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);
}

/** The retrieved passages as a single block for the model's context. */
export function formatContext(passages: RetrievedPassage[]) {
    return passages
        .map(
            (passage, index) =>
                `[${index + 1}] ${passage.title} (${passage.section}) at ${passage.href}\n${passage.text}`
        )
        .join("\n\n");
}
