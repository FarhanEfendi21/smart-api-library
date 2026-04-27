import { BookModel } from '../models/bookModel.js';

export const BookController = {
  async getAllBooks(req, res) {
    try {
      const { title } = req.query; // Fitur pencarian
      const books = await BookModel.getAll(title);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await BookModel.getById(id);
      if (!book) {
        return res.status(404).json({ error: "Buku tidak ditemukan" });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createBook(req, res) {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updatedBook = await BookModel.update(id, req.body);
      if (!updatedBook) {
        return res.status(404).json({ error: "Buku tidak ditemukan" });
      }
      res.json({ message: "Buku berhasil diupdate", data: updatedBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteBook(req, res) {
    const { id } = req.params;
    try {
      await BookModel.delete(id);
      res.json({ message: "Buku berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
