// frontend/src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  // Sayfa ve Seçili Etkinlik State'leri (Adım 8)
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Arama ve Filtre State'leri (Adım 10)
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Sayfa Değiştirme Fonksiyonu
  function go(nextPage: PageName, id: string | null = null) {
    setPage(nextPage);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Dinamik Kategori Listesi
  const categories = Array.from(new Set(events.map((e) => e.category)));

  // Filtrelenmiş Etkinlikler Listesi
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  // Detay Sayfası İçin Seçili Etkinlik (Adım 12)
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  // Ana Sayfa İçin Yaklaşan 2 Etkinlik (Adım 9)
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Sekme Başlığı Güncelleme (Adım 11 - useEffect)
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

  // Kart JSX Fonksiyonu (Adım 9)
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          <strong>Kategori:</strong> {event.category}
        </p>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}, {event.time}
        </p>
        <p>
          <strong>Konum:</strong> {event.location}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>
        <p style={{ marginTop: "0.5rem" }}>{event.description}</p>
        <button
          type="button"
          className="btn-detay"
          style={{ marginTop: "var(--bosluk-m)" }}
          onClick={() => go("detail", event.id)}
        >
          Detayları gör →
        </button>
      </article>
    );
  }

  return (
    <div className="app-container">
      <header className="site-baslik">
        <h1>
          {page === "detail" && selectedEvent
            ? selectedEvent.title
            : page === "add"
            ? "Etkinlik Ekle"
            : page === "update"
            ? "Etkinlik Güncelle"
            : page === "events"
            ? "Tüm Etkinlikler"
            : "Kampüs Etkinlikleri"}
        </h1>
        <p style={{ marginTop: "0.25rem", opacity: 0.9 }}>
          {page === "events"
            ? "Ekim ayında kampüste düzenlenen etkinlikler."
            : "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."}
        </p>
        <nav className="menu" style={{ marginTop: "var(--bosluk-m)" }}>
          <ul>
            <li>
              <a
                href="#home"
                aria-current={page === "home" ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go("home");
                }}
              >
                Ana Sayfa
              </a>
            </li>
            <li>
              <a
                href="#events"
                aria-current={page === "events" ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Etkinlikler
              </a>
            </li>
            <li>
              <a
                href="#add"
                aria-current={page === "add" ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go("add");
                }}
              >
                Ekle
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA (Adım 9) */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div
              className="etkinlik-grid ikili"
              style={{ marginTop: "var(--bosluk-m)" }}
            >
              {upcomingEvents.map(renderCard)}
            </div>
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

        {/* ETKİNLİKLER SAYFASI (Adım 10) */}
        {page === "events" && (
          <section>
            <form
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                gap: "var(--bosluk-m)",
                flexWrap: "wrap",
                marginBottom: "var(--bosluk-m)",
              }}
            >
              <div className="form-group" style={{ flex: 1, minWidth: "200px" }}>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: "200px" }}>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p style={{ marginBottom: "var(--bosluk-m)", fontWeight: "bold" }}>
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-grid">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI (Adım 12) */}
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
                <p style={{ margin: "0.5rem 0 1rem" }}>
                  İstenen etkinlik bulunamadı. Lütfen listeden bir etkinlik seçin.
                </p>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => go("events")}
                >
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <div className="detay-container">
                <figure>
                  <img
                    src={selectedEvent.image || "/afis.svg"}
                    alt={`${selectedEvent.title} afişi`}
                    className="detay-afis"
                  />
                  <figcaption
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      marginTop: "0.25rem",
                    }}
                  >
                    {selectedEvent.title} afişi
                  </figcaption>
                </figure>

                <div>
                  <h3>Etkinlik Künyesi</h3>
                  <dl className="kunye" style={{ marginTop: "0.5rem" }}>
                    <dt>Tarih</dt>
                    <dd>
                      {formatDate(selectedEvent.date)}, {selectedEvent.time}
                    </dd>

                    <dt>Yer</dt>
                    <dd>{selectedEvent.location}</dd>

                    <dt>Kategori</dt>
                    <dd>{selectedEvent.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>{selectedEvent.capacity} kişi</dd>
                  </dl>

                  <h3 style={{ marginTop: "var(--bosluk-m)" }}>Açıklama</h3>
                  <p style={{ marginTop: "0.5rem" }}>
                    {selectedEvent.description}
                  </p>

                  <div
                    style={{
                      marginTop: "var(--bosluk-m)",
                      display: "flex",
                      gap: "var(--bosluk-m)",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => go("events")}
                    >
                      ← Listeye dön
                    </button>
                    <button
                      type="button"
                      className="btn-detay"
                      onClick={() => go("update", selectedEvent.id)}
                    >
                      Bu etkinliği güncelle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* EKLE / GÜNCELLE SAYFALARI (Adım 13) */}
        {(page === "add" || page === "update") && (
          <section>
            <p style={{ marginBottom: "var(--bosluk-m)", color: "#666" }}>
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="ad">Etkinlik Adı *</label>
                <input
                  type="text"
                  id="ad"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.title : ""
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="kategori">Kategori *</label>
                <select
                  id="kategori"
                  defaultValue={
                    page === "update" && selectedEvent
                      ? selectedEvent.category
                      : ""
                  }
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
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.date : ""
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="saat">Saat *</label>
                <input
                  type="time"
                  id="saat"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.time : ""
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="yer">Yer *</label>
                <input
                  type="text"
                  id="yer"
                  placeholder="Örn. A Blok Konferans Salonu"
                  defaultValue={
                    page === "update" && selectedEvent
                      ? selectedEvent.location
                      : ""
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="kontenjan">Kontenjan</label>
                <input
                  type="number"
                  id="kontenjan"
                  defaultValue={
                    page === "update" && selectedEvent
                      ? selectedEvent.capacity
                      : ""
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea
                  id="aciklama"
                  rows={5}
                  defaultValue={
                    page === "update" && selectedEvent
                      ? selectedEvent.description
                      : ""
                  }
                ></textarea>
              </div>

              <div>
                <button type="submit">
                  {page === "update" ? "Güncelle" : "Kaydet"}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Gökhan Sarıçiçek - 2221032076</p>
      </footer>
    </div>
  );
}

export default App;