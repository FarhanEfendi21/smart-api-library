import { pool } from '../src/config/db.js';

async function check() {
  try {
    const res = await pool.query(`
      SELECT pg_get_constraintdef(c.oid) 
      FROM pg_constraint c 
      JOIN pg_class t ON c.conrelid = t.oid 
      WHERE t.relname = 'members' AND c.conname = 'members_member_type_check'
    `);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

check();
