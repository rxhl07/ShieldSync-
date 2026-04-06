import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Terminal, Eye, Shield, Play, ArrowLeft, AlertTriangle, Menu, X } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import Desktop from '../components/sandbox/Desktop';
import VishingAnimation from '../components/common/VishingAnimation';
import PhishingAnimation from '../components/common/PhishingAnimation';
import SocialAnimation from '../components/common/SocialAnimation';
import ConfigForm from '../components/sandbox/ConfigForm';
import HackerTerminal from '../components/sandbox/HackerTerminal';
import { useTheme } from '../contexts/ThemeContext';
import { SIMULATION_DATABASE } from '../data/schema';
import { createPortal } from 'react-dom';

const THREAT_CATEGORIES = [
  { id: 'phishing', title: 'Phishing', icon: Mail, count: 24 },
  { id: 'vishing', title: 'Vishing', icon: Phone, count: 12 },
  { id: 'soc-eng', title: 'Social Eng.', icon: MessageSquare, count: 18 },
];

function PhishingPreviewCard() {
  const [activeRow, setActiveRow] = useState(-1);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      while (active) {
        setActiveRow(-1);
        setScanned(false);
        await new Promise(r => setTimeout(r, 800));
        if (!active) break;
        setActiveRow(0);
        await new Promise(r => setTimeout(r, 600));
        if (!active) break;
        setActiveRow(1);
        await new Promise(r => setTimeout(r, 600));
        if (!active) break;
        setActiveRow(2);
        await new Promise(r => setTimeout(r, 1000));
        if (!active) break;
        setScanned(true);
        await new Promise(r => setTimeout(r, 3000));
      }
    })();
    return () => { active = false; };
  }, []);

  const previewEmails = [
    { sender: 'IT HelpDesk', subject: '🔒 Mandatory Password Reset', threat: true },
    { sender: 'Alice Chen', subject: 'Final design assets for v2', threat: false },
    { sender: 'PayPal Support', subject: '⚠️ Account Limited — Verify', threat: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="w-full max-w-sm mx-auto px-4 sm:px-0"
    >
      <div className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative transition-colors duration-300">
        <div className="h-8 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-center relative transition-colors duration-300">
          <div className="absolute left-3 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-amber-500/40" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          </div>
          <span className="text-[8px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Incoming Threats</span>
        </div>
        <div className="p-2">
          {previewEmails.map((email, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: activeRow >= i ? 1 : 0.2, x: activeRow >= i ? 0 : -10 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-500 ${scanned && email.threat ? 'bg-red-50 dark:bg-red-500/[0.08] border border-red-100 dark:border-red-500/20' : scanned && !email.threat ? 'bg-emerald-50 dark:bg-emerald-500/[0.04] border border-emerald-100 dark:border-emerald-500/10' : 'bg-slate-50 dark:bg-white/[0.02] border border-transparent'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${scanned && email.threat ? 'bg-red-500 dark:bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.5)]' : scanned && !email.threat ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-accent/50'}`} />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold text-slate-700 dark:text-white/60 truncate">{email.sender}</div>
                <div className="text-[9px] text-slate-500 dark:text-white/25 truncate">{email.subject}</div>
              </div>
              {scanned && email.threat && <AlertTriangle size={10} className="text-red-500 dark:text-red-400" />}
              {scanned && !email.threat && <div className="text-[8px] text-emerald-600 dark:text-emerald-400/60 font-bold">SAFE</div>}
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {scanned && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-500 dark:text-white/20 uppercase tracking-widest">Scan Complete</span>
              <span className="text-[9px] font-black text-red-500 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 animate-pulse" />
                2 Threats Found
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Arena() {
  const [activeCategory, setActiveCategory] = useState('phishing');
  const [showOperationInfo, setShowOperationInfo] = useState(false);
  const [hackerPOV, setHackerPOV] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const { inSandbox, xRayMode, simulationStatus, attackConfig, setAttackConfig, hackerStatus, setHackerStatus, startSimulation, failSimulation, succeedSimulation, exitSimulation, trackHover, trackSafeItemOpen, dismissOverlay, detectedThreats, totalThreats, wrongClicks, sessionInbox, reportThreatSuccess, reportThreatFail, reportFalsePositive, lastActionEmail, dismissFeedback, checkCompletion, metrics, setSimulationStatus } = useSimulation();

  const handleStart = () => startSimulation(activeCategory);
  const handleLogsComplete = () => {
    setSimulationStatus('active');
    setHackerPOV(false);
    startSimulation(activeCategory, attackConfig);
  };

  if (inSandbox) {
    return createPortal(
      <div className="fixed inset-0 z-[99999] bg-slate-50 dark:bg-black overflow-hidden flex flex-col font-mono transition-colors duration-300">
        <div className="h-14 bg-white dark:bg-black border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between px-4 sm:px-8 z-[200] relative">
          <button onClick={exitSimulation} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-white/30 dark:hover:text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Abort Mission</span><span className="sm:hidden">Abort</span>
          </button>
          <div className="flex items-center gap-4 sm:gap-6">
            {activeCategory === 'phishing' && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalThreats }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < detectedThreats.length ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-slate-200 dark:bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500">{detectedThreats.length}/{totalThreats}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="hidden sm:inline text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Sandbox Enclave 01</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Desktop {...{ status: simulationStatus, onFail: failSimulation, onSuccess: succeedSimulation, onExit: exitSimulation, onDismiss: dismissOverlay, isXRay: xRayMode, category: activeCategory, trackHover, trackSafeItemOpen, detectedThreats, totalThreats, wrongClicks, sessionInbox, onReportSuccess: reportThreatSuccess, onReportFail: reportThreatFail, onReportFalsePositive: reportFalsePositive, lastActionEmail, onDismissFeedback: dismissFeedback, onCheckCompletion: checkCompletion, metrics, setSimulationStatus }} />
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div className="pt-20 sm:pt-28 pb-10 px-4 sm:px-6 max-w-[1400px] mx-auto min-h-screen flex flex-col relative z-10 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm gap-4">
        <div className="flex items-center gap-4 self-start sm:self-auto">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Shield size={20} className="text-accent" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Threat Arena</h1>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 w-full sm:w-auto">
          <button onClick={() => setHackerPOV(false)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!hackerPOV ? 'bg-accent text-white shadow-lg' : 'text-slate-500 dark:text-white/40'}`}>
            <Eye size={14} /> Defender
          </button>
          <button onClick={() => setHackerPOV(true)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all ${hackerPOV ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 dark:text-white/40'}`}>
            <Terminal size={14} /> Hacker
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 sm:gap-8 min-h-0">
        {/* Sidebar - Mobile Toggle or Scrollable on Tablet */}
        <div className="w-full lg:w-72 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-6 flex flex-col shrink-0 border border-black/5 dark:border-white/10 transition-all">
          <p className="hidden lg:block text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-6 pl-2">Asset Vectors</p>
          <div className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {THREAT_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setShowOperationInfo(false); }}
                  className={`flex-none lg:w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all border ${isActive ? 'bg-blue-50 border-blue-200 text-accent dark:bg-accent/10 dark:border-accent/30 shadow-sm' : 'border-transparent text-slate-500 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Icon size={16} className={isActive ? 'text-accent' : 'text-slate-400'} />
                    <span className="text-[11px] sm:text-sm font-bold uppercase whitespace-nowrap">{cat.title}</span>
                  </div>
                  <span className={`hidden sm:inline-block text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${isActive ? 'bg-blue-100 dark:bg-accent/20' : 'bg-slate-100 dark:bg-white/5'}`}>{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-700 overflow-hidden flex flex-col relative shadow-xl ${hackerPOV ? 'bg-red-50 dark:bg-[#0A0A0B] border-red-200 dark:border-red-500/30' : 'bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/5 dark:border-white/10'}`}>
          <div className="p-6 sm:p-12 flex-1 flex flex-col relative justify-center overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={hackerPOV ? 'hacker' : `defender-${activeCategory}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="max-w-2xl mx-auto w-full text-center lg:text-left">
                {hackerPOV ? (
                  <div className="flex flex-col gap-6 w-full">
                    <ConfigForm vector={activeCategory} config={attackConfig} onChange={setAttackConfig} disabled={hackerStatus === 'initializing'} />
                    <HackerTerminal vector={activeCategory} config={attackConfig} status={hackerStatus} onInitialize={() => setHackerStatus('initializing')} onLogsComplete={handleLogsComplete} />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 sm:mb-8 tracking-tight leading-tight transition-colors">
                      {SIMULATION_DATABASE[activeCategory]?.title?.split(': ').map((part, i) => (
                        <span key={i}>{part}{i === 0 && <br className="hidden md:block" />}</span>
                      ))}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-lg text-slate-600 dark:text-white/50 leading-relaxed mb-8 sm:mb-12 font-medium">
                      {activeCategory === 'phishing' ? 'Identify deceptive communications crafted by threat actors to compromise personal data.' : SIMULATION_DATABASE[activeCategory]?.briefing}
                    </p>
                    {activeCategory === 'phishing' && <PhishingPreviewCard />}

                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-8 sm:mt-10 mb-8 sm:mb-10">
                      {SIMULATION_DATABASE[activeCategory]?.flags.map((flag, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] sm:text-[11px] font-bold text-slate-700 dark:text-white/60 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: flag.color === 'red-500' ? '#EF4444' : '#2D5BFF', boxShadow: `0 0 8px ${flag.color === 'red-500' ? '#EF4444' : '#2D5BFF'}` }} />
                          <span className="uppercase tracking-widest">{flag.text}</span>
                        </div>
                      ))}
                    </div>

                    <button onClick={handleStart} className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-slate-900 dark:bg-accent text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 active:scale-[0.98] w-full sm:w-auto justify-center">
                      <Play size={18} className="relative z-10" />
                      <span className="relative z-10">Launch Simulation</span>
                    </button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none -mr-10 sm:-mr-20 -mb-10 sm:-mb-20 text-slate-900 dark:text-white">
              <Shield size={300} className="sm:w-[500px] sm:h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}