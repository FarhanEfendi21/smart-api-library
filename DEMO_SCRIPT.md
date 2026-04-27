# 🎬 Demo Script - Smart Library API

Script untuk presentasi/demo tugas praktikum.

---

## 📋 Persiapan Demo

### Sebelum Demo:
- [ ] API sudah di-deploy ke Vercel
- [ ] Postman sudah dibuka
- [ ] Collection sudah di-import
- [ ] Environment variable `base_url` sudah di-set
- [ ] Browser sudah dibuka (untuk show base URL)
- [ ] Screenshot sudah disiapkan (backup)

---

## 🎯 Demo Flow (10-15 menit)

### 1. Pengenalan Project (1 menit)

**Script:**
> "Selamat pagi/siang. Saya akan mendemonstrasikan Smart Library API yang sudah saya kembangkan. Ini adalah RESTful API untuk sistem manajemen perpustakaan dengan fitur CRUD lengkap, pencarian global, pengembalian buku otomatis, dan laporan statistik."

**Action:**
- Buka browser, tunjukkan base URL
- Akses root endpoint: `https://your-app.vercel.app`
- Tunjukkan response: "Smart Library API is Running..."

---

### 2. Fitur CRUD Lengkap (3 menit)

**Script:**
> "Pertama, saya akan mendemonstrasikan fitur CRUD lengkap untuk entitas Authors."

**Demo Sequence:**

**A. Create (POST)**
```
POST /api/authors
Body: {
  "name": "J.K. Rowling",
  "nationality": "British"
}
```
**Explain:** "Saya membuat author baru dengan nama J.K. Rowling. Response menunjukkan data berhasil dibuat dengan ID 1."

**B. Read All (GET)**
```
GET /api/authors
```
**Explain:** "Endpoint ini menampilkan semua authors yang ada di database."

**C. Read by ID (GET)**
```
GET /api/authors/1
```
**Explain:** "Saya bisa mengambil detail author berdasarkan ID tertentu."

**D. Update (PUT)**
```
PUT /api/authors/1
Body: {
  "name": "J.K. Rowling",
  "nationality": "United Kingdom"
}
```
**Explain:** "Saya update nationality dari British menjadi United Kingdom."

**E. Verify Update**
```
GET /api/authors/1
```
**Explain:** "Kita bisa lihat data sudah terupdate."

**Script:**
> "CRUD yang sama juga tersedia untuk Categories, Books, dan Members. Total ada 23 endpoint CRUD."

---

### 3. Fitur Pencarian Global (2 menit)

**Script:**
> "Fitur kedua adalah pencarian global dengan query parameter."

**Demo Sequence:**

**A. Search Authors**
```
GET /api/authors?name=rowling
```
**Explain:** "Saya bisa mencari author berdasarkan nama. Pencarian ini case-insensitive."

**B. Search Categories**
```
POST /api/categories
Body: {"name": "Fantasy"}

GET /api/categories?name=fantasy
```
**Explain:** "Sama untuk categories, bisa search berdasarkan nama."

**C. Search Books**
```
POST /api/books
Body: {
  "isbn": "978-0-7475-3269-9",
  "title": "Harry Potter and the Philosopher's Stone",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}

GET /api/books?title=harry
```
**Explain:** "Dan untuk books, bisa search berdasarkan title. Jika query parameter kosong, akan mengembalikan semua data."

---

### 4. Fitur Pengembalian Buku (3 menit)

**Script:**
> "Fitur ketiga adalah endpoint khusus untuk pengembalian buku dengan logika otomatis."

**Demo Sequence:**

