export const SEARCH_DOCUMENT_TYPES = [
  "Page",
  "Article",
  "Project",
  "Achievement",
  "Gallery",
  "Resource",
] as const;

export type SearchDocumentType = (typeof SEARCH_DOCUMENT_TYPES)[number];

export type SearchDocument = {
  id: string;
  title: string;
  href: string;
  type: SearchDocumentType;
  section: string;
  description: string;
  content: string;
  keywords?: readonly string[];
  date?: string;
};

export type SearchResult = SearchDocument & {
  score: number;
  excerpt: string;
  matchedTerms: string[];
};

const MAX_RESULTS = 50;
const MAX_TERM_OCCURRENCES = 6;
const MIN_QUERY_LENGTH = 2;

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokenize(value: string) {
  const normalized = normalizeSearchText(value);
  return normalized ? normalized.split(" ") : [];
}

function wordMatchesTerm(word: string, term: string) {
  if (term.length <= 2) {
    return word === term;
  }

  return word === term || word.startsWith(term);
}

function countTermMatches(words: string[], term: string) {
  return words.reduce(
    (count, word) => count + (wordMatchesTerm(word, term) ? 1 : 0),
    0,
  );
}

function compactWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMatch(value: string, query: string, terms: string[]) {
  const compactValue = compactWhitespace(value);
  const lowerValue = compactValue.toLowerCase();
  const lowerQuery = compactWhitespace(query).toLowerCase();
  const phraseEligible = terms.length > 1 || lowerQuery.length > 2;

  if (phraseEligible) {
    const phraseIndex = lowerValue.indexOf(lowerQuery);
    if (phraseIndex >= 0) {
      return { value: compactValue, index: phraseIndex, quality: 0 };
    }
  }

  for (const term of terms) {
    const matcher = new RegExp(`\\b${escapeRegExp(term)}[a-z0-9]*`, "i");
    const match = matcher.exec(compactValue);
    if (match?.index !== undefined) {
      return { value: compactValue, index: match.index, quality: 1 };
    }
  }

  return null;
}

function excerptAround(value: string, matchIndex: number, maxLength = 210) {
  if (value.length <= maxLength) {
    return value;
  }

  const rawStart = Math.max(0, matchIndex - Math.floor(maxLength * 0.35));
  const rawEnd = Math.min(value.length, rawStart + maxLength);
  const firstSpace = value.indexOf(" ", rawStart);
  const lastSpace = value.lastIndexOf(" ", rawEnd);
  const start = rawStart > 0 && firstSpace >= 0 ? firstSpace + 1 : rawStart;
  const end = rawEnd < value.length && lastSpace > start ? lastSpace : rawEnd;

  return `${start > 0 ? "..." : ""}${value.slice(start, end).trim()}${
    end < value.length ? "..." : ""
  }`;
}

export function createSearchExcerpt(document: SearchDocument, query: string) {
  const terms = tokenize(query);
  const candidates = [document.description, document.content]
    .map((value, order) => {
      const match = findMatch(value, query, terms);
      return match ? { ...match, order } : null;
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((left, right) => left.quality - right.quality || left.order - right.order);

  const bestCandidate = candidates[0];
  if (!bestCandidate) {
    return excerptAround(compactWhitespace(document.description), 0);
  }

  return excerptAround(bestCandidate.value, bestCandidate.index);
}

export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
  limit = MAX_RESULTS,
): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const terms = Array.from(new Set(tokenize(normalizedQuery)));
  const phraseEligible = terms.length > 1 || normalizedQuery.length > 2;

  return documents
    .map((document) => {
      const title = normalizeSearchText(document.title);
      const description = normalizeSearchText(document.description);
      const content = normalizeSearchText(document.content);
      const section = normalizeSearchText(document.section);
      const keywords = normalizeSearchText(document.keywords?.join(" ") ?? "");

      const fieldWords = {
        title: tokenize(title),
        description: tokenize(description),
        content: tokenize(content),
        section: tokenize(section),
        keywords: tokenize(keywords),
      };
      const allWords = [
        ...fieldWords.title,
        ...fieldWords.description,
        ...fieldWords.content,
        ...fieldWords.section,
        ...fieldWords.keywords,
      ];

      if (!terms.every((term) => allWords.some((word) => wordMatchesTerm(word, term)))) {
        return null;
      }

      let score = 0;

      if (title === normalizedQuery) {
        score += 180;
      } else if (title.startsWith(normalizedQuery)) {
        score += 100;
      } else if (phraseEligible && title.includes(normalizedQuery)) {
        score += 70;
      }

      if (phraseEligible && keywords.includes(normalizedQuery)) score += 55;
      if (phraseEligible && section.includes(normalizedQuery)) score += 40;
      if (phraseEligible && description.includes(normalizedQuery)) score += 32;
      if (phraseEligible && content.includes(normalizedQuery)) score += 18;

      for (const term of terms) {
        const titleMatches = countTermMatches(fieldWords.title, term);
        const keywordMatches = countTermMatches(fieldWords.keywords, term);
        const sectionMatches = countTermMatches(fieldWords.section, term);
        const descriptionMatches = countTermMatches(fieldWords.description, term);
        const contentMatches = Math.min(
          countTermMatches(fieldWords.content, term),
          MAX_TERM_OCCURRENCES,
        );

        score += titleMatches * 30;
        score += keywordMatches * 18;
        score += sectionMatches * 14;
        score += descriptionMatches * 9;
        score += contentMatches * 3;
      }

      if (terms.every((term) => fieldWords.title.some((word) => wordMatchesTerm(word, term)))) {
        score += 35;
      } else if (
        terms.every((term) =>
          [...fieldWords.title, ...fieldWords.description].some((word) =>
            wordMatchesTerm(word, term),
          ),
        )
      ) {
        score += 18;
      }

      return {
        ...document,
        score,
        excerpt: createSearchExcerpt(document, query),
        matchedTerms: terms,
      } satisfies SearchResult;
    })
    .filter((result): result is SearchResult => Boolean(result))
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, Math.max(0, limit));
}
