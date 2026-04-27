# 📝 Sample Data untuk Testing

Gunakan data sample ini untuk testing API dengan Postman.

## 🔄 Urutan Testing yang Disarankan

1. Create Authors
2. Create Categories
3. Create Books (butuh author_id dan category_id)
4. Create Members
5. Create Loans (butuh book_id dan member_id)
6. Test Return Book
7. Test Statistics
8. Test Search Features
9. Test Update Operations
10. Test Delete Operations

---

## 1. AUTHORS (Penulis)

### Create Author 1
```json
POST /api/authors
{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

### Create Author 2
```json
POST /api/authors
{
  "name": "George R.R. Martin",
  "nationality": "American"
}
```

### Create Author 3
```json
POST /api/authors
{
  "name": "Tere Liye",
  "nationality": "Indonesian"
}
```

### Update Author
```json
PUT /api/authors/1
{
  "name": "J.K. Rowling",
  "nationality": "United Kingdom"
}
```

### Search Author
```
GET /api/authors?name=rowling
GET /api/authors?name=tere
```

---

## 2. CATEGORIES (Kategori)

### Create Category 1
```json
POST /api/categories
{
  "name": "Fantasy"
}
```

### Create Category 2
```json
POST /api/categories
{
  "name": "Science Fiction"
}
```

### Create Category 3
```json
POST /api/categories
{
  "name": "Romance"
}
```

### Create Category 4
```json
POST /api/categories
{
  "name": "Mystery"
}
```

### Update Category
```json
PUT /api/categories/2
{
  "name": "Sci-Fi"
}
```

### Search Category
```
GET /api/categories?name=fantasy
GET /api/categories?name=sci
```

---

## 3. BOOKS (Buku)

**PENTING:** Pastikan sudah create Authors dan Categories terlebih dahulu!

### Create Book 1
```json
POST /api/books
{
  "isbn": "978-0-7475-3269-9",
  "title": "Harry Potter and the Philosopher's Stone",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}
