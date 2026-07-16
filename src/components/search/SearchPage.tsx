"use client";

import { useDeferredValue, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { SEARCH_DOCUMENTS } from "@/data/searchDocuments";
import { trackEvent } from "@/lib/analytics";
import {
  SEARCH_DOCUMENT_TYPES,
  searchDocuments,
  type SearchDocumentType,
} from "@/lib/search";
import { cn } from "@/lib/utils";

const suggestedQueries = ["AI", "Accessibility", "IEEE", "Local-first", "Community leadership"];
type SearchFilter = "All" | SearchDocumentType;

export function SearchPage({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const [filter, setFilter] = useState<SearchFilter>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => searchDocuments(SEARCH_DOCUMENTS, deferredQuery),
    [deferredQuery],
  );
  const filteredResults = useMemo(
    () => (filter === "All" ? results : results.filter((result) => result.type === filter)),
    [filter, results],
  );
  const hasQuery = deferredQuery.trim().length >= 2;

  const runSearch = (nextQuery: string, location: string) => {
    const trimmedQuery = nextQuery.trim();
    if (trimmedQuery.length < 2) {
      inputRef.current?.focus();
      return;
    }

    trackEvent("site_search", {
      search_term: trimmedQuery,
      result_count: searchDocuments(SEARCH_DOCUMENTS, trimmedQuery).length,
      search_location: location,
    });
    router.replace(`/search/?q=${encodeURIComponent(trimmedQuery)}`, { scroll: false });
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(query, "search_page");
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 text-foreground md:px-8">
      <section className="mx-auto max-w-5xl" aria-labelledby="search-page-heading">
        <p className="text-sm font-medium text-primary">Site search</p>
        <h1 id="search-page-heading" className="mt-3 text-4xl font-bold sm:text-6xl">
          Find Robin&apos;s work
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Projects, writing, achievements, public proof, and visual stories in one index.
        </p>

        <form onSubmit={submitSearch} role="search" className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="search-page-input" className="sr-only">
                Search the website
              </label>
              <input
                ref={inputRef}
                id="search-page-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
                spellCheck="false"
                placeholder="Search the full website"
                className="h-14 w-full rounded-lg border border-input bg-background pl-12 pr-12 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  title="Clear search"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                    router.replace("/search/", { scroll: false });
                    inputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-primary px-7 font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Search
            </button>
          </div>
        </form>

        {!hasQuery ? (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-foreground">Explore topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedQueries.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    runSearch(suggestion, "search_page_suggestion");
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 overflow-x-auto pb-2">
              <div
                role="tablist"
                aria-label="Filter search results"
                className="inline-flex min-w-max rounded-lg border border-border bg-muted/40 p-1"
              >
                {(["All", ...SEARCH_DOCUMENT_TYPES] as SearchFilter[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    role="tab"
                    aria-selected={filter === type}
                    onClick={() => setFilter(type)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-primary",
                      filter === type
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {filteredResults.length} {filteredResults.length === 1 ? "match" : "matches"}
              </p>
            </div>

            {filteredResults.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {filteredResults.map((result, index) => (
                  <li key={result.id}>
                    <SearchResultItem
                      result={result}
                      index={index}
                      onSelect={(selectedResult, selectedIndex) => {
                        trackEvent("search_result_select", {
                          search_term: query.trim(),
                          result_id: selectedResult.id,
                          result_type: selectedResult.type,
                          result_position: selectedIndex + 1,
                          search_location: "search_page",
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-lg border border-border px-5 py-12 text-center">
                <p className="font-semibold">No matching results</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another category or a broader phrase.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
