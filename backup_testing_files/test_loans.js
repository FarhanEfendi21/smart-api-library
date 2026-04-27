import { pool } from './src/config/db.js';

async function testLoans() {
  try {
    console.log('🔍 Checking loans in database...\n');
    
    // Get all loans
    const loans = await pool.query(`
      SELECT l.*, b.title as book_title, m.full_name as member_name 
      FROM loans l
      JOIN books b ON l.book_id = b.id
      JOIN members m ON l.member_id = m.id
      ORDER BY l.loan_date DESC
    `);
    
    if (loans.rows.length === 0) {
      console.log('⚠️  No loans found in database!');
      console.log('\n💡 You need to create a loan first before you can return it.');
      console.log('\nSteps to create a loan:');
      console.log('1. Make sure you have books and members in database');
      console.log('2. POST /api/loans with body:');
      console.log('   {');
      console.log('     "book_id": "<book_id>",');
      console.log('     "member_id": "<member_id>",');
      console.log('     "due_date": "2024-05-15"');
      console.log('   }');
    } else {
      console.log(`✅ Found ${loans.rows.length} loan(s):\n`);
      loans.rows.forEach((loan, index) => {
        console.log(`${index + 1}. Loan ID: ${loan.id}`);
        console.log(`   Book: ${loan.book_title}`);
        console.log(`   Member: ${loan.member_name}`);
        console.log(`   Status: ${loan.status}`);
        console.log(`   Loan Date: ${loan.loan_date}`);
        console.log(`   Due Date: ${loan.due_date}`);
        console.log(`   Return Date: ${loan.return_date || 'Not returned yet'}`);
        console.log('');
      });
      
      // Show which loans can be returned
      const borrowedLoans = loans.rows.filter(l => l.status === 'BORROWED');
      if (borrowedLoans.length > 0) {
        console.log('📋 Loans that can be returned:');
        borrowedLoans.forEach(loan => {
          console.log(`   ✓ PUT /api/loans/${loan.id}/return`);
        });
      } else {
        console.log('⚠️  All loans have been returned already.');
      }
    }
    
    // Also check books and members
    console.log('\n📚 Checking books...');
    const books = await pool.query('SELECT id, title, available_copies FROM books');
    if (books.rows.length === 0) {
      console.log('⚠️  No books found! Create books first.');
    } else {
      console.log(`✅ Found ${books.rows.length} book(s)`);
      books.rows.forEach(book => {
        console.log(`   - ${book.title} (ID: ${book.id}, Available: ${book.available_copies})`);
      });
    }
    
    console.log('\n👥 Checking members...');
    const members = await pool.query('SELECT id, full_name FROM members');
    if (members.rows.length === 0) {
      console.log('⚠️  No members found! Create members first.');
    } else {
      console.log(`✅ Found ${members.rows.length} member(s)`);
      members.rows.forEach(member => {
        console.log(`   - ${member.full_name} (ID: ${member.id})`);
      });
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

testLoans();
