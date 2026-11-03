// sprint3/js/event-form.js
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
  const isGuncelle = form.dataset.mode === "guncelle";
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  let mevcutEtkinlik = null;

  // 1. Güncelleme Modu Kontrolü
  if (isGuncelle) {
    mevcutEtkinlik = events.find(e => e.id === id);

    if (!mevcutEtkinlik) {
      // id yoksa veya eşleşen etkinlik bulunamazsa formu gizle ve uyarı göster
      form.outerHTML = `
        <div style="border: 1px solid red; background-color: #ffe6e6; padding: var(--bosluk-m); border-radius: var(--kose);">
          <p style="color: red; font-weight: bold; margin-bottom: 0.5rem;">Güncellenecek etkinlik seçilmedi!</p>
          <p style="margin-bottom: 1rem;">Önce listeden bir etkinlik seçip detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <a href="etkinlikler.html" class="btn-link">Etkinliklere git</a>
        </div>
      `;
    } else {
      // Etkinlik bulunduysa alanları doldur
      form.elements.ad.value = mevcutEtkinlik.title || "";
      form.elements.kategori.value = mevcutEtkinlik.category || "";
      form.elements.tarih.value = mevcutEtkinlik.date || "";
      form.elements.saat.value = mevcutEtkinlik.time || "";
      form.elements.yer.value = mevcutEtkinlik.location || "";
      form.elements.kontenjan.value = mevcutEtkinlik.capacity || "";
      form.elements.aciklama.value = mevcutEtkinlik.description || "";
    }
  }

  // 2. Form Gönderim (Submit) Mantığı ve Doğrulama
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hata yerlerini ve eski uyarıları temizle
    document.querySelectorAll(".hata-mesaji").forEach(span => span.textContent = "");
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    if (mesajKutusu) mesajKutusu.innerHTML = "";

    const fd = new FormData(form);
    const data = {
      id: isGuncelle ? id : `event-${events.length + 1}`,
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

    const errors = {};

    // Slayttaki kurallara göre kontroller:
    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalıdır.";
    }
    if (!data.category) {
      errors.kategori = "Lütfen bir kategori seçin.";
    }
    if (!data.date) {
      errors.tarih = "Lütfen tarih seçin.";
    }
    if (!data.time) {
      errors.saat = "Lütfen saat seçin.";
    }
    if (!data.location) {
      errors.yer = "Lütfen yer bilgisini yazın.";
    }
    if (data.capacity !== null && data.capacity !== 0) {
      if (data.capacity < 1 || data.capacity > 1000) {
        errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
      }
    }

    // Hata varsa göster
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(alanKey => {
        const hataSpan = document.querySelector(`#hata-${alanKey}`);
        const alanInput = form.elements[alanKey];
        if (hataSpan) hataSpan.textContent = errors[alanKey];
        if (alanInput) alanInput.setAttribute("aria-invalid", "true");
      });

      if (mesajKutusu) {
        mesajKutusu.innerHTML = `
          <div style="border: 1px solid red; background-color: #ffe6e6; padding: 0.8rem; border-radius: var(--kose); color: red;">
            Formda hatalı veya eksik alanlar var. Lütfen düzeltin.
          </div>
        `;
      }
      return;
    }

    // Hata yoksa nesneyi ekrana JSON olarak bas
    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div style="border: 1px solid green; background-color: #e6ffe6; padding: 1rem; border-radius: var(--kose); color: #006600;">
          <p style="font-weight: bold; margin-bottom: 0.5rem;">${isGuncelle ? 'Etkinlik güncellendi' : 'Etkinlik oluşturuldu'} (bu sprintte kaydedilmez):</p>
          <pre style="background: #fff; padding: 0.8rem; border-radius: 4px; border: 1px solid #ccc; font-family: monospace; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}