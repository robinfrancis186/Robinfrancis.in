import { SEARCH_DOCUMENTS } from "@/data/searchDocuments";
import type { SearchDocument } from "@/lib/search";
import { awards, mediaKit } from "@/data/profileProof";
import { PROJECT_DETAILS } from "@/data/projectDetails";

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
    explicitlyNamed: boolean;
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
    "would", "you", "your", "francis", "won",
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
    const namedQuery = ` ${normalize(query)} `;

    return SEARCH_DOCUMENTS.map((doc) => ({
        title: doc.title,
        href: doc.href,
        section: doc.section,
        text: `${doc.description} ${doc.content}`.replace(/\s+/g, " ").trim().slice(0, 3000),
        score: scoreDocument(doc, terms),
        explicitlyNamed: doc.type === "Project" && namedQuery.includes(` ${normalize(doc.title)} `),
    }))
        .filter((passage) => passage.score > 0)
        .sort((left, right) => Number(right.explicitlyNamed) - Number(left.explicitlyNamed) || right.score - left.score)
        .slice(0, limit);
}

export function directAnswer(question: string) {
    const generalTerms = termsOf(question).filter(term => !["list", "show", "name", "received"].includes(term));
    if (/^(?:who is (?:he|robin(?: francis)?)|tell me about robin(?: francis)?|introduce robin(?: francis)?)[?.!]*$/i.test(question)) {
        return { answer: mediaKit.shortBio, sources: [{ title: "About Robin Francis", href: "/press-kit/" }] };
    }
    if (/\b(awards?|recognitions?|achievements?|recognised|recognized)\b/i.test(question) && generalTerms.every(term => ["awards", "award", "recognitions", "recognition", "achievements", "achievement", "recognised", "recognized", "known", "famous"].includes(term))) {
        return {
            answer: `Robin's recognitions include ${awards.map(award => `${award.title} (${award.year})`).join("; ")}. The achievements page links the supporting records.`,
            sources: [{ title: "Robin's awards and recognitions", href: "/achievements/#recognition-cards" }],
        };
    }
    if (/\b(projects|built|building)\b/i.test(question) && generalTerms.every(term => ["projects", "project", "built", "build", "building", "work", "created"].includes(term))) {
        return {
            answer: `Robin's projects include ${PROJECT_DETAILS.slice(0, 6).map(project => project.title).join(", ")}. Explore the project pages for their purpose, screenshots, and implementation details.`,
            sources: [{ title: "Robin's projects", href: "/projects/" }],
        };
    }
    return null;
}

export function retrievalAnswer(question: string, passages: RetrievedPassage[]) {
    const best = passages[0];
    if (!best) return { answer: "I could not find that in Robin's site. You can reach him through the contact form.", sources: [{ title: "Contact Robin", href: "/#contact" }] };
    const terms = termsOf(question);
    const sentences = best.text.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [];
    const relevant = sentences.map((sentence, index) => ({ sentence: sentence.trim(), index, score: terms.reduce((sum, term) => sum + countMatches(wordsOf(sentence), term), 0) }))
        .filter(entry => entry.sentence.length >= 40 && entry.sentence.length <= 700 && /[.!?]$/.test(entry.sentence))
        .sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 1);
    return {
        answer: relevant.length ? relevant.map(entry => entry.sentence).join(" ") : `The ${best.title} page has the closest information I could find. I do not have enough detail to give a more specific answer.`,
        sources: [{ title: best.title, href: best.href }],
    };
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
