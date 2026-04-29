const http = require('http');
const url = require('url');
const path = require('path');
require('dotenv').config();

// Load handlers
const booksHandler = require('../api/books/index');
const bookIdHandler = require('../api/books/[id]');

const server = http.createServer(async (req, res) => {
  const baseURL = `http://${req.headers.host || 'localhost'}`;
  const parsedUrl = new URL(req.url, baseURL);
  const pathname = parsedUrl.pathname;
  
  // Convert searchParams to a plain object for req.query
  const query = {};
  parsedUrl.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  // Add basic body parsing for JSON
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  
  req.on('end', async () => {
    try {
      if (body) {
        req.body = JSON.parse(body);
      } else {
        req.body = {};
      }
    } catch (e) {
      req.body = {};
    }

    // Mock Vercel response object
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };

    // Route matching
    if (pathname === '/api/books' || pathname === '/api/books/') {
      req.query = query;
      await booksHandler(req, res);
    } else if (pathname.startsWith('/api/books/')) {
      const id = pathname.split('/').pop();
      req.query = { ...query, id };
      await bookIdHandler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}`);
});
