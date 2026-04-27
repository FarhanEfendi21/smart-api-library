import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories (dengan fitur pencarian ?name=...)
router.get('/', CategoryController.getCategories);

// GET /api/categories/:id
router.get('/:id', CategoryController.getCategoryById);

// POST /api/categories
router.post('/', CategoryController.addCategory);

// PUT /api/categories/:id
router.put('/:id', CategoryController.updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', CategoryController.deleteCategory);

export default router;