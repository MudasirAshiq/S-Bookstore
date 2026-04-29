# SapienBooks - Production-Ready Bookstore

A modern, one-page bookstore application with an admin panel, built with React, Vite, Tailwind CSS, and Vercel Serverless Functions.

## 🚀 Features
- **Public Site**: Fully responsive one-page design with Hero, Books Grid, About, and Contact sections.
- **Admin Panel**: Secure dashboard with CRUD operations for managing the book collection.
- **Backend**: Serverless API routes for efficient data management.
- **Database**: PostgreSQL (Neon) integration.
- **UI/UX**: Premium aesthetics with Framer Motion animations and Tailwind CSS.

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Vercel Serverless Functions (`/api`)
- **Database**: Neon (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🗄 Database Setup
Run the following SQL in your Neon console to create the necessary table:

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ⚙️ Environment Variables
Create a `.env` file or set in Vercel:
- `DATABASE_URL`: Your Neon PostgreSQL connection string.

## 📦 Local Development
1. Install root dependencies: `npm install`
2. Install client dependencies: `cd client && npm install`
3. Start development server: `npm run dev` (runs the client)

## 🚢 Deployment
Deploy directly to Vercel. Ensure you set the `DATABASE_URL` environment variable.
The project is structured to work with Vercel's zero-config, with the root `package.json` handling the client build.
