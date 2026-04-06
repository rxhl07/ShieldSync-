import { motion } from 'framer-motion';
import { Target, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function DailyMission({ onPlay, hasPlayed }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col group relative overflow-hidden border-black/5 dark:border-white/10 shadow-sm transition-all duration-500">
      <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl m-4 transition-colors duration-500 ${hasPlayed ? 'border-green-500/30' : 'border-red-500/30'}`} />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hasPlayed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {hasPlayed ? <CheckCircle size={20} /> : <Target size={20} />}
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Daily Mission</h3>
        </div>
        {!hasPlayed && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/10 text-red-600 dark:text-red-500">
            <Clock size={12} />
            <span className="text-[10px] font-mono font-black">PENDING</span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <p className={`text-[10px] font-black mb-3 uppercase tracking-[0.2em] ${hasPlayed ? 'text-green-500' : 'text-red-500'}`}>
          {hasPlayed ? 'Status: Cleared' : 'Priority Directive'}
        </p>
        <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          {hasPlayed ? "Area Secured" : 'Identify "Urgent Invoice"'}
        </h4>
        <p className="text-sm text-slate-600 dark:text-white/50 leading-relaxed font-medium mb-8">
          {hasPlayed
            ? "Excellent work identifying today's spear-phishing threat. Return tomorrow for your next assignment."
            : "A new spear-phishing campaign has been detected. Analyze the latest incoming barrage."}
        </p>

        <div className="flex items-center gap-6 mt-auto">
          <div className="flex-1 h-2 bg-slate-100 dark:bg-[#050505] rounded-full overflow-hidden border border-black/5 dark:border-white/5 relative">
            <motion.div
              className={`absolute top-0 left-0 bottom-0 ${hasPlayed ? 'bg-green-500' : 'bg-gradient-to-r from-red-500 to-amber-500'}`}
              initial={{ width: 0 }}
              animate={{ width: hasPlayed ? '100%' : '0%' }}
              transition={{ duration: 1 }}
            />
          </div>
          <span className="text-[10px] font-mono font-black text-slate-500 dark:text-white/70">
            {hasPlayed ? '100%' : '0%'} COMPLETION
          </span>
        </div>
      </div>

      <button
        onClick={onPlay}
        disabled={hasPlayed}
        className={`relative z-10 mt-10 w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all ${hasPlayed
          ? 'bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20 cursor-default'
          : 'bg-red-600 dark:bg-transparent border border-red-600 dark:border-red-500/30 text-white dark:text-red-500 hover:bg-red-700 dark:hover:bg-red-500 dark:hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:-translate-y-0.5'
          }`}
      >
        {hasPlayed ? 'Mission Accomplished' : 'Deploy Intercept'}
        {!hasPlayed && <ArrowRight size={16} />}
      </button>
    </div>
  );
}