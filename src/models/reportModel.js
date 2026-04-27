import { pool } from '../config/db.js';

export const ReportModel = {
  async getLibraryStats() {
    const client = await pool.connect();
    try {
      // Total buku
      const totalBooksQuery = 'SELECT COUNT(*) as total_books FROM books';
      const totalBooks = await client.query(totalBooksQuery);

      // Total authors
      const totalAuthorsQuery = 'SELECT COUNT(*) as total_authors FROM authors';
      const totalAuthors = await client.query(totalAuthorsQuery);

      // Total categories
      const totalCategoriesQuery = 'SELECT COUNT(*) as total_categories FROM categories';
      const totalCategories = await client.query(totalCategoriesQuery);

      // Total peminjaman yang masih BORROWED
      const activeLoanQuery = "SELECT COUNT(*) as active_loans FROM loans WHERE status = 'BORROWED'";
      const activeLoans = await client.query(activeLoanQuery);

      return {
        total_books: parseInt(totalBooks.rows[0].total_books),
        total_authors: parseInt(totalAuthors.rows[0].total_authors),
        total_categories: parseInt(totalCategories.rows[0].total_categories),
        active_loans: parseInt(activeLoans.rows[0].active_loans)
      };
    } finally {
      client.release();
    }
  }
};
