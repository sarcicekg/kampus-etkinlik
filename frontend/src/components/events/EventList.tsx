// frontend/src/components/events/EventList.tsx
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  isGrid2?: boolean;
}

function EventList({
  events,
  emptyText = "Etkinlik bulunamadı.",
  isGrid2 = false,
}: EventListProps) {
  if (events.length === 0) {
    return <p style={{ fontWeight: "bold" }}>{emptyText}</p>;
  }

  return (
    <div className={`etkinlik-grid ${isGrid2 ? "ikili" : ""}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;