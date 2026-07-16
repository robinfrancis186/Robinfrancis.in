"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchDialog = dynamic(
  () => import("@/components/search/SearchDialog").then((module) => module.SearchDialog),
  { ssr: false },
);

export function SiteSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Search"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-slate-900 shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-primary"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
      {open ? <SearchDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
