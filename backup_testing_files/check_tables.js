import { pool } from './src/config/db.js';

async function checkTables() {
  try {
    console.log('🔍 Checking database tables...\n');
    
    // Check all tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 Tables in database:');
    if (tables.rows.length === 0) {
      console.log('⚠️  No tables found!\n');
    } else {
      tables.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
      console.log('');
    }
    
    // Check authors table specifically
    console.log('🔍 Checking authors table...');
    try {
      const authors = await pool.query('SELECT * FROM authors LIMIT 5');
      console.log(`✅ Authors table exists with ${authors.rows.length} rows\n`);
      
      if (authors.rows.length > 0) {
        console.log('Sample data:');
        authors.rows.forEach(author => {
          console.log(`   - ${author.name} (${author.nationality})`);
        });
      }
    } catch (err) {
      console.log('❌ Authors table error:', err.message);
      console.log('\n💡 Possible causes:');
      console.log('   1. Table name is case-sensitive (should be lowercase "authors")');
      console.log('   2. Table does not exist in this database');
      console.log('   3. Wrong database connection');
    }
    
    // Check database name
    console.log('\n🔍 Current database:');
    const dbName = await pool.query('SELECT current_database()');
    console.log(`   Database: ${dbName.rows[0].current_database}`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

checkTables();
