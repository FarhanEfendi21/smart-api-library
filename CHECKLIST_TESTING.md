# ✅ Checklist Testing untuk Laporan Praktikum

Gunakan checklist ini untuk memastikan semua endpoint sudah ditest dan di-screenshot.

---

## 📋 Pre-Testing Checklist

- [ ] Database PostgreSQL sudah siap dan online
- [ ] Environment variable `DATABASE_URL` sudah di-set
- [ ] Project sudah di-deploy ke Vercel
- [ ] Base URL deployment sudah dicatat
- [ ] Postman collection sudah di-import
- [ ] Environment variable `base_url` di Postman sudah di-set

---

## 🧪 Testing Checklist

### 1. AUTHORS (6 Endpoints)

- [ ] **GET /api/authors** - Get all authors
  - Screenshot: Response dengan list semua authors
  - Verify: Status 200, array of authors

- [ ] **GET /api/authors?name=rowling** - Search authors
  - Screenshot: Response dengan hasil pencarian
  - Verify: Status 200, filtered results
  - Test juga dengan query kosong (harus return semua data)

- [ ] **GET /api/authors/:id** - Get author by ID
  - Screenshot: Response dengan detail 1 author
  - Verify: Status 200, single author object

- [ ] **POST /api/authors** - Create author
  - Screenshot: Request body + Response
  - Verify: Status 201, author created with ID
  - Body: `{"name": "J.K. Rowling", "nationality": "British"}`

- [ ] **PUT /api/authors/:id** - Update author
  - Screenshot: Request body + Response
  - Verify: Status 200, author updated
  - Body: `{"name": "J.K. Rowling", "nationality": "United Kingdom"}`

- [ ] **DELETE /api/authors/:id** - Delete author
  - Screenshot: Response
  - Verify: Status 200, success message

---

### 2. CATEGORIES (6 Endpoints)

- [ ] **GET /api/categories** - Get all categories
  - Screenshot: Response dengan list semua categories
  - Verify: Status 200, array of categories

- [ ] **GET /api/categories?name=fantasy** - Search categories
  - Screenshot: Response dengan hasil pencarian
  - Verify: Status 200, filtered results
  - Test juga dengan query kosong (harus return semua data)

- [ ] **GET /api/categories/:id** - Get category by ID
  - Screenshot: Response dengan detail 1 category
  - Verify: Status 200, single category object

- [ ] **POST /api/categories** - Create category
  - Screenshot: Request body + Response
  - Verify: Status 201, category created with ID
  - Body: `{"name": "Fantasy"}`

- [ ] **PUT /api/categories/:id** - Update category
  - Screenshot: Request body + Response
  - Verify: Status 200, category updated
  - Body: `{"name": "Science Fiction"}`

- [ ] **DELETE /api/categories/:id** - Delete category
  - Screenshot: Response
  - Verify: Status 200, success message

---

### 3. BOOKS (6 Endpoints)

- [ ] **GET /api/books** - Get all books
  - Screenshot: Response dengan list semua books (dengan author_name dan category_name)
  - Verify: Status 200, array of books with JOIN data

- [ ] **GET /api/books?title=harry** - Search books
  - Screenshot: Response dengan hasil pencarian
  - Verify: Status 200, filtered results
  - Test juga dengan query kosong (harus return semua data)

- [ ] **GET /api/books/:id** - Get book by ID
  - Screenshot: Response dengan detail 1 book
  - Verify: Status 200, single book object with author and category names

- [ ] **POST /api/books** - Create book
  - Screenshot: Request body + Response
  - Verify: Status 201, book created with ID
  - Body: `{"isbn": "978-0-123456-78-9", "title": "Harry Potter", "author_id": 1, "category_id": 1, "total_copies": 5}`
  - Verify: `available_copies` sama dengan `total_copies`

- [ ] **PUT /api/books/:id** - Update book
  - Screenshot: Request body + Response
  - Verify: Status 200, book updated
  - Body: `{"isbn": "978-0-123456-78-9", "title": "Harry Potter (Updated)", "author_id": 1, "category_id": 1, "total_copies": 10}`

- [ ] **DELETE /api/books/:id** - Delete book
  - Screenshot: Response
  - Verify: Status 200, success message

---

### 4. MEMBERS (5 Endpoints)

- [ ] **GET /api/members** - Get all members
  - Screenshot: Response dengan list semua members
  - Verify: Status 200, array of members

- [ ] **GET /api/members/:id** - Get member by ID
  - Screenshot: Response dengan detail 1 member
  - Verify: Status 200, single member object

- [ ] **POST /api/members** - Create member
  - Screenshot: Request body + Response
  - Verify: Status 201, member created with ID
  - Body: `{"full_name": "John Doe", "email": "john@example.com", "member_type": "STUDENT"}`

- [ ] **PUT /api/members/:id** - Update member
  - Screenshot: Request body + Response
  - Verify: Status 200, member updated
  - Body: `{"full_name": "John Doe Updated", "email": "john.new@example.com", "member_type": "TEACHER"}`

- [ ] **DELETE /api/members/:id** - Delete member
  - Screenshot: Response
  - Verify: Status 200, success message

---

### 5. LOANS (4 Endpoints)

- [ ] **GET /api/loans** - Get all loans
  - Screenshot: Response dengan list semua loans (dengan book_title dan member_name)
  - Verify: Status 200, array of loans with JOIN data

- [ ] **POST /api/loans** - Create loan
  - Screenshot: Request body + Response
  - Verify: Status 201, loan created
  - Body: `{"book_id": 1, "member_id": 1, "due_date": "2024-05-15"}`
  - **PENTING:** Screenshot juga GET /api/books/:id sebelum dan sesudah untuk verify `available_copies` berkurang

