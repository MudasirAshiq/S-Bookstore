import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

if (!databaseUrl) {
  console.error('Neon Database URL is required. Check your .env file.');
}

export const sql = neon(databaseUrl);

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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create users table for simple auth
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Check if admin exists, if not create a default one
    const admins = await sql`SELECT * FROM users WHERE email = 'admin@sapien.com'`;
    if (admins.length === 0) {
      await sql`
        INSERT INTO users (email, password) 
        VALUES ('admin@sapien.com', 'admin123')
      `;
      console.log('Default admin created: admin@sapien.com / admin123');
    }
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
};
