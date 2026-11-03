// frontend/src/components/forms/EventForm.tsx
import type { CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  isUpdate?: boolean;
  eventData?: CampusEvent;
}

function EventForm({ onSubmit, isUpdate = false, eventData }: EventFormProps) {
  return (
    <div>
      <p style={{ marginBottom: "var(--bosluk-m)", color: "#666" }}>
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-group">
          <label htmlFor="ad">Etkinlik Adı *</label>
          <input
            type="text"
            id="ad"
            maxLength={80}
            placeholder="Örn. Kariyer Günleri 2026"
            defaultValue={isUpdate && eventData ? eventData.title : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="kategori">Kategori *</label>
          <select
            id="kategori"
            defaultValue={isUpdate && eventData ? eventData.category : ""}
          >
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tarih">Tarih *</label>
          <input
            type="date"
            id="tarih"
            defaultValue={isUpdate && eventData ? eventData.date : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="saat">Saat *</label>
          <input
            type="time"
            id="saat"
            defaultValue={isUpdate && eventData ? eventData.time : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="yer">Yer *</label>
          <input
            type="text"
            id="yer"
            placeholder="Örn. A Blok Konferans Salonu"
            defaultValue={isUpdate && eventData ? eventData.location : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="kontenjan">Kontenjan</label>
          <input
            type="number"
            id="kontenjan"
            defaultValue={isUpdate && eventData ? eventData.capacity : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aciklama">Açıklama</label>
          <textarea
            id="aciklama"
            rows={5}
            defaultValue={isUpdate && eventData ? eventData.description : ""}
          ></textarea>
        </div>

        <div>
          <button type="submit">{isUpdate ? "Güncelle" : "Kaydet"}</button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;