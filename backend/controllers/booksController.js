import pool from '../db/index.js';

/**
 * Books Controller
 * All database interactions use parameterized queries to prevent SQL injection.
 */

/**
 * GET /api/books
 * Fetch all books ordered by newest first.
 */
export const getAllBooks = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, author, price, discount_percent, image_url, description, category, created_at 
       FROM books 
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/books/:id
 * Fetch a single book by its ID.
 */
export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id, 10);

    if (isNaN(bookId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID',
        message: 'Book ID must be a valid integer.',
      });
    }

    const { rows } = await pool.query(
      `SELECT id, title, author, price, discount_percent, image_url, description, category, created_at 
       FROM books 
       WHERE id = $1`,
      [bookId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Book with ID ${bookId} does not exist.`,
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/books
 * Create a new book. Expects validated body from middleware.
 */
export const createBook = async (req, res, next) => {
  try {
    const { title, author, price, discount_percent, image_url, description, category } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO books (title, author, price, discount_percent, image_url, description, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, author, price, discount_percent, image_url, description, category]
    );

    res.status(201).json({
      success: true,
      message: 'Book created successfully.',
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/books/:id
 * Update an existing book. Expects validated body from middleware.
 */
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id, 10);

    if (isNaN(bookId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID',
        message: 'Book ID must be a valid integer.',
      });
    }

    const { title, author, price, discount_percent, image_url, description, category } = req.body;

    const { rows, rowCount } = await pool.query(
      `UPDATE books 
       SET title = $1, author = $2, price = $3, discount_percent = $4, 
           image_url = $5, description = $6, category = $7
       WHERE id = $8
       RETURNING *`,
      [title, author, price, discount_percent, image_url, description, category, bookId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Book with ID ${bookId} does not exist.`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully.',
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/books/:id
 * Delete a book by its ID.
 */
export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id, 10);

    if (isNaN(bookId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID',
        message: 'Book ID must be a valid integer.',
      });
    }

    const { rowCount } = await pool.query(
      `DELETE FROM books WHERE id = $1`,
      [bookId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Book with ID ${bookId} does not exist.`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};
