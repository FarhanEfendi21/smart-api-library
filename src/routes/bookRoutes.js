import express from 'express';
import { BookController } from '../controllers/bookController.js';

const router = express.Router();

// GET /api/books (dengan fitur pencarian ?title=...)
router.get('/', BookController.getAllBooks);

// GET /api/books/:id
router.get('/:id', BookController.getBookById);

// POST /api/books
router.post('/', BookController.createBook);

// PUT /api/books/:id
router.put('/:id', BookController.updateBook);

// DELETE /api/books/:id
router.delete('/:id', BookController.deleteBook);

export default router;
