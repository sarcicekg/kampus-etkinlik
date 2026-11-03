# Kampüs Etkinlikleri — Sprint 6 & Vize

Fakültedeki seminer, atölye, söyleşi ve yarışmaları tek bir platform üzerinden takip etmeyi ve yönetmeyi sağlayan React, TypeScript ve React Router kullanılarak geliştirilmiş web uygulaması.

## Canlı Vercel Adresi
https://gokhansarcicek-frontend.vercel.app/

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz:

```bash
# 1. Frontend klasörüne geçin
cd frontend

# 2. Gerekli bağımlılıkları yükleyin
npm install

# 3. Uygulamayı geliştirici modunda başlatın
npm run dev
/ — HomePage (Ana Sayfa)

/events — EventsPage (Tüm Etkinlikler)

/events/:id — EventDetailPage (Etkinlik Detayı)

/admin — AdminPage (Etkinlik Yönetimi)

/admin/new — AddEventPage (Yeni Etkinlik Ekle)

/admin/:id/edit — EditEventPage (Etkinlik Güncelle)

/login — LoginPage (Giriş Yap)

/register — RegisterPage (Kayıt Ol)

/forgot-password — ForgotPasswordPage (Şifremi Unuttum)

* — NotFoundPage (404 Sayfa Bulunamadı)