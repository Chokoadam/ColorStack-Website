"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { CalendarDisplayEvent, EventCardTheme } from "@/lib/calendar-types";

const THEME: Record<
  EventCardTheme,
  { card: string; accent: string }
> = {
  rose: {
    card: "bg-[#f6ecec]",
    accent: "text-background",
  },
  slate: {
    card: "bg-stone-100",
    accent: "text-neutral-900",
  },
  sand: {
    card: "bg-[#f5ede0]",
    accent: "text-[#4a3020]",
  },
  sage: {
    card: "bg-[#e8f0ea]",
    accent: "text-[#1e3d2f]",
  },
};

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export type EventSliderProps = {
  events: CalendarDisplayEvent[];
  calendarUrl: string;
  fetchError: string | null;
};

export function EventSlider({ events, calendarUrl, fetchError }: EventSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>("[data-event-card]");
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const cardWidth = () => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-event-card]");
    return card ? card.offsetWidth + 24 : 320;
  };

  const scrollByCards = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * cardWidth(), behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    scrollerRef.current?.scrollTo({ left: index * cardWidth(), behavior: "smooth" });
  };

  return (
    <section
      id="events"
      className="relative w-full overflow-hidden bg-white text-neutral-900 py-16 sm:py-20 md:py-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 right-[10%] h-72 w-72 rounded-full bg-gold/15 blur-3xl motion-safe:animate-events-shimmer motion-reduce:animate-none motion-reduce:opacity-30" />
        <div className="absolute -bottom-24 left-[5%] h-80 w-80 rounded-full bg-background/[0.06] blur-3xl motion-safe:animate-events-shimmer motion-safe:[animation-delay:3s] motion-reduce:animate-none motion-reduce:opacity-25" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 mb-12 md:mb-16">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl md:text-[2.75rem] leading-[1.1] motion-safe:animate-events-header-in motion-reduce:animate-none motion-reduce:opacity-100">
              Events Calendar
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-700 sm:text-lg motion-safe:animate-events-header-in motion-safe:[animation-delay:120ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100">
              Join our community for workshops, hands-on sessions, and networking events designed
              to build your skills and connections in tech.
            </p>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-background/90 hover:shadow-lg hover:shadow-background/20 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 motion-safe:animate-events-header-in motion-safe:[animation-delay:240ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 group/cta"
            >
              Explore all
              <ChevronRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </a>
          </div>

          <div className="flex gap-3 lg:pt-2 self-start motion-safe:animate-events-nav-in motion-safe:[animation-delay:320ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100">
            <button
              type="button"
              aria-label="Scroll events left"
              onClick={() => scrollByCards(-1)}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-gold text-background shadow-md transition-all duration-300 hover:bg-gold-hover hover:scale-110 hover:-translate-x-0.5 hover:shadow-lg hover:shadow-gold/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              aria-label="Scroll events right"
              onClick={() => scrollByCards(1)}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-gold text-background transition-all duration-300 hover:bg-gold-hover hover:scale-110 hover:translate-x-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 shadow-md hover:shadow-lg hover:shadow-gold/30"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {fetchError ? (
          <div
            className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-950 motion-safe:animate-events-card-in motion-reduce:animate-none"
            role="alert"
          >
            <p className="font-semibold text-background">Calendar couldn&apos;t load</p>
            <p className="mt-2 text-neutral-700">{fetchError}</p>
          </div>
        ) : null}

        {!fetchError && events.length === 0 ? (
          <p className="font-serif text-xl text-neutral-700 motion-safe:animate-events-header-in motion-safe:[animation-delay:200ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100">
            No upcoming events right now. Check back soon or open the full calendar.
          </p>
        ) : null}

        {events.length > 0 ? (
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {events.map((event, index) => {
              const t = THEME[event.theme];
              const staggerMs = Math.min(index, 10) * 70;
              const cardInner = (
                <>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={event.image}
                      alt={`${event.title} event photo`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                      sizes="320px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
                    <h3 className={`font-serif text-xl font-bold leading-snug ${t.accent}`}>
                      {event.title}
                    </h3>
                    <div className="mt-3 space-y-0.5">
                      <p className="text-sm font-semibold text-neutral-800">{event.day}</p>
                      <p className="text-sm text-neutral-600">{event.time}</p>
                    </div>
                    {event.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {event.description}
                      </p>
                    ) : null}
                    <div className="group/location relative mt-4 w-fit">
                      <button
                        type="button"
                        className="text-xs font-semibold tracking-wide uppercase text-neutral-700 underline decoration-neutral-400/80 underline-offset-4 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm"
                        aria-label={`Location: ${event.location}`}
                      >
                        {event.location}
                      </button>
                      <div className="absolute bottom-[calc(100%+0.55rem)] left-0 z-20 w-56 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700 opacity-0 shadow-lg transition-all duration-200 group-hover/location:translate-y-0 group-hover/location:opacity-100 group-focus-within/location:translate-y-0 group-focus-within/location:opacity-100">
                        <p className="font-semibold text-neutral-900">{event.location}</p>
                        <p className="mt-1 text-neutral-600">Open in Google Maps</p>
                        {event.mapUrl ? (
                          <a
                            href={event.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto mt-2 inline-flex text-background font-semibold hover:underline"
                          >
                            Preview route
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <a
                      href={buildGCalUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm w-fit"
                    >
                      <CalendarPlusIcon className="shrink-0" />
                      Add to calendar
                    </a>
                  </div>
                </>
              );

              return (
                <article
                  key={event.id}
                  data-event-card
                  style={{
                    animationDelay: `${380 + staggerMs}ms`,
                  }}
                  className={`group flex w-[min(100vw-3rem,320px)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] shadow-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-xl motion-safe:hover:shadow-neutral-900/10 sm:w-[300px] md:w-[320px] motion-safe:animate-events-card-in motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 ${t.card}`}
                >
                  {cardInner}
                </article>
              );
            })}
          </div>
        ) : null}

        {events.length > 1 ? (
          <div className="flex justify-center items-center gap-2 mt-8">
            {events.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to event ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                  i === activeIndex
                    ? "w-6 bg-background"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
