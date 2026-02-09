
import React, { useState } from 'react';
import { Menu as MenuIcon, Bell, Search, User } from 'lucide-react';

const TopHeader = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-stone-100 py-4 px-6 md:px-8 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-stone-100 rounded-full text-[#1a1a1a] transition-colors"
        >
            <MenuIcon size={24} />
        </button>
        {/* Breadcrumbs or Page Title could go here */}
        <div className="hidden md:block">
            <span className="font-display text-sm font-bold text-stone-400 uppercase tracking-widest">Admin Portal</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex relative group">
            <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-stone-100 rounded-full border-none focus:ring-1 focus:ring-[#1a1a1a] w-48 transition-all focus:w-64 font-body text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
        </div>

        <button className="relative p-2 hover:bg-stone-100 rounded-full text-[#1a1a1a] transition-colors hover-lift">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E56E0C] rounded-full border-2 border-[#FDFBF7]"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
            <div className="hidden md:block text-right">
                <p className="font-display text-sm font-bold text-[#1a1a1a]">Admin User</p>
                <p className="font-body text-[10px] uppercase tracking-wider text-stone-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-md hover-lift cursor-pointer">
                <span className="font-display font-bold">A</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
