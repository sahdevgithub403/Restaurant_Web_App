
import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, trend, trendValue, color = "bg-white" }) => {
  return (
    <div className={`${color} p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden`}>
       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
          <Icon size={80} />
       </div>
       
       <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-stone-50 rounded-lg text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                  <Icon size={24} />
              </div>
              {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {trend === 'up' ? '+' : ''}{trendValue}
                </span>
              )}
          </div>
          <h3 className="font-body text-xs uppercase tracking-widest text-stone-500 mb-1">{title}</h3>
          <p className="font-display text-3xl font-bold text-[#1a1a1a]">{value}</p>
       </div>
    </div>
  );
};

export default DashboardCard;
