import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { sql } from '../lib/db';
import toast from 'react-hot-toast';

const AdminLogin = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const users = await sql`
        SELECT * FROM users 
        WHERE email = ${email} AND password = ${password}
      `;

      if (users.length === 0) {
        throw new Error('Invalid email or password');
      }
      
      toast.success('Login successful!');
      onLogin();
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Bookstore
        </button>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
            <p className="text-gray-500 mt-2">Please sign in to manage your collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400 italic">Sign in with your admin credentials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
