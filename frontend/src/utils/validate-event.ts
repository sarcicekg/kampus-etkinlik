// frontend/src/utils/validate-event.ts
import type { EventFormData } from "../types/campus-event";

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (data.title.trim().length < 3) {
    errors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
  }

  if (!data.category) {
    errors.category = "Lütfen bir kategori seçin.";
  }

  if (!data.date) {
    errors.date = "Tarih alanı boş bırakılamaz.";
  }

  if (!data.time) {
    errors.time = "Saat alanı boş bırakılamaz.";
  }

  if (!data.location.trim()) {
    errors.location = "Yer alanı boş bırakılamaz.";
  }

  const capacityNum = Number(data.capacity);
  if (
    !data.capacity ||
    !Number.isInteger(capacityNum) ||
    capacityNum < 1 ||
    capacityNum > 1000
  ) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında tam sayı olmalıdır.";
  }

  if (data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalıdır.";
  }

  return errors;
}