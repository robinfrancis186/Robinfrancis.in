import type { Metadata } from "next";
import Link from "next/link";
import JetpackRunner from "@/components/ui/JetpackRunner";

export const metadata: Metadata = {
  title: "Page Not Found | Robin Francis",
  description: "The requested page could not be found on Robin Francis's website.",
  robots: {
    index: false,
    follow: false,
  },
};

/* Somewhere useful to go, so the page is a fork in the road rather than a wall. */
const DESTINATIONS = [
  { href: "/projects/", label: "Projects", note: "AI, accessibility, and product work" },
  { href: "/blog/", label: "Journal", note: "Writing on building real things" },
  { href: "/achievements/", label: "Achievements", note: "Source-backed recognitions" },
  { href: "/#contact", label: "Contact", note: "Start a conversation" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center bg-background px-4 py-28 text-foreground">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Error 404
      </p>
      <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
        This page went missing.
      </h1>
      <p className="mb-8 max-w-xl text-muted-foreground">
        Nothing lives at this address. Take the jetpack for a lap while you decide where to go next.
      </p>

      <JetpackRunner />

      <nav aria-label="Suggested pages" className="mt-10 grid gap-3 sm:grid-cols-2">
        {DESTINATIONS.map((destination) => (
          <Link
            key={destination.href}
            href={destination.href}
            className="liquid-glass group rounded-xl px-4 py-3 transition"
          >
            <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
              {destination.label}
            </span>
            <span className="block text-xs text-muted-foreground">{destination.note}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
