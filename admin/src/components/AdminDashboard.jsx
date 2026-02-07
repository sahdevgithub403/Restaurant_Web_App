import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  ShoppingBag, 
  PlusCircle, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Menu as MenuIcon,
  X,
  Truck
} from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', label: 'Journal', icon: <LayoutDashboard size={20} /> },
        { id: 'orders', label: 'Deliveries', icon: <Truck size={20} /> },
        { id: 'menu', label: 'Inventory', icon: <ShoppingBag size={20} /> },
        { id: 'stats', label: 'Insights', icon: <BarChart3 size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-cream-bg">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-stone-100 transition-all duration-500 z-50 fixed md:static inset-y-0 left-0 ${sidebarOpen ? 'w-72' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'} overflow-hidden`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-bold text-xl">C</div>
                        {sidebarOpen && <h2 className="font-display font-bold text-xl tracking-tight">ISLAND <span className="text-stone-300">HQ</span></h2>}
                    </div>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-black text-white shadow-lg' 
                                    : 'text-stone-400 hover:bg-stone-50 hover:text-black'
                                }`}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                {sidebarOpen && <span className="font-body text-xs uppercase tracking-widest font-bold">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    <button 
                        onClick={logout}
                        className="flex items-center gap-4 p-4 text-stone-400 hover:text-red-500 transition-colors mt-auto"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="font-body text-xs uppercase tracking-widest font-bold">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <MenuIcon size={20} />
                    </button>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="font-display font-bold text-sm tracking-tight">{user?.fullName || 'Administrator'}</p>
                            <p className="font-body text-[8px] uppercase tracking-widest text-stone-400">System Operator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs">
                            {user?.fullName?.charAt(0) || 'A'}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full">
                    {activeTab === 'overview' && <AdminOverview />}
                    {activeTab === 'menu' && <AdminMenu />}
                    {activeTab === 'orders' && <AdminOrders />}
                    {activeTab === 'stats' && (
                        <div className="animate-fade-in-up p-12 text-center bg-white border border-stone-100 rounded-3xl shadow-sm">
                            <BarChart3 size={48} className="mx-auto mb-6 text-stone-200" />
                            <h2 className="font-display text-2xl font-bold mb-2">Detailed Insights</h2>
                            <p className="font-body text-xs text-stone-400 uppercase tracking-widest">Coming soon to your dashboard</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
