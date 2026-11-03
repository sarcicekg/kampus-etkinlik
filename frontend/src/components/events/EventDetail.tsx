// frontend/src/components/events/EventDetail.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
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
          <button type="button" className="btn-link" onClick={onBack}>
            ← Listeye dön
          </button>
          <button
            type="button"
            className="btn-detay"
            onClick={() => onEdit(event.id)}
          >
            Bu etkinliği güncelle
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;