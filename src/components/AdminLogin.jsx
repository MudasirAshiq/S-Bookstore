import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginAdmin } from '../lib/api';
import toast from 'react-hot-toast';
import sapienLogo from '../assets/sapein logo.png';

const AdminLogin = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginAdmin(email, password);
      toast.success('Access Granted. Welcome back.');
      onLogin();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-primary-600 mb-10 transition-all font-black text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
        
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-primary-500/5 border border-slate-100">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 animate-pulse" />
              <div className="relative bg-white w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
                <img src={sapienLogo} alt="Sapien Books" className="h-16 w-auto object-contain" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Admin <span className="text-primary-600">Login</span></h2>
            <p className="text-slate-400 font-medium mt-3">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                  placeholder="admin@sapien.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                  placeholder="••••••••"
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full btn-primary py-5 rounded-[1.5rem] text-lg flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <span>Sign In</span>
                  <Sparkles size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">Secure API Connection Active</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
