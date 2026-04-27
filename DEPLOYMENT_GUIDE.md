# 🚀 Panduan Deploy ke Vercel

## Persiapan Sebelum Deploy

### 1. Pastikan Database PostgreSQL Sudah Siap
Anda memerlukan database PostgreSQL yang dapat diakses secara online. Beberapa pilihan:
- **Neon** (https://neon.tech) - Gratis
- **Supabase** (https://supabase.com) - Gratis
- **Railway** (https://railway.app) - Gratis dengan limit
- **ElephantSQL** (https://www.elephantsql.com) - Gratis

### 2. Dapatkan Connection String Database
Format connection string:
```
postgresql://username:password@host:port/database?sslmode=require
```

Contoh:
```
postgresql://user:pass123@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## Langkah Deploy ke Vercel

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Login ke Vercel
Buka https://vercel.com dan login dengan GitHub/GitLab/Bitbucket

### Step 3: Deploy via GitHub (Recommended)

1. **Push project ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Smart Library API"
   git branch -M main
   git remote add origin https://github.com/username/smart-library-api.git
   git push -u origin main
   ```

2. **Import Project di Vercel**
   - Buka https://vercel.com/new
   - Pilih repository GitHub Anda
   - Klik "Import"

3. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)

4. **Add Environment Variables**
   Klik "Environment Variables" dan tambahkan:
   
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | `postgresql://user:pass@host:port/db?sslmode=require` |
   | `PORT` | `3000` |

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses deployment selesai (2-3 menit)

### Step 4: Deploy via Vercel CLI (Alternative)

```bash
# Login
vercel login

# Deploy
vercel

# Ikuti prompt:
# - Set up and deploy? Y
# - Which scope? (pilih account Anda)
# - Link to existing project? N
# - Project name? smart-library-api
# - Directory? ./
# - Override settings? N

# Set environment variable
vercel env add DATABASE_URL
# Paste connection string Anda

# Deploy production
vercel --prod
```

---

## Verifikasi Deployment

### 1. Cek URL Deployment
Setelah deploy berhasil, Anda akan mendapat URL seperti:
```
https://smart-library-api-xyz123.vercel.app
```

### 2. Test Base URL
Buka di browser:
```
https://smart-library-api-xyz123.vercel.app
```

Harus menampilkan:
```
Smart Library API is Running...
```

### 3. Test API Endpoint
```
https://smart-library-api-xyz123.vercel.app/api/books
https://smart-library-api-xyz123.vercel.app/api/authors
https://smart-library-api-xyz123.vercel.app/api/reports/stats
```

---

## Testing dengan Postman

### 1. Set Base URL
Buat environment variable di Postman:
- Variable: `base_url`
- Value: `https://smart-library-api-xyz123.vercel.app`

### 2. Test Semua Endpoint

#### ✅ **Test 1: Get All Books**
```
GET {{base_url}}/api/books
```

#### ✅ **Test 2: Search Books**
```
GET {{base_url}}/api/books?title=harry
```

#### ✅ **Test 3: Create Author**
```
POST {{base_url}}/api/authors
Content-Type: application/json

{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

#### ✅ **Test 4: Get Author by ID**
```
GET {{base_url}}/api/authors/1
```

#### ✅ **Test 5: Update Author**
```
PUT {{base_url}}/api/authors/1
Content-Type: application/json

{
  "name": "J.K. Rowling",
  "nationality": "United Kingdom"
}
```

#### ✅ **Test 6: Search Authors**
```
GET {{base_url}}/api/authors?name=rowling
```

#### ✅ **Test 7: Create Category**
```
POST {{base_url}}/api/categories
Content-Type: application/json

{
  "name": "Fantasy"
}
```

#### ✅ **Test 8: Search Categories**
```
GET {{base_url}}/api/categories?name=fantasy
```

#### ✅ **Test 9: Create Member**
```
POST {{base_url}}/api/members
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

#### ✅ **Test 10: Create Book**
```
POST {{base_url}}/api/books
Content-Type: application/json

{
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter and the Philosopher's Stone",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 5
}
```

#### ✅ **Test 11: Update Book**
```
PUT {{base_url}}/api/books/1
Content-Type: application/json

{
  "isbn": "978-0-123456-78-9",
  "title": "Harry Potter (Updated)",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 10
}
```

#### ✅ **Test 12: Create Loan**
```
POST {{base_url}}/api/loans
Content-Type: application/json

{
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-02-15"
}
```

#### ✅ **Test 13: Return Book**
```
PUT {{base_url}}/api/loans/1/return
```

#### ✅ **Test 14: Get Library Stats**
```
GET {{base_url}}/api/reports/stats
```

#### ✅ **Test 15: Delete Operations**
```
DELETE {{base_url}}/api/books/1
DELETE {{base_url}}/api/authors/1
DELETE {{base_url}}/api/categories/1
DELETE {{base_url}}/api/members/1
DELETE {{base_url}}/api/loans/1
```

---

## Screenshot untuk Laporan

Ambil screenshot untuk setiap endpoint berikut:

### CRUD Authors
1. ✅ GET /api/authors
2. ✅ GET /api/authors?name=keyword
3. ✅ GET /api/authors/:id
4. ✅ POST /api/authors
5. ✅ PUT /api/authors/:id
6. ✅ DELETE /api/authors/:id

### CRUD Categories
7. ✅ GET /api/categories
8. ✅ GET /api/categories?name=keyword
9. ✅ GET /api/categories/:id
10. ✅ POST /api/categories
11. ✅ PUT /api/categories/:id
12. ✅ DELETE /api/categories/:id

### CRUD Books
13. ✅ GET /api/books
14. ✅ GET /api/books?title=keyword
15. ✅ GET /api/books/:id
16. ✅ POST /api/books
17. ✅ PUT /api/books/:id
18. ✅ DELETE /api/books/:id

### CRUD Members
19. ✅ GET /api/members
20. ✅ GET /api/members/:id
21. ✅ POST /api/members
22. ✅ PUT /api/members/:id
23. ✅ DELETE /api/members/:id

### Loans
24. ✅ GET /api/loans
25. ✅ POST /api/loans
26. ✅ PUT /api/loans/:id/return (Return Book)
27. ✅ DELETE /api/loans/:id

### Reports
28. ✅ GET /api/reports/stats

---

## Troubleshooting

### Error: Database Connection Failed
- Pastikan DATABASE_URL sudah di-set di Vercel Environment Variables
- Cek apakah database online dan dapat diakses
- Pastikan SSL mode sudah benar (`?sslmode=require`)

### Error: 404 Not Found
- Pastikan vercel.json sudah ada di root project
- Cek routing di vercel.json

### Error: Function Timeout
- Vercel free tier memiliki timeout 10 detik
- Optimasi query database jika terlalu lambat

---

## Checklist Deployment

- [ ] Database PostgreSQL sudah siap dan online
- [ ] Environment variable DATABASE_URL sudah di-set
- [ ] Project sudah di-push ke GitHub
- [ ] Project sudah di-import ke Vercel
- [ ] Deployment berhasil (status: Ready)
- [ ] Base URL dapat diakses
- [ ] Semua endpoint sudah ditest dengan Postman
- [ ] Screenshot semua endpoint sudah diambil
- [ ] Base URL sudah dicatat untuk laporan

---

## Format Laporan

**Base URL:** `https://smart-library-api-xyz123.vercel.app`

**Tanggal Deploy:** [Tanggal]

**Status:** ✅ Berhasil

**Fitur yang Diimplementasikan:**
1. ✅ CRUD lengkap untuk Authors, Categories, Books, Members
2. ✅ Fitur pencarian global (Authors, Categories, Books)
3. ✅ Endpoint pengembalian buku dengan logika otomatis
4. ✅ Endpoint laporan statistik perpustakaan

**Screenshot:** [Lampirkan semua screenshot Postman]
