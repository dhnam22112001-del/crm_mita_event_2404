import React from 'react';
import { LayoutDashboard, Users, Calendar, BarChart3, Bell, Grid, Settings, LogOut, Activity } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, active }: SidebarItemProps) => (
  <div className={`sidebar-item ${active ? 'active' : ''} cursor-pointer`}>
    <div className={`${active ? 'text-gray-900' : 'text-gray-400'} mr-3`}>
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    </div>
    <span>{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <div className="w-[260px] h-screen bg-white shadow-sm flex flex-col p-4 border-r border-gray-200 shrink-0">
      <div className="flex items-center gap-3 px-3 py-6 mb-4">
        <div className="text-red-500">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 uppercase">Holter CRM</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">Menu</div>
        <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
        <SidebarItem icon={<Users />} label="Customers" />
        <SidebarItem icon={<Calendar />} label="Calendar" />
        <SidebarItem icon={<BarChart3 />} label="Reports" />
        
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mt-8 mb-3">Tools</div>
        <div className="flex items-center justify-between px-4 py-3 sidebar-item cursor-pointer">
          <div className="flex items-center">
            <Bell size={18} className="text-gray-400 mr-3" />
            <span>Notifications</span>
          </div>
          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">4</span>
        </div>
        <SidebarItem icon={<Grid />} label="Integrations" />
        <SidebarItem icon={<Settings />} label="Settings" />
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-2 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs mr-3">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">Admin User</p>
            <p className="text-[10px] text-gray-500 truncate">admin@holter.com</p>
          </div>
          <LogOut size={14} className="text-gray-400 cursor-pointer hover:text-gray-600 ml-2" />
        </div>
      </div>
    </div>
  );
}
