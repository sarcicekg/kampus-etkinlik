// frontend/src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";

// Data & Types & Utils
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

// Components
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(nextPage: PageName, id: string | null = null) {
    setPage(nextPage);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const categories = Array.from(new Set(events.map((e) => e.category)));
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "events") title = "Tüm Etkinlikler - Kampüs Etkinlikleri";
    else if (page === "add") title = "Etkinlik Ekle - Kampüs Etkinlikleri";
    else if (page === "update") title = "Etkinlik Güncelle - Kampüs Etkinlikleri";
    else if (page === "detail" && selectedEvent) {
      title = `${selectedEvent.title} - Kampüs Etkinlikleri`;
    }
    document.title = title;
  }, [page, selectedEvent]);

  return (
    <div className="app-container">
      <Header
        title={
          page === "detail" && selectedEvent
            ? selectedEvent.title
            : page === "add"
            ? "Etkinlik Ekle"
            : page === "update"
            ? "Etkinlik Güncelle"
            : page === "events"
            ? "Tüm Etkinlikler"
            : "Kampüs Etkinlikleri"
        }
        text={
          page === "events"
            ? "Ekim ayında kampüste düzenlenen etkinlikler."
            : "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
        }
      />

      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcomingEvents}
              onShowDetail={(id) => go("detail", id)}
              isGrid2
            />
            <div style={{ marginTop: "var(--bosluk-m)" }}>
              <button
                type="button"
                className="btn-link"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör →
              </button>
            </div>
          </section>
        )}

        {page === "events" && (
          <section>
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
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div
                style={{
                  border: "1px solid red",
                  backgroundColor: "#ffe6e6",
                  padding: "var(--bosluk-m)",
                  borderRadius: "var(--kose)",
                }}
              >
                <h3 style={{ color: "red" }}>Etkinlik bulunamadı</h3>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => go("events")}
                >
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <EventDetail
                event={selectedEvent}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <EventForm
              onSubmit={() => window.scrollTo(0, 0)}
              isUpdate={page === "update"}
              eventData={selectedEvent}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;