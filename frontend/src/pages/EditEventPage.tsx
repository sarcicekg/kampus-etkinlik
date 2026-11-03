// frontend/src/pages/EditEventPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  const formData = {
    ...event,
    capacity: String(event.capacity),
  };

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={formData}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </section>
  );
}