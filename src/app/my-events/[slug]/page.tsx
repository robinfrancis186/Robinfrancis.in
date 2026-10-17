import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { findMyEvent, MY_EVENTS, eventUnitName } from "@/data/myEvents";
import { EventImage } from "@/components/editorial/EventImage";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, ogDefaults, twitterDefaults } from "@/lib/seo";

type EventPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MY_EVENTS.map(({ id }) => ({ slug: id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = findMyEvent(slug);
  if (!event) notFound();
  const description = event.story?.summary ?? event.title;
  const canonical = `/my-events/${event.id}/`;
  return {
    title: `${event.title} | My Events | Robin Francis`,
    description,
    alternates: { canonical },
    openGraph: {
      ...ogDefaults,
      title: `${event.title} | My Events | Robin Francis`,
      description,
      url: absoluteUrl(canonical),
      ...(event.image ? { images: [event.image.src] } : {}),
    },
    twitter: {
      ...twitterDefaults,
      card: event.image ? "summary_large_image" : "summary",
      title: `${event.title} | My Events | Robin Francis`,
      description,
      ...(event.image ? { images: [event.image.src] } : {}),
    },
  };
}

export default async function Page({ params }: EventPageProps) {
  const { slug } = await params;
  const event = findMyEvent(slug);
  if (!event) notFound();
  const dateLabel = event.dateLabel ?? (event.date ? new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${event.date}T00:00:00Z`)) : String(event.year));
  const canonical = absoluteUrl(`/my-events/${event.id}/`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    url: canonical,
    description: event.story?.summary,
    organizer: { "@type": "Organization", name: eventUnitName(event.unit) },
    ...(event.date ? { startDate: event.date } : {}),
    ...(event.endDate ? { endDate: event.endDate } : {}),
    ...(event.image ? { image: absoluteUrl(event.image.src) } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-background px-4 pb-20 pt-28 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[
            homeBreadcrumb,
            { name: "My Events Directory", path: "/my-events/" },
            { name: event.title, path: `/my-events/${event.id}/` },
          ]} className="mb-8" />
          <Link href="/my-events/" className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all events
          </Link>
          <article className="overflow-hidden rounded-3xl border border-border bg-card">
            {event.image ? (
              <EventImage image={event.image} title={event.title} priority />
            ) : null}
            <div className="p-6 sm:p-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> {event.group}
              </p>
              <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">{event.title}</h1>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Date:</span> {event.date ? <time dateTime={event.date}>{dateLabel}</time> : dateLabel}</p>
                <p><span className="font-semibold text-foreground">Organizing unit:</span> {eventUnitName(event.unit)}</p>
                {event.role && <p><span className="font-semibold text-foreground">My role:</span> {event.role}</p>}
                {event.story?.venue && <p><span className="font-semibold text-foreground">Where:</span> {event.story.venue}</p>}
              </div>
              {event.story && <div className="mt-8 max-w-3xl border-t border-border pt-6 text-base leading-8 text-muted-foreground">
                <p className="text-lg font-medium text-foreground">{event.story.summary}</p>
                {event.story.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5">{paragraph}</p>)}
                {event.story.speakers?.length ? <section className="mt-7" aria-labelledby="speakers-heading">
                  <h2 id="speakers-heading" className="text-lg font-semibold text-foreground">Speakers and facilitators</h2>
                  <ul className="mt-2 list-disc pl-5">{event.story.speakers.map((speaker) => <li key={speaker}>{speaker}</li>)}</ul>
                </section> : null}
                {event.story.highlights?.length ? <section className="mt-7" aria-labelledby="highlights-heading">
                  <h2 id="highlights-heading" className="text-lg font-semibold text-foreground">Programme highlights</h2>
                  <ul className="mt-2 list-disc pl-5">{event.story.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </section> : null}
                {event.story.sourceUrl && <a href={event.story.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open event source <span className="sr-only">(opens in a new tab)</span></a>}
              </div>}
            </div>
          </article>
          {event.gallery?.length ? <section className="mt-10" aria-labelledby="event-gallery-heading">
            <h2 id="event-gallery-heading" className="text-2xl font-bold">More from the event</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {event.gallery.map((image) => <div key={image.src} className="overflow-hidden rounded-2xl border border-border"><EventImage image={image} title={event.title} compact /></div>)}
            </div>
          </section> : null}
          {event.sessions?.length ? (
            <section aria-labelledby="infinia-sessions-heading" className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Flagship programme</p>
              <h2 id="infinia-sessions-heading" className="mt-2 text-2xl font-bold sm:text-3xl">Three days, {event.sessions.length} sessions</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">Explore the workshops, conversations, exhibitions and celebrations that made up TechX Infinia.</p>
              <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {event.sessions.map((session) => (
                  <li key={session.id} id={session.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card">
                    <EventImage image={session.image} title={session.title} compact />
                    <div className="p-5">
                      <time dateTime={session.date} className="text-xs font-medium text-muted-foreground">{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${session.date}T00:00:00Z`))}</time>
                      <h3 className="mt-2 text-lg font-semibold">{session.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{session.summary}</p>
                      {session.speakers?.length ? <p className="mt-3 text-xs leading-5 text-muted-foreground"><span className="font-medium text-foreground">With: </span>{session.speakers.join(", ")}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
    </>
  );
}
