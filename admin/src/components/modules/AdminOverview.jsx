
import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import DashboardCard from '../ui/DashboardCard';

const AdminOverview = () => {
    // Mock Data
    const stats = [
        { title: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, trend: 'up', trendValue: '12.5%' },
        { title: 'Total Orders', value: '452', icon: ShoppingBag, trend: 'up', trendValue: '5.2%' },
        { title: 'New Customers', value: '89', icon: Users, trend: 'up', trendValue: '8.1%' },
        { title: 'Avg. Value', value: '₹275', icon: TrendingUp, trend: 'down', trendValue: '2.3%' },
    ];

  return (
    <div className="space-y-8 animate-fade-in-up">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="font-display text-3xl font-bold text-[#1a1a1a] mb-1">Dashboard</h2>
                <p className="font-body text-xs uppercase tracking-widest text-stone-500">Overview of your store performance</p>
            </div>
            <div className="flex bg-white rounded-full p-1 border border-stone-100 shadow-sm">
                 <button className="px-4 py-1.5 rounded-full bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider shadow-md">Today</button>
                 <button className="px-4 py-1.5 rounded-full text-stone-500 hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-colors">Week</button>
                 <button className="px-4 py-1.5 rounded-full text-stone-500 hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-colors">Month</button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
                    <DashboardCard {...stat} />
                </div>
            ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-stone-100 hidden md:block animate-fade-in-up delay-200">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-display text-xl font-bold">Revenue Analytics</h3>
                    <button className="text-xs font-bold text-[#E56E0C] uppercase tracking-widest hover:underline">View Report</button>
                </div>
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                        <div key={i} className="group relative w-full h-full flex items-end">
                            <div className="w-full bg-[#1a1a1a] opacity-10 group-hover:opacity-100 group-hover:bg-[#E56E0C] transition-all duration-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                             {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                ₹{h * 100}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-body text-stone-400 uppercase tracking-widest">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 animate-fade-in-up delay-300">
                <h3 className="font-display text-xl font-bold mb-6">Recent Activity</h3>
                 <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 pb-4 border-b border-stone-50 last:border-0 last:pb-0 group cursor-pointer">
                            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-xs font-bold text-stone-600 group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">JD</div>
                            <div className="flex-1">
                                <h4 className="font-body text-sm font-bold group-hover:text-[#E56E0C] transition-colors">John Doe</h4>
                                <p className="text-xs text-stone-500">Placed a new order</p>
                            </div>
                            <span className="text-[10px] font-bold text-stone-400">2m ago</span>
                        </div>
                    ))}
                 </div>
            </div>
        </div>

    </div>
  );
};

export default AdminOverview;
