import { motion } from 'framer-motion';
import { Target, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function DailyMission() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col group relative overflow-hidden border-black/5 dark:border-white/10 shadow-sm transition-all duration-500">
      {/* Top Decorative Corner */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-black/5 dark:border-white/5 rounded-tl-3xl m-4 group-hover:border-red-500/30 transition-colors duration-500" />

      {/* Header Row */}
      <div className="relative z-10 flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Target size={20} className="text-red-500" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Daily Mission</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 text-red-600 dark:text-red-500 shadow-sm">
          <Clock size={12} />
          <span className="text-[10px] font-mono font-black tracking-widest">14:22:05</span>
        </div>
      </div>

      {/* Main Content Area - flex-1 pushes the button to the bottom */}
      <div className="relative z-10 flex-1 flex flex-col">
        <p className="text-[10px] font-black text-red-500 mb-3 uppercase tracking-[0.3em]">Priority Directive</p>
        <h4 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
          Identify the "Urgent <br />Invoice" Payload
        </h4>
        <p className="text-sm text-slate-600 dark:text-white/50 leading-relaxed font-medium mb-8 max-w-[90%]">
          A new spear-phishing campaign has been detected targeting our financial sector.
          Analyze the latest incoming barrage.
        </p>

        {/* Progress Section */}
        <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">Progress</span>
            <span className="text-[10px] font-mono font-black text-slate-900 dark:text-white">45% COMPLETION</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-[#050505] rounded-full overflow-hidden border border-black/5 dark:border-white/5 relative">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Action Button - More spacing at the top */}
      <div className="relative z-10 mt-10">
        <button className="w-full py-4 bg-red-600 dark:bg-transparent border border-red-600 dark:border-red-500/30 text-white dark:text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-red-700 dark:hover:bg-red-500 dark:hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 active:translate-y-0">
          Deploy Intercept
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-red-500/15 transition-colors duration-700" />
    </div>
  );
}