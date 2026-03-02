import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Target, 
  Database, 
  ExternalLink,
  Play,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/events" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">Event Details</h1>
              <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {id}
              </span>
            </div>
            <p className="text-slate-400 mt-1">Detailed forensic analysis and blockchain evidence log.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share Evidence</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Clip</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl overflow-hidden border border-white/10 relative aspect-video group">
            <img 
              src="https://picsum.photos/seed/event-clip/1280/720" 
              alt="Event Clip" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                00:00:12 / 00:00:30
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-red-500/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">
                  Detection: Weapon
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Detection Metadata
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Object Class</span>
                  <span className="text-white font-semibold">Weapon (Handgun)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Confidence Score</span>
                  <span className="text-emerald-400 font-mono">98.24%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Inference Engine</span>
                  <span className="text-white font-semibold">YOLOv8-Sentinel</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400 text-sm">Processing Time</span>
                  <span className="text-white font-semibold">14.2ms</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                Temporal Data
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Detection Time</span>
                  <span className="text-white font-semibold">14:22:10.422</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Date</span>
                  <span className="text-white font-semibold">March 02, 2024</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-semibold">30 Seconds</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400 text-sm">Camera Source</span>
                  <span className="text-white font-semibold">CAM-01 (Main Gate)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Database className="w-12 h-12 text-emerald-500/10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Blockchain Evidence
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              This event has been cryptographically signed and anchored to the Sentinel Mainnet for immutable record keeping.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Transaction Hash</p>
                <p className="text-xs font-mono text-emerald-400 break-all leading-relaxed">
                  0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Block Number</p>
                <p className="text-sm font-mono text-white">#18,294,052</p>
              </div>
            </div>

            <button 
              onClick={handleVerify}
              disabled={verifying || verified}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                verified 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {verifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying on Chain...</span>
                </>
              ) : verified ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Evidence Verified</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verify on Chain</span>
                </>
              )}
            </button>
            
            {verified && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-400">
                <ExternalLink className="w-3 h-3" />
                <a href="#" className="hover:underline">View on Block Explorer</a>
              </div>
            )}
          </section>

          <section className="glass rounded-3xl p-6 border border-white/10 bg-red-500/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Incident Response
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Automated response protocols were triggered based on the severity of this event.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-300">Police Dispatch Notified</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-300">Facility Lockdown Initiated</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="text-xs text-slate-500">Backup Personnel Requested</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;
