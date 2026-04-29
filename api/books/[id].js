const db = require('../lib/db');

module.exports = async function handler(req, res) {
  const { id } = req.query;

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
      const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'PUT') {
    const { title, author, price, discount_percent, image_url, description } = req.body;

    if (!title || !author || !price || !image_url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const { rows } = await db.query(
        'UPDATE books SET title = $1, author = $2, price = $3, discount_percent = $4, image_url = $5, description = $6 WHERE id = $7 RETURNING *',
        [title, author, price, discount_percent || 0, image_url, description || '', id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { rowCount } = await db.query('DELETE FROM books WHERE id = $1', [id]);
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
