import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function WindowWrapper({ title, children, defaultSize, defaultPosition, onMinimize, onMaximize, onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={defaultPosition}
      animate={
        isMaximized
          ? { x: 0, y: 0, width: '100%', height: 'calc(100% - 72px)' } // account for floating taskbar
          : { ...defaultSize }
      }
      className={`absolute flex flex-col bg-white/95 dark:bg-[#0A0A0B]/90 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.6)] group/window transition-colors duration-500 ${
        isMaximized ? 'rounded-b-none border-b-0' : ''
      }`}
      style={{ zIndex: 10 }}
    >
      {/* Dynamic inner glow for dark mode */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none group-focus-within/window:via-accent/40" />

      {/* Title Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="h-12 bg-slate-50/50 dark:bg-white/5 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-5 select-none cursor-grab active:cursor-grabbing transition-colors"
      >
        <div className="flex items-center gap-2.5">
          {/* Custom window controls */}
          <button 
            onClick={onClose} 
            className="w-3.5 h-3.5 rounded-full bg-red-500/20 dark:bg-red-500/10 border border-red-500/40 dark:border-red-500/30 flex items-center justify-center group/btn hover:bg-red-500 transition-all shadow-sm"
          >
            <div className="w-1 h-1 bg-red-500 dark:bg-red-500/80 rounded-full group-hover/btn:bg-white transition-colors" />
          </button>
          <button 
            onClick={onMinimize} 
            className="w-3.5 h-3.5 rounded-full bg-amber-500/20 dark:bg-amber-500/10 border border-amber-500/40 dark:border-amber-500/30 flex items-center justify-center group/btn hover:bg-amber-500 transition-all shadow-sm"
          >
            <div className="w-1 h-1 bg-amber-500 dark:bg-amber-500/80 rounded-full group-hover/btn:bg-white transition-colors" />
          </button>
          <button 
            onClick={toggleMaximize} 
            className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/40 dark:border-emerald-500/30 flex items-center justify-center group/btn hover:bg-emerald-500 transition-all shadow-sm"
          >
            <div className="w-1 h-1 bg-emerald-500 dark:bg-emerald-500/80 rounded-full group-hover/btn:bg-white transition-colors" />
          </button>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-accent/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/60 transition-colors">
            {title}
          </span>
        </div>
        
        <div className="w-20" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </motion.div>
  );
}
