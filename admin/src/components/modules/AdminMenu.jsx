
import React, { useState } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import AdminTable from '../ui/AdminTable';

const AdminMenu = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Mock Data (Replace with API data)
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Belgian Chocolate', price: 149, category: 'Scoops', status: 'Available', image: '...' },
        { id: 2, name: 'Berry Cheesecake', price: 189, category: 'Sundaes', status: 'Available', image: '...' },
        { id: 3, name: 'Salted Caramel', price: 159, category: 'Scoops', status: 'Out of Stock', image: '...' },
    ]);

    const columns = [
        { 
            header: 'Item Name', 
            accessor: 'name',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-200 rounded-md overflow-hidden">
                        {/* <img src={row.image} className="w-full h-full object-cover" /> */}
                    </div>
                    <span className="font-display font-bold text-[#1a1a1a]">{row.name}</span>
                </div>
            )
        },
        { 
            header: 'Category', 
            accessor: 'category',
            render: (row) => (
                <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 uppercase tracking-wide">{row.category}</span>
            )
        },
        { 
            header: 'Price', 
            accessor: 'price',
            render: (row) => <span className="font-body text-sm font-semibold text-stone-600">₹{row.price}</span>
        },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${row.status === 'Available' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {row.status}
                </span>
            )
        },
    ];

  return (
    <div className="space-y-8 animate-fade-in-up">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="font-display text-3xl font-bold text-[#1a1a1a] mb-1">Menu Items</h2>
                <p className="font-body text-xs uppercase tracking-widest text-stone-500">Manage flavors and products</p>
            </div>
            <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:bg-[#E56E0C] transition-colors shadow-lg hover-lift w-fit"
            >
                <Plus size={16} /> Add New Item
            </button>
        </div>

        {/* Filters & Search */}
        <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search menu items..." 
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-[#1a1a1a] font-body text-sm shadow-sm transition-all focus:shadow-md"
                />
            </div>
            <button className="px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-500 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors shadow-sm">
                <Filter size={18} />
            </button>
        </div>

        {/* Table */}
        <AdminTable 
            columns={columns} 
            data={menuItems} 
            onEdit={(item) => console.log('Edit', item)}
            onDelete={(id) => console.log('Delete', id)}
        />

        {/* Add/Edit Slide-over Drawer (Mock) */}
        {isFormOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsFormOpen(false)}></div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
                    <div className="w-screen max-w-md transform transition-transform bg-[#FDFBF7] shadow-2xl flex flex-col animate-slide-in-right">
                        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
                            <h2 className="font-display text-xl font-bold text-[#1a1a1a]">Add New Item</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-stone-400 hover:text-[#1a1a1a] transition-colors"><X size={24}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block font-body text-[10px] uppercase tracking-widest text-stone-500 font-bold">Item Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-stone-300 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] text-sm font-medium placeholder:text-stone-300 transition-colors" placeholder="e.g. Belgian Chocolate" />
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="block font-body text-[10px] uppercase tracking-widest text-stone-500 font-bold">Category</label>
                                    <select className="w-full bg-transparent border-b border-stone-300 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] text-sm font-medium transition-colors">
                                        <option>Scoops</option>
                                        <option>Sundaes</option>
                                        <option>Shakes</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block font-body text-[10px] uppercase tracking-widest text-stone-500 font-bold">Price (₹)</label>
                                        <input type="number" className="w-full bg-transparent border-b border-stone-300 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] text-sm font-medium placeholder:text-stone-300" placeholder="0.00" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block font-body text-[10px] uppercase tracking-widest text-stone-500 font-bold">Stock Status</label>
                                        <select className="w-full bg-transparent border-b border-stone-300 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] text-sm font-medium">
                                            <option>Available</option>
                                            <option>Out of Stock</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block font-body text-[10px] uppercase tracking-widest text-stone-500 font-bold">Description</label>
                                    <textarea className="w-full bg-transparent border-b border-stone-300 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] text-sm font-medium placeholder:text-stone-300 resize-none h-24" placeholder="Item description..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-stone-200 bg-white flex gap-4">
                            <button onClick={() => setIsFormOpen(false)} className="flex-1 py-3 border border-stone-200 rounded-lg text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors">Cancel</button>
                            <button className="flex-1 py-3 bg-[#1a1a1a] rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-[#E56E0C] transition-colors shadow-lg">Save Item</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
};

export default AdminMenu;
