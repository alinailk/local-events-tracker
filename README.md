# 📅 LOCAL EVENTS TRACKER

React frontend ve PHP + MySQL backend ile geliştirilmiş bir etkinlik yönetim sistemi.  
Kullanıcılar etkinlik ekleyebilir, güncelleyebilir, silebilir ve detaylarını görüntüleyebilir.

---

## 🧰 Kullanılan Teknolojiler

| Katman     | Teknoloji               |
|------------|-------------------------|
| Frontend   | React (JSX), CSS        |
| Backend    | PHP (REST API), MySQL   |
| Veritabanı | `local_events_db`       |
| Ortam      | VS Code, Visual Studio  |
| Versiyon   | GitHub ile takip        |

---

## 📁 Proje Yapısı

```plaintext
LOCAL-EVENTS-TRACKER/
├── backend/
│   ├── config/
│   │   ├── cors.php
│   │   └── db.php
│   └── routes/
│       ├── create-event.php
│       ├── delete-event.php
│       ├── get-event-detail.php
│       ├── get-event.php
│       ├── update-event.php
│       ├── test-db.php
│       └── .gitkeep
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Footer/
│       │   ├── Header/
│       │   ├── EventCard.jsx
│       │   ├── EventForm.jsx
│       │   └── UpdateModal.jsx
│       ├── pages/
│       │   ├── HomePage.css
│       │   └── HomePage.jsx
│       ├── services/
│       ├── utils/
│       │   ├── App.css
│       │   ├── App.js
│       │   └── index.css
│
└── README.md
```

---

## ⚙️ Özellikler

- ✅ Etkinlik ekleme, silme (soft delete), güncelleme ve detay görüntüleme  
- ✅ Açılır/kapanır form ve modal bileşenleri  
- ✅ Kategorilere göre renkli kartlar  
- ✅ API üzerinden frontend-backend haberleşmesi  
- ✅ GitHub commit konvansiyonuna uygun repo yapısı  

---

## 🗄️ Veritabanı Yapısı

**Veritabanı adı:** `local_events_db`  
**Tablo adı:** `events`

```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATE,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);
```

### 📌 Sütun Açıklamaları

| Sütun       | Tür           | Açıklama                                   |
|-------------|--------------|--------------------------------------------|
| id          | INT          | Otomatik artan benzersiz ID                |
| title       | VARCHAR(255) | Etkinlik başlığı                           |
| description | TEXT         | Etkinlik açıklaması                        |
| location    | VARCHAR(255) | Etkinlik yeri                              |
| date        | DATE         | Etkinlik tarihi                            |
| category    | VARCHAR(100) | Etkinlik kategorisi (renkli kartlar için)  |
| created_at  | TIMESTAMP    | Oluşturulma zamanı (otomatik)              |
| deleted_at  | TIMESTAMP    | Soft delete için silinme zamanı            |

---

## 🔌 API Endpoint'leri

| Endpoint                        | Yöntem | Açıklama                                                   |
|---------------------------------|--------|-----------------------------------------------------------|
| `/get-event.php`                | GET    | `deleted_at IS NULL` olan etkinlikleri listeler            |
| `/get-event-detail.php?id=1`    | GET    | Belirli etkinliğin tüm detaylarını getirir                 |
| `/create-event.php`             | POST   | Yeni etkinlik ekler (`title, description, location, date, category`) |
| `/update-event.php?id=1`        | POST   | Etkinlik bilgilerini günceller                            |
| `/delete-event.php?id=1`        | POST   | `deleted_at = CURRENT_TIMESTAMP` ile soft delete uygular   |
| `/test-db.php`                  | GET    | Veritabanı bağlantısını test eder                         |

---

## 🚀 Kurulum

### 1. Backend

- `backend/config/db.php` içinde veritabanı bağlantı bilgilerini girin.  
- PHP sunucusunda `routes/` klasörünü çalıştırılabilir hale getirin.  

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

- Gerekirse `App.js` içinde API URL’lerini backend'e göre güncelleyin.

---
