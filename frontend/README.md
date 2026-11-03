https://kampus-etkinlik-six.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite, React & TypeScript)

Bu proje, Kampüs Etkinlikleri uygulamasının Vite, React ve TypeScript altyapısına taşınmış Sprint 4 sürümüdür.

## Proje Bilgileri
* **Öğrenci Adı Soyadı:** Gökhan Sarıçiçek
* **Öğrenci Numarası:** 2221032076
* **Git Etiketi (Tag):** `sprint-04`
* **Vercel Canlı Yayın Adresi:** https://kampus-etkinlik-six.vercel.app

## Dosya Yapısı ve Görevleri
* `package.json`: Proje adı, bağımlılıklar ve npm komutlarını (dev, build) tanımlar.
* `vite.config.ts`: Vite sunucusu ve React eklentisi yapılandırmalarını içerir.
* `index.html`: Uygulamanın tek HTML giriş noktasıdır; `div#root` elemanını barındırır.
* `src/main.tsx`: React uygulamasını başlatır ve `App` bileşenini DOM'a bağlar.
* `src/App.tsx`: 5 sayfanın görünüm ve state mantığını yöneten ana bileşendir.
* `src/types/campus-event.ts`: Etkinlik ve kategori veri tiplerini tanımlar.
* `src/data/events.ts`: Tip güvenli 6 etkinlik verisini barındırır.
* `src/utils/filter-events.ts`: Arama, kategori filtreleme ve ID bulma saf fonksiyonlarını içerir.