- [ ] **PUT /api/loans/:id/return** - Return book ⭐ **FITUR UTAMA**
  - Screenshot: Response
  - Verify: Status 200, loan status = RETURNED, return_date terisi
  - **PENTING:** Screenshot juga GET /api/books/:id sebelum dan sesudah untuk verify `available_copies` bertambah
  - **PENTING:** Screenshot juga GET /api/loans/:id untuk verify status berubah menjadi RETURNED

- [ ] **DELETE /api/loans/:id** - Delete loan
  - Screenshot: Response
  - Verify: Status 200, success message

---

### 6. REPORTS (1 Endpoint) ⭐ **FITUR UTAMA**

- [ ] **GET /api/reports/stats** - Get library statistics
  - Screenshot: Response dengan statistik lengkap
  - Verify: Status 200
  - Verify: `total_books` sesuai jumlah buku di database
  - Verify: `total_authors` sesuai jumlah authors di database
  - Verify: `total_categories` sesuai jumlah categories di database
  - Verify: `active_loans` sesuai jumlah loans dengan status BORROWED

---

## 🎯 Special Testing Scenarios

### Scenario 1: Loan & Return Flow (WAJIB)
Ini adalah flow lengkap untuk mendemonstrasikan fitur pengembalian buku:

1. [ ] GET /api/books/1 - Catat `available_copies` awal (misal: 5)
2. [ ] POST /api/loans - Create loan untuk book_id 1
3. [ ] GET /api/books/1 - Verify `available_copies` berkurang (jadi 4)
4. [ ] GET /api/loans - Verify loan ada dengan status BORROWED
5. [ ] PUT /api/loans/1/return - Return book
6. [ ] GET /api/loans/1 - Verify status = RETURNED, return_date terisi
7. [ ] GET /api/books/1 - Verify `available_copies` kembali (jadi 5)

**Screenshot semua 7 langkah ini!**

### Scenario 2: Search Feature Demo (WAJIB)
Demonstrasi fitur pencarian:

1. [ ] GET /api/authors - Tampilkan semua authors
2. [ ] GET /api/authors?name=rowling - Tampilkan hasil search
3. [ ] GET /api/categories - Tampilkan semua categories
4. [ ] GET /api/categories?name=fantasy - Tampilkan hasil search
5. [ ] GET /api/books - Tampilkan semua books
6. [ ] GET /api/books?title=harry - Tampilkan hasil search

**Screenshot semua 6 langkah ini!**

### Scenario 3: Statistics Report (WAJIB)
1. [ ] Create beberapa data (authors, categories, books, members, loans)
2. [ ] GET /api/reports/stats
3. [ ] Verify angka statistik sesuai dengan data yang dibuat

**Screenshot response statistics!**

---

## 📸 Screenshot Requirements

Setiap screenshot harus menampilkan:
- ✅ URL lengkap endpoint
- ✅ HTTP Method (GET, POST, PUT, DELETE)
- ✅ Request Headers (jika ada)
- ✅ Request Body (untuk POST/PUT)
- ✅ Response Status Code (200, 201, 404, dll)
- ✅ Response Body lengkap

**Total Screenshot Minimum: 28 endpoint + 13 scenario = 41 screenshots**

---

## 📝 Documentation Checklist

- [ ] Base URL sudah dicatat
- [ ] Tanggal deployment sudah dicatat
- [ ] Semua screenshot sudah diorganisir per endpoint
- [ ] Screenshot sudah diberi label yang jelas
- [ ] Penjelasan singkat untuk setiap screenshot (opsional tapi recommended)

---

## 🎓 Laporan Akhir Checklist

- [ ] Cover/Judul laporan
- [ ] Pendahuluan (tujuan praktikum)
- [ ] Base URL deployment
- [ ] Daftar fitur yang diimplementasikan:
  - [ ] CRUD lengkap untuk Authors
  - [ ] CRUD lengkap untuk Categories
  - [ ] CRUD lengkap untuk Books
  - [ ] CRUD lengkap untuk Members
  - [ ] Fitur pencarian global
  - [ ] Endpoint pengembalian buku
  - [ ] Endpoint laporan statistik
- [ ] Screenshot semua endpoint (minimal 28)
- [ ] Screenshot scenario testing (minimal 13)
- [ ] Penjelasan hasil testing
- [ ] Kesimpulan

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Lupa screenshot request body untuk POST/PUT
2. ❌ Tidak menampilkan status code
3. ❌ Screenshot terpotong (response tidak lengkap)
4. ❌ Tidak test fitur pencarian dengan query kosong
5. ❌ Tidak verify perubahan stok buku saat loan/return
6. ❌ Tidak test endpoint statistics
7. ❌ Lupa mencatat base URL di laporan

---

## ✅ Final Verification

Sebelum submit laporan, pastikan:

- [ ] Semua 28 endpoint sudah ditest
- [ ] Semua 3 scenario khusus sudah ditest
- [ ] Fitur pencarian sudah ditest (dengan dan tanpa query)
- [ ] Fitur return book sudah ditest (verify stok bertambah)
- [ ] Endpoint statistics sudah ditest (verify angka benar)
- [ ] Semua screenshot sudah lengkap dan jelas
- [ ] Base URL sudah dicantumkan di laporan
- [ ] Dokumentasi sudah rapi dan terorganisir

---

**Selamat mengerjakan! Semoga sukses! 🎉**

Jika ada pertanyaan atau kendala, silakan tanyakan.
