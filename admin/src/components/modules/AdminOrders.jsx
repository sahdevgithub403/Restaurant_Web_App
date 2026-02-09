
import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import AdminTable from '../ui/AdminTable';

const AdminOrders = () => {
    // Mock Data
    const [orders, setOrders] = useState([
        { id: '#ORD-001', customer: 'John Doe', items: 'Belgian Choco...', total: 447, status: 'Pending', date: 'Oct 25, 2023' },
        { id: '#ORD-002', customer: 'Jane Smith', items: 'Berry Cheesecake', total: 189, status: 'Completed', date: 'Oct 24, 2023' },
        { id: '#ORD-003', customer: 'Mike Ross', items: 'Mango Mania (3)', total: 417, status: 'Processing', date: 'Oct 24, 2023' },
    ]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-stone-100 text-stone-700';
        }
    };

    const columns = [
        { header: 'Order ID', accessor: 'id', render: row => <span className="font-display font-bold text-[#1a1a1a]">{row.id}</span> },
        { header: 'Customer', accessor: 'customer', render: row => <span className="font-body text-sm font-semibold">{row.customer}</span> },
        { header: 'Items', accessor: 'items', render: row => <span className="font-body text-xs text-stone-500">{row.items}</span> },
        { header: 'Date', accessor: 'date', render: row => <span className="font-body text-xs text-stone-400 uppercase tracking-wide">{row.date}</span> },
        { header: 'Total', accessor: 'total', render: row => <span className="font-body text-sm font-bold text-[#1a1a1a]">₹{row.total}</span> },
        { header: 'Status', accessor: 'status', render: row => <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusColor(row.status)}`}>{row.status}</span> },
    ];

  return (
    <div className="space-y-8 animate-fade-in-up">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="font-display text-3xl font-bold text-[#1a1a1a] mb-1">Orders</h2>
                <p className="font-body text-xs uppercase tracking-widest text-stone-500">Track and manage customer orders</p>
            </div>
             <div className="flex bg-white rounded-full p-1 border border-stone-100 shadow-sm">
                 <button className="px-4 py-1.5 rounded-full bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider shadow-md">All</button>
                 <button className="px-4 py-1.5 rounded-full text-stone-500 hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-colors">New</button>
                 <button className="px-4 py-1.5 rounded-full text-stone-500 hover:text-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-colors">Pending</button>
            </div>
        </div>

        {/* Filters & Search */}
        <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search orders..." 
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
            data={orders}
            actions={true}
            onEdit={(item) => console.log("View Order", item)}
        />

    </div>
  );
};

export default AdminOrders;
