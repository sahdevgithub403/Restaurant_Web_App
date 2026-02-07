import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { Package, MapPin, Phone, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await orderAPI.getAllOrders();
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await orderAPI.updateOrderStatus(id, { status });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-orange-50 text-orange-600';
            case 'CONFIRMED': return 'bg-blue-50 text-blue-600';
            case 'SHIPPED': return 'bg-indigo-50 text-indigo-600';
            case 'DELIVERED': return 'bg-emerald-50 text-emerald-600';
            case 'CANCELLED': return 'bg-red-50 text-red-600';
            default: return 'bg-stone-50 text-stone-600';
        }
    };

    return (
        <div className="space-y-10 animate-fade-in-up">
            <header>
                <h2 className="font-display text-4xl font-bold mb-2">Delivery <span className="text-stone-400">Stream</span></h2>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-stone-400">Monitor and manage live operations</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {orders.length === 0 && !loading && (
                    <div className="p-20 text-center bg-white rounded-[2.5rem] border border-stone-100">
                        <Package size={48} className="mx-auto mb-6 text-stone-100" />
                        <h3 className="font-display text-2xl font-bold text-stone-300 italic">"The stream is calm..."</h3>
                        <p className="font-body text-xs text-stone-400 uppercase tracking-widest mt-2">No active orders found</p>
                    </div>
                )}

                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-10 rounded-[2.5rem] border border-stone-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row gap-12 group">
                        <div className="flex-1 space-y-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-body text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Order ID</p>
                                    <h3 className="font-display text-2xl font-black tracking-tighter">#ORD-{order.id.toString().padStart(6, '0')}</h3>
                                </div>
                                <span className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold ${getStatusColor(order.orderStatus)}`}>
                                    {order.orderStatus}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-stone-400"><MapPin size={16} /> <span className="text-[10px] uppercase tracking-widest font-bold">Delivery Location</span></div>
                                    <p className="font-body text-sm text-[#1a1a1a] leading-relaxed italic">"{order.deliveryAddress || 'Pick-up from Store'}"</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-stone-400"><Clock size={16} /> <span className="text-[10px] uppercase tracking-widest font-bold">Placement Time</span></div>
                                    <p className="font-body text-sm text-[#1a1a1a]">{new Date(order.orderDate).toLocaleString()}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-stone-400"><Phone size={16} /> <span className="text-[10px] uppercase tracking-widest font-bold">Customer Contact</span></div>
                                    <p className="font-body text-sm font-bold text-[#1a1a1a]">{order.contactNumber || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-stone-50">
                                <p className="font-body text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-6">Line Items</p>
                                <div className="space-y-4">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center font-bold text-[10px]">{item.quantity}x</span>
                                                <span className="font-display font-medium uppercase tracking-tight">{item.menuItem.name}</span>
                                            </div>
                                            <span className="font-display font-bold text-stone-400">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-72 bg-stone-50 p-8 rounded-[2rem] flex flex-col justify-between">
                            <div>
                                <p className="font-body text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Total Amount</p>
                                <p className="font-display text-4xl font-bold tracking-tight">₹{order.totalAmount}</p>
                            </div>

                            <div className="space-y-2 pt-12">
                                <p className="font-body text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4">Operations</p>
                                <button 
                                    onClick={() => handleStatusUpdate(order.id, 'CONFIRMED')}
                                    className="w-full bg-white border border-stone-200 p-4 rounded-2xl flex items-center gap-3 font-body text-[9px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all group/btn"
                                >
                                    <CheckCircle size={14} className="text-stone-300 group-hover/btn:text-white" /> Confirm
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate(order.id, 'SHIPPED')}
                                    className="w-full bg-white border border-stone-200 p-4 rounded-2xl flex items-center gap-3 font-body text-[9px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all group/btn"
                                >
                                    <Truck size={14} className="text-stone-300 group-hover/btn:text-white" /> Dispatch
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}
                                    className="w-full bg-black text-white p-4 rounded-2xl flex items-center gap-3 font-body text-[9px] uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all shadow-lg"
                                >
                                    <CheckCircle size={14} /> Delivered
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
