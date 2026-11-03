// frontend/src/pages/EventsPage.tsx
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const categories = Array.from(new Set(events.map((e) => e.category)));
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  return (
    <section>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <p style={{ marginBottom: "var(--bosluk-m)", fontWeight: "bold" }}>
        {filteredEvents.length === 0
          ? "Aramanıza uygun etkinlik bulunamadı."
          : `${filteredEvents.length} etkinlik listeleniyor.`}
      </p>
      <EventList
        events={filteredEvents}
        emptyText="Aramanıza uygun etkinlik bulunamadı."
      />
    </section>
  );
}