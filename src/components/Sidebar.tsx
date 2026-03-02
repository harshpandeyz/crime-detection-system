import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  History, 
  Settings, 
  LogOut, 
  Activity,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/events', icon: History, label: 'Events History' },
    { to: '/simulate', icon: Activity, label: 'Simulate Event' },
    { to: '/settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <ShieldAlert className="text-emerald-400 w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-white">SENTINEL AI</h1>
          <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">Surveillance</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white">Blockchain Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Mainnet Connected</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
