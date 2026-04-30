// This module has been deprecated.
// All database access now goes through the backend API.
// See src/lib/api.js for the new API client.
//
// The backend server (backend/server.js) handles all database connections securely.
throw new Error(
  'Direct database access from the frontend has been removed for security. ' +
  'Use the API service from src/lib/api.js instead.'
);
