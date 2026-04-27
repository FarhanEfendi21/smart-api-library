import { pool } from './src/config/db.js';
import fs from 'fs';

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...\n');
    
    // Create Authors Table
    console.log('1️⃣ Creating authors table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        nationality VARCHAR(100)
      )
    `);
    console.log('   ✅ Authors table created\n');
    
    // Create Categories Table
    console.log('2️⃣ Creating categories table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
      )
    `);
    console.log('   ✅ Categories table created\n');
    
    // Create Books Table
    console.log('3️⃣ Creating books table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        isbn VARCHAR(20) UNIQUE,
        title VARCHAR(255) NOT NULL,
        author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        total_copies INTEGER DEFAULT 1,
        available_copies INTEGER DEFAULT 1
      )
    `);
    console.log('   ✅ Books table created\n');
    
    // Create Members Table
    console.log('4️⃣ Creating members table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        member_type VARCHAR(20) CHECK (member_type IN ('STUDENT', 'TEACHER', 'PUBLIC')),
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✅ Members table created\n');
    
    // Recreate Loans Table with proper foreign keys
    console.log('5️⃣ Checking loans table...');
    const loansCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'loans'
    `);
    
    if (loansCheck.rows.length === 0) {
      await pool.query(`
        CREATE TABLE loans (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          book_id UUID REFERENCES books(id) ON DELETE CASCADE,
          member_id UUID REFERENCES members(id) ON DELETE CASCADE,
          loan_date DATE DEFAULT CURRENT_DATE,
          due_date DATE NOT NULL,
          return_date DATE,
          status VARCHAR(20) DEFAULT 'BORROWED' CHECK (status IN ('BORROWED', 'RETURNED', 'OVERDUE'))
        )
      `);
      console.log('   ✅ Loans table created\n');
    } else {
      console.log('   ✅ Loans table already exists\n');
    }
    
    // Insert Sample Data
    console.log('6️⃣ Inserting sample data...\n');
    
    // Sample Authors
    console.log('   📝 Inserting authors...');
    const authors = await pool.query(`
      INSERT INTO authors (name, nationality) VALUES
      ('J.K. Rowling', 'British'),
      ('Tere Liye', 'Indonesia'),
      ('Andrea Hirata', 'Indonesia')
      ON CONFLICT DO NOTHING
      RETURNING *
    `);
    console.log(`   ✅ ${authors.rowCount} authors inserted\n`);
    
    // Sample Categories
    console.log('   📝 Inserting categories...');
    const categories = await pool.query(`
      INSERT INTO categories (name) VALUES
      ('Fantasy'),
      ('Fiction'),
      ('Non-Fiction'),
      ('Science')
      ON CONFLICT (name) DO NOTHING
      RETURNING *
    `);
    console.log(`   ✅ ${categories.rowCount} categories inserted\n`);
    
    // Sample Members
    console.log('   📝 Inserting members...');
    const members = await pool.query(`
      INSERT INTO members (full_name, email, member_type) VALUES
      ('John Doe', 'john@example.com', 'STUDENT'),
      ('Jane Smith', 'jane@example.com', 'TEACHER')
      ON CONFLICT (email) DO NOTHING
      RETURNING *
    `);
    console.log(`   ✅ ${members.rowCount} members inserted\n`);
    
    // Verify all tables
    console.log('7️⃣ Verifying tables...\n');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 Tables in database:');
    tables.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
    
    // Show sample data
    console.log('\n📚 Sample Authors:');
    const allAuthors = await pool.query('SELECT * FROM authors LIMIT 5');
    allAuthors.rows.forEach(author => {
      console.log(`   - ${author.name} (${author.nationality}) - ID: ${author.id}`);
    });
    
    console.log('\n🏷️  Sample Categories:');
    const allCategories = await pool.query('SELECT * FROM categories LIMIT 5');
    allCategories.rows.forEach(cat => {
      console.log(`   - ${cat.name} - ID: ${cat.id}`);
    });
    
    console.log('\n👥 Sample Members:');
    const allMembers = await pool.query('SELECT * FROM members LIMIT 5');
    allMembers.rows.forEach(member => {
      console.log(`   - ${member.full_name} (${member.email}) - ID: ${member.id}`);
    });
    
    console.log('\n✅ Database setup complete!');
    console.log('\n🚀 You can now test your API:');
    console.log('   GET  http://localhost:3000/api/authors');
    console.log('   GET  http://localhost:3000/api/categories');
    console.log('   GET  http://localhost:3000/api/books');
    console.log('   GET  http://localhost:3000/api/members');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error('\nFull error:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
