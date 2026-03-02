import React from 'react';
import LiveFeed from '../components/LiveFeed';
import AlertCard, { Alert } from '../components/AlertCard';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

const recentAlerts: Alert[] = [
  { id: '1', type: 'Weapon', severity: 'high', timestamp: '2 mins ago', confidence: 0.98, blockchainHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b' },
  { id: '2', type: 'Intrusion', severity: 'medium', timestamp: '15 mins ago', confidence: 0.85, blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b' },
  { id: '3', type: 'Person', severity: 'low', timestamp: '45 mins ago', confidence: 0.99, blockchainHash: '0x9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d' },
  { id: '4', type: 'Vehicle', severity: 'low', timestamp: '1 hour ago', confidence: 0.92, blockchainHash: '0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f' },
  { id: '5', type: 'Weapon', severity: 'high', timestamp: '3 hours ago', confidence: 0.89, blockchainHash: '0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c' },
];

const StatCard: React.FC<{ icon: any, label: string, value: string, trend: string, color: string }> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="glass rounded-3xl p-6 border border-white/10">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
        <TrendingUp className="w-3 h-3" />
        <span>{trend}</span>
      </div>
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</h3>
    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Overview</h1>
          <p className="text-slate-400 mt-1">Real-time AI surveillance and threat detection active.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 animate-pulse-red">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">High Threat Alert</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={ShieldAlert} label="Total Detections" value="1,284" trend="+12%" color="emerald" />
        <StatCard icon={Activity} label="Active Cameras" value="24 / 24" trend="Stable" color="blue" />
        <StatCard icon={Users} label="People Count" value="42" trend="+5%" color="purple" />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value="03" trend="-2%" color="red" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Live Surveillance</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Processing: 12ms Latency</span>
              </div>
            </div>
            <LiveFeed />
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">System Analytics</h2>
            <AnalyticsCharts />
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Alerts</h2>
              <button className="text-xs text-emerald-400 font-bold hover:text-emerald-300">View All</button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </section>

          <section className="glass rounded-3xl p-6 border border-white/10 bg-emerald-500/5">
            <h3 className="text-lg font-bold text-white mb-2">System Health</h3>
            <p className="text-sm text-slate-400 mb-6">All AI models and blockchain nodes are operating within normal parameters.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">GPU Utilization</span>
                  <span className="text-emerald-400">64%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[64%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Blockchain Sync</span>
                  <span className="text-emerald-400">100%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
