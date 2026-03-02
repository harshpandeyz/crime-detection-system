import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', events: 12 },
  { name: 'Tue', events: 19 },
  { name: 'Wed', events: 15 },
  { name: 'Thu', events: 22 },
  { name: 'Fri', events: 30 },
  { name: 'Sat', events: 10 },
  { name: 'Sun', events: 8 },
];

const pieData = [
  { name: 'Person', value: 400 },
  { name: 'Vehicle', value: 300 },
  { name: 'Weapon', value: 50 },
  { name: 'Intrusion', value: 100 },
];

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b'];

const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Weekly Activity</h3>
          <select className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-400 focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#ffffff20',
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="events" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-6">Detection Distribution</h3>
        <div className="h-64 w-full flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#ffffff20',
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 pr-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-slate-400">{item.name}</span>
                <span className="text-xs font-bold text-white ml-auto">{((item.value / 850) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
