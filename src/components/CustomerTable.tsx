import React from 'react';
import { MoreHorizontal, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Customer } from '../types';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

const statusMap = {
  new_lead: { label: 'New Lead', class: 'bg-status-new-bg text-status-new-text' },
  contacted: { label: 'Contacted', class: 'bg-status-contacted-bg text-status-contacted-text' },
  interested: { label: 'Interested', class: 'bg-status-interested-bg text-status-interested-text' },
  converted: { label: 'Converted', class: 'bg-status-converted-bg text-status-converted-text' },
  lost: { label: 'Lost', class: 'bg-status-lost-bg text-status-lost-text' },
};

export default function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden min-h-[400px]">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Customer Directory</h2>
        <div className="flex gap-2">
          {/* Status filter context could be handled by parent, but styling here is the focus */}
        </div>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="px-6 py-4 border-b border-gray-100">#ID</th>
              <th className="px-6 py-4 border-b border-gray-100">Full Name</th>
              <th className="px-6 py-4 border-b border-gray-100">Company</th>
              <th className="px-6 py-4 border-b border-gray-100">Status</th>
              <th className="px-6 py-4 border-b border-gray-100">Created</th>
              <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-400">#{c.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{c.full_name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{c.email || c.phone}</div>
                </td>
                <td className="px-6 py-4 font-medium">{c.company}</td>
                <td className="px-6 py-4">
                  <span className={`status-badge ${statusMap[c.status].class}`}>
                    {statusMap[c.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-gray-400">
                  {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={() => onEdit(c)}
                      className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(c.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        <span>Showing {customers.length} customers</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-900 cursor-not-allowed opacity-50">Prev</button>
          <button className="px-3 py-1.5 bg-gray-900 text-white border border-gray-900 rounded">1</button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-900">Next</button>
        </div>
      </div>
    </div>
  );
}
