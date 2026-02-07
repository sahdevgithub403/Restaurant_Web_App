import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight } from 'lucide-react';

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await adminAPI.getStats();
                setStats(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Revenue', value: stats?.totalRevenue ? `₹${stats.totalRevenue}` : '₹0', icon: <DollarSign size={20} />, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Orders', value: stats?.totalOrders || '0', icon: <ShoppingBag size={20} />, color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Flavors', value: stats?.totalMenuItems || '0', icon: <TrendingUp size={20} />, color: 'bg-orange-50 text-orange-600' },
        { label: 'Customers', value: stats?.totalUsers || '0', icon: <Users size={20} />, color: 'bg-blue-50 text-blue-600' },
    ];

    if (loading) return <div className="space-y-8">
        <div className="h-40 bg-white rounded-3xl border border-stone-50"></div>
        <div className="grid grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-stone-50"></div>)}
        </div>
    </div>;

    return (
        <div className="space-y-12 animate-fade-in-up">
            <header>
                <h1 className="font-display text-4xl font-bold mb-2">Morning, <span className="text-stone-400">Operator</span></h1>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-stone-400">Here's what's happening today at Cream Island</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-stone-50 shadow-sm hover-lift group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl ${stat.color}`}>{stat.icon}</div>
                            <ArrowUpRight size={16} className="text-stone-200 group-hover:text-black transition-colors" />
                        </div>
                        <p className="font-body text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">{stat.label}</p>
                        <h2 className="font-display text-3xl font-bold tracking-tight">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-stone-50 shadow-sm">
                    <h3 className="font-display text-xl font-bold mb-6">Sales Trajectory</h3>
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[40, 60, 45, 90, 65, 80, 50, 70, 85, 95, 60, 75].map((h, i) => (
                            <div key={i} className="flex-1 bg-stone-50 rounded-full relative group">
                                <div 
                                    className="absolute bottom-0 w-full bg-black rounded-full"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-10 rounded-[2.5rem] text-white relative group overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-display text-2xl font-bold mb-8 italic">"Streamline Operations"</h3>
                        <p className="font-body text-xs text-stone-400 uppercase tracking-widest leading-relaxed mb-12">
                            Review your current inventory turnover and optimize for weekend peaks.
                        </p>
                        <button className="bg-white text-black px-6 py-4 font-body text-[10px] uppercase tracking-widest font-bold hover:bg-stone-200 transition-colors">
                            Run Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
