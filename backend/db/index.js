import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

/**
 * PostgreSQL connection pool.
 * Uses NeonDB via the DATABASE_URL environment variable.
 * SSL is required for NeonDB connections.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Connection pool tuning for production
  max: 10,                  // Maximum pool size
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 10000, // Fail if connection takes >10s
});

// Log pool errors instead of crashing the process
pool.on('error', (err) => {
  console.error('[DB Pool] Unexpected error on idle client:', err.message);
});

/**
 * Initialize database tables if they do not exist.
 * Called once at server startup.
 */
export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    // Create books table
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        discount_percent INTEGER DEFAULT 0,
        image_url TEXT,
        description TEXT,
        category TEXT DEFAULT 'General',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure category column exists (migration safety)
    await client.query(`
      ALTER TABLE books ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General'
    `).catch(() => {});

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        dashboard_name TEXT DEFAULT 'Sapien Dashboard',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure dashboard_name column exists (migration safety)
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS dashboard_name TEXT DEFAULT 'Sapien Dashboard'
    `).catch(() => {});

    // Seed default admin if not present
    const { rows: admins } = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      ['admin@sapien.com']
    );

    if (admins.length === 0) {
      await client.query(
        `INSERT INTO users (email, password, dashboard_name) VALUES ($1, $2, $3)`,
        ['admin@sapien.com', 'admin123', 'Sapien Dashboard']
      );
      console.log('[DB] Default admin seeded: admin@sapien.com');
    }

    console.log('[DB] Database initialized successfully');
  } catch (err) {
    console.error('[DB] Initialization failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

export default pool;
