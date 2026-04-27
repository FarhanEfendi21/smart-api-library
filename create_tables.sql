-- Smart Library Database Schema

-- 1. Create Authors Table
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100)
);

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Create Books Table
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    isbn VARCHAR(20) UNIQUE,
    title VARCHAR(255) NOT NULL,
    author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    total_copies INTEGER DEFAULT 1,
    available_copies INTEGER DEFAULT 1
);

-- 4. Create Members Table
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    member_type VARCHAR(20) CHECK (member_type IN ('STUDENT', 'TEACHER', 'PUBLIC')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Loans Table (if not exists)
CREATE TABLE IF NOT EXISTS loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    loan_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'BORROWED' CHECK (status IN ('BORROWED', 'RETURNED', 'OVERDUE'))
);

-- Insert Sample Data

-- Sample Authors
INSERT INTO authors (name, nationality) VALUES
('J.K. Rowling', 'British'),
('Tere Liye', 'Indonesia'),
('Andrea Hirata', 'Indonesia')
ON CONFLICT DO NOTHING;

-- Sample Categories
INSERT INTO categories (name) VALUES
('Fantasy'),
('Fiction'),
('Non-Fiction'),
('Science')
ON CONFLICT (name) DO NOTHING;

-- Sample Members
INSERT INTO members (full_name, email, member_type) VALUES
('John Doe', 'john@example.com', 'STUDENT'),
('Jane Smith', 'jane@example.com', 'TEACHER')
ON CONFLICT (email) DO NOTHING;
