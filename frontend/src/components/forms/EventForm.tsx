// frontend/src/components/forms/EventForm.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData } from "../../types/campus-event";
import { validateEvent, type EventFormErrors } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData;
  submitText?: string;
  onSubmit: (data: EventFormData) => void;
}

const defaultData: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
  image: "/afis.svg",
};

function EventForm({
  initialData = defaultData,
  submitText = "Kaydet",
  onSubmit,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const foundErrors = validateEvent(data);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Tarih *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Saat *</label>
        <input
          type="time"
          id="time"
          name="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Yer *</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Örn. A Blok Konferans Salonu"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          placeholder="Örn. 100"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        ></textarea>
        {errors.description && (
          <span className="hata-metni">{errors.description}</span>
        )}
      </div>

      <div>
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
}

export default EventForm;