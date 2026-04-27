# ⚡ Quick Start Guide - Smart Library API

Panduan cepat untuk memulai dalam 5 menit!

---

## 🎯 Tujuan

Menyelesaikan tugas praktikum dengan implementasi:
1. ✅ CRUD lengkap (Authors, Categories, Books, Members)
2. ✅ Fitur pencarian global
3. ✅ Endpoint pengembalian buku
4. ✅ Endpoint laporan statistik
5. ✅ Deploy ke Vercel + Testing Postman

---

## 🚀 3 Langkah Utama

### 1️⃣ Deploy ke Vercel (15 menit)

**A. Persiapan Database**
- Buat database PostgreSQL di [Neon.tech](https://neon.tech) (gratis)
- Copy connection string

**B. Deploy**
1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Smart Library API"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Buka [vercel.com](https://vercel.com)
3. Klik **New Project**
4. Import repository GitHub Anda
5. Add Environment Variable:
   - Name: `DATABASE_URL`
   - Value: `<your-postgres-connection-string>`
6. Klik **Deploy**
7. Tunggu 2-3 menit
8. **CATAT BASE URL** (contoh: `https://smart-library-api-xyz.vercel.app`)

---

### 2️⃣ Testing dengan Postman (30 menit)

**A. Setup Postman**
1. Buka Postman
2. Import file `Smart_Library_API.postman_collection.json`
3. Buat environment baru
4. Set variable `base_url` = URL deployment Anda
5. Test endpoint root: `GET {{base_url}}/`

**B. Testing Sequence**

**Step 1: Create Data**
```
POST /api/authors
Body: {"name": "J.K. Rowling", "nationality": "British"}

POST /api/categories
Body: {"name": "Fantasy"}

POST /api/books
Body: {
  "isbn": "978-0-7475-3269-9",
  "title": "Harry Potter",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}

POST /api/members
Body: {
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

**Step 2: Test Search (Fitur Utama)**
```
GET /api/authors?name=rowling
GET /api/categories?name=fantasy
GET /api/books?title=harry
```

**Step 3: Test Loan & Return (Fitur Utama)**
```
POST /api/loans
Body: {"book_id": 1, "member_id": 1, "due_date": "2024-05-15"}

PUT /api/loans/1/return  (No body needed!)
```

**Step 4: Test Statistics (Fitur Utama)**
```
GET /api/reports/stats
```

**Step 5: Test CRUD Lengkap**
```
GET /api/authors
GET /api/authors/1
PUT /api/authors/1
DELETE /api/authors/1
(Repeat untuk categories, books, members)
```

---

### 3️⃣ Screenshot & Laporan (15 menit)

**Screenshot yang WAJIB:**

1. **Fitur Pencarian (3 screenshots)**
   - GET /api/authors?name=keyword
   - GET /api/categories?name=keyword
   - GET /api/books?title=keyword

2. **Fitur Return Book (3 screenshots)**
   - GET /api/books/1 (sebelum pinjam - catat available_copies)
   - POST /api/loans (pinjam buku)
   - PUT /api/loans/1/return (kembalikan buku)
   - GET /api/books/1 (sesudah return - verify available_copies bertambah)

3. **Fitur Statistics (1 screenshot)**
   - GET /api/reports/stats

4. **CRUD Lengkap (20 screenshots)**
   - GET, GET by ID, POST, PUT, DELETE untuk:
     - Authors (5 endpoints)
     - Categories (5 endpoints)
     - Books (5 endpoints)
     - Members (5 endpoints)

**Total: Minimal 28 screenshots**

---

## 📋 Checklist Cepat

### Pre-Deploy
- [ ] Database PostgreSQL sudah siap
- [ ] Connection string sudah dicopy
- [ ] Project sudah di-push ke GitHub

### Deploy
- [ ] Project sudah di-import ke Vercel
- [ ] Environment variable DATABASE_URL sudah di-set
- [ ] Deployment status: Ready
- [ ] Base URL sudah dicatat

### Testing
- [ ] Postman collection sudah di-import
- [ ] Environment variable base_url sudah di-set
- [ ] Test root endpoint berhasil
- [ ] Create sample data berhasil
- [ ] Test search features berhasil
- [ ] Test loan & return berhasil
- [ ] Test statistics berhasil
- [ ] Test CRUD lengkap berhasil

### Screenshot
- [ ] Screenshot fitur pencarian (3)
- [ ] Screenshot return book flow (3)
- [ ] Screenshot statistics (1)
- [ ] Screenshot CRUD lengkap (20+)
- [ ] Total minimal 28 screenshots

### Laporan
- [ ] Base URL dicantumkan
- [ ] Tanggal deploy dicatat
- [ ] Screenshot diorganisir
- [ ] Penjelasan singkat setiap fitur
- [ ] Kesimpulan

---

## 🎯 Tips Sukses

### 1. Urutan Testing yang Benar
Selalu create data dalam urutan ini:
```
Authors → Categories → Books → Members → Loans
```
Karena Books butuh author_id dan category_id, Loans butuh book_id dan member_id.

### 2. Catat ID yang Dibuat
Setiap kali POST berhasil, catat ID yang dikembalikan untuk digunakan di request berikutnya.

### 3. Verify Stok Buku
Saat test return book, pastikan screenshot menunjukkan:
- available_copies sebelum pinjam: 5
- available_copies setelah pinjam: 4
- available_copies setelah return: 5 (kembali)

### 4. Test Search dengan Query Kosong
Pastikan test juga tanpa query parameter:
- `GET /api/authors` (tanpa ?name=)
- `GET /api/authors?name=rowling` (dengan query)

Keduanya harus berhasil!

---

## 🚨 Common Issues

### Issue: "Could not get response"
**Fix:** Check base_url di Postman, pastikan tidak ada typo

### Issue: "author_id does not exist"
**Fix:** Create authors dulu sebelum create books

### Issue: "Buku sedang tidak tersedia"
**Fix:** Return some books first, atau create books dengan total_copies lebih banyak

### Issue: "404 Not Found"
**Fix:** Check endpoint URL, pastikan tidak ada typo

---

## 📚 Dokumentasi Lengkap

Jika butuh detail lebih:

- **Overview:** [README.md](./README.md)
- **Index:** [INDEX.md](./INDEX.md)
- **API Docs:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Deploy Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Postman Guide:** [POSTMAN_QUICK_GUIDE.md](./POSTMAN_QUICK_GUIDE.md)
- **Sample Data:** [SAMPLE_DATA.md](./SAMPLE_DATA.md)
- **Checklist:** [CHECKLIST_TESTING.md](./CHECKLIST_TESTING.md)
- **Summary:** [TUGAS_PRAKTIKUM_SUMMARY.md](./TUGAS_PRAKTIKUM_SUMMARY.md)

---

## ⏱️ Timeline Recommended

| Waktu | Aktivitas |
|-------|-----------|
| 0-15 min | Setup database + Deploy ke Vercel |
| 15-30 min | Setup Postman + Create sample data |
| 30-45 min | Test semua endpoint + Screenshot |
| 45-60 min | Organize screenshot + Buat laporan |

**Total: 1 jam** ⚡

---

## ✅ Final Check

Sebelum submit, pastikan:

- [ ] Base URL bisa diakses
- [ ] Semua endpoint return response yang benar
- [ ] Screenshot lengkap dan jelas
- [ ] Laporan sudah rapi

---

## 🎉 You're Ready!

Semua fitur sudah diimplementasikan. Tinggal:
1. Deploy
2. Test
3. Screenshot
4. Submit

**Good luck! 🚀**

---

**Need help?** Check [INDEX.md](./INDEX.md) untuk navigasi lengkap semua dokumentasi.
