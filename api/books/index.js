const db = require('../lib/db');

module.exports = async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { rows } = await db.query('SELECT * FROM books ORDER BY created_at DESC');
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Database Query Error:', error);
      return res.status(500).json({ 
        error: 'Database Connection Error', 
        details: error.message,
        hint: 'Check if DATABASE_URL is set in Vercel settings and if Supabase is reachable.'
      });
    }
  }

  if (req.method === 'POST') {
    const { title, author, price, discount_percent, image_url, description } = req.body;

    if (!title || !author || !price || !image_url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const { rows } = await db.query(
        'INSERT INTO books (title, author, price, discount_percent, image_url, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, author, price, discount_percent || 0, image_url, description || '']
      );
      return res.status(201).json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
