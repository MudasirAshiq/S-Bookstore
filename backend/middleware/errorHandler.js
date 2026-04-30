/**
 * Global error handler middleware.
 * Catches unhandled errors and returns a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : err.message,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong. Please try again later.'
        : err.message,
  });
};

export default errorHandler;
