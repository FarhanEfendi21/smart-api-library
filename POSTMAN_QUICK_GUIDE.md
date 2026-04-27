# 🚀 Postman Quick Guide - Smart Library API

## 📥 Setup Postman

### 1. Import Collection
1. Buka Postman
2. Klik **Import** (tombol di kiri atas)
3. Pilih file `Smart_Library_API.postman_collection.json`
4. Klik **Import**

### 2. Setup Environment Variable
1. Klik icon ⚙️ (Settings) di kanan atas
2. Pilih **Environments**
3. Klik **+** untuk create new environment
4. Nama: `Smart Library - Production`
5. Tambahkan variable:
   - Variable: `base_url`
   - Initial Value: `https://your-app.vercel.app` (ganti dengan URL deployment Anda)
   - Current Value: `https://your-app.vercel.app`
6. Klik **Save**
7. Pilih environment ini di dropdown (kanan atas)

### 3. Test Connection
1. Buka request **GET** `{{base_url}}/`
2. Klik **Send**
3. Harus dapat response: `Smart Library API is Running...`

---

## 📋 Testing Order (Recommended)

Ikuti urutan ini untuk testing yang smooth:

### Phase 1: Create Master Data
```
1. POST /api/authors (create 2-3 authors)
2. POST /api/categories (create 2-3 categories)
3. POST /api/books (create 3-4 books)
4. POST /api/members (create 2-3 members)
```

### Phase 2: Test Read Operations
```
5. GET /api/authors
6. GET /api/categories
7. GET /api/books
8. GET /api/members
```

### Phase 3: Test Search Features
```
9. GET /api/authors?name=keyword
10. GET /api/categories?name=keyword
11. GET /api/books?title=keyword
```

### Phase 4: Test Get by ID
```
12. GET /api/authors/1
13. GET /api/categories/1
14. GET /api/books/1
15. GET /api/members/1
```

### Phase 5: Test Loan & Return
```
16. POST /api/loans (create loan)
17. GET /api/loans (verify loan created)
18. PUT /api/loans/1/return (return book) ⭐
19. GET /api/loans (verify status changed)
```

### Phase 6: Test Statistics
```
20. GET /api/reports/stats ⭐
```

### Phase 7: Test Update Operations
```
21. PUT /api/authors/1
22. PUT /api/categories/1
23. PUT /api/books/1
24. PUT /api/members/1
```

### Phase 8: Test Delete Operations
```
25. DELETE /api/loans/1
26. DELETE /api/books/1
27. DELETE /api/members/1
28. DELETE /api/categories/1
29. DELETE /api/authors/1
```

---

## 🎯 Quick Reference - All Endpoints

