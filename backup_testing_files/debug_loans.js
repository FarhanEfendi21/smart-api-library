import { pool } from './src/config/db.js';

async function debugLoans() {
  try {
    console.log('🔍 Debugging Loans Data\n');
    console.log('=' .repeat(60));
    
    // 1. Get all loans
    console.log('\n1️⃣ All Loans in Database:\n');
    const allLoans = await pool.query(`
      SELECT id, book_id, member_id, status, loan_date, return_date
      FROM loans
      ORDER BY loan_date DESC
    `);
    
    console.log(`   Total loans: ${allLoans.rows.length}\n`);
    
    if (allLoans.rows.length === 0) {
      console.log('   ⚠️  No loans found in database!');
    } else {
      allLoans.rows.forEach((loan, i) => {
        console.log(`   ${i + 1}. Loan ID: ${loan.id}`);
        console.log(`      Status: ${loan.status}`);
        console.log(`      Loan Date: ${loan.loan_date}`);
        console.log(`      Return Date: ${loan.return_date || 'Not returned'}`);
        console.log('');
      });
    }
    
    // 2. Count by status
    console.log('2️⃣ Count by Status:\n');
    const statusCount = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM loans
      GROUP BY status
      ORDER BY status
    `);
    
    statusCount.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });
    
    // 3. Count BORROWED specifically
    console.log('\n3️⃣ BORROWED Loans Count:\n');
    const borrowedCount = await pool.query(`
      SELECT COUNT(*) as count
      FROM loans
      WHERE status = 'BORROWED'
    `);
    console.log(`   Count: ${borrowedCount.rows[0].count}`);
    
    // 4. Show BORROWED loans details
    console.log('\n4️⃣ BORROWED Loans Details:\n');
    const borrowedLoans = await pool.query(`
      SELECT l.id, l.status, l.loan_date, l.return_date,
             b.title as book_title, m.full_name as member_name
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN members m ON l.member_id = m.id
      WHERE l.status = 'BORROWED'
      ORDER BY l.loan_date DESC
    `);
    
    if (borrowedLoans.rows.length === 0) {
      console.log('   ⚠️  No BORROWED loans found!');
    } else {
      borrowedLoans.rows.forEach((loan, i) => {
        console.log(`   ${i + 1}. ${loan.book_title || 'Unknown Book'}`);
        console.log(`      Member: ${loan.member_name || 'Unknown Member'}`);
        console.log(`      Loan Date: ${loan.loan_date}`);
        console.log(`      Status: ${loan.status}`);
        console.log(`      ID: ${loan.id}`);
        console.log('');
      });
    }
    
    // 5. Check for case sensitivity issues
    console.log('5️⃣ Checking Case Sensitivity:\n');
    const caseCheck = await pool.query(`
      SELECT DISTINCT status, COUNT(*) as count
      FROM loans
      GROUP BY status
    `);
    
    console.log('   Unique status values:');
    caseCheck.rows.forEach(row => {
      console.log(`   - "${row.status}" (count: ${row.count})`);
    });
    
    // 6. Test the exact query from reportModel
    console.log('\n6️⃣ Testing Report Query:\n');
    const reportQuery = await pool.query(`
      SELECT COUNT(*) as active_loans 
      FROM loans 
      WHERE status = 'BORROWED'
    `);
    console.log(`   Report Query Result: ${reportQuery.rows[0].active_loans}`);
    
    // 7. Check for NULL or empty status
    console.log('\n7️⃣ Checking for NULL/Empty Status:\n');
    const nullCheck = await pool.query(`
      SELECT COUNT(*) as count
      FROM loans
      WHERE status IS NULL OR status = ''
    `);
    console.log(`   NULL/Empty status count: ${nullCheck.rows[0].count}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Debug complete!\n');
    
    // Summary
    console.log('📊 SUMMARY:\n');
    console.log(`   Total Loans: ${allLoans.rows.length}`);
    console.log(`   BORROWED (from report query): ${reportQuery.rows[0].active_loans}`);
    console.log(`   BORROWED (manual count): ${borrowedLoans.rows.length}`);
    
    if (parseInt(reportQuery.rows[0].active_loans) !== borrowedLoans.rows.length) {
      console.log('\n   ⚠️  MISMATCH DETECTED!');
      console.log('   Report query and manual count do not match.');
    } else {
      console.log('\n   ✅ Counts match!');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
  } finally {
    await pool.end();
  }
}

debugLoans();
