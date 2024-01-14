import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-serach";

import { useRouter } from "next/router";
export default function AllEventsPage() {
  const event = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={event} />
    </div>
  );
}
