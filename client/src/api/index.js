const API_BASE = '/api';

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const fetchBook = async (id) => {
  const response = await fetch(`${API_BASE}/books/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
};

export const createBook = async (bookData) => {
  const response = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error('Failed to create book');
  return response.json();
};

export const updateBook = async (id, bookData) => {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
  return response.json();
};
