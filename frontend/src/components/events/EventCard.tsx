// frontend/src/components/events/EventCard.tsx
import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>
        <strong>Kategori:</strong> {event.category}
      </p>
      <p>
        <strong>Tarih:</strong> {formatDate(event.date)}, {event.time}
      </p>
      <p>
        <strong>Konum:</strong> {event.location}
      </p>
      <p>
        <strong>Kontenjan:</strong> {event.capacity} kişi
      </p>
      <p style={{ marginTop: "0.5rem" }}>{event.description}</p>
      <Link
        to={`/events/${event.id}`}
        className="btn-detay"
        style={{ marginTop: "var(--bosluk-m)", display: "inline-block" }}
      >
        Detayları gör →
      </Link>
    </article>
  );
}

export default EventCard;