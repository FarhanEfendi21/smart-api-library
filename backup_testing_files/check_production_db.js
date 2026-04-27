import { pool } from './src/config/db.js';

async function checkProductionDB() {
  try {
    console.log('🔍 Checking Production Database\n');
    console.log('=' .repeat(60));
    
    // 1. Check connection
    console.log('\n1️⃣ Database Connection:');
    const dbInfo = await pool.query('SELECT current_database(), current_user');
    console.log(`   Database: ${dbInfo.rows[0].current_database}`);
    console.log(`   User: ${dbInfo.rows[0].current_user}`);
    
    // 2. Count all loans
    console.log('\n2️⃣ Total Loans:');
    const totalLoans = await pool.query('SELECT COUNT(*) as count FROM loans');
    console.log(`   Total: ${totalLoans.rows[0].count}`);
    
    // 3. Count by status
    console.log('\n3️⃣ Loans by Status:');
    const byStatus = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM loans
      GROUP BY status
      ORDER BY status
    `);
    byStatus.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });
    
    // 4. Count BORROWED specifically
    console.log('\n4️⃣ BORROWED Loans (for statistics):');
    const borrowed = await pool.query(`
      SELECT COUNT(*) as count
      FROM loans
      WHERE status = 'BORROWED'
    `);
    console.log(`   Count: ${borrowed.rows[0].count}`);
    
    // 5. Show all loans
    console.log('\n5️⃣ All Loans Details:');
    const allLoans = await pool.query(`
      SELECT l.id, l.status, b.title, m.full_name
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN members m ON l.member_id = m.id
      ORDER BY l.loan_date DESC
    `);
    
    allLoans.rows.forEach((loan, i) => {
      console.log(`   ${i + 1}. ${loan.title || 'Unknown'} - ${loan.full_name || 'Unknown'}`);
      console.log(`      Status: ${loan.status}`);
      console.log(`      ID: ${loan.id}`);
    });
    
    // 6. Expected statistics
    console.log('\n6️⃣ Expected Statistics:');
    console.log(`   active_loans should be: ${borrowed.rows[0].count}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Check complete!\n');
    
    console.log('🎯 Next Steps:');
    console.log('   1. Test GET /api/loans in Postman');
    console.log('   2. Count BORROWED loans manually');
    console.log('   3. Test GET /api/reports/stats');
    console.log('   4. Verify active_loans matches BORROWED count');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

checkProductionDB();
