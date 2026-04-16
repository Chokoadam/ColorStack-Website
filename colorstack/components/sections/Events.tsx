import { EventSlider } from "@/components/sections/EventSlider";
import { getCalendarEmbedUrl, getUpcomingEvents } from "@/lib/calendar";

export default async function Events() {
  const { events, error } = await getUpcomingEvents();
  const calendarUrl = getCalendarEmbedUrl();

  return (
    <EventSlider events={events} calendarUrl={calendarUrl} fetchError={error} />
  );
}
