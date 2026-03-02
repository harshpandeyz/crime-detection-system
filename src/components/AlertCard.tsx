import React from 'react';
import { AlertCircle, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  confidence: number;
  blockchainHash?: string;
}

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  const severityColors = {
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all duration-300 border border-white/10">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border",
          severityColors[alert.severity]
        )}>
          <AlertCircle className="w-6 h-6" />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-white capitalize">{alert.type} Detected</h4>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
              severityColors[alert.severity]
            )}>
              {alert.severity}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{alert.timestamp}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{(alert.confidence * 100).toFixed(1)}% Confidence</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {alert.blockchainHash && (
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
            <span>HASH: {alert.blockchainHash.substring(0, 8)}...</span>
          </div>
        )}
        <Link 
          to={`/events/${alert.id}`}
          className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default AlertCard;
