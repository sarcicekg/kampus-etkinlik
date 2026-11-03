Kampüs Etkinlikleri — Sprint 6 & VizeFakültedeki seminer, atölye, söyleşi ve yarışmaları tek bir platform üzerinden takip etmeyi ve yönetmeyi sağlayan React, TypeScript ve React Router tabanlı web uygulaması.🚀 Canlı Yayın (Vercel)Canlı Adres: https://kampus-etkinlik-six.vercel.app👤 Öğrenci BilgileriAd Soyad: Gökhan SarıçiçekÖğrenci Numarası: 2221032076Git Tag: frontend / sprint-06🛠️ Kurulum ve ÇalıştırmaProjeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:# 1. Proje dizinine girin
cd frontend

# 2. Gerekli paketleri yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
Derleme (build) testi için:npm run build
🗺️ Route Listesi (10 Adres)AdresSayfa BileşeniAçıklama/HomePageYaklaşan ilk 2 etkinliği ve özet bilgileri listeler./eventsEventsPageArama ve kategori filtreleme özellikli tüm etkinlikler./events/:idEventDetailPageSeçilen etkinliğin detaylı künyesi ve afişi./adminAdminPageEtkinlik yönetim tablosu (Ekle, Düzenle, Sil işlemleri)./admin/newAddEventPageDoğrulamalı yeni etkinlik ekleme formu./admin/:id/editEditEventPageMevcut etkinlik bilgilerini güncelleme formu./loginLoginPageE-posta ve şifre doğrulamalı kullanıcı giriş sayfası./registerRegisterPageAd soyad, e-posta ve şifre doğrulamalı kayıt sayfası./forgot-passwordForgotPasswordPageŞifre yenileme bağlantısı isteme sayfası.*NotFoundPageTanımsız adresler için 404 hata sayfası.🛠️ Kullanılan Teknolojiler ve MimariFramework & Build Tool: React 18, Vite, TypeScriptYönlendirme (Routing): React Router v6 (BrowserRouter, Routes, Route, NavLink, useParams, useNavigate)State Management: React Context API (EventsContext, custom hook useEvents)Form Doğrulama: Saf doğrulama fonksiyonları (validateEvent), kontrollü form elemanları (controlled inputs) ve dinamik hata mesajları