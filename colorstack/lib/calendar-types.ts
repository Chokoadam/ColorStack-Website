export type EventCardTheme = "rose" | "slate" | "sand" | "sage";

export type CalendarDisplayEvent = {
  id: string;
  title: string;
  day: string;
  time: string;
  description: string;
  location: string;
  mapUrl?: string;
  theme: EventCardTheme;
  image: string;
  htmlLink?: string;
  startISO?: string;
};
