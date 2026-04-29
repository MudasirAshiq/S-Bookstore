# SapienBooks - Premium Bookstore with Neon DB

A modern, one-page bookstore application with an admin panel, built with React, Vite, Tailwind CSS, and Neon Serverless PostgreSQL.

## 🚀 Features
- **Public Site**: Fully responsive design with Hero, Books Grid, About, and Contact sections.
- **Admin Panel**: Secure dashboard with CRUD operations (Add, Edit, Delete books).
- **Database**: Integrated with Neon Serverless PostgreSQL for real-time updates.
- **UI/UX**: Premium aesthetics with Framer Motion animations and Tailwind CSS v4.

## 🛠 Tech Stack
- **Frontend**: React 19 (Vite)
- **Database**: Neon Serverless (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## ⚙️ Environment Variables
Create a `.env` file in the root directory:
```env
VITE_NEON_DATABASE_URL="your_neon_connection_string"
```

## 📦 Local Development
1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Database Auto-Setup**: The app will automatically create the `books` and `users` tables in your Neon project on the first load.

## 🔐 Admin Access
By default, the system creates an admin account:
- **Email**: `admin@sapien.com`
- **Password**: `admin123`
*(You can change the password from the Admin Dashboard after logging in)*

## 🚢 Deployment
Deploy to Vercel or Netlify. Ensure you set the `VITE_NEON_DATABASE_URL` environment variable in your deployment settings.
