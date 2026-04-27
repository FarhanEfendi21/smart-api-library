# 🔧 Troubleshooting Guide - Smart Library API

Panduan mengatasi masalah umum yang mungkin terjadi.

---

## 🚨 Deployment Issues

### Issue 1: "Build Failed" di Vercel

**Symptoms:**
- Deployment gagal dengan error "Build failed"
- Log menunjukkan error saat build

**Solutions:**

**A. Check package.json**
```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```
Pastikan script "start" ada dan benar.

**B. Check vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```
Pastikan path ke index.js benar.

**C. Check Node Version**
- Vercel default menggunakan Node.js versi terbaru
- Jika ada masalah, tambahkan di package.json:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

### Issue 2: "Database Connection Failed"

**Symptoms:**
- API deployed tapi semua endpoint return 500 error
- Log menunjukkan "connection refused" atau "database error"

**Solutions:**

**A. Check Environment Variable**
1. Buka Vercel Dashboard
2. Pilih project Anda
3. Settings → Environment Variables
4. Pastikan `DATABASE_URL` ada dan benar

**B. Check Connection String Format**
```
postgresql://username:password@host:port/database?sslmode=require
```
- Pastikan ada `?sslmode=require` di akhir
- Pastikan username, password, host, port, database benar
- Pastikan tidak ada spasi atau karakter aneh

**C. Check Database Status**
- Login ke Neon/Supabase dashboard
- Pastikan database online dan running
- Check connection limit (free tier biasanya limited)

**D. Test Connection Locally**
```bash
# Create test file
node scratch/check_db.js
```

---

### Issue 3: "404 Not Found" untuk Semua Endpoint

**Symptoms:**
- Base URL bisa diakses
- Tapi semua endpoint /api/* return 404

**Solutions:**

**A. Check Routes Registration**
File: `src/index.js`
```javascript
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes); // Pastikan ini ada!
```

**B. Check Import Statements**
```javascript
import reportRoutes from './routes/reportRoutes.js';
```
Pastikan semua routes di-import dengan benar.

**C. Redeploy**
Setelah fix, push ke GitHub dan Vercel akan auto-redeploy.

---

## 🧪 Testing Issues

### Issue 4: "Could not get response" di Postman

**Symptoms:**
- Request di Postman tidak mendapat response
- Timeout atau connection error

**Solutions:**

**A. Check Base URL**
- Pastikan `base_url` di environment variable benar
- Pastikan tidak ada trailing slash: ❌ `https://api.com/` ✅ `https://api.com`
- Test di browser dulu

**B. Check Internet Connection**
- Pastikan internet stabil
- Try ping ke domain

**C. Check API Status**
- Buka base URL di browser
- Pastikan API running

**D. Check Postman Settings**
- Settings → Proxy → pastikan "Use system proxy" enabled
- Settings → SSL → pastikan "SSL certificate verification" OFF (untuk testing)

---

### Issue 5: "400 Bad Request"

**Symptoms:**
- Request return status 400
- Error message: "Invalid data" atau similar

**Solutions:**

**A. Check Request Body**
- Pastikan format JSON benar (no trailing comma, proper quotes)
- Pastikan semua required fields ada

**Example - Wrong:**
```json
{
  "name": "Test",  // ❌ trailing comma
}
```

**Example - Correct:**
```json
{
  "name": "Test"
}
```

**B. Check Content-Type Header**
```
Content-Type: application/json
```
Pastikan header ini ada untuk POST/PUT requests.

**C. Check Data Types**
```json
{
  "author_id": 1,        // ✅ number
  "total_copies": 5      // ✅ number
}
```
Jangan:
```json
{
  "author_id": "1",      // ❌ string
  "total_copies": "5"    // ❌ string
}
```

---

### Issue 6: "author_id does not exist" atau Foreign Key Error

**Symptoms:**
- Error saat create book: "author_id does not exist"
- Error saat create loan: "book_id does not exist"

**Solutions:**

**A. Create Dependencies First**
Urutan yang benar:
```
1. Create Authors
2. Create Categories
3. Create Books (butuh author_id dan category_id)
4. Create Members
5. Create Loans (butuh book_id dan member_id)
```

**B. Check ID yang Digunakan**
- Pastikan ID yang digunakan benar-benar ada
- GET dulu untuk verify ID

**C. Use Correct ID from Response**
Setelah POST, catat ID dari response:
```json
{
  "id": 1,  // ← Use this ID
  "name": "J.K. Rowling"
}
```

---

### Issue 7: "Buku sedang tidak tersedia"

**Symptoms:**
- Error saat create loan: "Buku sedang tidak tersedia (stok habis)"

**Solutions:**

**A. Check Available Copies**
```
GET /api/books/1
```
Check field `available_copies`. Jika 0, buku habis.

**B. Return Some Books**
```
PUT /api/loans/1/return
```
Return buku yang sudah dipinjam.

**C. Create New Books**
```
POST /api/books
```
Atau create buku baru dengan `total_copies` lebih banyak.

**D. Update Book Stock**
```
PUT /api/books/1
Body: {
  "isbn": "...",
  "title": "...",
  "author_id": 1,
  "category_id": 1,
  "total_copies": 10  // ← Increase this
}
```

---

### Issue 8: "Already returned"

**Symptoms:**
- Error saat return book: "Already returned"

**Solutions:**

**A. Check Loan Status**
```
GET /api/loans/1
```
Check field `status`. Jika sudah `RETURNED`, tidak bisa return lagi.

**B. Use Different Loan**
Return loan yang masih `BORROWED`:
```
GET /api/loans  // Find loan with status BORROWED
PUT /api/loans/2/return  // Use different ID
```

**C. Create New Loan**
```
POST /api/loans
```
Create loan baru untuk testing.

