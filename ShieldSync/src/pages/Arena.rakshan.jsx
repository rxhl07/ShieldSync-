import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Terminal, Eye, Shield, Play, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import Desktop from '../components/sandbox/Desktop';
import { useTheme } from '../contexts/ThemeContext';
import { SIMULATION_DATABASE } from '../data/schema';

const THREAT_CATEGORIES = [
  { id: 'phishing', title: 'Phishing', icon: Mail, count: 24 },
  { id: 'vishing', title: 'Vishing', icon: Phone, count: 12 },
  { id: 'soc-eng', title: 'Social Eng.', icon: MessageSquare, count: 18 },
];

// ===================================================================
// PHISHING PREVIEW CARD ΓÇö Mini email client preview (like the Vishing phone preview)
// ===================================================================
function PhishingPreviewCard() {
  const [activeRow, setActiveRow] = useState(-1);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setActiveRow(0), 800);
    const t2 = setTimeout(() => setActiveRow(1), 1400);
    const t3 = setTimeout(() => setActiveRow(2), 2000);
    const t4 = setTimeout(() => setScanned(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const previewEmails = [
    { sender: 'IT HelpDesk', subject: '≡ƒöÆ Mandatory Password Reset', threat: true },
    { sender: 'Alice Chen', subject: 'Final design assets for v2', threat: false },
    { sender: 'PayPal Support', subject: 'ΓÜá∩╕Å Account Limited ΓÇö Verify', threat: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="bg-[#0a0a0f] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
        {/* Title bar */}
        <div className="h-8 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-center relative">
          <div className="absolute left-3 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-amber-500/40" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          </div>
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Incoming Threats</span>
        </div>

        {/* Email rows */}
        <div className="p-2">
          {previewEmails.map((email, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: activeRow >= i ? 1 : 0.2,
                x: activeRow >= i ? 0 : -10,
              }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-500 ${
                scanned && email.threat
                  ? 'bg-red-500/[0.08] border border-red-500/20'
                  : scanned && !email.threat
                    ? 'bg-emerald-500/[0.04] border border-emerald-500/10'
                    : 'bg-white/[0.02] border border-transparent'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                scanned && email.threat ? 'bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.5)]' :
                scanned && !email.threat ? 'bg-emerald-400' : 'bg-accent/50'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-white/60 truncate">{email.sender}</div>
                <div className="text-[9px] text-white/25 truncate">{email.subject}</div>
              </div>
              {scanned && email.threat && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <AlertTriangle size={10} className="text-red-400" />
                </motion.div>
              )}
              {scanned && !email.threat && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[8px] text-emerald-400/60 font-bold"
                >
                  SAFE
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Scan line animation */}
        {!scanned && activeRow >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          >
            <motion.div
              initial={{ top: '20%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 2.5, ease: 'linear' }}
              className="absolute left-0 right-0 h-px bg-accent shadow-[0_0_15px_rgba(45,91,255,0.6)]"
            />
          </motion.div>
        )}

        {/* Result badge */}
        <AnimatePresence>
          {scanned && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between"
            >
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Scan Complete</span>
              <span className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
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
  const [hackerPOV, setHackerPOV] = useState(false);
  const { theme } = useTheme();

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
    trackSafeItemOpen,
    detectedThreats,
    totalThreats,
    wrongClicks,
    sessionInbox,
    reportThreatSuccess,
    reportThreatFail,
    dismissFeedback,
    checkCompletion,
    metrics,
    setSimulationStatus,
  } = useSimulation();

  const handleStart = () => {
    startSimulation(activeCategory);
  };

  // =================== SANDBOX VIEW ===================
  if (inSandbox) {
    return (
      <div className="h-screen w-full relative z-[100] bg-black overflow-hidden flex flex-col font-mono">
        {/* Top return bar */}
        <div className="h-14 bg-black border-b border-white/[0.06] flex items-center justify-between px-8 z-50">
          <button
            onClick={exitSimulation}
            className="flex items-center gap-3 text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:gap-4"
          >
            <ArrowLeft size={16} /> Abort Mission
          </button>

          <div className="flex items-center gap-6">
            {activeCategory === 'phishing' && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalThreats }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: i < detectedThreats.length ? '#34d399' : 'rgba(255,255,255,0.1)',
                        boxShadow: i < detectedThreats.length ? '0 0 10px rgba(34,197,94,0.6)' : 'none',
                        scale: i === detectedThreats.length - 1 ? [1, 1.5, 1] : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-2 h-2 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-white/20">
                  {detectedThreats.length}/{totalThreats}
                </span>
              </div>
            )}

            {xRayMode && (
              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] animate-pulse">
                X-RAY MODE ACTIVE
              </span>
            )}

            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">
                Sandbox Enclave 01
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <Desktop
            status={simulationStatus}
            onFail={failSimulation}
            onSuccess={succeedSimulation}
            isXRay={xRayMode}
            category={activeCategory}
            trackHover={trackHover}
            trackSafeItemOpen={trackSafeItemOpen}
            detectedThreats={detectedThreats}
            totalThreats={totalThreats}
            wrongClicks={wrongClicks}
            sessionInbox={sessionInbox}
            onReportSuccess={reportThreatSuccess}
            onReportFail={reportThreatFail}
            onDismissFeedback={dismissFeedback}
            onCheckCompletion={checkCompletion}
            metrics={metrics}
            onExit={exitSimulation}
            setSimulationStatus={setSimulationStatus}
          />
        </div>
      </div>
    );
  }

  // =================== BRIEFING VIEW ===================
  return (
    <div className="pt-28 pb-10 px-6 max-w-[1400px] mx-auto min-h-screen flex flex-col relative z-10 transition-colors duration-500">

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
        {/* Sidebar */}
        <div className="w-72 glass-panel rounded-3xl p-6 flex flex-col shrink-0 border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
          <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-6 pl-2">Asset Vectors</p>
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
                  }`}>{cat.count}</span>
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

        {/* Main Content ΓÇö Vertical layout like Vishing */}
        <div className={`flex-1 rounded-[2rem] border transition-all duration-700 overflow-hidden flex flex-col relative shadow-xl dark:shadow-none ${
          hackerPOV
            ? 'bg-[#0A0A0B] border-red-500/30'
            : 'glass-panel border-black/5 dark:border-white/10'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={hackerPOV ? 'hacker' : `defender-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col relative z-10"
            >
              {hackerPOV ? (
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
                /* ===== DEFENDER VIEW ΓÇö VERTICAL LAYOUT (matches Vishing style) ===== */
                <div className="p-12 flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
                  <div className="max-w-2xl mx-auto w-full flex flex-col items-center text-center relative z-10">

                    {/* Big Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white mb-6 tracking-[-0.04em] leading-none transition-colors uppercase"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {activeCategory === 'phishing' ? 'PHISHING' :
                       activeCategory === 'vishing' ? 'VISHING' : 'SOCIAL ENG.'}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm md:text-base text-slate-600 dark:text-white/40 leading-relaxed font-medium mb-10 max-w-lg transition-colors"
                    >
                      {activeCategory === 'phishing'
                        ? 'Phishing is a form of cyberattack where threat actors craft deceptive emails impersonating trusted brands, colleagues, or institutionsΓÇöto trick targets into clicking malicious links, revealing credentials, or downloading malware.'
                        : SIMULATION_DATABASE[activeCategory]?.briefing}
                    </motion.p>

                    {/* Preview Card (centered, like the Vishing phone card) */}
                    {activeCategory === 'phishing' && <PhishingPreviewCard />}

                    {/* Flag indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-3 justify-center mt-10 mb-10"
                    >
                      {SIMULATION_DATABASE[activeCategory]?.flags.map((flag, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + (i * 0.08) }}
                          className="flex items-center gap-3 text-[11px] font-bold text-slate-700 dark:text-white/60 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] px-4 py-2.5 rounded-xl"
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: flag.color === 'red-500' ? '#EF4444' : flag.color === 'amber-500' ? '#F59E0B' : flag.color === 'accent' ? '#2D5BFF' : '#22C55E', boxShadow: `0 0 8px ${flag.color === 'red-500' ? '#EF4444' : flag.color === 'amber-500' ? '#F59E0B' : flag.color === 'accent' ? '#2D5BFF' : '#22C55E'}` }} />
                          <span className="uppercase tracking-widest">{flag.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <button
                        onClick={handleStart}
                        className="group relative inline-flex items-center gap-4 px-12 py-6 bg-accent text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgba(45,91,255,0.35)] transition-all hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                      >
                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <Play size={18} className="relative z-10" />
                        <span className="relative z-10">Simulation</span>
                      </button>
                    </motion.div>
                  </div>

                  {/* Background shield decor */}
                  <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none -mr-20 -mb-20">
                    <Shield size={500} />
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
