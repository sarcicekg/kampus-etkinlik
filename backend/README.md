# Kampüs Etkinlikleri — Backend API (Sprint 7)

Express.js kullanılarak geliştirilmiş Kampüs Etkinlikleri REST API sunucusu.

## Kurulum ve Çalıştırma

```bash
# Backend klasörüne geçin.
cd backend

# Bağımlılıkları yükleyin.
npm install

# Geliştirici sunucusunu başlatın. (PORT=3000)
npm run dev
Yöntem (Method),Adres (Endpoint),Amaç,Başarılı Durum,Hata Durumu,Durum
GET,/health,Sunucu sağlık kontrolü,200 OK,-,Aktif
GET,/events,Etkinlik listesini getirir,200 OK,-,Aktif
GET,/events/:id,Tek bir etkinlik detayını getirir,200 OK,404 Not Found,Aktif
POST,/events,Yeni etkinlik ekler,201 Created,400 Bad Request,Aktif
PATCH,/events/:id,Etkinlik günceller,200 OK,400 / 404,Sprint 9
DELETE,/events/:id,Etkinlik siler,204 No Content,404 Not Found,Sprint 9
```
