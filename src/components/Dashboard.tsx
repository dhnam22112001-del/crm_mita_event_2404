import React from 'react';
import { Users, UserPlus, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { Stats } from '../types';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const StatCard = ({ title, value, icon, color, subtitle }: StatCardProps) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      {subtitle ? (
        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">
          Target
        </span>
      ) : (
        <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
          +12%
        </span>
      )}
    </div>
  </div>
);

interface DashboardProps {
  stats: Stats | null;
}

export default function Dashboard({ stats }: DashboardProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Leads" 
        value={stats.total} 
        icon={<Users size={24} />} 
        color="bg-blue-50" 
      />
      <StatCard 
        title="New This Week" 
        value={stats.thisWeek} 
        icon={<UserPlus size={24} />} 
        color="bg-purple-50"
        subtitle="target"
      />
      <StatCard 
        title="Converted" 
        value={stats.converted} 
        icon={<CheckCircle2 size={24} />} 
        color="bg-green-50" 
      />
      <StatCard 
        title="Lost Leads" 
        value={stats.lost} 
        icon={<XCircle size={24} />} 
        color="bg-red-50" 
      />
    </div>
  );
}
