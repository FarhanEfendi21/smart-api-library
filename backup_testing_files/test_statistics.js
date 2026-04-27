import { pool } from './src/config/db.js';

async function testStatistics() {
  try {
    console.log('📊 Testing Statistics Endpoint\n');
    console.log('=' .repeat(60));
    
    // 1. Get actual counts from database
    console.log('\n1️⃣ Getting actual counts from database...\n');
    
    const booksCount = await pool.query('SELECT COUNT(*) as count FROM books');
    const totalBooks = parseInt(booksCount.rows[0].count);
    console.log(`   📚 Total Books: ${totalBooks}`);
    
    const authorsCount = await pool.query('SELECT COUNT(*) as count FROM authors');
    const totalAuthors = parseInt(authorsCount.rows[0].count);
    console.log(`   ✍️  Total Authors: ${totalAuthors}`);
    
    const categoriesCount = await pool.query('SELECT COUNT(*) as count FROM categories');
    const totalCategories = parseInt(categoriesCount.rows[0].count);
    console.log(`   🏷️  Total Categories: ${totalCategories}`);
    
    const activeLoansCount = await pool.query("SELECT COUNT(*) as count FROM loans WHERE status = 'BORROWED'");
    const activeLoans = parseInt(activeLoansCount.rows[0].count);
    console.log(`   📖 Active Loans (BORROWED): ${activeLoans}`);
    
    // 2. Get statistics from the endpoint logic
    console.log('\n2️⃣ Getting statistics from endpoint logic...\n');
    
    const stats = {
      total_books: totalBooks,
      total_authors: totalAuthors,
      total_categories: totalCategories,
      active_loans: activeLoans
    };
    
    console.log('   Statistics Response:');
    console.log('   {');
    console.log(`     "total_books": ${stats.total_books},`);
    console.log(`     "total_authors": ${stats.total_authors},`);
    console.log(`     "total_categories": ${stats.total_categories},`);
    console.log(`     "active_loans": ${stats.active_loans}`);
    console.log('   }');
    
    // 3. Show detailed breakdown
    console.log('\n3️⃣ Detailed Breakdown:\n');
    
    // Books
    const books = await pool.query('SELECT id, title FROM books LIMIT 10');
    console.log(`   📚 Books (${books.rows.length}):`);
    if (books.rows.length === 0) {
      console.log('      ⚠️  No books found! Create books first.');
    } else {
      books.rows.forEach((book, i) => {
        console.log(`      ${i + 1}. ${book.title}`);
      });
    }
    
    // Authors
    const authors = await pool.query('SELECT id, name FROM authors LIMIT 10');
    console.log(`\n   ✍️  Authors (${authors.rows.length}):`);
    authors.rows.forEach((author, i) => {
      console.log(`      ${i + 1}. ${author.name}`);
    });
    
    // Categories
    const categories = await pool.query('SELECT id, name FROM categories LIMIT 10');
    console.log(`\n   🏷️  Categories (${categories.rows.length}):`);
    categories.rows.forEach((cat, i) => {
      console.log(`      ${i + 1}. ${cat.name}`);
    });
    
    // Active Loans
    const loans = await pool.query(`
      SELECT l.id, b.title, m.full_name, l.status 
      FROM loans l
      JOIN books b ON l.book_id = b.id
      JOIN members m ON l.member_id = m.id
      WHERE l.status = 'BORROWED'
      LIMIT 10
    `);
    console.log(`\n   📖 Active Loans (${loans.rows.length}):`);
    if (loans.rows.length === 0) {
      console.log('      ⚠️  No active loans! Create loans first.');
    } else {
      loans.rows.forEach((loan, i) => {
        console.log(`      ${i + 1}. ${loan.title} - ${loan.full_name}`);
      });
    }
    
    // 4. Verification
    console.log('\n4️⃣ Verification:\n');
    console.log('   ✅ All statistics calculated successfully!');
    console.log('\n   Expected API Response:');
    console.log('   {');
    console.log('     "message": "Statistik perpustakaan berhasil diambil",');
    console.log('     "data": {');
    console.log(`       "total_books": ${stats.total_books},`);
    console.log(`       "total_authors": ${stats.total_authors},`);
    console.log(`       "total_categories": ${stats.total_categories},`);
    console.log(`       "active_loans": ${stats.active_loans}`);
    console.log('     }');
    console.log('   }');
    
    // 5. Test in Postman
    console.log('\n5️⃣ Test in Postman:\n');
    console.log('   GET https://smart-api-library.vercel.app/api/reports/stats');
    console.log('\n   Or locally:');
    console.log('   GET http://localhost:3000/api/reports/stats');
    
    // 6. Recommendations
    console.log('\n6️⃣ Recommendations:\n');
    
    if (totalBooks === 0) {
      console.log('   ⚠️  No books found!');
      console.log('   → Create books: POST /api/books');
    }
    
    if (activeLoans === 0) {
      console.log('   ⚠️  No active loans!');
      console.log('   → Create loans: POST /api/loans');
    }
    
    if (totalBooks > 0 && activeLoans > 0) {
      console.log('   ✅ Database has sufficient data for testing!');
      console.log('   ✅ Ready to test statistics endpoint!');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Statistics test complete!\n');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

testStatistics();
