# Smart Library API - Complete CRUD System

Aplikasi RESTful API untuk Sistem Manajemen Perpustakaan Pintar (Smart Library). API ini melayani pendataan buku, penulis, kategori, anggota perpustakaan, hingga transaksi peminjaman buku dengan fitur CRUD lengkap, pencarian global, dan laporan statistik.

## 🚀 Fitur Utama

✅ **CRUD Lengkap** untuk Authors, Categories, Books, dan Members  
✅ **Fitur Pencarian Global** dengan query parameter (name/title)  
✅ **Endpoint Pengembalian Buku** dengan logika otomatis (update status, return_date, dan stok)  
✅ **Endpoint Laporan Statistik** perpustakaan  
✅ **Database Transaction** untuk menjaga konsistensi data  
✅ **Ready untuk Deploy** ke Vercel

## 🛠️ Teknologi yang Digunakan

- **Node.js** & **Express.js** (Web Framework)
- **PostgreSQL** (Database Relasional)
- **node-postgres (pg)** (PostgreSQL client untuk Node.js)
- **dotenv** (Environment Variables)
- **CORS** (Cross-Origin Resource Sharing)

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd smart-library-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` di root project:
```env
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
PORT=3000
```

### 4. Setup Database
Pastikan database PostgreSQL sudah dibuat dengan tabel:
- `authors` (id, name, nationality)
- `categories` (id, name)
- `books` (id, isbn, title, author_id, category_id, total_copies, available_copies)
- `members` (id, full_name, email, member_type, joined_at)
- `loans` (id, book_id, member_id, loan_date, due_date, return_date, status)

### 5. Run Server
```bash
# Development
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Root Endpoint
**GET** `/`  
Response: `Smart Library API is Running...`

---

## 🔍 Fitur Pencarian Global

Semua endpoint GET berikut mendukung pencarian:

### Authors
```
GET /api/authors?name=rowling
```

### Categories
```
GET /api/categories?name=fantasy
```

### Books
```
GET /api/books?title=harry
```

**Catatan:** Jika parameter query kosong, akan mengembalikan semua data.

---

## 📖 Endpoints Detail

### 1. AUTHORS (Penulis)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/authors` | Ambil semua penulis (support search: `?name=keyword`) |
| GET | `/api/authors/:id` | Ambil penulis berdasarkan ID |
| POST | `/api/authors` | Tambah penulis baru |
| PUT | `/api/authors/:id` | Update penulis |
| DELETE | `/api/authors/:id` | Hapus penulis |

**Body POST/PUT:**
```json
{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

---

### 2. CATEGORIES (Kategori)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/categories` | Ambil semua kategori (support search: `?name=keyword`) |
| GET | `/api/categories/:id` | Ambil kategori berdasarkan ID |
| POST | `/api/categories` | Tambah kategori baru |
| PUT | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |

**Body POST/PUT:**
```json
{
  "name": "Fantasy"
}
```

---

### 3. BOOKS (Buku)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/books` | Ambil semua buku (support search: `?title=keyword`) |
| GET | `/api/books/:id` | Ambil buku berdasarkan ID |
| POST | `/api/books` | Tambah buku baru |
| PUT | `/api/books/:id` | Update buku |
| DELETE | `/api/books/:id` | Hapus buku |

**Body POST/PUT:**
```json
{
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter and the Philosopher's Stone",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}
```

---

### 4. MEMBERS (Anggota)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/members` | Ambil semua anggota |
| GET | `/api/members/:id` | Ambil anggota berdasarkan ID |
| POST | `/api/members` | Tambah anggota baru |
| PUT | `/api/members/:id` | Update anggota |
| DELETE | `/api/members/:id` | Hapus anggota |

**Body POST/PUT:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

**Member Types:** `STUDENT`, `TEACHER`, `PUBLIC`

---

### 5. LOANS (Peminjaman)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/loans` | Ambil semua data peminjaman |
| POST | `/api/loans` | Buat peminjaman baru |
| PUT | `/api/loans/:id/return` | **Kembalikan buku** (otomatis update status, return_date, stok) |
| DELETE | `/api/loans/:id` | Hapus data peminjaman |

**Body POST:**
```json
{
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-02-15"
}
```

**Endpoint Return Book:**
```
PUT /api/loans/1/return
```
Otomatis:
- Update status → `RETURNED`
- Set `return_date` → tanggal saat ini
- Tambah `available_copies` pada tabel books

---

### 6. REPORTS (Laporan) ⭐

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/reports/stats` | Statistik perpustakaan |

**Response:**
```json
{
  "message": "Statistik perpustakaan berhasil diambil",
  "data": {
    "total_books": 150,
    "total_authors": 45,
    "total_categories": 12,
    "active_loans": 23
  }
}
```

---

## 🧪 Testing dengan Postman

1. Import file `Smart_Library_API.postman_collection.json`
2. Set environment variable `base_url` ke `http://localhost:3000` atau URL Vercel
3. Test semua endpoint
4. Screenshot hasil untuk dokumentasi

---

## 🚀 Deploy ke Vercel

Lihat panduan lengkap di [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Quick Steps:**
1. Push project ke GitHub
2. Import ke Vercel
3. Set environment variable `DATABASE_URL`
4. Deploy!

---

## 📁 Struktur Project

```
smart-library-api/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── models/
│   │   ├── authorModel.js     # Author CRUD operations
│   │   ├── categoryModel.js   # Category CRUD operations
│   │   ├── bookModel.js       # Book CRUD operations
│   │   ├── memberModel.js     # Member CRUD operations
│   │   ├── loanModel.js       # Loan operations
│   │   └── reportModel.js     # Report statistics
│   ├── controllers/
│   │   ├── authorController.js
│   │   ├── categoryController.js
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   ├── loanController.js
│   │   └── reportController.js
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── loanRoutes.js
│   │   └── reportRoutes.js
│   └── index.js               # Main application
├── .env                       # Environment variables
├── package.json
├── vercel.json               # Vercel configuration
├── API_DOCUMENTATION.md      # Detailed API docs
├── DEPLOYMENT_GUIDE.md       # Deployment guide
└── Smart_Library_API.postman_collection.json
```

---

## ✅ Checklist Fitur Praktikum

- [x] **CRUD Lengkap** untuk Authors, Categories, Books, Members
- [x] **Fitur Pencarian Global** dengan query parameter (name/title)
- [x] **Endpoint Pengembalian Buku** dengan logika otomatis
- [x] **Endpoint Laporan Statistik** perpustakaan
- [x] **Ready untuk Deploy** ke Vercel
- [x] **Postman Collection** untuk testing
- [x] **Dokumentasi Lengkap**

---

## 📄 Dokumentasi Tambahan

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Dokumentasi API lengkap dengan contoh request/response
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Panduan deploy ke Vercel step-by-step

---

## 🤝 Kontribusi

Silakan buat pull request atau laporkan issue jika menemukan bug.

---

## 📝 License

MIT License

---

**Dibuat untuk memenuhi tugas praktikum Sistem Manajemen Perpustakaan**