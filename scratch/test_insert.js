import { pool } from '../src/config/db.js';

async function testInsert() {
  try {
    const res = await pool.query(`
      INSERT INTO members (full_name, email, member_type) 
      VALUES ($1, $2, $3) RETURNING *
    `, ['Test Faculty', 'faculty@test.com', 'FACULTY']);
    console.log('Insert successful:', res.rows[0]);
    
    // Clean up
    await pool.query('DELETE FROM members WHERE id = $1', [res.rows[0].id]);
    console.log('Cleanup successful');
  } catch (err) {
    console.error('Insert failed:', err.message);
  } finally {
    await pool.end();
  }
}

testInsert();