---

## 🔍 Search Issues

### Issue 9: Search Tidak Mengembalikan Hasil

**Symptoms:**
- Search dengan keyword yang jelas ada, tapi return empty array

**Solutions:**

**A. Check Case Sensitivity**
Search sudah case-insensitive, tapi pastikan keyword benar:
```
✅ GET /api/authors?name=rowling
✅ GET /api/authors?name=ROWLING
✅ GET /api/authors?name=Rowling
```

**B. Check Partial Match**
Search menggunakan ILIKE dengan wildcard:
```
✅ GET /api/authors?name=row  // Will find "Rowling"
✅ GET /api/books?title=harry  // Will find "Harry Potter"
```

**C. Check Data Exists**
```
GET /api/authors  // Verify data exists first
```

**D. Check Query Parameter Name**
Pastikan parameter name benar:
- Authors: `?name=`
- Categories: `?name=`
- Books: `?title=` (bukan `?name=`)

---

## 📊 Statistics Issues

### Issue 10: Statistics Menunjukkan Angka 0 Semua

**Symptoms:**
- GET /api/reports/stats return semua 0

**Solutions:**

**A. Check Data Exists**
```
GET /api/authors
GET /api/categories
GET /api/books
GET /api/loans
```
Pastikan ada data di database.

**B. Create Sample Data**
Follow SAMPLE_DATA.md untuk create data.

**C. Check Database Connection**
Pastikan database connection OK.

---

### Issue 11: active_loans Tidak Sesuai

**Symptoms:**
- active_loans di statistics tidak sesuai dengan jumlah loans yang masih BORROWED

**Solutions:**

**A. Check Loan Status**
```
GET /api/loans
```
Count manual berapa yang status = `BORROWED`.

**B. Return Some Loans**
Jika ada loan yang sudah dikembalikan tapi status masih BORROWED:
```
PUT /api/loans/1/return
```

**C. Check Query**
File: `src/models/reportModel.js`
```javascript
const activeLoanQuery = "SELECT COUNT(*) as active_loans FROM loans WHERE status = 'BORROWED'";
```
Pastikan query benar.

---

## 🗄️ Database Issues

### Issue 12: "relation does not exist"

**Symptoms:**
- Error: "relation 'authors' does not exist"
- Error: "relation 'books' does not exist"

**Solutions:**

**A. Check Database Schema**
Pastikan semua tabel sudah dibuat:
- authors
- categories
- books
- members
- loans

**B. Create Tables**
Run SQL untuk create tables (check dengan admin database Anda).

**C. Check Table Names**
Pastikan nama tabel lowercase dan plural:
- ✅ `authors` (bukan `Authors` atau `author`)
- ✅ `categories` (bukan `Categories` atau `category`)

---

### Issue 13: "column does not exist"

**Symptoms:**
- Error: "column 'author_name' does not exist"

**Solutions:**

**A. Check Column Names**
Pastikan column names di query sesuai dengan schema database.

**B. Check JOIN**
Untuk books, pastikan JOIN dengan authors dan categories:
```sql
SELECT b.*, a.name as author_name, c.name as category_name 
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
LEFT JOIN categories c ON b.category_id = c.id
```

---

## 🔐 Security Issues

### Issue 14: CORS Error

**Symptoms:**
- Error di browser console: "CORS policy blocked"
- Frontend tidak bisa akses API

**Solutions:**

**A. Check CORS Configuration**
File: `src/index.js`
```javascript
import cors from 'cors';
app.use(cors());
```
Pastikan CORS enabled.

**B. Specific Origin (Production)**
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

---

## 💻 Local Development Issues

### Issue 15: "Cannot find module"

**Symptoms:**
- Error: "Cannot find module './routes/reportRoutes.js'"

**Solutions:**

**A. Check File Exists**
```bash
ls src/routes/reportRoutes.js
```

**B. Check Import Path**
```javascript
import reportRoutes from './routes/reportRoutes.js';
```
Pastikan path benar dan ada `.js` extension.

**C. Reinstall Dependencies**
```bash
rm -rf node_modules
npm install
```

---

### Issue 16: "Port already in use"

**Symptoms:**
- Error: "Port 3000 is already in use"

**Solutions:**

**A. Kill Process**
Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**B. Use Different Port**
File: `.env`
```
PORT=3001
```

---

## 📱 Postman Collection Issues

### Issue 17: Collection Import Failed

**Symptoms:**
- Error saat import collection ke Postman

**Solutions:**

**A. Check File Format**
- Pastikan file `.json` valid
- Buka dengan text editor, check syntax

**B. Re-download Collection**
- Download ulang file `Smart_Library_API.postman_collection.json`

**C. Manual Import**
- Copy-paste JSON content langsung ke Postman

---

## 🆘 Still Having Issues?

### Debug Steps:

1. **Check Logs**
   - Vercel: Dashboard → Project → Deployments → View Function Logs
   - Local: Check terminal output

2. **Test Locally First**
   ```bash
   npm run dev
   ```
   Test di `http://localhost:3000` dulu.

3. **Check Documentation**
   - API_DOCUMENTATION.md
   - DEPLOYMENT_GUIDE.md
   - POSTMAN_QUICK_GUIDE.md

4. **Verify Implementation**
   - Check code di `src/models/`
   - Check code di `src/controllers/`
   - Check code di `src/routes/`

5. **Test with cURL**
   ```bash
   curl https://your-api.vercel.app/api/authors
   ```

---

## 📞 Getting Help

Jika masih stuck:

1. Screenshot error message
2. Screenshot request/response di Postman
3. Check Vercel logs
4. Tanyakan ke dosen/asisten

---

**Remember:** Most issues are simple fixes! Stay calm and debug systematically. 🔧
