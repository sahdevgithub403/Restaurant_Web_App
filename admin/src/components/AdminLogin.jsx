import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(credentials.username, credentials.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#FDFBF7]">
            {/* Visual Side */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
                        alt="Fine Dining" 
                        className="w-full h-full object-cover opacity-60 animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#1a1a1a]/80"></div>
                </div>
                <div className="relative z-10 p-24 flex flex-col justify-between h-full">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                        <span className="font-display font-bold text-xl">CI</span>
                    </div>
                    <div>
                        <h1 className="font-display text-7xl font-bold text-white mb-6 leading-tight">
                            Culinary <br/><span className="text-[#E56E0C] italic">Excellence</span>
                        </h1>
                        <p className="font-body text-stone-400 max-w-md text-sm leading-relaxed">
                            Manage your restaurant's operations, menu curation, and orders with precision and elegance.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-20 h-1 bg-[#E56E0C] rounded-full"></div>
                        <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="mb-12">
                        <span className="font-body text-[10px] font-bold text-[#E56E0C] uppercase tracking-[0.4em] mb-4 block">Welcome Back</span>
                        <h2 className="font-display text-4xl font-bold text-[#1a1a1a] mb-2">Admin Portal</h2>
                        <p className="font-body text-sm text-stone-500">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-2xl flex items-center gap-4 border border-red-100 animate-pulse">
                                <ShieldCheck size={16} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2 block group-focus-within:text-[#E56E0C] transition-colors">Username</label>
                                <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#1a1a1a] transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-transparent border-b border-stone-200 py-4 pl-10 pr-4 font-body text-sm font-bold text-[#1a1a1a] placeholder:text-stone-300 focus:outline-none focus:border-[#E56E0C] transition-all"
                                        placeholder="admin@creamisland.com"
                                        value={credentials.username}
                                        onChange={e => setCredentials({...credentials, username: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2 block group-focus-within:text-[#E56E0C] transition-colors">Password</label>
                                <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#1a1a1a] transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input 
                                        type="password" 
                                        required
                                        className="w-full bg-transparent border-b border-stone-200 py-4 pl-10 pr-4 font-body text-sm font-bold text-[#1a1a1a] placeholder:text-stone-300 focus:outline-none focus:border-[#E56E0C] transition-all"
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={e => setCredentials({...credentials, password: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#1a1a1a] text-white py-6 rounded-full font-body text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E56E0C] transition-all flex items-center justify-center gap-4 shadow-xl hover-lift active:scale-95 disabled:opacity-50 group mt-12"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                    
                    <div className="mt-12 text-center">
                        <a href="#" className="font-body text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-[#E56E0C] transition-colors border-b border-transparent hover:border-[#E56E0C] pb-1">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

