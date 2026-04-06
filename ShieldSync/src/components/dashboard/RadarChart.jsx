import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, TrendingUp } from 'lucide-react';

// Hardcoded data to show a realistic 7-day "Defense Evolution"
const MOCK_EVOLUTION_DATA = [
  { day: 'Mon', score: 620 },
  { day: 'Tue', score: 680 },
  { day: 'Wed', score: 740 },
  { day: 'Thu', score: 510 }, // Simulated "Compromise" dip
  { day: 'Fri', score: 590 },
  { day: 'Sat', score: 690 },
  { day: 'Sun', score: 742 }, // Matches your current screenshot score
];

export default function RadarChart() {
  return (
    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col group relative overflow-hidden bg-white dark:bg-[#0A0B10] border border-black/5 dark:border-white/10 shadow-xl dark:shadow-none transition-all duration-500">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Shield size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              Defense Evolution
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-white/20 font-bold uppercase tracking-widest mt-1">
              7-Day Readiness Trend
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <TrendingUp size={12} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500">+12%</span>
        </div>
      </div>

      {/* The Chart Container */}
      <div className="flex-1 w-full min-h-[200px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_EVOLUTION_DATA}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D5BFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2D5BFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(156, 163, 175, 0.5)', fontSize: 10, fontWeight: 'bold' }}
              dy={10}
            />
            <YAxis hide domain={[0, 1000]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0B10',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              itemStyle={{ color: '#2D5BFF' }}
              cursor={{ stroke: '#2D5BFF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#2D5BFF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Status Info */}
      <div className="mt-6 flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Growth Phase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Exposure Risk</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-500 dark:text-white/20 uppercase">Data Verified</span>
      </div>
    </div>
  );
}