# Kampüs Etkinlikleri — Sprint 2

Bu proje, Kampüs Etkinlikleri uygulamasının responsive (duyarlı) CSS tasarımı giydirilmiş Sprint 2 sürümüdür.

## Proje Bilgileri
* **Öğrenci Adı Soyadı:** Gökhan Sarıçiçek
* **Öğrenci Numarası:** 2221032076
* **Git Etiketi (Tag):** `sprint-02`
* **Vercel Canlı Yayın Adresi:** https://kampus-etkinlik-six.vercel.app
* **Özel CSS Dosyası:** `css/2221032076.css`

## Sprint 2 Yenilikleri ve Yapılan Çalışmalar

1. **Öğrenci Numarasına Özel CSS:**
   * Öğrenci numarasına bağlı dinamik renk paleti (`--ton: mod(2221032076, 360)`) kullanıldı.
   * Numara son hanesi (6) kuralına göre `--font: "Courier New", monospace;` font ailesi tanımlandı.

2. **Responsive (Duyarlı) Izgara ve Kart Düzeni:**
   * Sprint 1'deki HTML tabloları kaldırılarak semantik `<section>` ve `<article>` kart yapılarına geçildi.
   * Mobil cihazlarda (telefon) taşmayı önlemek için kartlar ve formlar tek sütun olarak hizalandı.
   * Masaüstü ekranlarda `index.html` sayfasında 2'li, `etkinlikler.html` sayfasında 3'lü grid yapısı kuruldu.

3. **Sayfa Tasarımları ve Formlar:**
   * **Detay Sayfası:** Afiş görseli solda, künye bilgileri (`<dl>`) sağda konumlandırıldı; mobilde alt alta gelecek şekilde esnetildi.
   * **Formlar (Ekle & Güncelle):** Dikey form düzeni uygulandı; zorunlu/hatalı alanlarda kırmızı çerçeve uyarısı sağlandı.