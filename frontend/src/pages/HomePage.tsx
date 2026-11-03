// frontend/src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcomingEvents} isGrid2 />
      <div style={{ marginTop: "var(--bosluk-m)" }}>
        <Link to="/events" className="btn-link">
          Tüm etkinlikleri gör →
        </Link>
      </div>
    </section>
  );
}