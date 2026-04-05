import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'CipherGhost', score: 14250, change: 'up' },
  { rank: 2, name: 'Alice_W', score: 13900, change: 'up' },
  { rank: 3, name: '0xDefender', score: 13550, change: 'same' },
  { rank: 4, name: 'NetRunner99', score: 12800, change: 'down' },
  { rank: 5, name: 'You', score: 12400, change: 'up', isUser: true },
];

export default function Leaderboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col group relative overflow-hidden border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-black/5 dark:border-white/5 rounded-tr-3xl m-4 group-hover:border-amber-500/30 transition-colors duration-500" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Trophy size={20} className="text-amber-500" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Top Defenders</h3>
        </div>
        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 tracking-[0.2em]">Global Rank</span>
      </div>

      {/* Scrollable List Container */}
      <div className="relative z-10 flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
        {LEADERBOARD_DATA.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${user.isUser
              ? 'bg-accent/5 dark:bg-accent/10 border-accent/20 dark:border-accent/30 shadow-sm'
              : 'hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'
              }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 text-center text-sm font-black font-mono ${user.rank === 1 ? 'text-amber-500' :
                user.rank === 2 ? 'text-slate-400' :
                  user.rank === 3 ? 'text-amber-700 dark:text-amber-600' :
                    'text-slate-300 dark:text-white/20'
                }`}>
                #{user.rank}
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative w-9 h-9 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-black/40 p-0.5 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-full h-full rounded-lg"
                  />
                  {user.isUser && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white dark:border-[#0A0A0B]" />}
                </div>
                <span className={`text-sm font-bold truncate max-w-[100px] ${user.isUser ? 'text-accent' : 'text-slate-900 dark:text-white/90'}`}>
                  {user.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-white/40">
                {user.score.toLocaleString()}
              </span>
              <div className="w-5 flex justify-center">
                {user.change === 'up' && <TrendingUp size={14} className="text-green-500" />}
                {user.change === 'down' && <TrendingDown size={14} className="text-red-500" />}
                {user.change === 'same' && <Minus size={14} className="text-slate-300 dark:text-white/20" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Decoration */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700" />
    </div>
  );
}