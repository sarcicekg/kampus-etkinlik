// frontend/src/pages/EventDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </section>
  );
}