import express from 'express';
import { AuthorController } from '../controllers/authorController.js';

const router = express.Router();

// GET /api/authors (dengan fitur pencarian ?name=...)
router.get('/', AuthorController.getAuthors);

// GET /api/authors/:id
router.get('/:id', AuthorController.getAuthorById);

// POST /api/authors
router.post('/', AuthorController.addAuthor);

// PUT /api/authors/:id
router.put('/:id', AuthorController.updateAuthor);

// DELETE /api/authors/:id
router.delete('/:id', AuthorController.deleteAuthor);

export default router;