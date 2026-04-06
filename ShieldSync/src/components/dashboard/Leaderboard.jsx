import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';

const MOCK_LEADERS = [
  { id: 1, name: 'CipherGhost', xp: 14250, avatar: 'identicon' },
  { id: 2, name: 'Alice_W', xp: 13900, avatar: 'bottts' },
  { id: 3, name: 'OxDefender', xp: 13550, avatar: 'avataaars' },
];

export default function LeaderboardWidget({ currentUserId }) {
  return (
    <div className="glass-panel rounded-3xl p-6 h-full flex flex-col bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Global Rankings</h3>
        </div>
        <span className="text-[9px] font-mono text-green-500 flex items-center gap-1">
          <TrendingUp size={10} /> LIVE
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_LEADERS.map((leader, index) => (
          <div key={leader.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#2D5BFF]/30 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-white/20 w-4">#{index + 1}</span>
              <div className="w-8 h-8 rounded-lg bg-white/10 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/${leader.avatar}/svg?seed=${leader.name}`} alt="avatar" />
              </div>
              <span className="text-xs font-bold text-white">{leader.name}</span>
            </div>
            <span className="text-xs font-mono text-white/60">{leader.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>

      {/* Current User Standing */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#2D5BFF]/10 border border-[#2D5BFF]/30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#2D5BFF] w-4">#42</span>
            <span className="text-xs font-bold text-white">YOU (AGENT)</span>
          </div>
          <span className="text-xs font-mono text-[#2D5BFF] font-bold">RECRUIT</span>
        </div>
      </div>
    </div>
  );
}