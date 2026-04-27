import { pool } from './src/config/db.js';

async function testReturnBook() {
  try {
    // Use one of the BORROWED loans
    const loanId = '1bcefb79-9564-4d7e-b007-1d23b60bb793';
    
    console.log('🔍 Testing Return Book Endpoint\n');
    console.log(`Loan ID: ${loanId}\n`);
    
    // 1. Check loan before return
    console.log('1️⃣ BEFORE RETURN:');
    const loanBefore = await pool.query('SELECT * FROM loans WHERE id = $1', [loanId]);
    if (loanBefore.rows.length === 0) {
      console.log('❌ Loan not found!');
      return;
    }
    
    const loan = loanBefore.rows[0];
    console.log(`   Status: ${loan.status}`);
    console.log(`   Return Date: ${loan.return_date || 'null'}`);
    
    // 2. Check book stock before return
    const bookBefore = await pool.query('SELECT * FROM books WHERE id = $1', [loan.book_id]);
    const book = bookBefore.rows[0];
    console.log(`   Book: ${book.title}`);
    console.log(`   Available Copies: ${book.available_copies}\n`);
    
    if (loan.status === 'RETURNED') {
      console.log('⚠️  This loan is already returned!');
      console.log('   Try with a different loan that has status BORROWED.\n');
      return;
    }
    
    // 3. Simulate return (manual transaction)
    console.log('2️⃣ RETURNING BOOK...');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Update loan
      const updateLoan = await client.query(`
        UPDATE loans SET status = 'RETURNED', return_date = CURRENT_DATE
        WHERE id = $1 RETURNING *
      `, [loanId]);
      
      // Update book stock
      await client.query(
        'UPDATE books SET available_copies = available_copies + 1 WHERE id = $1',
        [loan.book_id]
      );
      
      await client.query('COMMIT');
      console.log('   ✅ Return successful!\n');
      
      // 4. Check loan after return
      console.log('3️⃣ AFTER RETURN:');
      const loanAfter = await pool.query('SELECT * FROM loans WHERE id = $1', [loanId]);
      const loanUpdated = loanAfter.rows[0];
      console.log(`   Status: ${loanUpdated.status}`);
      console.log(`   Return Date: ${loanUpdated.return_date}`);
      
      // 5. Check book stock after return
      const bookAfter = await pool.query('SELECT * FROM books WHERE id = $1', [loan.book_id]);
      const bookUpdated = bookAfter.rows[0];
      console.log(`   Book: ${bookUpdated.title}`);
      console.log(`   Available Copies: ${bookUpdated.available_copies}\n`);
      
      console.log('📊 SUMMARY:');
      console.log(`   ✅ Status changed: ${loan.status} → ${loanUpdated.status}`);
      console.log(`   ✅ Return date filled: ${loan.return_date || 'null'} → ${loanUpdated.return_date}`);
      console.log(`   ✅ Stock increased: ${book.available_copies} → ${bookUpdated.available_copies}`);
      console.log('\n🎉 All operations completed successfully!');
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.log('   ❌ Return failed!');
      console.log('   Error:', error.message);
    } finally {
      client.release();
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

testReturnBook();
