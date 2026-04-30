import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initializeDatabase } from './db/index.js';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

// ─── Load environment variables ────────────────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── CORS Configuration ────────────────────────────────────────────────────────
// Parse allowed origins from environment variable (comma-separated)
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── Body Parsing ───────────────────────────────────────────────────────────────
// Increased limit to 5MB for Base64-encoded book cover images
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// ─── Health Check (used by Render to verify service is running) ─────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ─── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

// ─── 404 Handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist.`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    // Initialize database tables before accepting traffic
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 Sapien Books API running on port ${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
      console.log(`   Books:  http://localhost:${PORT}/api/books`);
      console.log(`   Auth:   http://localhost:${PORT}/api/auth/login\n`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
