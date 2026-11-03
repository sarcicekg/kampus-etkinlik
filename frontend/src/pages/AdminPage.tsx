// frontend/src/pages/AdminPage.tsx
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" etkinliğini silmek istediğinize emin misiniz?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--bosluk-m)",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2 className="bolum-baslik" style={{ margin: 0 }}>
          Etkinlik Yönetimi
        </h2>
        <Link to="/admin/new" className="btn-detay">
          + Yeni Etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p>Henüz eklenmiş bir etkinlik bulunmuyor.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler" className="islemler">
                  <Link to={`/admin/${event.id}/edit`} className="btn-link">
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="btn-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}