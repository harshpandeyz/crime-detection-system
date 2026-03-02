import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const events = [
  { id: 'EVT-8291', timestamp: '2024-03-02 14:22:10', object: 'Person', confidence: 98.2, severity: 'low', blockchain: true },
  { id: 'EVT-8292', timestamp: '2024-03-02 14:25:45', object: 'Vehicle', confidence: 94.5, severity: 'low', blockchain: true },
  { id: 'EVT-8293', timestamp: '2024-03-02 14:30:12', object: 'Weapon', confidence: 89.1, severity: 'high', blockchain: true },
  { id: 'EVT-8294', timestamp: '2024-03-02 14:45:30', object: 'Person', confidence: 99.0, severity: 'medium', blockchain: true },
  { id: 'EVT-8295', timestamp: '2024-03-02 15:02:15', object: 'Intrusion', confidence: 92.3, severity: 'high', blockchain: false },
  { id: 'EVT-8296', timestamp: '2024-03-02 15:10:00', object: 'Vehicle', confidence: 88.7, severity: 'low', blockchain: true },
  { id: 'EVT-8297', timestamp: '2024-03-02 15:15:22', object: 'Person', confidence: 95.4, severity: 'low', blockchain: true },
];

const EventTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const severityStyles = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-white/10">
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or Object..." 
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Event ID</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Object Detected</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Blockchain</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-emerald-400">{event.id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{event.timestamp}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{event.object}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${event.confidence}%` }} 
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{event.confidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border",
                    severityStyles[event.severity as keyof typeof severityStyles]
                  )}>
                    {event.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {event.blockchain ? (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs">Pending</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link 
                    to={`/events/${event.id}`}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400">Showing 7 of 142 events</span>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold">1</button>
          <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white">2</button>
          <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white">3</button>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
