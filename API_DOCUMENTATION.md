# Smart Library API - Dokumentasi Lengkap

## Base URL
```
http://localhost:3000/api
```

---

## 📚 **BOOKS (Buku)**

### 1. Get All Books (dengan pencarian)
**GET** `/api/books`

**Query Parameters:**
- `title` (optional): Pencarian berdasarkan judul buku

**Contoh:**
```
GET /api/books
GET /api/books?title=harry
```

**Response:**
```json
[
  {
    "id": 1,
    "isbn": "978-0-123456-78-9",
    "title": "Harry Potter",
    "author_id": 1,
    "category_id": 1,
    "total_copies": 5,
    "available_copies": 3,
    "author_name": "J.K. Rowling",
    "category_name": "Fantasy"
  }
]
```

### 2. Get Book by ID
**GET** `/api/books/:id`

**Response:**
```json
{
  "id": 1,
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5,
  "available_copies": 3,
  "author_name": "J.K. Rowling",
  "category_name": "Fantasy"
}
```

### 3. Create Book
**POST** `/api/books`

**Body:**
```json
{
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter and the Philosopher's Stone",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}
```

### 4. Update Book
**PUT** `/api/books/:id`

**Body:**
```json
{
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter (Updated)",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 10
}
```

### 5. Delete Book
**DELETE** `/api/books/:id`

---

## 👤 **AUTHORS (Penulis)**

### 1. Get All Authors (dengan pencarian)
**GET** `/api/authors`

**Query Parameters:**
- `name` (optional): Pencarian berdasarkan nama penulis

**Contoh:**
```
GET /api/authors
GET /api/authors?name=rowling
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "J.K. Rowling",
    "nationality": "British"
  }
]
```

### 2. Get Author by ID
**GET** `/api/authors/:id`

### 3. Create Author
**POST** `/api/authors`

**Body:**
```json
{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

### 4. Update Author
**PUT** `/api/authors/:id`

**Body:**
```json
{
  "name": "J.K. Rowling",
  "nationality": "United Kingdom"
}
```

### 5. Delete Author
**DELETE** `/api/authors/:id`

---

## 🏷️ **CATEGORIES (Kategori)**

### 1. Get All Categories (dengan pencarian)
**GET** `/api/categories`

**Query Parameters:**
- `name` (optional): Pencarian berdasarkan nama kategori

**Contoh:**
```
GET /api/categories
GET /api/categories?name=fantasy
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Fantasy"
  }
]
```

### 2. Get Category by ID
**GET** `/api/categories/:id`

### 3. Create Category
**POST** `/api/categories`

**Body:**
```json
{
  "name": "Science Fiction"
}
```

### 4. Update Category
**PUT** `/api/categories/:id`

**Body:**
```json
{
  "name": "Sci-Fi"
}
```

### 5. Delete Category
**DELETE** `/api/categories/:id`

---

## 👥 **MEMBERS (Anggota)**

### 1. Get All Members
**GET** `/api/members`

**Response:**
```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "member_type": "STUDENT",
    "joined_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### 2. Get Member by ID
**GET** `/api/members/:id`

### 3. Create Member
**POST** `/api/members`

**Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

**Member Types:** `STUDENT`, `TEACHER`, `PUBLIC`

### 4. Update Member
**PUT** `/api/members/:id`

**Body:**
```json
{
  "full_name": "John Doe Updated",
  "email": "john.new@example.com",
  "member_type": "TEACHER"
}
```

### 5. Delete Member
**DELETE** `/api/members/:id`

---

## 📖 **LOANS (Peminjaman)**

### 1. Get All Loans
**GET** `/api/loans`

**Response:**
```json
[
  {
    "id": 1,
    "book_id": 1,
    "member_id": 1,
    "loan_date": "2024-01-15",
    "due_date": "2024-01-29",
    "return_date": null,
    "status": "BORROWED",
    "book_title": "Harry Potter",
    "member_name": "John Doe"
  }
]
```

### 2. Create Loan (Pinjam Buku)
**POST** `/api/loans`

**Body:**
```json
{
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-02-15"
}
```

**Response:**
```json
{
  "message": "Peminjaman berhasil dicatat!",
  "data": {
    "id": 1,
    "book_id": 1,
    "member_id": 1,
    "loan_date": "2024-01-15",
    "due_date": "2024-02-15",
    "return_date": null,
    "status": "BORROWED"
  }
}
```

### 3. Return Book (Kembalikan Buku) ⭐
**PUT** `/api/loans/:id/return`

**Deskripsi:** Endpoint khusus untuk pengembalian buku yang otomatis:
- Mengubah status menjadi `RETURNED`
- Mengisi `return_date` dengan tanggal saat ini
- Menambah `available_copies` pada tabel books

**Response:**
```json
{
  "message": "Buku berhasil dikembalikan",
  "data": {
    "id": 1,
    "book_id": 1,
    "member_id": 1,
    "loan_date": "2024-01-15",
    "due_date": "2024-01-29",
    "return_date": "2024-01-20",
    "status": "RETURNED"
  }
}
```

### 4. Delete Loan
**DELETE** `/api/loans/:id`

---

## 📊 **REPORTS (Laporan Statistik)** ⭐

### Get Library Statistics
**GET** `/api/reports/stats`

**Deskripsi:** Menampilkan statistik perpustakaan secara keseluruhan

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

**Penjelasan:**
- `total_books`: Total jumlah seluruh buku yang terdaftar
- `total_authors`: Total jumlah penulis
- `total_categories`: Total jumlah kategori
- `active_loans`: Total transaksi peminjaman yang masih berstatus BORROWED

---

## 🔍 **Fitur Pencarian Global**

Fitur pencarian tersedia pada endpoint berikut:

1. **Books**: `GET /api/books?title=keyword`
   - Mencari buku berdasarkan judul (case-insensitive)
   
2. **Authors**: `GET /api/authors?name=keyword`
   - Mencari penulis berdasarkan nama (case-insensitive)
   
3. **Categories**: `GET /api/categories?name=keyword`
   - Mencari kategori berdasarkan nama (case-insensitive)

**Catatan:** Jika parameter query kosong, endpoint akan mengembalikan seluruh data.

---

## ⚠️ **Error Responses**

### 400 Bad Request
```json
{
  "error": "Buku sedang tidak tersedia (stok habis)."
}
```

### 404 Not Found
```json
{
  "error": "Buku tidak ditemukan"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database connection failed"
}
```

---

## 📝 **Status Peminjaman**

- `BORROWED`: Buku sedang dipinjam
- `RETURNED`: Buku sudah dikembalikan
- `OVERDUE`: Buku terlambat dikembalikan (jika ada fitur)

---

## 🚀 **Testing dengan Postman**

1. Import collection atau buat request manual
2. Set base URL sesuai deployment (local atau Vercel)
3. Test semua endpoint dengan berbagai skenario
4. Screenshot setiap request-response untuk dokumentasi

---

## ✅ **Checklist Fitur**

- ✅ CRUD lengkap untuk Authors
- ✅ CRUD lengkap untuk Categories
- ✅ CRUD lengkap untuk Books
- ✅ CRUD lengkap untuk Members
- ✅ Fitur pencarian global (Authors, Categories, Books)
- ✅ Endpoint pengembalian buku dengan logika otomatis
- ✅ Endpoint laporan statistik perpustakaan
- ✅ Ready untuk deploy ke Vercel
