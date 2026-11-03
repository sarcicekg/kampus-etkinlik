// sprint3/js/event-list.js
import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function formatTarih(tarihStr) {
  const d = new Date(tarihStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export function createCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p><strong>Kategori:</strong> ${event.category}</p>
      <p><strong>Tarih:</strong> ${formatTarih(event.date)}, ${event.time}</p>
      <p><strong>Konum:</strong> ${event.location}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="btn-detay">Detayları gör →</a>
    </article>
  `;
}

export function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = `<p style="color: red; grid-column: 1 / -1;">Aramanıza uygun etkinlik bulunamadı.</p>`;
  } else {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// Filtreleme Mantığı (Sadece Etkinlikler Sayfasında Çalışır)
if (filtreFormu) {
  // 1. Kategorileri data.js'ten dinamik çek (Tekrarsız - Set kullanarak)
  const kategoriler = [...new Set(events.map(e => e.category))];
  kategoriler.forEach(kat => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    kategoriSelect.appendChild(option);
  });

  // 2. Filtreleme Fonksiyonu
  function filtrele() {
    const aranan = aramaInput.value.trim().toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriSelect.value;

    const filtrelenmis = events.filter(event => {
      const baslikUyuyor = event.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const aciklamaUyuyor = event.description.toLocaleLowerCase("tr-TR").includes(aranan);
      const metinUyuyor = baslikUyuyor || aciklamaUyuyor;

      const kategoriUyuyor = secilenKategori === "" || event.category === secilenKategori;

      return metinUyuyor && kategoriUyuyor;
    });

    render(filtrelenmis);
    if (sonucSatiri) {
      sonucSatiri.textContent = `${filtrelenmis.length} etkinlik listeleniyor.`;
    }
  }

  // Enter basıldığında sayfanın yenilenmesini engelle
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  // Dinleyiciler (Event Listeners)
  aramaInput.addEventListener("input", filtrele);
  kategoriSelect.addEventListener("change", filtrele);

  // Başlangıç sonuç sayısı
  if (sonucSatiri) {
    sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
  }
}

// Ana Sayfa ve Etkinlikler Sayfası Ayrımı
if (list) {
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);
  }
}