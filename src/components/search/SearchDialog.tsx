"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { SEARCH_DOCUMENTS } from "@/data/searchDocuments";
import { trackEvent } from "@/lib/analytics";
import { searchDocuments, type SearchResult } from "@/lib/search";

const suggestedQueries = ["AI", "Accessibility", "IEEE", "Local-first", "Community leadership"];
const visibleResultLimit = 8;

type SearchDialogProps = {
  onClose: () => void;
};

export function SearchDialog({ onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(
    () => searchDocuments(SEARCH_DOCUMENTS, deferredQuery, visibleResultLimit),
    [deferredQuery],
  );
  const hasQuery = deferredQuery.trim().length >= 2;

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, []);

  const selectResult = (result: SearchResult, index: number) => {
    trackEvent("search_result_select", {
      search_term: query.trim(),
      result_id: result.id,
      result_type: result.type,
      result_position: index + 1,
      search_location: "global_dialog",
    });
    onClose();
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openSearchPage();
  };

  const openSearchPage = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      inputRef.current?.focus();
      return;
    }

    trackEvent("site_search", {
      search_term: trimmedQuery,
      result_count: searchDocuments(SEARCH_DOCUMENTS, trimmedQuery).length,
      search_location: "global_dialog",
    });
    router.push(`/search/?q=${encodeURIComponent(trimmedQuery)}`);
    onClose();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      const activeResult = results[activeIndex];
      if (activeResult) {
        event.preventDefault();
        router.push(activeResult.href);
        selectResult(activeResult, activeIndex);
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      openSearchPage();
    }
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusableElements[0];
    const last = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[6000] flex items-start justify-center bg-black/65 px-3 pb-6 pt-16 backdrop-blur-sm sm:pt-24"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        onKeyDown={handleDialogKeyDown}
        className="flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <h2 id="site-search-title" className="text-base font-semibold">
            Search
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            title="Close search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submitSearch} role="search" className="border-b border-border p-4 sm:p-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="global-search-input" className="sr-only">
              Search projects, articles, achievements, and gallery stories
            </label>
            <input
              ref={inputRef}
              id="global-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={hasQuery}
              aria-controls={hasQuery ? "site-search-results" : undefined}
              aria-activedescendant={
                activeIndex >= 0 ? `site-search-result-${activeIndex}` : undefined
              }
              autoComplete="off"
              spellCheck="false"
              placeholder="Search projects, articles, achievements..."
              className="h-14 w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <p className="sr-only" aria-live="polite">
            {hasQuery ? `${results.length} search results` : ""}
          </p>

          {!hasQuery ? (
            <div className="px-2 py-3">
              <p className="text-sm font-medium text-foreground">Explore topics</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedQueries.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-border px-3 py-2 text-sm text-muted-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div id="site-search-results" role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  index={index}
                  optionId={`site-search-result-${index}`}
                  asOption
                  active={index === activeIndex}
                  compact
                  onSelect={selectResult}
                />
              ))}
            </div>
          ) : (
            <div className="px-3 py-10 text-center">
              <p className="font-semibold text-foreground">No matching results</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a broader topic or a shorter phrase.
              </p>
            </div>
          )}
        </div>

        {hasQuery ? (
          <div className="border-t border-border px-4 py-3 sm:px-5">
            <Link
              href={`/search/?q=${encodeURIComponent(query.trim())}`}
              onClick={() => {
                trackEvent("site_search", {
                  search_term: query.trim(),
                  result_count: results.length,
                  search_location: "global_dialog_view_all",
                });
                onClose();
              }}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-primary outline-none hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary"
            >
              View all results
            </Link>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
