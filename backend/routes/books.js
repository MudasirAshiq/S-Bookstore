import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/booksController.js';
import { validateBook } from '../middleware/validate.js';

const router = Router();

/**
 * Books API Routes
 * 
 * GET    /api/books      → Fetch all books
 * GET    /api/books/:id  → Fetch single book
 * POST   /api/books      → Create new book (validated)
 * PUT    /api/books/:id  → Update book (validated)
 * DELETE /api/books/:id  → Delete book
 */

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
