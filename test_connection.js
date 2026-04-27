import { pool } from './src/config/db.js';

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('📅 Server time:', result.rows[0].now);
    
    // Check if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📊 Tables in database:');
    if (tables.rows.length === 0) {
      console.log('⚠️  No tables found. You need to create tables first!');
    } else {
      tables.rows.forEach(row => {
        console.log('  ✓', row.table_name);
      });
    }
    
  } catch (err) {
    console.error('❌ Database connection failed!');
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();
