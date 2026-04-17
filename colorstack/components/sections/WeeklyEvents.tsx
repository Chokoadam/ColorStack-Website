"use client";

import type { WeekDay, CalendarDisplayEvent, EventCardTheme } from "@/lib/calendar-types";

const EVENT_THEME: Record<EventCardTheme, { title: string }> = {
  rose: { title: "text-rose-700" },
  sage: { title: "text-emerald-700" },
  sand: { title: "text-amber-700" },
  slate: { title: "text-slate-700" },
};

const THEME_CARD: Record<EventCardTheme, { bg: string; border: string }> = {
  rose: { bg: "bg-rose-50", border: "border-rose-200" },
  sage: { bg: "bg-emerald-50", border: "border-emerald-200" },
  sand: { bg: "bg-amber-50", border: "border-amber-200" },
  slate: { bg: "bg-slate-50", border: "border-slate-200" },
};

function CalendarPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14v4M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function buildGCalUrl(event: CalendarDisplayEvent): string {
  const params = new URLSearchParams({ action: "TEMPLATE", text: event.title });
  if (event.startISO) {
    const start = new Date(event.startISO);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    params.set("dates", `${fmt(start)}/${fmt(end)}`);
  }
  if (event.description) params.set("details", event.description);
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

function EventRow({
  event,
  isPastDay,
}: {
  event: CalendarDisplayEvent;
  isPastDay: boolean;
}) {
  const t = EVENT_THEME[event.theme];
  return (
    <div className="group/row relative flex w-full items-center justify-between gap-6 py-4">
      <span
        className={`text-2xl font-bold leading-snug ${
          isPastDay ? "line-through text-neutral-400" : t.title
        }`}
      >
        {event.title}
      </span>
      <div className="flex shrink-0 items-center gap-3">
        <span className={`text-base ${isPastDay ? "text-neutral-400" : "text-neutral-500"}`}>
          {event.time}
        </span>
        {!isPastDay && (
          <a
            href={buildGCalUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-background focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            aria-label={`Add ${event.title} to calendar`}
          >
            <CalendarPlusIcon className="shrink-0" />
            Add
          </a>
        )}
      </div>
    </div>
  );
}

function DayRow({ day }: { day: WeekDay }) {
  const firstEvent = day.events[0];
  const themeCard = firstEvent && !day.isPast ? THEME_CARD[firstEvent.theme] : null;

  const rowClass = [
    "flex overflow-hidden rounded-2xl border transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md",
    day.isPast
      ? "border-neutral-200 bg-neutral-100"
      : day.isToday
        ? "border-gold/30 bg-gold/[0.06] motion-safe:hover:shadow-gold/10"
        : themeCard
          ? `${themeCard.border} ${themeCard.bg}`
          : "border-neutral-100 bg-white",
  ].join(" ");

  return (
    <div className={rowClass}>
      <div
        className={`flex w-36 shrink-0 flex-col justify-center px-6 py-10 sm:w-44 ${
          day.isPast ? "text-neutral-400" : "text-neutral-900"
        }`}
      >
        <span className="text-base font-semibold">{day.label}</span>
        <span
          className={`mt-1 text-sm ${day.isPast ? "text-neutral-400" : "text-neutral-500"}`}
        >
          {day.shortDate}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col justify-center divide-y border-l px-8 ${
          day.isPast ? "border-neutral-200 divide-neutral-200" : "border-neutral-100 divide-neutral-100"
        }`}
      >
        {day.events.length === 0 ? (
          <span className="py-10 text-base text-neutral-400">No events</span>
        ) : (
          day.events.map((event) => (
            <EventRow key={event.id} event={event} isPastDay={day.isPast} />
          ))
        )}
      </div>

      {firstEvent && !day.isPast && (
        <div className="flex shrink-0 items-center pr-6">
          <img
            src={firstEvent.image}
            alt=""
            aria-hidden
            className="h-[120px] w-[120px] rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export type WeeklyEventsProps = {
  days: WeekDay[];
  fetchError: string | null;
};

export function WeeklyEvents({ days, fetchError }: WeeklyEventsProps) {
  return (
    <section
      id="events"
      className="relative w-full overflow-hidden bg-white px-6 py-16 text-neutral-900 sm:px-10 sm:py-20 md:py-24 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 right-[10%] h-72 w-72 rounded-full bg-gold/15 blur-3xl motion-safe:animate-events-shimmer motion-reduce:animate-none motion-reduce:opacity-30" />
        <div className="absolute -bottom-24 left-[5%] h-80 w-80 rounded-full bg-background/[0.06] blur-3xl motion-safe:animate-events-shimmer motion-safe:[animation-delay:3s] motion-reduce:animate-none motion-reduce:opacity-25" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-background motion-safe:animate-events-header-in motion-reduce:animate-none motion-reduce:opacity-100 sm:text-5xl md:text-[2.75rem]">
          This Week&apos;s Events
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-700 motion-safe:animate-events-header-in motion-safe:[animation-delay:120ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 sm:text-lg">
          Join our community for workshops, hands-on sessions, and networking
          events designed to build your skills and connections in tech.
        </p>

        {fetchError ? (
          <div
            className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-950"
            role="alert"
          >
            <p className="font-semibold text-background">
              Calendar couldn&apos;t load
            </p>
            <p className="mt-2 text-neutral-700">{fetchError}</p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3">
          {days.map((day, index) => (
            <div
              key={day.key}
              style={{ animationDelay: `${120 + index * 50}ms` }}
              className="motion-safe:animate-events-card-in motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
            >
              <DayRow day={day} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
