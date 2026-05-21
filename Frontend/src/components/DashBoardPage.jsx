import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, TrendingDown, ArrowUpRight, Search, Bell, User,
  Layers, Brain, ShieldAlert, CheckCircle, Flame, DollarSign, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock performance dataset for the main forecasting engine
const chartData = [
  { time: '10:00', Actual: 172.5, Predicted: 172.0 },
  { time: '11:00', Actual: 173.2, Predicted: 173.5 },
  { time: '12:00', Actual: 171.8, Predicted: 172.1 },
  { time: '13:00', Actual: 174.0, Predicted: 173.8 },
  { time: '14:00', Actual: 175.6, Predicted: 175.0 },
  { time: '15:00', Actual: null, Predicted: 177.2 },
  { time: '16:00', Actual: null, Predicted: 179.5 },
];


export default function DashboardPage() {
  const [activeTicker, setActiveTicker] = useState('AAPL');
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
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

          {/* Search Box */}
          <div className="max-w-md w-full relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search ticker, model, or sentiment profile (e.g., TSLA)..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* User Operations */}
          <div className="flex items-center gap-4 text-slate-400">
            <button className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[13px] font-semibold border border-rose-500/20" onClick={handleLogOut}>Logout</button>
            <div className="h-4 w-px bg-slate-900" />
            <button className="flex items-center gap-2 hover:text-white transition-all">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium hidden md:inline">Quant_Trader</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- LIVE TICKER SCROLLER STRIP --- */}
      <div className="bg-slate-900/30 border-b border-slate-900/80 py-2.5 px-4 overflow-x-auto whitespace-nowrap scrollbar-none text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-slate-900 pr-6">
            <span className="font-bold text-white">BTC/USD</span>
            <span className="text-slate-300">$67,420</span>
            <span className="text-emerald-400 flex items-center font-medium"><ArrowUpRight className="w-3 h-3" /> +3.4%</span>
          </div>
          <div className="flex items-center gap-2 border-r border-slate-900 pr-6">
            <span className="font-bold text-white">AAPL</span>
            <span className="text-slate-300">$175.60</span>
            <span className="text-emerald-400 flex items-center font-medium"><ArrowUpRight className="w-3 h-3" /> +1.2%</span>
          </div>
          <div className="flex items-center gap-2 border-r border-slate-900 pr-6">
            <span className="font-bold text-white">NVDA</span>
            <span className="text-slate-300">$894.12</span>
            <span className="text-rose-500 flex items-center font-medium"><TrendingDown className="w-3 h-3" /> -0.8%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SPY</span>
            <span className="text-slate-300">$512.30</span>
            <span className="text-emerald-400 flex items-center font-medium"><ArrowUpRight className="w-3 h-3" /> +0.5%</span>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT + MIDDLE COLUMNS (Chart and Core Prediction Metrics) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Main Analytics Card */}
          <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 backdrop-blur-sm relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  <span>AI Predictive Forecast</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] uppercase border border-emerald-500/20">Live Neural Run</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{activeTicker} Neural Target Profile</h2>
              </div>
              <div className="flex gap-2 bg-slate-950 p-1 border border-slate-900 rounded-xl text-xs font-medium">
                {['AAPL', 'NVDA', 'TSLA'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTicker(t)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeTicker === t ? 'bg-slate-900 text-emerald-400 border border-slate-800' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Prediction Area/Line Chart Component */}
            <div className="h-72 w-full mt-4 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" tickLine={false} />
                  <YAxis stroke="#475569" tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#0f172a', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="Actual" stroke="#34d399" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActual)" name="Actual Price" dot={{ fill: '#34d399' }} />
                  <Area type="monotone" dataKey="Predicted" stroke="#22d3ee" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPredicted)" name="AI Projection" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-end gap-6 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Realized Market Path</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 border-t-2 border-dashed border-cyan-400 inline-block" /> AI 2-Hour Horizon Forecast</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Directional Bias</p>
              <div className="text-lg font-bold text-emerald-400 flex items-center gap-1">Strong Bull</div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Confidence Interval</p>
              <div className="text-lg font-bold text-white">92.4%</div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Model Backtest Vol</p>
              <div className="text-lg font-bold text-white">0.42%</div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Signal Status</p>
              <div className="text-lg font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Optimal
              </div>
            </div>
          </div>

          {/* Signals Engine Deep Log */}
          <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Latest Computational Signals</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500">
                    <th className="pb-3 font-semibold">Asset</th>
                    <th className="pb-3 font-semibold">Model Run Type</th>
                    <th className="pb-3 font-semibold">Target Shift</th>
                    <th className="pb-3 font-semibold text-right">Action Vector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/50 text-slate-300">
                  <tr>
                    <td className="py-3 font-bold text-white">MSFT</td>
                    <td className="py-3 text-slate-400">Recurrent LSTM Net</td>
                    <td className="py-3 text-emerald-400">+$4.20 (7-day)</td>
                    <td className="py-3 text-right"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">BUY</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">TSLA</td>
                    <td className="py-3 text-slate-400">Transformer Attention</td>
                    <td className="py-3 text-rose-400">-$12.10 (24h)</td>
                    <td className="py-3 text-right"><span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-semibold border border-rose-500/20">SHORT</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">AMZN</td>
                    <td className="py-3 text-slate-400">Markov Matrix Decay</td>
                    <td className="py-3 text-slate-400">Neutral Float</td>
                    <td className="py-3 text-right"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold">HOLD</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Watchlists + AI Network Configurations) */}
        <div className="space-y-6">

          {/* Engine Parameters Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-cyan-500/5 blur-xl rounded-full" />

            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              Active AI Hyperparameters
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-900">
                <span className="text-slate-400">Primary Core Architecture</span>
                <span className="font-mono text-slate-200 bg-slate-950 px-2 py-0.5 border border-slate-900 rounded">LSTM-v4.1</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-900">
                <span className="text-slate-400">Total Datapoints Tracked/Min</span>
                <span className="font-mono text-slate-200">1.42M tokens</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-900">
                <span className="text-slate-400">Macro Sentiment Weights</span>
                <span className="text-emerald-400 font-semibold">High Multi-Layer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">System Computing Friction</span>
                <span className="text-slate-200">0.004 ms execution</span>
              </div>
            </div>
          </div>

          {/* Machine Learning Tracked Portfolio Heatlist */}
          <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              High Probability Scans
            </h3>

            <div className="space-y-3">
              {/* Asset 1 */}
              <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">AMD</p>
                  <p className="text-[10px] text-slate-500">Pattern: Cup & Handle breakout</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">+6.8% Exp</p>
                  <p className="text-[10px] text-slate-500">91% accuracy threshold</p>
                </div>
              </div>

              {/* Asset 2 */}
              <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">META</p>
                  <p className="text-[10px] text-slate-500">Pattern: Overbought mean decay</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-rose-400">-3.1% Exp</p>
                  <p className="text-[10px] text-slate-500">84% accuracy threshold</p>
                </div>
              </div>

              {/* Asset 3 */}
              <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">GOOGL</p>
                  <p className="text-[10px] text-slate-500">Pattern: Low volatility squeeze</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-cyan-400">+1.5% Exp</p>
                  <p className="text-[10px] text-slate-500">79% accuracy threshold</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}