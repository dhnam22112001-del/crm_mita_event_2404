import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Filter, RefreshCcw } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerTable from './components/CustomerTable';
import CustomerModal from './components/CustomerModal';
import { Customer, Stats } from './types';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer, fetchStats } from './api/customers';

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [cData, sData] = await Promise.all([
        fetchCustomers(search, statusFilter),
        fetchStats()
      ]);
      setCustomers(cData);
      setStats(sData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await deleteCustomer(id);
      loadData();
    } catch (error) {
      alert('Failed to delete customer');
    }
  };

  const handleSubmit = async (data: Partial<Customer>) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, data);
    } else {
      await createCustomer(data);
    }
    loadData();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleAddClick}
              className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-opacity hover:opacity-90 shadow-sm"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Customer
            </button>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-bg-main">
          <Dashboard stats={stats} />
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Lead Registry</h2>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-1.5 bg-white border-none rounded-lg text-xs appearance-none focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-500 shadow-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="new_lead">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
                <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
              <button 
                onClick={loadData}
                disabled={loading}
                className="p-1.5 bg-white border-none rounded-lg hover:bg-gray-50 transition-colors text-gray-400 shadow-sm"
              >
                {loading ? <RefreshCcw size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
              </button>
            </div>
          </div>
          
          <CustomerTable 
            customers={customers} 
            onEdit={handleEditClick} 
            onDelete={handleDelete} 
          />
        </div>
      </main>
      
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        initialData={editingCustomer}
      />
    </div>
  );
}
