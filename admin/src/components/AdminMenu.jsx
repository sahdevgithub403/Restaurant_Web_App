import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import { Plus, Edit2, Trash2, Search, X, Check, Utensils, ArrowRight } from 'lucide-react';

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Mains',
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
        if (window.confirm('Are you sure you want to remove this dish from the menu?')) {
            try {
                await menuAPI.deleteMenuItem(id);
                fetchMenu();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="space-y-12 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-3 tracking-tighter text-[#1a1a1a]">MENU <span className="text-[#E56E0C]">MANAGER</span></h2>
                    <p className="font-body text-[11px] text-stone-400 font-black uppercase tracking-[0.3em] ml-1">Curate and refine your seasonal offerings</p>
                </div>
                <button 
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ name: '', description: '', price: '', category: 'Mains', imageUrl: '', isVeg: true, available: true });
                        setShowModal(true);
                    }}
                    className="flex items-center gap-4 bg-[#E56E0C] text-white px-10 py-6 rounded-[32px] font-display text-sm font-bold hover:bg-[#1a1a1a] transition-all shadow-xl shadow-orange-500/20 active:scale-95 uppercase tracking-widest group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add New Dish
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item, i) => (
                    <div 
                        key={item.id} 
                        className="group bg-white rounded-[40px] border border-stone-50 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all overflow-hidden relative flex flex-col animate-fade-in-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        {/* Image Section */}
                        <div className="h-64 overflow-hidden relative bg-stone-100">
                             <img 
                                src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                             
                             {/* Floating Status Badge */}
                             <div className="absolute top-4 left-4">
                                <div className={`px-4 py-2 rounded-full backdrop-blur-md border ${item.available ? 'bg-white/90 text-green-700 border-green-200' : 'bg-red-50/90 text-red-700 border-red-200'} shadow-sm flex items-center gap-2`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                    <span className="text-[9px] uppercase font-black tracking-widest">{item.available ? 'Live' : 'Hidden'}</span>
                                </div>
                             </div>

                             {/* Floating Price */}
                             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full font-display font-bold text-lg shadow-sm text-[#1a1a1a]">
                                ₹{item.price}
                             </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-[#E56E0C] bg-[#E56E0C]/5 px-3 py-1.5 rounded-xl border border-[#E56E0C]/10">
                                    {item.category}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></span>
                                </div>
                            </div>
                            
                            <h3 className="font-display text-2xl font-bold text-[#1a1a1a] mb-2 leading-tight group-hover:text-[#E56E0C] transition-colors">{item.name}</h3>
                            <p className="font-body text-xs text-stone-400 leading-relaxed line-clamp-2 mb-6 flex-1">{item.description}</p>
                            
                            {/* Actions Footer */}
                            <div className="flex gap-3 mt-auto pt-6 border-t border-stone-50">
                                <button 
                                    onClick={() => openEdit(item)} 
                                    className="flex-1 py-3 rounded-2xl bg-[#FCF8F1] text-stone-500 hover:bg-[#1a1a1a] hover:text-white transition-all font-display text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 group/btn"
                                >
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(item.id)} 
                                    className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm hover:shadow-red-500/20"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                {loading && (
                    <div className="p-40 flex flex-col items-center justify-center gap-6 text-stone-400">
                        <div className="w-14 h-14 border-4 border-stone-100 border-t-[#E56E0C] rounded-full animate-spin"></div>
                        <span className="font-body text-[10px] uppercase tracking-[0.4em] font-black">Syncing Kitchen...</span>
                    </div>
                )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-xl" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl p-12 md:p-16 rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] animate-scale-in border border-stone-50 overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[#E56E0C] pointer-events-none">
                            <Plus size={240} />
                        </div>
                        
                        <div className="flex justify-between items-start mb-14 relative z-10">
                            <div>
                                <h3 className="font-display text-5xl font-bold text-[#1a1a1a] tracking-tight mb-2">{editingItem ? 'Edit' : 'Add'} <span className="text-[#E56E0C]">Dish</span></h3>
                                <p className="font-body text-[10px] text-stone-400 font-black uppercase tracking-[0.3em]">Menu Configuration</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-14 h-14 flex items-center justify-center bg-[#FCF8F1] hover:bg-red-50 rounded-[24px] transition-colors group"><X size={24} className="group-hover:text-red-500 transition-colors" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] ml-2">Dish Name</label>
                                    <input 
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full p-6 bg-[#FCF8F1] border-none rounded-3xl focus:ring-4 focus:ring-[#E56E0C]/10 outline-none transition-all font-body text-sm font-bold text-[#1a1a1a] placeholder:text-stone-300"
                                        placeholder="e.g. Saffron Risotto"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] ml-2">Category</label>
                                    <div className="relative group">
                                        <select 
                                            value={formData.category}
                                            onChange={e => setFormData({...formData, category: e.target.value})}
                                            className="w-full p-6 bg-[#FCF8F1] border-none rounded-3xl focus:ring-4 focus:ring-[#E56E0C]/10 outline-none transition-all font-body text-sm font-bold text-[#1a1a1a] appearance-none cursor-pointer"
                                        >
                                            <option>Starters</option>
                                            <option>Mains</option>
                                            <option>Desserts</option>
                                            <option>Beverages</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 group-hover:text-[#E56E0C] transition-colors">
                                            <Plus size={20} className="rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] ml-2">Image URL</label>
                                <input 
                                    type="text" value={formData.imageUrl}
                                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                    className="w-full p-6 bg-[#FCF8F1] border-none rounded-3xl focus:ring-4 focus:ring-[#E56E0C]/10 outline-none transition-all font-body text-sm font-bold text-[#1a1a1a] placeholder:text-stone-300"
                                    placeholder="Paste link to dish photo..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] ml-2">Description</label>
                                <textarea 
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full p-6 bg-[#FCF8F1] border-none rounded-3xl focus:ring-4 focus:ring-[#E56E0C]/10 outline-none transition-all font-body text-sm font-bold text-[#1a1a1a] placeholder:text-stone-300 resize-none leading-relaxed"
                                    placeholder="Describe the ingredients and preparation..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] ml-2">Price (₹)</label>
                                    <input 
                                        type="number" required value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className="w-full p-6 bg-[#FCF8F1] border-none rounded-3xl focus:ring-4 focus:ring-[#E56E0C]/10 outline-none transition-all font-display font-bold text-3xl text-[#1a1a1a]"
                                    />
                                </div>
                                <div className="flex gap-4 bg-[#FCF8F1] p-4 rounded-3xl">
                                    <label className="flex-1 flex items-center justify-center gap-3 cursor-pointer group bg-white p-3 rounded-2xl shadow-sm border border-transparent hover:border-[#E56E0C]/20 transition-all">
                                        <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} className="sr-only" />
                                        <div className={`w-3 h-3 rounded-full transition-all ${formData.isVeg ? 'bg-green-500' : 'bg-stone-200'}`} />
                                        <span className={`text-[10px] uppercase font-black tracking-widest transition-colors ${formData.isVeg ? 'text-[#1a1a1a]' : 'text-stone-300'}`}>VEG</span>
                                    </label>
                                    <label className="flex-1 flex items-center justify-center gap-3 cursor-pointer group bg-white p-3 rounded-2xl shadow-sm border border-transparent hover:border-[#E56E0C]/20 transition-all">
                                        <input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} className="sr-only" />
                                        <div className={`w-3 h-3 rounded-full transition-all ${formData.available ? 'bg-[#E56E0C]' : 'bg-stone-200'}`} />
                                        <span className={`text-[10px] uppercase font-black tracking-widest transition-colors ${formData.available ? 'text-[#1a1a1a]' : 'text-stone-300'}`}>LIVE</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#E56E0C] text-white py-7 rounded-[32px] font-display text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-all shadow-xl shadow-orange-500/20 active:scale-95 group">
                                {editingItem ? 'Update Menu Item' : 'Publish Dish'}
                                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AdminMenu;

