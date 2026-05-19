import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './index.css'
import { ArrowUpRight, Shield, Zap, BarChart3, TrendingUp, Cpu, CheckCircle2 } from 'lucide-react';

// Mock data for the mini preview chart
const mockChartData = [
  { day: 'Mon', price: 145 },
  { day: 'Tue', price: 148 },
  { day: 'Wed', price: 147 },
  { day: 'Thu', price: 153 },
  { day: 'Fri', price: 159 },
  { day: 'Sat', price: 158 },
  { day: 'Sun', price: 164 },
];

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* --- NAV BAR --- */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            <TrendingUp className="text-emerald-400 w-6 h-6" />
            StockPulse.ai
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#preview" className="hover:text-emerald-400 transition-colors">AI Engine</a>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/10">
            Login
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden py-20 lg:py-32">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium dynamic-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.0 Predictive Engine Active
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Predict market trends with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI precision.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              Stop guessing. Leverage advanced machine learning algorithms trained on decades of market behavior to forecast stock movements before they happen.
            </p>
            
            {/* CTA Form */}
            
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-emerald-500/10">
                Start Predicting <ArrowUpRight className="w-4 h-4" />
              </button>
          </div>

          {/* Right Visual/Chart Column */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm shadow-2xl relative">
            <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded border border-emerald-500/20">
              + 11.4% Signal
            </div>
            <div className="space-y-1 mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Predicted Asset Forecast</p>
              <h3 className="text-2xl font-bold text-white">$NVDA Prediction</h3>
            </div>
            
            {/* Micro Recharts Component */}
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', strokeWidth: 2 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-900 text-center">
              <div>
                <p className="text-xs text-slate-500">Confidence</p>
                <p className="text-base font-bold text-slate-200">94.2%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Timeframe</p>
                <p className="text-base font-bold text-slate-200">7 Days</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Sentiment</p>
                <p className="text-base font-bold text-emerald-400">Strong Bull</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-20 bg-slate-900/20 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">Engineered for smarter trading</h2>
            <p className="text-slate-400 text-base">
              We process millions of macro data points, sentiment metrics, and historical patterns simultaneously.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Neural Network Models</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Utilizes customized deep learning architectures optimized specifically for highly volatile financial time-series data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Sentiment</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Scans news, social layers, and financial filings instantly to quantify human emotion before it hits the charts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Risk Mitigation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Not just targets—our engine projects dynamic stop-loss levels and risk-reward ratios for every setup.
              </p>
            </div>
          </div>
        </div>
      </section>    

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-center text-xs text-slate-600">
        <p>© 2026 StockPulse.ai. For informational purposes only. Trading involves high risk.</p>
      </footer>

    </div>
  );
}