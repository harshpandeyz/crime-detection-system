import React, { useState, useEffect } from 'react';
import { Maximize2, Camera, Radio, ShieldAlert } from 'lucide-react';

const LiveFeed: React.FC = () => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden glass border-2 border-white/10 group">
      {/* Simulation of a live feed - in real app this would be an <img src="/live-feed" /> or <video /> */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <img 
          src="https://picsum.photos/seed/security/1280/720" 
          alt="CCTV Feed" 
          className="w-full h-full object-cover opacity-60 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      {/* Overlay UI */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
          <ShieldAlert className="w-3 h-3 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">AI Active</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-colors">
          <Maximize2 className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="absolute bottom-6 left-6">
        <div className="flex items-center gap-2 text-white/70 font-mono text-xs">
          <Camera className="w-4 h-4" />
          <span>CAM-01: MAIN ENTRANCE</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-right">
        <div className="text-white/70 font-mono text-xs mb-1">
          {new Date().toLocaleDateString()}
        </div>
        <div className="text-white font-mono text-lg font-bold">
          {timestamp}
        </div>
      </div>

      {/* Detection Box Simulation */}
      <div className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-emerald-400/50 rounded-lg">
        <div className="absolute -top-6 left-0 bg-emerald-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          Person 98.2%
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default LiveFeed;
