import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, X, ExternalLink, Terminal } from 'lucide-react';
import { MINI_GAME_EMAIL } from '../../utils/constants';

export default function MiniGame({ isOpen, onClose, onComplete }) {
  const [result, setResult] = useState(null);
  const [glitching, setGlitching] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState(false);

  const markAsPlayed = () => {
    localStorage.setItem('shieldsync_daily_mission', new Date().toDateString());
    if (onComplete) onComplete();
  };

  const handleAnswer = useCallback((answer) => {
    const correct = answer === 'phish' && MINI_GAME_EMAIL.isPhish;
    if (correct) {
      setResult('correct');
      setTimeout(() => setShowRedFlags(true), 800);
    } else {
      setResult('wrong');
      setGlitching(true);
      setTimeout(() => setGlitching(false), 800);
    }
    markAsPlayed();
  }, [onComplete]);

  const handleDismiss = () => {
    setResult(null);
    setShowRedFlags(false);
    onClose();
  };

  return (
    <>
      {glitching && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <div className="absolute inset-0 glitch-active" />
          <div className="scanline-overlay" />
          <div className="absolute inset-0 bg-[#EF4444]/10 mix-blend-screen" />
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            /* High z-index ensures it sits completely over the navbar */
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              className="relative w-full max-w-[560px] max-h-[90vh] flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-[#EF4444]/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0A0A0B]/80">
                <div className="flex items-center gap-3">
                  <Terminal size={14} className="text-[#EF4444] animate-pulse" />
                  <p className="text-[11px] font-mono font-bold text-white tracking-widest uppercase">
                    Daily Threat Intercept
                  </p>
                </div>
                <button onClick={handleDismiss} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
                  <X size={14} />
                </button>
              </div>

              {/* Email Content */}
              <div className="p-6 bg-[#050505]/95 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9900] to-[#EF4444] flex items-center justify-center text-white text-lg font-bold">A</div>
                  <div>
                    <p className="text-base font-bold text-white">{MINI_GAME_EMAIL.senderDisplay}</p>
                    <p className={`text-xs mt-1 ${showRedFlags ? 'text-[#EF4444] font-mono bg-[#EF4444]/10 px-2 py-1 rounded border border-[#EF4444]/20' : 'text-white/50 font-mono'}`}>
                      &lt;{MINI_GAME_EMAIL.sender}&gt; {showRedFlags && ' 🚩 UNVERIFIED'}
                    </p>
                  </div>
                </div>

                <div className="mb-4 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-mono">Subject:</p>
                  <h3 className="text-sm font-bold text-white">{MINI_GAME_EMAIL.subject}</h3>
                </div>

                <div className="text-sm text-white/80 leading-relaxed font-mono bg-[#0A0A0B]/80 rounded-xl p-6 border border-white/5 flex flex-col gap-1.5">
                  {MINI_GAME_EMAIL.body.split('\n').map((line, i) => {
                    if (!line.trim()) return <div key={i} className="h-3" />;
                    const flag = showRedFlags && MINI_GAME_EMAIL.redFlags?.find(f => line.includes(f.text));
                    return (
                      <p key={i} className={`${flag ? 'relative z-10' : ''}`}>
                        {flag ? (
                          <span className="relative group cursor-help inline-block">
                            <span className="bg-[#EF4444]/20 text-[#EF4444] px-1.5 py-0.5 rounded font-bold border-b border-dashed border-[#EF4444]/60">{line}</span>
                            <span className="absolute bottom-full left-0 mb-2 bg-[#EF4444] text-white text-[11px] font-sans px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap block border border-white/20">
                              🚩 {flag.hint}
                            </span>
                          </span>
                        ) : (<span>{line}</span>)}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Actions / Results */}
              <div className="bg-[#0A0A0B] border-t border-white/10 relative">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div key="result" className={`p-6 flex flex-col md:flex-row items-center justify-between gap-6 ${result === 'correct' ? 'bg-[#16A34A] text-white' : 'bg-[#DC2626] text-white'}`}>
                      <div className="flex items-center gap-4">
                        {result === 'correct' ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
                        <div>
                          <p className="text-base font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                            {result === 'correct' ? 'THREAT NEUTRALIZED' : 'SYSTEM COMPROMISED'}
                          </p>
                        </div>
                      </div>
                      <button onClick={handleDismiss} className="px-6 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-white/90">Dismiss</button>
                    </motion.div>
                  ) : (
                    <motion.div key="actions" className="p-6 flex gap-4">
                      <button onClick={() => handleAnswer('phish')} className="flex-1 py-4 bg-[#EF4444] text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#DC2626]">Report Phish</button>
                      <button onClick={() => handleAnswer('legit')} className="flex-1 py-4 bg-[#22C55E] text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#16A34A]">Safe Email</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}