import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import { Plus, Edit2, Trash2, Search, X, Check } from 'lucide-react';

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Scoops',
        imageUrl: '',
        isVeg: true,
        available: true
    });

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const res = await menuAPI.getMenuItems();
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await menuAPI.updateMenuItem(editingItem.id, formData);
            } else {
                await menuAPI.createMenuItem(formData);
            }
            setShowModal(false);
            setEditingItem(null);
            fetchMenu();
        } catch (err) {
            console.error(err);
        }
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this flavor from existence?')) {
            try {
                await menuAPI.deleteMenuItem(id);
                fetchMenu();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="space-y-10 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="font-display text-4xl font-bold mb-2">Inventory <span className="text-stone-400">Control</span></h2>
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-stone-400">Manage flavors and availability</p>
                </div>
                <button 
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ name: '', description: '', price: '', category: 'Scoops', imageUrl: '', isVeg: true, available: true });
                        setShowModal(true);
                    }}
                    className="flex items-center gap-3 bg-black text-white px-8 py-4 font-body text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 transition-all shadow-xl"
                >
                    <Plus size={16} /> New Flavor
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-stone-50">
                            <th className="p-8 font-body text-[10px] uppercase tracking-widest text-stone-300">Flavor</th>
                            <th className="p-8 font-body text-[10px] uppercase tracking-widest text-stone-300">Category</th>
                            <th className="p-8 font-body text-[10px] uppercase tracking-widest text-stone-300">Pricing</th>
                            <th className="p-8 font-body text-[10px] uppercase tracking-widest text-stone-300">Status</th>
                            <th className="p-8 font-body text-[10px] uppercase tracking-widest text-stone-300 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-stone-50/50 transition-colors group">
                                <td className="p-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-stone-100 rounded-2xl overflow-hidden shrink-0">
                                            <img src={item.imageUrl || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100"} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-display font-medium text-[#1a1a1a] uppercase tracking-tight">{item.name}</p>
                                            <p className="font-body text-[10px] text-stone-400 truncate max-w-[200px]">{item.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8 font-body text-[10px] uppercase tracking-widest font-bold text-stone-400">{item.category}</td>
                                <td className="p-8 font-display font-bold text-lg">₹{item.price}</td>
                                <td className="p-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-bold ${item.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {item.available ? 'In Stock' : 'Sold Out'}
                                    </span>
                                </td>
                                <td className="p-8 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(item)} className="p-3 bg-stone-100 rounded-full hover:bg-black hover:text-white transition-all"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-stone-100 rounded-full hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div className="p-20 text-center text-stone-300 animate-pulse">Scanning Inventory...</div>}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-white w-full max-w-xl p-10 rounded-[2.5rem] shadow-2xl animate-scale-in">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-display text-3xl font-bold">{editingItem ? 'Edit' : 'New'} <span className="text-stone-300">Flavor</span></h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:rotate-90 transition-transform"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Flavor Name</label>
                                    <input 
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full p-4 bg-stone-50 border border-stone-100 focus:border-black outline-none transition-all font-body text-sm rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full p-4 bg-stone-50 border border-stone-100 focus:border-black outline-none transition-all font-body text-sm appearance-none rounded-xl"
                                    >
                                        <option>Scoops</option>
                                        <option>Sundaes</option>
                                        <option>Shakes</option>
                                        <option>Waffles</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Visual URL (Unsplash)</label>
                                <input 
                                    type="text" value={formData.imageUrl}
                                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                    className="w-full p-4 bg-stone-50 border border-stone-100 focus:border-black outline-none transition-all font-body text-sm rounded-xl"
                                    placeholder="https://"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Price (₹)</label>
                                    <input 
                                        type="number" required value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className="w-full p-4 bg-stone-50 border border-stone-100 focus:border-black outline-none transition-all font-display font-bold text-lg rounded-xl"
                                    />
                                </div>
                                <div className="flex items-center gap-8 pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} className="sr-only" />
                                        <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isVeg ? 'bg-emerald-500' : 'bg-stone-200'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isVeg ? 'left-5' : 'left-1'}`}></div>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-black">Vegetarian</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} className="sr-only" />
                                        <div className={`w-10 h-6 rounded-full transition-all relative ${formData.available ? 'bg-indigo-500' : 'bg-stone-200'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.available ? 'left-5' : 'left-1'}`}></div>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-black">Available</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-black text-white py-5 font-body text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-stone-800 transition-all shadow-xl active:scale-95 rounded-xl">
                                {editingItem ? 'Save Changes' : 'Launch Flavor'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMenu;
