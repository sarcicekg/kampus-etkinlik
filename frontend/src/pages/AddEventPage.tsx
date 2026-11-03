// frontend/src/pages/AddEventPage.tsx
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </section>
  );
}