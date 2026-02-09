
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const AdminTable = ({ columns, data, onEdit, onDelete, actions = true }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#f7f5f0] border-b border-stone-100">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4 font-body text-xs uppercase tracking-widest text-stone-500 font-bold whitespace-nowrap">
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="px-6 py-4 font-body text-xs uppercase tracking-widest text-stone-500 font-bold text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr key={row.id} className="hover:bg-stone-50/50 transition-colors group">
                                {columns.map((col, idx) => (
                                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(row) : (
                                            <span className="font-body text-sm text-[#1a1a1a]">{row[col.accessor]}</span>
                                        )}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {onEdit && (
                                                <button onClick={() => onEdit(row)} className="p-2 hover:bg-stone-200 rounded-full text-stone-500 hover:text-[#1a1a1a] transition-colors" title="Edit">
                                                    <Edit2 size={16} />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button onClick={() => onDelete(row.id)} className="p-2 hover:bg-red-50 rounded-full text-stone-500 hover:text-red-600 transition-colors" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-10 text-center text-stone-400 font-body text-sm italic">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {/* Pagination Placeholder */}
        <div className="bg-white border-t border-stone-100 px-6 py-4 flex justify-between items-center">
             <span className="text-xs text-stone-400 font-body uppercase tracking-wider">Showing {data.length} records</span>
             <div className="flex gap-2">
                 <button className="px-3 py-1 border border-stone-200 rounded text-xs font-bold text-stone-500 hover:bg-stone-50 disabled:opacity-50" disabled>Prev</button>
                 <button className="px-3 py-1 border border-stone-200 rounded text-xs font-bold text-stone-500 hover:bg-stone-50 disabled:opacity-50" disabled>Next</button>
             </div>
        </div>
    </div>
  );
};

export default AdminTable;
