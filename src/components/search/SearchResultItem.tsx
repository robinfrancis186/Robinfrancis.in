"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Images,
  Link2,
  Trophy,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { SearchDocumentType, SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const resultIcons: Record<SearchDocumentType, IconComponent> = {
  Page: FileText,
  Article: BookOpen,
  Project: BriefcaseBusiness,
  Achievement: Trophy,
  Gallery: Images,
  Resource: Link2,
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, terms }: { text: string; terms: string[] }) {
  const usableTerms = terms.filter(Boolean).sort((left, right) => right.length - left.length);
  if (usableTerms.length === 0) {
    return text;
  }

  const pattern = new RegExp(
    `\\b(?:${usableTerms.map(escapeRegExp).join("|")})[a-z0-9]*`,
    "gi",
  );
  const parts: Array<{ text: string; highlighted: boolean }> = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      parts.push({ text: text.slice(cursor, index), highlighted: false });
    }
    parts.push({ text: match[0], highlighted: true });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), highlighted: false });
  }

  return parts.map((part, index) =>
    part.highlighted ? (
      <mark
        key={`${part.text}-${index}`}
        className="rounded-sm bg-primary/15 px-0.5 text-inherit dark:bg-primary/25"
      >
        {part.text}
      </mark>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    ),
  );
}
type SearchResultItemProps = {
  result: SearchResult;
  index: number;
  active?: boolean;
  asOption?: boolean;
  optionId?: string;
  compact?: boolean;
  onSelect?: (result: SearchResult, index: number) => void;
};

export function SearchResultItem({
  result,
  index,
  active = false,
  asOption = false,
  optionId,
  compact = false,
  onSelect,
}: SearchResultItemProps) {
  const Icon = resultIcons[result.type];

  return (
    <Link
      id={optionId}
      href={result.href}
      role={asOption ? "option" : undefined}
      aria-selected={asOption ? active : undefined}
      onClick={() => onSelect?.(result, index)}
      className={cn(
        "group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] gap-3 rounded-lg border border-transparent text-left outline-none transition",
        compact ? "px-3 py-3" : "px-4 py-4",
        active
          ? "border-primary/40 bg-primary/10"
          : "hover:border-border hover:bg-muted/60 focus-visible:border-primary/40 focus-visible:bg-primary/10",
      )}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-foreground">
            <HighlightedText text={result.title} terms={result.matchedTerms} />
          </span>
          <span className="text-xs text-muted-foreground">
            {result.type} · {result.section}
          </span>
        </span>
        <span
          className={cn(
            "mt-1 block text-sm leading-6 text-muted-foreground",
            compact && "line-clamp-2",
          )}
        >
          <HighlightedText text={result.excerpt} terms={result.matchedTerms} />
        </span>
      </span>

      <ArrowUpRight
        className="mt-2 h-4 w-4 text-muted-foreground transition group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
}
