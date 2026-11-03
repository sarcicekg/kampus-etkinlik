https://kampus-etkinlik-six.vercel.app

# Kampüs Etkinlikleri — Sprint 3 (JavaScript & DOM)

Bu proje, Kampüs Etkinlikleri uygulamasının JavaScript modülleri (ES Modules) ve DOM manipülasyonu ile dinamik hale getirilmiş Sprint 3 sürümüdür.

## Proje Bilgileri
* **Öğrenci Adı Soyadı:** Gökhan Sarıçiçek
* **Öğrenci Numarası:** 2221032076
* **Git Etiketi (Tag):** `sprint-03`
* **Vercel Canlı Yayın Adresi:** https://kampus-etkinlik-six.vercel.app

## Sprint 3 Yenilikleri ve Modül Yapısı
1. **Dinamik Veri Yönetimi (`data.js`):** Etkinlik verileri tek bir merkezde en az 6 adet nesneden oluşan bir dizi ile yönetilir.
2. **Kart Üretimi ve Sıralama (`event-list.js`):**
   * `etkinlikler.html` sayfasında 6 kart veriden dinamik üretilir.
   * `index.html` sayfasında `data-limit="2"` özniteliği okunarak tarihe göre en yakın 2 etkinlik listelenir.
3. **Anlık Arama ve Kategori Filtreleme:** Türkçe karakter destekli (`toLocaleLowerCase("tr-TR")`) metin araması ve `Set` ile veriden türetilen dinamik kategori filtresi uygulandı.
4. **Dinamik Detay Sayfası (`event-detail.js`):** URL üzerindeki `?id=` parametresi okunarak ilgili etkinlik gösterilir. Geçersiz ID durumunda sayfa çökmez, hata mesajı basılır.
5. **Form Doğrulama ve Güncelleme (`event-form.js`):**
   * Tarayıcının varsayılan doğrulama balonları kapatıldı (`novalidate`).
   * Kurallara uymayan alanların altında özel Türkçe hata mesajları ve kırmızı çerçeve uyarısı gösterilir.
   * Güncelleme sayfasına ID'siz erişilirse uyarı kutusu basılır.