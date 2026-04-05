import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertTriangle, CheckCircle, X, ExternalLink, Terminal } from 'lucide-react';
import { MINI_GAME_EMAIL } from '../../utils/constants';

export default function MiniGame() {
  const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [glitching, setGlitching] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

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
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    setResult(null);
    setShowRedFlags(false);
  };

  return (
    <>
      {/* Glitch overlay */}
      {glitching && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 glitch-active" />
          <div className="scanline-overlay" />
          <div className="absolute inset-0 bg-[#EF4444]/10 mix-blend-screen" />
        </div>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          >
            {/* Email Popup */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: -10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-full max-w-[560px] max-h-[90vh] flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-[#EF4444]/10"
              style={{ perspective: '1000px' }}
            >
              {/* Fake Terminal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0A0A0B]/80">
                <div className="flex items-center gap-3">
                  <Terminal size={14} className="text-[#EF4444] animate-pulse" />
                  <div>
                    <p className="text-[11px] font-mono font-bold text-white tracking-widest uppercase">
                      Threat Detection Protocol Active
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Email Content Container */}
              <div className="p-6 bg-[#050505]/95 flex-1 overflow-y-auto">
                {/* Sender */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9900] to-[#EF4444] flex items-center justify-center text-white text-lg font-bold shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    A
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">
                      {MINI_GAME_EMAIL.senderDisplay}
                    </p>
                    <p className={`text-xs mt-1 ${showRedFlags ? 'text-[#EF4444] font-mono bg-[#EF4444]/10 px-2 py-1 rounded inline-block border border-[#EF4444]/20' : 'text-white/50 font-mono'}`}>
                      &lt;{MINI_GAME_EMAIL.sender}&gt;
                      {showRedFlags && ' 🚩 UNVERIFIED DOMAIN'}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-4 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-mono">Subject:</p>
                  <h3 className="text-sm font-bold text-white">
                    {MINI_GAME_EMAIL.subject}
                  </h3>
                </div>

                {/* Body */}
                <div className="text-sm text-white/70 leading-relaxed space-y-4 font-mono bg-[#0A0A0B]/80 rounded-xl p-5 border border-white/5">
                  {MINI_GAME_EMAIL.body.split('\n').map((line, i) => {
                    const flag = showRedFlags && MINI_GAME_EMAIL.redFlags.find(f => line.includes(f.text));
                    const isRedFlag = !!flag;
                    
                    return (
                      <p key={i} className={`${isRedFlag ? 'relative z-10' : ''}`}>
                        {isRedFlag ? (
                          <span className="relative group cursor-help inline-block">
                            <span className="bg-[#EF4444]/20 text-[#EF4444] px-1.5 py-0.5 rounded font-bold border-b border-dashed border-[#EF4444]/60">
                              {line}
                            </span>
                            <span className="absolute bottom-full left-0 mb-2 bg-[#EF4444] text-white text-[11px] font-sans px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(239,68,68,0.4)] whitespace-nowrap pointer-events-none block border border-white/20">
                              🚩 {flag.hint}
                            </span>
                          </span>
                        ) : (
                          <span>{line || '\u00A0'}</span>
                        )}
                      </p>
                    );
                  })}

                  {/* Fake link */}
                  {!showRedFlags && (
                    <div className="mt-4 p-3 bg-[#2D5BFF]/10 rounded-lg border border-[#2D5BFF]/30 flex items-center gap-3 cursor-pointer hover:bg-[#2D5BFF]/20 transition-colors group">
                      <ExternalLink size={14} className="text-[#2D5BFF] group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-[#2D5BFF] font-bold tracking-wide">
                        https://amaz0n-security-verify.com/auth
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions / Result Banner */}
              <div className="bg-[#0A0A0B] border-t border-white/10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className={`w-full p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                        result === 'correct'
                          ? 'bg-gradient-to-r from-[#22C55E]/90 to-[#16A34A] text-white'
                          : 'bg-gradient-to-r from-[#EF4444]/90 to-[#DC2626] text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {result === 'correct' ? <CheckCircle size={28} className="shrink-0" /> : <AlertTriangle size={28} className="shrink-0" />}
                        <div>
                          <p className="text-base font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                            {result === 'correct' ? 'THREAT NEUTRALIZED' : 'SYSTEM COMPROMISED'}
                          </p>
                          <p className="text-xs opacity-90 mt-0.5">
                            {result === 'correct'
                              ? 'Hover over the red text above to analyze attacker techniques.'
                              : 'You clicked a phishing link. Analysis available above.'}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleDismiss}
                        className="w-full md:w-auto px-6 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-lg transition-all duration-300 hover:bg-white/90 active:scale-95 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="actions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 flex gap-4 w-full"
                    >
                      <button
                        onClick={() => handleAnswer('phish')}
                        className="flex-1 py-4 bg-[#EF4444] text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 hover:bg-[#DC2626] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-[0.98] border border-white/20"
                      >
                        Report Phish
                      </button>
                      <button
                        onClick={() => handleAnswer('legit')}
                        className="flex-1 py-4 bg-[#22C55E] text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 hover:bg-[#16A34A] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] active:scale-[0.98] border border-white/20"
                      >
                        Safe Email
                      </button>
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
