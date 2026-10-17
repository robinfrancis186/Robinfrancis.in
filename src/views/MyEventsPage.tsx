"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MY_EVENTS, matchesEventSearch, eventUnitName } from "@/data/myEvents";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

const filters = ["All events", "Community events", "Student Branch", "Society chapter", "TechX Infinia"] as const;

function eventSortDate(event: (typeof MY_EVENTS)[number]) {
  if (event.date) return event.date;
  const parsedLabelDate = new Date(`${event.dateLabel ?? event.year} 1`);
  const month = Number.isNaN(parsedLabelDate.getTime()) ? 1 : parsedLabelDate.getMonth() + 1;
  return `${event.year}-${String(month).padStart(2, "0")}-01`;
}

export default function MyEventsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All events");

  const visibleEvents = useMemo(() => {
    return [...MY_EVENTS]
      .filter((event) => activeFilter === "All events" || event.group === activeFilter)
      .filter((event) => matchesEventSearch(event, query))
      .sort((a, b) => eventSortDate(b).localeCompare(eventSortDate(a)));
  }, [activeFilter, query]);

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[homeBreadcrumb, { name: "My Events Directory", path: "/my-events/" }]} className="mb-8" />

        <section className="relative isolate mb-12 overflow-hidden rounded-[2rem] border border-border bg-card">
          <div className="absolute inset-0 -z-20">
            <Image
              src="/images/events/2024/techx-infinia-inauguration-original.webp"
              alt="Robin Francis and invited guests on stage at the TechX Infinia 2024 inauguration"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center opacity-25"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/95 to-primary/15" />
          <div className="max-w-4xl px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">My Events Directory</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Bringing people together to learn, build and share ideas. Explore the events I organise, lead and help bring to life, from technical workshops and builder meetups to community programmes and flagship gatherings. Follow the journey, from past highlights to what’s next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm font-medium">
                <strong className="mr-2 text-xl">{MY_EVENTS.length}</strong> events and counting
              </span>
            </div>
          </div>
        </section>

        <section aria-labelledby="directory-heading">
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Learning, building and community</p>
              <h2 id="directory-heading" className="mt-2 text-2xl font-bold sm:text-3xl">Explore the events</h2>
            </div>
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search events</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events, years, speakers or communities"
                className="min-h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter event list">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeFilter === filter ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
              >
                {filter}
              </button>
            ))}
            <p className="ml-auto self-center text-sm text-muted-foreground" aria-live="polite">
              {visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"}
            </p>
          </div>

          {visibleEvents.length ? (
            <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
              {visibleEvents.map((event) => (
                <li key={event.id} id={event.id} className="min-w-0 scroll-mt-28">
                  <Link href={`/my-events/${event.id}/`} aria-label={`Read more about ${event.title}`} className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <article className="flex h-full min-h-60 flex-col overflow-hidden rounded-3xl border border-border bg-card transition group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
                    {event.image ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <Image src={event.image.src} alt={event.image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className={`${event.image.kind === "photo" ? "object-cover" : "object-contain p-3"} transition duration-500 group-hover:scale-[1.02]`} />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                        {event.date ? (
                          <time dateTime={event.date} className="rounded-full bg-muted px-3 py-1">
                            {event.dateLabel ?? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`))}
                          </time>
                        ) : <span className="rounded-full bg-muted px-3 py-1">{event.dateLabel ?? event.year}</span>}
                        <span className="rounded-full border border-border px-3 py-1">{event.group === "TechX Infinia" ? "Flagship" : event.unit}</span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">{event.title}</h3>
                      {event.role && <p className="mt-2 text-xs font-semibold text-primary">My role: {event.role}</p>}
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.story?.summary}</p>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                        <p className="text-xs text-muted-foreground">{eventUnitName(event.unit)}</p>
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition group-hover:border-primary group-hover:text-primary">
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
              <p className="font-semibold">No events match that search.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveFilter("All events"); }} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">Show all events</button>
            </div>
          )}
        </section>

        <aside className="mt-12 rounded-3xl border border-border bg-muted/40 p-5 text-sm leading-6 text-muted-foreground sm:p-7">
          <p>Event stories bring together original programme records, photographs and my public updates. Each programme reflects the shared work of its organisers, volunteers and community.</p>
        </aside>
      </div>
    </main>
  );
}
