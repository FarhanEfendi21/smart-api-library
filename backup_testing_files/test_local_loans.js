// Test the getAllLoans query directly against the database
import { pool } from './src/config/db.js';

async function testLocalQuery() {
  try {
    console.log('Testing getAllLoans query directly...\n');
    
    const query = `
      SELECT l.*, b.title as book_title, m.full_name as member_name 
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN members m ON l.member_id = m.id
      ORDER BY l.loan_date DESC
    `;
    
    const result = await pool.query(query);
    
    console.log(`Total loans returned: ${result.rows.length}\n`);
    
    // Count by status
    const borrowed = result.rows.filter(loan => loan.status === 'BORROWED').length;
    const returned = result.rows.filter(loan => loan.status === 'RETURNED').length;
    
    console.log('By Status:');
    console.log(`  BORROWED: ${borrowed}`);
    console.log(`  RETURNED: ${returned}`);
    
    console.log('\n--- All Loans ---');
    result.rows.forEach((loan, i) => {
      console.log(`${i + 1}. ${loan.book_title || 'Unknown'} - ${loan.member_name || 'Unknown'}`);
      console.log(`   Status: ${loan.status}, ID: ${loan.id}`);
    });
    
    console.log('\n--- BORROWED Loans Only ---');
    result.rows.filter(loan => loan.status === 'BORROWED').forEach(loan => {
      console.log(`ID: ${loan.id}`);
      console.log(`  Book: ${loan.book_title || 'Unknown'}`);
      console.log(`  Member: ${loan.member_name || 'Unknown'}`);
      console.log(`  Status: ${loan.status}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

testLocalQuery();
