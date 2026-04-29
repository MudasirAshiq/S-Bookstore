const { Pool } = require('pg');

const connectionString = (process.env.DATABASE_URL || '').trim();

if (!connectionString) {
  console.error('CRITICAL: DATABASE_URL is not defined in environment variables!');
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Debug helper to log connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
