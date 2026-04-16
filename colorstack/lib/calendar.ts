import "server-only";

import ICAL from "ical.js";

import type { CalendarDisplayEvent, EventCardTheme } from "@/lib/calendar-types";

export type { CalendarDisplayEvent, EventCardTheme } from "@/lib/calendar-types";

/** Public group calendar ID (same as embed `src`); override with GOOGLE_CALENDAR_ID. */
const DEFAULT_CALENDAR_ID =
  "aa9a103be92a0cedc650df8f8a8931357f3c988b0d8faf7120d3cc17b6f37eeb@group.calendar.google.com";

const DISPLAY_TIMEZONE = "America/Chicago";

const EVENT_IMAGES = {
  webdev: "/event-images/webdev.png",
  generalMeeting: "/event-images/general-meeting.jpg",
  leetrooms: "/event-images/leetrooms.png",
  default: "/event-images/default.png",
} as const;

const THEMES: readonly EventCardTheme[] = ["rose", "slate", "sand", "sage"];

/** Card art from event title (aligned with resolveLocationData). */
function resolveEventImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("website development")) return EVENT_IMAGES.webdev;
  if (t.includes("general meeting")) return EVENT_IMAGES.generalMeeting;
  if (t.includes("leetrooms")) return EVENT_IMAGES.leetrooms;
  return EVENT_IMAGES.default;
}

type GCalEvent = {
  id?: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { date?: string; dateTime?: string; timeZone?: string };
};

type GCalListResponse = {
  items?: GCalEvent[];
  error?: { code?: number; message?: string };
};

function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID?.trim() || DEFAULT_CALENDAR_ID;
}

export function getCalendarEmbedUrl(): string {
  const id = encodeURIComponent(getCalendarId());
  return `https://calendar.google.com/calendar/embed?src=${id}&ctz=America%2FChicago`;
}

/** Public iCal feed (works only if the calendar is shared publicly). No API key. */
function getDefaultPublicIcalUrl(): string {
  const id = encodeURIComponent(getCalendarId());
  return `https://calendar.google.com/calendar/ical/${id}/public/basic.ics`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TIMEZONE,
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTime(date: Date): string {
  return (
    new Intl.DateTimeFormat("en-US", {
      timeZone: DISPLAY_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
    }).format(date) + " CT"
  );
}

const MAP_QUERY_BASE = "https://www.google.com/maps/search/?api=1&query=";
const ZACH_QUERY = "Zachry Engineering Education Complex, College Station, TX";
const RICH_214_QUERY = "RICH 214, College Station, TX";

function mapQueryUrl(query: string): string {
  return `${MAP_QUERY_BASE}${encodeURIComponent(query)}`;
}

function resolveLocationData(title: string, location: string | undefined): { label: string; mapUrl?: string } {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("website development")) {
    return { label: "ZACH", mapUrl: mapQueryUrl(ZACH_QUERY) };
  }
  if (normalizedTitle.includes("general meeting")) {
    return { label: "RICH 214", mapUrl: mapQueryUrl(RICH_214_QUERY) };
  }
  if (normalizedTitle.includes("leetrooms")) {
    return { label: "ZACH", mapUrl: mapQueryUrl(ZACH_QUERY) };
  }

  const loc = location?.trim();
  if (loc) {
    const short = loc.split(",")[0]?.trim() ?? loc;
    return {
      label: short.length > 36 ? `${short.slice(0, 33)}…` : short,
      mapUrl: mapQueryUrl(loc),
    };
  }
  return { label: "Club event" };
}

function startToDisplayFromApi(event: GCalEvent): { day: string; time: string } | null {
  const start = event.start;
  if (!start) return null;

  if (start.date) {
    const [y, m, d] = start.date.split("-").map(Number);
    const localMidnight = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return {
      day: formatDay(localMidnight),
      time: "All day",
    };
  }

  if (start.dateTime) {
    const date = new Date(start.dateTime);
    if (Number.isNaN(date.getTime())) return null;
    return {
      day: formatDay(date),
      time: formatTime(date),
    };
  }

  return null;
}

function mapApiEvent(item: GCalEvent, index: number): CalendarDisplayEvent | null {
  if (!item.id || item.status === "cancelled") return null;
  const title = item.summary?.trim() || "Untitled event";
  const when = startToDisplayFromApi(item);
  if (!when) return null;

  const rawDesc = item.description?.trim();
  const description = rawDesc ? stripHtml(rawDesc) : "";
  const locationData = resolveLocationData(title, item.location);

  return {
    id: item.id,
    title,
    day: when.day,
    time: when.time,
    description: description.length > 280 ? `${description.slice(0, 277)}…` : description,
    location: locationData.label,
    mapUrl: locationData.mapUrl,
    theme: THEMES[index % THEMES.length] ?? "rose",
    image: resolveEventImage(title),
    htmlLink: item.htmlLink,
    startISO: item.start?.dateTime ?? item.start?.date,
  };
}

type Occurrence = {
  start: Date;
  isFullDay: boolean;
  event: ICAL.Event;
};

function eventUrl(ev: ICAL.Event): string | undefined {
  const raw = ev.component.getFirstPropertyValue("url");
  if (typeof raw === "string" && raw.startsWith("http")) return raw;
  return undefined;
}