**A. Create Member**
```
POST /api/members
Body: {
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

**B. Check Book Stock (Before)**
```
GET /api/books/1
```
**Explain:** "Sebelum pinjam, kita lihat available_copies adalah 5."

**C. Create Loan**
```
POST /api/loans
Body: {
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-05-15"
}
```
**Explain:** "Saya membuat peminjaman buku. Sistem otomatis mengurangi stok."

**D. Verify Stock Decreased**
```
GET /api/books/1
```
**Explain:** "Sekarang available_copies berkurang menjadi 4."

**E. Return Book (FITUR UTAMA)**
```
PUT /api/loans/1/return
```
**Explain:** "Ini adalah endpoint khusus untuk pengembalian buku. Dengan satu request, sistem otomatis:
1. Mengubah status menjadi RETURNED
2. Mengisi return_date dengan tanggal saat ini
3. Menambah available_copies pada tabel books"

**F. Verify Return**
```
GET /api/loans/1
```
**Explain:** "Kita bisa lihat status sudah RETURNED dan return_date terisi."

**G. Verify Stock Increased**
```
GET /api/books/1
```
**Explain:** "Dan available_copies kembali menjadi 5. Semua proses ini menggunakan database transaction untuk menjaga konsistensi data."

---

### 5. Fitur Laporan Statistik (2 menit)

**Script:**
> "Fitur keempat adalah endpoint laporan statistik perpustakaan."

**Demo Sequence:**

**A. Create More Data (Quick)**
```
POST /api/authors (1 more)
POST /api/categories (1 more)
POST /api/books (1 more)
POST /api/loans (1 more - don't return)
```

**B. Get Statistics (FITUR UTAMA)**
```
GET /api/reports/stats
```
**Explain:** "Endpoint ini menampilkan statistik perpustakaan secara keseluruhan:
- total_books: Total jumlah buku yang terdaftar
- total_authors: Total jumlah penulis
- total_categories: Total jumlah kategori
- active_loans: Total peminjaman yang masih berstatus BORROWED

Semua data ini diambil secara real-time dari database."

---

### 6. Penutup (1 menit)

**Script:**
> "Jadi, saya sudah mengimplementasikan semua fitur yang diminta:
> 1. ✅ CRUD lengkap untuk Authors, Categories, Books, dan Members - total 23 endpoint
> 2. ✅ Fitur pencarian global dengan query parameter untuk Authors, Categories, dan Books
> 3. ✅ Endpoint khusus pengembalian buku dengan logika otomatis
> 4. ✅ Endpoint laporan statistik perpustakaan
> 5. ✅ API sudah di-deploy ke Vercel dan sudah ditest dengan Postman
>
> Terima kasih."

---

## 🎯 Tips Presentasi

### 1. Persiapan
- Test semua endpoint sebelum demo
- Pastikan data sample sudah siap
- Backup screenshot jika demo gagal

### 2. Saat Demo
- Bicara dengan jelas dan tidak terlalu cepat
- Tunjukkan request body dan response
- Highlight fitur-fitur utama
- Explain logika di balik setiap fitur

### 3. Antisipasi Pertanyaan
Siapkan jawaban untuk:
- "Bagaimana cara handle error?"
- "Bagaimana cara menjaga konsistensi data?"
- "Kenapa pakai database transaction?"
- "Bagaimana cara deploy ke Vercel?"

---

## 💡 Jawaban untuk Pertanyaan Umum

### Q: "Bagaimana cara handle error?"
**A:** "Saya menggunakan try-catch block di semua controller. Jika ada error, sistem akan return status code yang sesuai (400 untuk bad request, 404 untuk not found, 500 untuk server error) beserta error message yang jelas."

### Q: "Bagaimana cara menjaga konsistensi data?"
**A:** "Saya menggunakan database transaction untuk operasi yang melibatkan multiple tables, seperti create loan dan return book. Jika ada error di salah satu step, semua perubahan akan di-rollback."

### Q: "Kenapa pakai PostgreSQL?"
**A:** "PostgreSQL adalah database relasional yang powerful dan reliable. Cocok untuk aplikasi yang membutuhkan relasi antar tabel seperti perpustakaan ini (books → authors, books → categories, loans → books, loans → members)."

### Q: "Bagaimana cara deploy ke Vercel?"
**A:** "Saya push project ke GitHub, lalu import ke Vercel. Set environment variable DATABASE_URL, dan Vercel otomatis deploy. Vercel cocok untuk Node.js API dan gratis untuk project kecil."

### Q: "Bagaimana cara testing?"
**A:** "Saya menggunakan Postman untuk testing semua endpoint. Saya sudah membuat collection lengkap dengan 28 endpoint dan sudah screenshot semua request-response untuk dokumentasi."

---

## 📸 Backup Plan

Jika demo gagal (internet down, API error, dll):

1. **Tunjukkan Screenshot**
   - Buka folder screenshot
   - Explain setiap screenshot
   - Tunjukkan request dan response

2. **Tunjukkan Code**
   - Buka VS Code
   - Tunjukkan struktur project
   - Explain implementasi fitur utama

3. **Tunjukkan Dokumentasi**
   - Buka API_DOCUMENTATION.md
   - Tunjukkan endpoint lengkap
   - Explain fitur-fitur

---

## ⏱️ Time Management

| Waktu | Aktivitas |
|-------|-----------|
| 0-1 min | Pengenalan |
| 1-4 min | Demo CRUD |
| 4-6 min | Demo Search |
| 6-9 min | Demo Return Book |
| 9-11 min | Demo Statistics |
| 11-12 min | Penutup |
| 12-15 min | Q&A |

**Total: 15 menit**

---

## ✅ Pre-Demo Checklist

30 menit sebelum demo:

- [ ] Test semua endpoint
- [ ] Clear database (optional - untuk demo fresh)
- [ ] Prepare sample data
- [ ] Test internet connection
- [ ] Open Postman
- [ ] Open browser
- [ ] Prepare backup screenshots
- [ ] Practice demo flow 1x

---

## 🎬 Demo Script Singkat (5 menit)

Jika waktu terbatas:

1. **Intro (30 detik)**
   - Tunjukkan base URL

2. **CRUD (1 menit)**
   - POST author
   - GET authors
   - PUT author

3. **Search (1 menit)**
   - Search authors
   - Search books

4. **Return Book (2 menit)**
   - Create loan
   - Return book
   - Verify stock

5. **Statistics (30 detik)**
   - GET stats

6. **Closing (30 detik)**
   - Summary fitur

---

**Good luck with your demo! 🎉**

Remember: Confidence is key! You've built a complete, working API. Be proud of it! 💪
