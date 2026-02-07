import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center p-6 bg-cream-bg">
            <div className="w-full max-w-md animate-scale-in">
                <div className="text-center mb-12">
                    <h1 className="font-display text-5xl font-bold mb-4">ADMIN <span className="text-stone-400">CORE</span></h1>
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-stone-400">Cream Island Management</p>
                </div>

                <div className="bg-white p-10 shadow-2xl border-t-8 border-black">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-500 text-xs font-bold border-l-4 border-red-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2 group">
                            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold group-focus-within:text-black transition-colors">Admin Username</label>
                            <div className="flex items-center gap-3 border-b border-stone-200 py-2 group-focus-within:border-black transition-colors">
                                <User size={18} className="text-stone-300" />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-transparent outline-none font-body text-sm"
                                    placeholder="admin_id"
                                    value={credentials.username}
                                    onChange={e => setCredentials({...credentials, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold group-focus-within:text-black transition-colors">Secure Key</label>
                            <div className="flex items-center gap-3 border-b border-stone-200 py-2 group-focus-within:border-black transition-colors">
                                <Lock size={18} className="text-stone-300" />
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-transparent outline-none font-body text-sm"
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 font-body text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-stone-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Access Console'}
                            <ArrowRight size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
