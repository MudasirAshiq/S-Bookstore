/**
 * API Service Layer
 * 
 * Centralized HTTP client for all frontend-to-backend communication.
 * In development, Vite proxies /api to the backend (see vite.config.js).
 * In production, VITE_API_URL points to the deployed backend URL.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Generic request wrapper with error handling.
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

// ──────────────────────────────────────────────────────────────────────────────
// Books API
// ──────────────────────────────────────────────────────────────────────────────

export const fetchBooks = () => request('/api/books');

export const fetchBookById = (id) => request(`/api/books/${id}`);

export const createBook = (bookData) =>
  request('/api/books', {
    method: 'POST',
    body: JSON.stringify(bookData),
  });

export const updateBook = (id, bookData) =>
  request(`/api/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookData),
  });

export const deleteBook = (id) =>
  request(`/api/books/${id}`, {
    method: 'DELETE',
  });

// ──────────────────────────────────────────────────────────────────────────────
// Auth API
// ──────────────────────────────────────────────────────────────────────────────

export const loginAdmin = (email, password) =>
  request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const fetchSettings = () => request('/api/auth/settings');

export const updateSettings = (settingsData) =>
  request('/api/auth/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  });
