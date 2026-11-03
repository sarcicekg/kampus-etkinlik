// frontend/src/context/EventsContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, EventFormData, Category } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent tipine dönüştüren yardımcı fonksiyon
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity) || 0,
    description: data.description.trim(),
    image: data.image || "/afis.svg",
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Ekleme
  function addEvent(data: EventFormData) {
    const newEvent = toEvent(`event-${Date.now()}`, data);
    setEvents((prev) => [...prev, newEvent]);
  }

  // Güncelleme
  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? toEvent(id, data) : e))
    );
  }

  // Silme
  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

// Custom Hook (Sayfalardan context'i kolayca çağırmak için)
export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) {
    throw new Error("useEvents bir EventsProvider içinde kullanılmalıdır.");
  }
  return value;
}