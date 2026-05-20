import React, { use, useState } from 'react';
import { TrendingUp, Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const[err, setErr] = useState({})
    const[success, setSuccess] = useState(false)
    const[loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/accounts/', formData)
            console.log('Registered with:', response.data)
            console.log('Registered Successfully')
            setSuccess(true);
        }
        catch (error) {
            setErr(error.response.data)
            console.error('Registration failed:', error)
        }
        finally{
            setLoading(false)
        }
        setFormData({ username: '', email: '', password: '' })
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="sm:mx-auto w-full max-w-md relative z-10">
                <div className="flex justify-center items-center gap-2 font-bold text-2xl tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    <TrendingUp className="text-emerald-400 w-7 h-7" />
                    StockPulse.ai
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                        Sign in here
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto w-full max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-slate-900/40 border border-slate-900 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Full Name
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                />
                                <div className="text-red-500 text-xs mt-1">
                                    {err.username}
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Email Address
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                />
                                <div className="text-red-500 text-xs mt-1">
                                    {err.email}
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Password
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Min. 8 characters"
                                    minLength={8}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                />
                            </div>
                        </div>



                        {/* Submit Button */}
                        {
                            loading ?(<button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 focus:outline-none transition-all shadow-emerald-500/5"
                            disabled
                        >
                            Please Wait..
                        </button>):(<button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 focus:outline-none transition-all shadow-emerald-500/5"
                        >
                            Create Free Account <ArrowRight className="w-4 h-4" />
                        </button>)
                        }
                        {success && <p>Registered Successfully!</p>}
                    </form>


                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-800/50 pt-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
                    <span>256-bit institutional encryption active</span>
                </div>

            </div>
        </div>
    );
}