```

### Create Book 2
```json
POST /api/books
{
  "isbn": "978-0-553-10354-0",
  "title": "A Game of Thrones",
  "author_id": 2,
  "category_id": 1,
  "total_copies": 3
}
```

### Create Book 3
```json
POST /api/books
{
  "isbn": "978-602-0320-15-5",
  "title": "Bumi",
  "author_id": 3,
  "category_id": 2,
  "total_copies": 10
}
```

### Create Book 4
```json
POST /api/books
{
  "isbn": "978-0-7475-3849-4",
  "title": "Harry Potter and the Chamber of Secrets",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 4
}
```

### Update Book
```json
PUT /api/books/1
{
  "isbn": "978-0-7475-3269-9",
  "title": "Harry Potter and the Philosopher's Stone (Updated Edition)",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 8
}
```

### Search Book
```
GET /api/books?title=harry
GET /api/books?title=bumi
GET /api/books?title=game
```

---

## 4. MEMBERS (Anggota)

### Create Member 1
```json
POST /api/members
{
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "member_type": "STUDENT"
}
```

### Create Member 2
```json
POST /api/members
{
  "full_name": "Jane Smith",
  "email": "jane.smith@example.com",
  "member_type": "TEACHER"
}
```

### Create Member 3
```json
POST /api/members
{
  "full_name": "Bob Wilson",
  "email": "bob.wilson@example.com",
  "member_type": "PUBLIC"
}
```

### Update Member
```json
PUT /api/members/1
{
  "full_name": "John Doe Updated",
  "email": "john.new@example.com",
  "member_type": "TEACHER"
}
```

---

## 5. LOANS (Peminjaman)

**PENTING:** Pastikan sudah create Books dan Members terlebih dahulu!

### Create Loan 1
```json
POST /api/loans
{
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-05-15"
}
```

### Create Loan 2
```json
POST /api/loans
{
  "book_id": 2,
  "member_id": 2,
  "due_date": "2024-05-20"
}
```

### Create Loan 3
```json
POST /api/loans
{
  "book_id": 3,
  "member_id": 1,
  "due_date": "2024-05-10"
}
```

### Return Book (Endpoint Khusus) ⭐
```
PUT /api/loans/1/return
```

**Hasil yang Diharapkan:**
- Status berubah menjadi `RETURNED`
- `return_date` terisi dengan tanggal saat ini
- `available_copies` pada buku bertambah 1

---

## 6. REPORTS (Statistik) ⭐

### Get Library Statistics
```
GET /api/reports/stats
```

**Response yang Diharapkan:**
```json
{
  "message": "Statistik perpustakaan berhasil diambil",
  "data": {
    "total_books": 4,
    "total_authors": 3,
    "total_categories": 4,
    "active_loans": 2
  }
}
```

---

## 📸 Skenario Testing Lengkap untuk Screenshot

### Skenario 1: CRUD Authors
1. POST /api/authors (Create J.K. Rowling)
2. GET /api/authors (List all)
3. GET /api/authors/1 (Get by ID)
4. GET /api/authors?name=rowling (Search)
5. PUT /api/authors/1 (Update nationality)
6. GET /api/authors/1 (Verify update)

### Skenario 2: CRUD Categories
1. POST /api/categories (Create Fantasy)
2. GET /api/categories (List all)
3. GET /api/categories/1 (Get by ID)
4. GET /api/categories?name=fantasy (Search)
5. PUT /api/categories/1 (Update name)
6. GET /api/categories/1 (Verify update)

### Skenario 3: CRUD Books
1. POST /api/books (Create Harry Potter)
2. GET /api/books (List all)
3. GET /api/books/1 (Get by ID)
4. GET /api/books?title=harry (Search)
5. PUT /api/books/1 (Update total_copies)
6. GET /api/books/1 (Verify update)

### Skenario 4: CRUD Members
1. POST /api/members (Create John Doe)
2. GET /api/members (List all)
3. GET /api/members/1 (Get by ID)
4. PUT /api/members/1 (Update member_type)
5. GET /api/members/1 (Verify update)

### Skenario 5: Loan & Return Flow
1. GET /api/books/1 (Check available_copies sebelum pinjam)
2. POST /api/loans (Create loan)
3. GET /api/books/1 (Verify available_copies berkurang)
4. GET /api/loans (List all loans)
5. PUT /api/loans/1/return (Return book) ⭐
6. GET /api/books/1 (Verify available_copies bertambah lagi)
7. GET /api/loans/1 (Verify status = RETURNED)

### Skenario 6: Statistics Report
1. GET /api/reports/stats (Get statistics) ⭐
2. Verify semua angka sesuai dengan data yang sudah dibuat

### Skenario 7: Delete Operations
1. DELETE /api/loans/1 (Delete loan)
2. DELETE /api/books/1 (Delete book)
3. DELETE /api/members/1 (Delete member)
4. DELETE /api/categories/1 (Delete category)
5. DELETE /api/authors/1 (Delete author)

---

## 🎯 Tips Testing

### 1. Catat ID yang Dibuat
Setiap kali create data, catat ID yang dikembalikan untuk digunakan di request berikutnya.

### 2. Test Search dengan Berbagai Keyword
- Keyword lengkap: `?name=J.K. Rowling`
- Keyword sebagian: `?name=rowling`
- Keyword huruf kecil: `?name=ROWLING` (harus tetap work karena case-insensitive)

### 3. Verifikasi Stok Buku
Sebelum dan sesudah peminjaman/pengembalian, selalu cek `available_copies`:
- Sebelum pinjam: 5 copies
- Setelah pinjam: 4 copies
- Setelah return: 5 copies (kembali)

### 4. Test Error Cases
- Create book dengan author_id yang tidak ada
- Create loan dengan book_id yang tidak ada
- Return loan yang sudah di-return
- Update data dengan ID yang tidak ada

---

## 📊 Expected Results

### After Creating All Sample Data:
- **Total Authors:** 3
- **Total Categories:** 4
- **Total Books:** 4
- **Total Members:** 3
- **Total Loans:** 3 (2 BORROWED, 1 RETURNED setelah test return)

### Statistics Endpoint Should Show:
```json
{
  "total_books": 4,
  "total_authors": 3,
  "total_categories": 4,
  "active_loans": 2
}
```

---

## 🚨 Common Issues & Solutions

### Issue: "author_id does not exist"
**Solution:** Create authors first before creating books

### Issue: "book_id does not exist"
**Solution:** Create books first before creating loans

### Issue: "Buku sedang tidak tersedia"
**Solution:** Check available_copies, might be 0. Return some books first.

### Issue: "Already returned"
**Solution:** You're trying to return a loan that's already returned. Use a different loan_id.

---

**Gunakan data sample ini untuk memastikan semua fitur bekerja dengan baik!** 🎉
