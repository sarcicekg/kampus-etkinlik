// frontend/src/components/events/EventDetail.tsx
import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="detay-container">
      <figure>
        <img
          src={event.image || "/afis.svg"}
          alt={`${event.title} afişi`}
          className="detay-afis"
        />
        <figcaption
          style={{
            fontSize: "0.8rem",
            color: "#666",
            marginTop: "0.25rem",
          }}
        >
          {event.title} afişi
        </figcaption>
      </figure>

      <div>
        <h3>Etkinlik Künyesi</h3>
        <dl className="kunye" style={{ marginTop: "0.5rem" }}>
          <dt>Tarih</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>

          <dt>Yer</dt>
          <dd>{event.location}</dd>

          <dt>Kategori</dt>
          <dd>{event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3 style={{ marginTop: "var(--bosluk-m)" }}>Açıklama</h3>
        <p style={{ marginTop: "0.5rem" }}>{event.description}</p>

        <div
          style={{
            marginTop: "var(--bosluk-m)",
            display: "flex",
            gap: "var(--bosluk-m)",
            flexWrap: "wrap",
          }}
        >
          <Link to="/events" className="btn-link">
            ← Listeye dön
          </Link>
          <Link to={`/admin/${event.id}/edit`} className="btn-detay">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;