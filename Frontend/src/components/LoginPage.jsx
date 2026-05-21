import React, { useState } from 'react';
import { TrendingUp, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const [err, setErr] = useState(false)
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', formData);
      console.log('Login successful:', response.data);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
    catch (error) {
      console.error('Login failed:', error);
      setErr(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto w-full max-w-md relative z-10">
        <div className="flex justify-center items-center gap-2 font-bold text-2xl tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          <TrendingUp className="text-emerald-400 w-7 h-7" />
          StockPulse.ai
        </div>
        <h2 className="mt-6 text-center text-4xl font-bold text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign up
          </a>
        </p>      </div>
      <div className="mt-8 sm:mx-auto w-full max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/40 border border-slate-900 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Username
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>

              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {
              err && (
                <p className="text-red-500 text-sm">
                  Invalid username or password. Please try again.
                </p>
              )
            }
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 focus:outline-none transition-all shadow-emerald-500/5"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            {isLoggedIn && (
              <p>
                Login successful! Redirecting...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}