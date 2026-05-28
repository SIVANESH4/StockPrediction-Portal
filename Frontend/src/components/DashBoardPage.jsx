import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, TrendingDown, ArrowRight, Search, Bell, User,
  Layers, Brain, ShieldAlert, CheckCircle, Flame, DollarSign, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function DashboardPage() {

  const [ticker, setTicker] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/stock-prediction/predict/', {
        ticker: ticker
      })
      console.log(response.data);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
    setTicker('');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">

      {/* --- DASHBOARD TOP BAR --- */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex-shrink-0">
            <TrendingUp className="text-emerald-400 w-5 h-5" />
            StockPulse Terminal
          </div>

          {/* User Operations */}
          <div className="flex items-center gap-4 text-slate-400">
            <button className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[13px] font-semibold border border-rose-500/20" >Logout</button>
            <div className="h-4 w-px bg-slate-900" />
            <button className="flex items-center gap-2 hover:text-white transition-all">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium hidden md:inline">Hello</span>
            </button>
          </div>
        </div>
      </nav>



      <main className=" max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form className="max-w-md w-full relative" onSubmit={handleSubmit}>
          <div className="relative flex items-center gap-2">
            {/* Search Input Container */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                onChange={(e) => { setTicker(e.target.value) }}
                value={ticker}
                placeholder="Search ticker, model... (e.g., TSLA)"
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                required
              />
            </div>
            
            {/* Buttons aligned nicely alongside or right below */}
            {loading ? (
              <button
                type="submit"
                className="flex justify-center  items-center gap-2 py-2 px-4 border border-transparent rounded-xl shadow-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 focus:outline-none transition-all disabled:opacity-50"
                disabled
              >
                Please Wait..
              </button>
            ) : (
              <button
                type="submit"
                className="flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-xl shadow-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 focus:outline-none transition-all"
              >
                Predict <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </form>
      </main>

    </div>
  );
}