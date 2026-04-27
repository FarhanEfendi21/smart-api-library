// Script to clean up loans with invalid foreign keys
import { pool } from './src/config/db.js';

async function cleanupOrphanedLoans() {
  const client = await pool.connect();
  
  try {
    console.log('🧹 Cleaning up orphaned loans...\n');
    console.log('=' .repeat(60));
    
    await client.query('BEGIN');
    
    // 1. Find orphaned loans (invalid book_id)
    console.log('\n1️⃣ Finding loans with invalid book_id...');
    const invalidBooks = await client.query(`
      SELECT l.id, l.book_id, l.status
      FROM loans l
      WHERE l.book_id NOT IN (SELECT id FROM books)
    `);
    console.log(`   Found: ${invalidBooks.rows.length} loans`);
    
    if (invalidBooks.rows.length > 0) {
      console.log('   Details:');
      invalidBooks.rows.forEach(loan => {
        console.log(`     - ID: ${loan.id}, Status: ${loan.status}`);
      });
    }
    
    // 2. Find orphaned loans (invalid member_id)
    console.log('\n2️⃣ Finding loans with invalid member_id...');
    const invalidMembers = await client.query(`
      SELECT l.id, l.member_id, l.status
      FROM loans l
      WHERE l.member_id NOT IN (SELECT id FROM members)
    `);
    console.log(`   Found: ${invalidMembers.rows.length} loans`);
    
    if (invalidMembers.rows.length > 0) {
      console.log('   Details:');
      invalidMembers.rows.forEach(loan => {
        console.log(`     - ID: ${loan.id}, Status: ${loan.status}`);
      });
    }
    
    // 3. Find loans with BOTH invalid book_id AND member_id
    console.log('\n3️⃣ Finding loans with both invalid book_id AND member_id...');
    const invalidBoth = await client.query(`
      SELECT l.id, l.status
      FROM loans l
      WHERE l.book_id NOT IN (SELECT id FROM books)
        AND l.member_id NOT IN (SELECT id FROM members)
    `);
    console.log(`   Found: ${invalidBoth.rows.length} loans`);
    
    // 4. Count by status before cleanup
    console.log('\n4️⃣ Current loan counts:');
    const beforeCounts = await client.query(`
      SELECT status, COUNT(*) as count
      FROM loans
      GROUP BY status
    `);
    beforeCounts.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });
    
    // 5. Ask for confirmation (in real scenario)
    console.log('\n5️⃣ Ready to delete orphaned loans...');
    console.log('   ⚠️  This will permanently delete loans with invalid foreign keys!');
    console.log('   ⚠️  Uncomment the DELETE queries below to proceed.');
    
    // UNCOMMENT THESE LINES TO ACTUALLY DELETE:
    /*
    const deleteResult = await client.query(`
      DELETE FROM loans
      WHERE book_id NOT IN (SELECT id FROM books)
         OR member_id NOT IN (SELECT id FROM members)
      RETURNING id, status
    `);
    
    console.log(`\n   ✅ Deleted ${deleteResult.rows.length} orphaned loans`);
    
    // Show what was deleted
    const borrowedDeleted = deleteResult.rows.filter(r => r.status === 'BORROWED').length;
    const returnedDeleted = deleteResult.rows.filter(r => r.status === 'RETURNED').length;
    console.log(`      - BORROWED: ${borrowedDeleted}`);
    console.log(`      - RETURNED: ${returnedDeleted}`);
    
    await client.query('COMMIT');
    console.log('\n   ✅ Changes committed to database');
    */
    
    await client.query('ROLLBACK');
    console.log('\n   ℹ️  No changes made (ROLLBACK). Uncomment DELETE to proceed.');
    
    // 6. Show final counts
    console.log('\n6️⃣ Final loan counts (after cleanup):');
    const afterCounts = await client.query(`
      SELECT status, COUNT(*) as count
      FROM loans
      GROUP BY status
    `);
    afterCounts.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Cleanup check complete!\n');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

cleanupOrphanedLoans();
