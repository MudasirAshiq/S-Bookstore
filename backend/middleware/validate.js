/**
 * Input validation and sanitization middleware.
 * Provides reusable validators for book and auth payloads.
 */

/**
 * Sanitize a string input: trim whitespace & remove potential XSS characters.
 */
const sanitize = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate book creation/update payload.
 */
export const validateBook = (req, res, next) => {
  const { title, author, price } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Title is required and must be a non-empty string.',
    });
  }

  if (!author || typeof author !== 'string' || author.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Author is required and must be a non-empty string.',
    });
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Price must be a valid non-negative number.',
    });
  }

  // Sanitize all string fields
  req.body.title = sanitize(req.body.title);
  req.body.author = sanitize(req.body.author);
  req.body.description = req.body.description ? sanitize(req.body.description) : '';
  req.body.category = req.body.category ? sanitize(req.body.category) : 'General';
  req.body.image_url = req.body.image_url ? req.body.image_url.trim() : '';
  req.body.price = parsedPrice;
  req.body.discount_percent = parseInt(req.body.discount_percent) || 0;

  // Clamp discount to 0-100
  if (req.body.discount_percent < 0) req.body.discount_percent = 0;
  if (req.body.discount_percent > 100) req.body.discount_percent = 100;

  next();
};

/**
 * Validate login payload.
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Email is required.',
    });
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Password is required.',
    });
  }

  req.body.email = email.trim().toLowerCase();
  req.body.password = password;

  next();
};
