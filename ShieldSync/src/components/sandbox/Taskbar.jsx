import { motion } from 'framer-motion';
import { Wifi, Battery, Volume2, Shield, Search, Terminal } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Taskbar() {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const { theme } = useTheme();
  
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-black/40 dark:bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.25rem] z-50 shadow-2xl transition-all duration-500">
      
      {/* Start Button */}
      <button className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(45,91,255,0.4)] transition-all hover:scale-110 active:scale-95 group relative">
        <Shield size={20} className="text-white relative z-10" />
        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300" />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* Pinned / Active Apps */}
      <div className="flex items-center gap-1.5">
        {[
          { icon: Search, color: 'bg-slate-500' },
          { icon: Terminal, color: 'bg-slate-800', active: true },
        ].map((app, idx) => (
          <button 
            key={idx} 
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
              app.active ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'
            }`}
          >
            <app.icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
            {app.active && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_#2D5BFF]" />
            )}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* System Tray */}
      <div className="flex items-center gap-4 px-4 h-10 rounded-xl hover:bg-white/5 transition-colors cursor-default">
        <div className="flex items-center gap-3 text-white/40">
          <Wifi size={14} className="hover:text-white transition-colors cursor-pointer" />
          <Volume2 size={14} className="hover:text-white transition-colors cursor-pointer" />
          <Battery size={14} className="text-green-500/60 hover:text-green-500 transition-colors cursor-pointer" />
        </div>
        <div className="w-px h-4 bg-white/5" />
        <span className="text-[10px] font-black font-mono text-white/50 tracking-widest">{time}</span>
      </div>
    </div>
  );
}
