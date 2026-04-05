import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Terminal, Eye, Shield, Play, ArrowLeft } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import Desktop from '../components/sandbox/Desktop';
import { useTheme } from '../contexts/ThemeContext';
import { SIMULATION_DATABASE } from '../data/schema';

const THREAT_CATEGORIES = [
  { id: 'phishing', title: 'Phishing', icon: Mail, count: 24 },
  { id: 'vishing', title: 'Vishing', icon: Phone, count: 12 },
  { id: 'soc-eng', title: 'Social Eng.', icon: MessageSquare, count: 18 },
];

export default function Arena() {
  const [activeCategory, setActiveCategory] = useState('phishing');
  const [hackerPOV, setHackerPOV] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    inSandbox,
    glitchTriggered,
    xRayMode,
    simulationStatus,
    startSimulation,
    failSimulation,
    succeedSimulation,
    exitSimulation,
    trackHover,
    trackSafeItemOpen
  } = useSimulation();

  // If we are actively in the sandbox simulation
  if (inSandbox) {
    return (
      <div className="h-screen w-full relative z-[100] bg-black overflow-hidden flex flex-col font-mono">
        {/* Top return bar */}
        <div className="h-14 bg-black border-b border-white/10 flex items-center justify-between px-8 z-50">
          <button 
            onClick={exitSimulation}
            className="flex items-center gap-3 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:gap-4"
          >
            <ArrowLeft size={16} /> Abort Mission
          </button>
          
          <div className="flex items-center gap-6">
             {xRayMode && (
               <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] animate-pulse">
                 X-RAY MODE ACTIVE
               </span>
             )}
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">
                 Sandbox Enclave 01
               </span>
             </div>
          </div>
        </div>

        {/* The Virtual Desktop Environment */}
        <div className="flex-1 relative">
           <Desktop 
             status={simulationStatus} 
             onFail={failSimulation} 
             onSuccess={succeedSimulation}
             isXRay={xRayMode}
             category={activeCategory}
             trackHover={trackHover}
             trackSafeItemOpen={trackSafeItemOpen}
           />
        </div>
      </div>
    );
  }

  // Otherwise, render State 1 (Briefing Zone & Threat Catalogue)
  return (
    <div className="pt-28 pb-10 px-6 max-w-[1400px] mx-auto min-h-screen flex flex-col relative z-10 transition-colors duration-500">
      
      {/* Glitch Overlay for Hacker POV */}
      {hackerPOV && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-red-500/5 mix-blend-color-burn dark:bg-red-500/10" />
          <div className="scanline-overlay" />
          <div className="absolute inset-0 glitch-active opacity-20 dark:opacity-40" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 glass-panel px-6 py-5 rounded-2xl border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Shield size={20} className="text-accent" />
          </div>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white transition-colors">Threat Arena</h1>
        </div>
        
        {/* Perspective Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 relative z-10 shadow-inner">
          <button
            onClick={() => setHackerPOV(false)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              !hackerPOV 
                ? 'bg-accent text-white shadow-[0_8px_16px_-4px_rgba(45,91,255,0.4)]' 
                : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye size={14} /> Defender
          </button>
          <button
            onClick={() => setHackerPOV(true)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              hackerPOV 
                ? 'bg-red-600 text-white shadow-[0_8px_16px_-4px_rgba(239,68,68,0.4)]' 
                : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal size={14} /> Hacker
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 min-h-0">
        {/* Sidebar Catalogue */}
        <div className="w-72 glass-panel rounded-3xl p-6 flex flex-col shrink-0 border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
          <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-6 pl-2">
            Asset Vectors
          </p>
          <div className="space-y-3 flex-1">
            {THREAT_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group border ${
                    isActive 
                      ? 'bg-accent/10 border-accent/30 text-accent ring-2 ring-accent/10 shadow-sm' 
                      : 'border-transparent text-slate-500 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={18} className={isActive ? 'text-accent' : 'text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white'} />
                    <span className="text-sm font-bold tracking-wide uppercase">{cat.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${
                    isActive ? 'bg-accent/20 text-accent' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-center">
             <p className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest leading-loose">
               More modules <br/> arriving soon
             </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 rounded-[2rem] border transition-all duration-700 overflow-hidden flex flex-col relative shadow-xl dark:shadow-none ${
          hackerPOV 
            ? 'bg-[#0A0A0B] border-red-500/30' 
            : 'glass-panel border-black/5 dark:border-white/10'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={hackerPOV ? 'hacker' : 'defender'}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col relative z-10"
            >
              {hackerPOV ? (
                // Hacker View
                <div className="p-12 flex-1 flex flex-col font-mono text-red-500">
                  <div className="flex items-center gap-4 mb-10 opacity-60">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <Terminal size={20} />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">root@enclave:~# ./stage --vec={activeCategory}</span>
                  </div>
                  <div className="flex-1 border border-red-500/20 bg-red-500/5 p-8 rounded-2xl overflow-y-auto custom-scrollbar">
                    <p className="mb-4 text-sm font-bold flex items-center gap-3">
                       <span className="text-red-500/40">&gt;</span>
                       <span>Exploiting trust mechanics in {activeCategory} vector...</span>
                    </p>
                    <p className="mb-4 text-sm font-bold flex items-center gap-3">
                       <span className="text-red-500/40">&gt;</span>
                       <span>Constructing malicious payload... done.</span>
                    </p>
                    <p className="mb-4 text-sm font-bold flex items-center gap-3">
                       <span className="text-red-500/40">&gt;</span>
                       <span>Targeting behavioral vulnerability 0xFA42...</span>
                    </p>
                    
                    <div className="mt-12">
                       <button className="px-10 py-5 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all duration-300 text-xs uppercase font-black tracking-[0.3em] rounded-xl shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                         [ INITIALIZE ATTACK PACKET ]
                       </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Defender View
                <div className="p-12 flex-1 flex flex-col relative justify-center">
                  <div className="max-w-2xl relative z-10 mx-auto text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Intelligence Briefing
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white mb-8 tracking-[-0.03em] leading-tight transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      {SIMULATION_DATABASE[activeCategory]?.title?.split(': ').map((part, i) => (
                        <span key={i}>
                          {part}
                          {i === 0 && <><br className="hidden md:block" /></>}
                        </span>
                      ))}
                    </h2>
                    
                    <p className="text-base md:text-lg text-slate-600 dark:text-white/50 leading-relaxed max-w-xl mb-12 font-medium transition-colors">
                      {SIMULATION_DATABASE[activeCategory]?.briefing}
                    </p>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                       {SIMULATION_DATABASE[activeCategory]?.flags.map((flag, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 + (i * 0.1) }}
                           className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-white/70 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-sm dark:shadow-none"
                         >
                           <div className={`w-2 h-2 rounded-full bg-${flag.color} shadow-[0_0_8px_currentColor]`} style={{ color: flag.color === 'red-500' ? '#EF4444' : flag.color === 'amber-500' ? '#F59E0B' : flag.color === 'accent' ? '#2D5BFF' : '#22C55E' }} />
                           <span className="uppercase tracking-widest">{flag.text}</span>
                         </motion.div>
                       ))}
                    </div>
 
                    <button 
                      onClick={startSimulation}
                      className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-950 dark:bg-white text-white dark:text-black text-sm font-black uppercase tracking-[0.2em] rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgba(45,91,255,0.2)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1 active:translate-y-0"
                    >
                      <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                      <Play size={18} className="relative z-10 transition-colors" />
                      <span className="relative z-10 transition-colors">Enter Sandbox</span>
                    </button>
                  </div>
 
                  {/* UI Decor */}
                  <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -mr-20 -mb-20">
                    <Shield size={600} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
