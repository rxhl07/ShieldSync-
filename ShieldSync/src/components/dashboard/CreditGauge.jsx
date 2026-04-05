import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function CreditGauge({ score = 742 }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [displayScore, setDisplayScore] = useState(0);

  const maxScore = 1000;
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.floor(score * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const getStatusColor = () => {
    if (score > 700) return { color: '#22C55E', label: 'EXCELLENT' };
    if (score > 400) return { color: '#F59E0B', label: 'AVERAGE' };
    return { color: '#EF4444', label: 'HIGH RISK' };
  };

  const status = getStatusColor();

  return (
    <div className="flex flex-col items-center justify-between w-full h-full py-4">
      {/* Label moved to the very top to prevent overlap */}
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-white/30 mb-6">
        Cyber-Safety Score
      </p>

      <div className="relative w-full max-w-[280px] aspect-[1.6/1] flex justify-center">
        {/* Gauge SVG with increased viewBox for vertical breathing room */}
        <svg viewBox="0 0 200 130" className="w-full h-full overflow-visible">
          {/* Background Track */}
          <path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Animated Progress Path */}
          <motion.path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke={status.color}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 12px ${status.color}60)` }}
          />
        </svg>

        {/* Score Display - Centered within the arc */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
              {displayScore}
            </span>
            <span className="text-sm font-bold text-slate-400 dark:text-white/20">/1000</span>
          </div>
        </div>
      </div>

      {/* Status Pill with more top margin */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 px-6 py-2 rounded-full border text-[10px] font-black tracking-widest transition-all shadow-lg"
        style={{
          backgroundColor: `${status.color}${isDark ? '1A' : '08'}`,
          color: status.color,
          borderColor: `${status.color}40`
        }}
      >
        {status.label}
      </motion.div>
    </div>
  );
}