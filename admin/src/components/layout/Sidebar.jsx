
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Users, 
  Calendar,
  LogOut,
  Settings,
  Menu as MenuIcon,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Menu Items', icon: UtensilsCrossed, path: '/menu' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    // { name: 'Customers', icon: Users, path: '/customers' }, // Placeholder based on request
    // { name: 'Reservations', icon: Calendar, path: '/reservations' }, // Placeholder based on request
    // { name: 'Settings', icon: Settings, path: '/settings' }, // Placeholder based on request
  ];

  return (
    <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                onClick={onClose}
            ></div>
        )}

        <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#1a1a1a] text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col border-r border-white/5`}>
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h1 className="font-display text-2xl font-bold tracking-wide">CREAM <span className="text-[#E56E0C]">ADMIN</span></h1>
                <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>
            
            <nav className="flex-1 py-8 space-y-2 px-4 overflow-y-auto scrollbar-hide">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.path} 
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive ? 'bg-[#E56E0C] text-white shadow-lg translate-x-2' : 'text-stone-400 hover:bg-white/5 hover:text-white hover:translate-x-1'}`}
                    >
                        <item.icon size={20} className="transition-transform group-hover:scale-110" />
                        <span className="font-body text-sm font-medium tracking-wide uppercase">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-8 border-t border-white/10">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors w-full group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-body text-sm font-medium uppercase tracking-wide">Logout</span>
                </button>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
