import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

if (!databaseUrl) {
  console.error('Neon Database URL is required. Check your .env file.');
}

// Suppress browser warning as we are in a rapid development prototype phase
export const sql = neon(databaseUrl, {
  disableWarningInBrowsers: true
});

// Helper to initialize tables if they don't exist
export const initDb = async () => {
  try {
    // Create books table
    await sql`
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
    `;

    // Try to add category column if it doesn't exist
    try {
      await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General'`;
    } catch (e) {}

    // Create users table for simple auth and settings
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        dashboard_name TEXT DEFAULT 'Sapien Dashboard',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Try to add dashboard_name column if it doesn't exist
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS dashboard_name TEXT DEFAULT 'Sapien Dashboard'`;
    } catch (e) {}

    // Check if admin exists, if not create a default one
    const admins = await sql`SELECT * FROM users WHERE email = 'admin@sapien.com'`;
    if (admins.length === 0) {
      await sql`
        INSERT INTO users (email, password, dashboard_name) 
        VALUES ('admin@sapien.com', 'admin123', 'Sapien Dashboard')
      `;
      console.log('Default admin created: admin@sapien.com / admin123');
    }
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
};
