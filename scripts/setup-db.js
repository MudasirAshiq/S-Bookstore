require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const setup = async () => {
  try {
    console.log('Connecting to database...');
    
    // Create Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        discount_price DECIMAL(10, 2),
        image_url TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "books" created or already exists.');

    // Seed Data
    const { rows } = await pool.query('SELECT COUNT(*) FROM books');
    if (parseInt(rows[0].count) === 0) {
      console.log('Seeding initial data...');
      const seedBooks = [
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: 25.99,
          discount_price: 19.99,
          image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
          description: 'A classic novel about the American Dream and the roaring twenties.'
        },
        {
          title: 'Atomic Habits',
          author: 'James Clear',
          price: 29.99,
          discount_price: null,
          image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
          description: 'An easy and proven way to build good habits and break bad ones.'
        },
        {
          title: 'The Alchemist',
          author: 'Paulo Coelho',
          price: 22.50,
          discount_price: 15.00,
          image_url: 'https://images.unsplash.com/photo-1543004218-2bc3500d9818?q=80&w=1000&auto=format&fit=crop',
          description: 'A magical story about following your dreams.'
        },
        {
          title: 'Project Hail Mary',
          author: 'Andy Weir',
          price: 35.00,
          discount_price: null,
          image_url: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80&w=1000&auto=format&fit=crop',
          description: 'A lone astronaut must save the earth from disaster.'
        }
      ];

      for (const book of seedBooks) {
        await pool.query(
          'INSERT INTO books (title, author, price, discount_price, image_url, description) VALUES ($1, $2, $3, $4, $5, $6)',
          [book.title, book.author, book.price, book.discount_price, book.image_url, book.description]
        );
      }
      console.log('Seed data inserted successfully.');
    } else {
      console.log('Database already has data, skipping seed.');
    }

    console.log('Setup complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error during setup:', err);
    process.exit(1);
  }
};

setup();