### AUTHORS
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/authors` | No |
| GET | `/api/authors?name=keyword` | No |
| GET | `/api/authors/:id` | No |
| POST | `/api/authors` | Yes |
| PUT | `/api/authors/:id` | Yes |
| DELETE | `/api/authors/:id` | No |

**Body Example:**
```json
{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

---

### CATEGORIES
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/categories` | No |
| GET | `/api/categories?name=keyword` | No |
| GET | `/api/categories/:id` | No |
| POST | `/api/categories` | Yes |
| PUT | `/api/categories/:id` | Yes |
| DELETE | `/api/categories/:id` | No |

**Body Example:**
```json
{
  "name": "Fantasy"
}
```

---

### BOOKS
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/books` | No |
| GET | `/api/books?title=keyword` | No |
| GET | `/api/books/:id` | No |
| POST | `/api/books` | Yes |
| PUT | `/api/books/:id` | Yes |
| DELETE | `/api/books/:id` | No |

**Body Example:**
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

### MEMBERS
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/members` | No |
| GET | `/api/members/:id` | No |
| POST | `/api/members` | Yes |
| PUT | `/api/members/:id` | Yes |
| DELETE | `/api/members/:id` | No |

**Body Example:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "member_type": "STUDENT"
}
```

**Member Types:** `STUDENT`, `TEACHER`, `PUBLIC`

---

### LOANS
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/loans` | No |
| POST | `/api/loans` | Yes |
| PUT | `/api/loans/:id/return` | No ⭐ |
| DELETE | `/api/loans/:id` | No |

**Body Example (POST):**
```json
{
  "book_id": 1,
  "member_id": 1,
  "due_date": "2024-05-15"
}
```

**⭐ Return Book:** `PUT /api/loans/:id/return` - No body required!

---

### REPORTS
| Method | Endpoint | Body Required |
|--------|----------|---------------|
| GET | `/api/reports/stats` | No ⭐ |

---

## 📸 Screenshot Tips

### What to Include in Screenshots:
1. ✅ Full URL in address bar
2. ✅ HTTP Method (GET, POST, PUT, DELETE)
3. ✅ Request Body tab (for POST/PUT)
4. ✅ Response Status (200, 201, etc.)
5. ✅ Response Body (full JSON)

### How to Take Good Screenshots:
1. **Maximize Postman window** untuk tampilan lebih jelas
2. **Expand response** untuk menampilkan semua data
3. **Use light theme** untuk screenshot yang lebih jelas (optional)
4. **Highlight important parts** dengan annotation (optional)

### Screenshot Naming Convention:
```
01_GET_authors.png
02_GET_authors_search.png
03_GET_authors_by_id.png
04_POST_authors.png
05_PUT_authors.png
06_DELETE_authors.png
...
```

---

## 🔧 Troubleshooting

### Issue: "Could not get response"
**Solution:**
- Check if base_url is correct
- Check if API is deployed and running
- Check internet connection

### Issue: "404 Not Found"
**Solution:**
- Check endpoint URL (typo?)
- Check if route exists in API
- Verify base_url doesn't have trailing slash

### Issue: "400 Bad Request"
**Solution:**
- Check request body format (valid JSON?)
- Check required fields are present
- Check data types (number vs string)

### Issue: "500 Internal Server Error"
**Solution:**
- Check if database is online
- Check if foreign keys exist (author_id, category_id, etc.)
- Check server logs in Vercel

### Issue: "author_id does not exist"
**Solution:**
- Create authors first before creating books
- Use correct author_id from previous POST response

### Issue: "Buku sedang tidak tersedia"
**Solution:**
- Check available_copies in books table
- Return some books first
- Or create new books with more copies

---

## 💡 Pro Tips

### 1. Use Variables for IDs
Setelah create data, save ID ke variable:
```javascript
// In Tests tab (POST /api/authors)
pm.environment.set("author_id", pm.response.json().id);

// Then use in next request
{{author_id}}
```

### 2. Use Pre-request Scripts
```javascript
// Generate random email
pm.environment.set("random_email", `user${Date.now()}@example.com`);
```

### 3. Use Tests for Validation
```javascript
// Verify status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Verify response structure
pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});
```

### 4. Organize with Folders
Collection sudah diorganisir dengan folders:
- Authors
- Categories
- Books
- Members
- Loans
- Reports

### 5. Use Runner for Batch Testing
1. Klik **Runner** di Postman
2. Select collection
3. Select environment
4. Click **Run**
5. Get summary of all tests

---

## 📊 Expected Response Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid data, validation error |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Database error, server issue |

---

## 🎯 Testing Checklist

Quick checklist untuk memastikan semua sudah ditest:

**Authors:**
- [ ] GET all
- [ ] GET search
- [ ] GET by ID
- [ ] POST create
- [ ] PUT update
- [ ] DELETE

**Categories:**
- [ ] GET all
- [ ] GET search
- [ ] GET by ID
- [ ] POST create
- [ ] PUT update
- [ ] DELETE

**Books:**
- [ ] GET all
- [ ] GET search
- [ ] GET by ID
- [ ] POST create
- [ ] PUT update
- [ ] DELETE

**Members:**
- [ ] GET all
- [ ] GET by ID
- [ ] POST create
- [ ] PUT update
- [ ] DELETE

**Loans:**
- [ ] GET all
- [ ] POST create
- [ ] PUT return ⭐
- [ ] DELETE

**Reports:**
- [ ] GET stats ⭐

---

## 🚀 Ready to Test!

1. ✅ Import collection
2. ✅ Set environment variable
3. ✅ Follow testing order
4. ✅ Take screenshots
5. ✅ Verify all responses
6. ✅ Complete checklist

**Good luck! 🎉**
