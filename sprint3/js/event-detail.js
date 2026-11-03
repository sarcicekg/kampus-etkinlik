// sprint3/js/event-detail.js
import { events } from "./data.js";

const container = document.querySelector("#detay");

function formatTarih(tarihStr) {
  const d = new Date(tarihStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

if (container) {
  // 1. URL'den id parametresini oku (?id=event-1)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // 2. data.js içinde id ile eşleşen etkinliği bul
  const event = events.find(e => e.id === id);

  if (!event) {
    // 3. Etkinlik bulunamazsa veya ID geçersizse hata kutusu göster
    container.innerHTML = `
      <div style="border: 1px solid red; background-color: #ffe6e6; padding: var(--bosluk-m); border-radius: var(--kose); margin-bottom: var(--bosluk-m);">
        <h2 style="color: red; margin-bottom: 0.5rem;">Etkinlik bulunamadı</h2>
        <p style="margin-bottom: 1rem;">"${id || 'boş'}" kimliğine sahip bir etkinlik bulunamadı. Lütfen listeden geçerli bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="btn-link">← Listeye dön</a>
      </div>
    `;
  } else {
    // 4. Etkinlik bulunursa sekme başlığını ve içeriği güncelle
    document.title = `${event.title} - Kampüs Etkinlikleri`;

    container.innerHTML = `
      <h2>${event.title}</h2>

      <div class="detay-container">
        <figure>
          <img src="https://via.placeholder.com/300x200" alt="${event.title} Afişi" class="detay-afis">
          <figcaption style="font-size: 0.8rem; color: #666; margin-top: 0.25rem;">${event.title} afişi</figcaption>
        </figure>

        <div>
          <h3>Etkinlik Künyesi</h3>
          <dl class="kunye" style="margin-top: 0.5rem;">
            <dt>Tarih</dt>
            <dd>${formatTarih(event.date)}, ${event.time}</dd>

            <dt>Yer</dt>
            <dd>${event.location}</dd>

            <dt>Kategori</dt>
            <dd>${event.category}</dd>

            <dt>Kontenjan</dt>
            <dd>${event.capacity} kişi</dd>
          </dl>

          <h3 style="margin-top: var(--bosluk-m);">Açıklama</h3>
          <p style="margin-top: 0.5rem;">${event.description}</p>

          <div style="margin-top: var(--bosluk-m); display: flex; gap: var(--bosluk-m); flex-wrap: wrap;">
            <a href="etkinlikler.html" class="btn-link">← Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="btn-detay">Bu etkinliği güncelle</a>
          </div>
        </div>
      </div>
    `;
  }
}