function collectIcalOccurrences(icsText: string, now: Date, until: Date): Occurrence[] {
  const jcal = ICAL.parse(icsText);
  const root = new ICAL.Component(jcal);
  const vevents = root.getAllSubcomponents("vevent");
  const out: Occurrence[] = [];

  for (const ve of vevents) {
    const ev = new ICAL.Event(ve);
    if (ev.isRecurrenceException()) continue;

    const status = ve.getFirstPropertyValue("status");
    if (status === "CANCELLED") continue;

    if (ev.isRecurring()) {
      const iter = ev.iterator();
      let guard = 0;
      while (guard++ < 400) {
        const time = iter.next();
        if (iter.complete || !time) break;
        const start = time.toJSDate();
        if (start.getTime() < now.getTime()) continue;
        if (start.getTime() > until.getTime()) break;
        out.push({
          start,
          isFullDay: Boolean(time.isDate),
          event: ev,
        });
      }
    } else {
      const start = ev.startDate.toJSDate();
      if (Number.isNaN(start.getTime())) continue;
      const end = ev.endDate ? ev.endDate.toJSDate() : undefined;
      if (end && end.getTime() < now.getTime()) continue;
      if (!end && start.getTime() < now.getTime()) continue;
      out.push({
        start,
        isFullDay: Boolean(ev.startDate.isDate),
        event: ev,
      });
    }
  }

  return out;
}

function mapIcalOccurrence(occ: Occurrence, index: number): CalendarDisplayEvent {
  const ev = occ.event;
  const title = (ev.summary || "").trim() || "Untitled event";
  const day = formatDay(occ.start);
  const time = occ.isFullDay ? "All day" : formatTime(occ.start);

  const rawDesc = (ev.description || "").trim();
  const description = rawDesc ? stripHtml(rawDesc) : "";
  const locationData = resolveLocationData(title, ev.location);

  const htmlLink = eventUrl(ev);
  const id = `${ev.uid}-${occ.start.toISOString()}`;

  return {
    id,
    title,
    day,
    time,
    description: description.length > 280 ? `${description.slice(0, 277)}…` : description,
    location: locationData.label,
    mapUrl: locationData.mapUrl,
    theme: THEMES[index % THEMES.length] ?? "rose",
    image: resolveEventImage(title),
    htmlLink,
    startISO: occ.start.toISOString(),
  };
}

async function getUpcomingEventsFromIcal(feedUrl: string): Promise<{
  events: CalendarDisplayEvent[];
  error: string | null;
}> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return {
        events: [],
        error: `Could not load calendar feed (${res.status}). If the calendar is private, add ICAL_FEED_URL (secret iCal link) or use GOOGLE_CALENDAR_API_KEY.`,
      };
    }

    const text = await res.text();
    const now = new Date();
    const until = new Date(now);
    until.setFullYear(until.getFullYear() + 1);

    const occurrences = collectIcalOccurrences(text, now, until);
    occurrences.sort((a, b) => a.start.getTime() - b.start.getTime());

    const events = occurrences.slice(0, 24).map((occ, i) => mapIcalOccurrence(occ, i));

    return { events, error: null };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { events: [], error: `Calendar feed failed: ${message}` };
  }
}

async function getUpcomingEventsFromApi(): Promise<{
  events: CalendarDisplayEvent[];
  error: string | null;
}> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY?.trim();
  if (!apiKey) {
    return { events: [], error: "Missing API key" };
  }

  const calendarId = encodeURIComponent(getCalendarId());
  const timeMin = new Date().toISOString();

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
  );
  url.searchParams.set("key", apiKey);
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "24");

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  const data = (await res.json()) as GCalListResponse;

  if (!res.ok) {
    const msg = data.error?.message ?? res.statusText;
    return {
      events: [],
      error: `Could not load calendar (${res.status}): ${msg}`,
    };
  }

  const items = data.items ?? [];
  const events: CalendarDisplayEvent[] = [];
  let i = 0;
  for (const item of items) {
    const mapped = mapApiEvent(item, i);
    if (mapped) {
      events.push(mapped);
      i += 1;
    }
  }

  return { events, error: null };
}

/**
 * Loads upcoming events. **No Google Cloud API key is required** if either:
 * - `ICAL_FEED_URL` is set (secret/public iCal URL), or
 * - the calendar is **public** and we can use Google’s default `…/ical/…/public/basic.ics` URL.
 *
 * Optional: `GOOGLE_CALENDAR_API_KEY` uses Calendar API v3 (often better `htmlLink` values).
 */
export async function getUpcomingEvents(): Promise<{
  events: CalendarDisplayEvent[];
  error: string | null;
}> {
  const customIcal = process.env.ICAL_FEED_URL?.trim();
  if (customIcal) {
    return getUpcomingEventsFromIcal(customIcal);
  }

  if (process.env.GOOGLE_CALENDAR_API_KEY?.trim()) {
    try {
      return await getUpcomingEventsFromApi();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return { events: [], error: `Calendar API request failed: ${message}` };
    }
  }

  const publicIcal = getDefaultPublicIcalUrl();
  const result = await getUpcomingEventsFromIcal(publicIcal);
  if (result.error && result.events.length === 0) {
    return {
      events: [],
      error: `${result.error} You can set ICAL_FEED_URL to your calendar’s “secret address in iCal format”, or set GOOGLE_CALENDAR_API_KEY for the Calendar API.`,
    };
  }
  return result;
}
