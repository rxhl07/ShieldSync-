import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Mail, Search, ArrowLeft, ShieldAlert, CheckCircle2, XCircle, X, Trophy, Target, Clock, AlertTriangle, Zap, Flame, Shield } from 'lucide-react';
import Taskbar from './Taskbar';
import VishingModule from './VishingModule';
import SocialModule from './SocialModule';
import WindowWrapper from './WindowWrapper';
import { SIMULATION_DATABASE } from '../../data/schema';

// ===================================================================
// TOAST NOTIFICATION — Brief animated feedback at the top
// ===================================================================
function Toast({ type, message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -40, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-6 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${
        type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
      <span className="text-xs font-black uppercase tracking-[0.1em]">{message}</span>
    </motion.div>
  );
}

// ===================================================================
// STREAK INDICATOR — Appears when user gets multiple right in a row
// ===================================================================
function StreakBadge({ streak }) {
  if (streak < 2) return null;
  return (
    <motion.div
      key={streak}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', damping: 12 }}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg"
    >
      <Flame size={12} className="text-amber-400" />
      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{streak}x Streak</span>
    </motion.div>
  );
}

// ===================================================================
// +XP FLOATING ANIMATION
// ===================================================================
function FloatingXP({ x, y }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -60, scale: 1.3 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="fixed z-[400] pointer-events-none text-emerald-400 font-black text-lg"
      style={{ left: x, top: y }}
    >
      +250 XP
    </motion.div>
  );
}

// ===================================================================
// FULL-SCREEN SYNCMAIL CLIENT — Phishing Game Loop
// ===================================================================
function FullScreenSyncMail({ onReportSuccess, onReportFail, onClickTrap, detectedThreats, isXRay, trackHover, trackSafeItemOpen, sessionInbox, streak }) {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [shakeEmail, setShakeEmail] = useState(false);
  const inbox = sessionInbox || [];

  const isDetected = (emailId) => detectedThreats.includes(emailId);

  // Shake animation when wrong report in email detail
  const triggerShake = () => {
    setShakeEmail(true);
    setTimeout(() => setShakeEmail(false), 500);
  };

  return (
    <div className="flex h-full w-full bg-[#070709] text-white/80 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-white/[0.02] border-r border-white/[0.06] p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10 group">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
            <Mail size={16} className="text-white" />
          </div>
          <span className="font-black tracking-tight text-white text-lg">SyncMail</span>
        </div>

        <button className="bg-accent text-white px-5 py-3 rounded-xl w-full flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.15em] mb-8 hover:shadow-[0_10px_20px_rgba(45,91,255,0.3)] transition-all active:scale-95">
          Compose
        </button>

        <div className="space-y-1 flex-1">
          {['Inbox', 'Priority', 'Drafts', 'Archives', 'Spam'].map((item, i) => (
            <div key={item} className={`px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] cursor-pointer transition-all ${i === 0 ? 'bg-accent/10 text-accent' : 'text-white/25 hover:bg-white/5 hover:text-white/60'}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Streak indicator in sidebar */}
        <div className="mt-auto pt-4 border-t border-white/[0.04]">
          <AnimatePresence>
            <StreakBadge streak={streak} />
          </AnimatePresence>
        </div>
      </div>

      {/* Main Mail Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Search Bar */}
        <div className="h-16 border-b border-white/[0.06] flex items-center px-8 shrink-0">
          <div className="bg-white/[0.03] rounded-xl flex items-center px-5 py-2.5 w-full max-w-2xl border border-white/[0.06] focus-within:border-accent/30 transition-all">
            <Search size={16} className="text-white/20 mr-4" />
            <input type="text" placeholder="Search secure communications..." className="bg-transparent outline-none flex-1 text-sm text-white font-medium placeholder:text-white/15" />
          </div>
        </div>

        {!selectedEmail ? (
          /* Email List */
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {inbox.map((email, index) => {
              const detected = isDetected(email.id);
              return (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={!detected ? { backgroundColor: 'rgba(255,255,255,0.04)', x: 4 } : {}}
                  whileTap={!detected ? { scale: 0.995 } : {}}
                  onClick={() => {
                    if (!detected) {
                      setSelectedEmail(email);
                      if (!email.isThreat && trackSafeItemOpen) trackSafeItemOpen();
                    }
                  }}
                  className={`flex items-center px-8 py-4 border-b border-white/[0.03] cursor-pointer transition-colors ${
                    detected
                      ? 'opacity-30 pointer-events-none'
                      : ''
                  }`}
                >
                  <div className="w-8 flex justify-center shrink-0">
                    {detected ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </motion.div>
                    ) : !email.read ? (
                      <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#2D5BFF]" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-transparent" />
                    )}
                  </div>

                  <div className="w-52 truncate shrink-0">
                    <span className={`text-sm tracking-tight ${!email.read && !detected ? 'font-black text-white' : 'font-medium text-white/40'}`}>
                      {email.sender}
                    </span>
                  </div>

                  <div className={`flex-1 truncate text-sm px-4 ${!email.read && !detected ? 'font-semibold text-white/70' : 'font-medium text-white/25'}`}>
                    {email.subject}
                  </div>

                  <div className="text-[10px] font-mono font-bold text-white/15 shrink-0">
                    {email.time}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Email Detail View */
          <motion.div
            className="flex-1 flex flex-col overflow-y-auto custom-scrollbar"
            animate={shakeEmail ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top bar */}
            <div className="px-6 py-3 border-b border-white/[0.06] flex items-center justify-between sticky top-0 bg-[#070709]/90 backdrop-blur-xl z-10">
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/30 hover:text-white/60"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Report button — always visible, same styling regardless of threat status */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (selectedEmail.isThreat) {
                    onReportSuccess(selectedEmail.id);
                  } else {
                    onReportFail();
                    triggerShake();
                  }
                  setSelectedEmail(null);
                }}
                className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl border border-white/10 text-white/50 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
              >
                <ShieldAlert size={14} /> Report Threat
              </motion.button>
            </div>

            {/* Email content */}
            <div className="p-10 max-w-3xl mx-auto w-full">
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-black text-white mb-6 tracking-tight leading-tight"
              >
                {selectedEmail.subject}
              </motion.h1>

              {/* Sender info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${selectedEmail.isThreat ? 'bg-amber-600/80' : 'bg-accent/80'}`}>
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{selectedEmail.sender}</span>
                      <span className="text-[11px] text-white/20">
                        &lt;{selectedEmail.senderEmail}&gt;
                      </span>
                    </div>
                    <div className="text-[10px] text-white/20 mt-0.5">to: you@frontier.io</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-white/15">{selectedEmail.time}</div>
              </motion.div>

              {/* Body */}
              <div className="text-[15px] text-white/60 font-medium space-y-4 leading-relaxed">
                {selectedEmail.body.map((line, i) => {
                  const isTrap = selectedEmail.isThreat && selectedEmail.trapLine && line.includes(selectedEmail.trapLine);

                  if (isTrap) {
                    return (
                      <motion.div
                        key={i}
                        className="my-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.03 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(45,91,255,0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={trackHover}
                          onClick={() => {
                            onClickTrap();
                            setSelectedEmail(null);
                          }}
                          className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-[0.15em] rounded-xl text-xs transition-all"
                        >
                          {line.replace('→ ', '')}
                        </motion.button>
                      </motion.div>
                    );
                  }

                  if (line === '') return <div key={i} className="h-2" />;

                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ===================================================================
// SCORING SCREEN
// ===================================================================
function ScoringScreen({ detectedThreats, totalThreats, wrongClicks, metrics, onExit }) {
  const timeElapsed = metrics.startTime ? ((Date.now() - metrics.startTime) / 1000).toFixed(0) : 0;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const baseScore = detectedThreats.length * 250;
  const penalty = wrongClicks * 100;
  const timeBonus = timeElapsed < 120 ? 200 : timeElapsed < 300 ? 100 : 0;
  const finalScore = Math.max(0, baseScore - penalty + timeBonus);

  const accuracy = totalThreats > 0
    ? Math.round((detectedThreats.length / (detectedThreats.length + wrongClicks)) * 100)
    : 0;

  const grade = accuracy >= 90 ? 'S' : accuracy >= 75 ? 'A' : accuracy >= 60 ? 'B' : accuracy >= 40 ? 'C' : 'D';
  const gradeColor = accuracy >= 90 ? 'text-emerald-400' : accuracy >= 75 ? 'text-blue-400' : accuracy >= 60 ? 'text-amber-400' : 'text-red-400';
  const gradeGlow = accuracy >= 90 ? 'drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]' : accuracy >= 75 ? 'drop-shadow-[0_0_30px_rgba(96,165,250,0.4)]' : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-[200] flex items-center justify-center bg-[#030308]/95 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', damping: 25 }}
        className="w-full max-w-lg p-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', damping: 12 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
          >
            <Trophy size={36} className="text-emerald-400" />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            MISSION COMPLETE
          </h2>
          <p className="text-sm text-white/30 font-medium">All threats have been successfully neutralized</p>
        </div>

        {/* Grade */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', damping: 10 }}
          className="text-center mb-10"
        >
          <div className={`text-7xl font-black ${gradeColor} ${gradeGlow} tracking-tighter`} style={{ fontFamily: 'var(--font-heading)' }}>
            {grade}
          </div>
          <div className="text-xs text-white/20 font-bold uppercase tracking-[0.2em] mt-2">Performance Grade</div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { icon: Target, color: 'text-emerald-400', label: 'Threats Found', value: `${detectedThreats.length}`, sub: `/${totalThreats}` },
            { icon: Zap, color: 'text-amber-400', label: 'Accuracy', value: `${accuracy}`, sub: '%' },
            { icon: Clock, color: 'text-blue-400', label: 'Time', value: `${minutes}m ${String(seconds).padStart(2, '0')}`, sub: 's' },
            { icon: AlertTriangle, color: 'text-red-400', label: 'Mistakes', value: `${wrongClicks}`, sub: '' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={14} className={stat.color} />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</span>
              </div>
              <span className="text-2xl font-black text-white">{stat.value}<span className="text-white/20 text-lg">{stat.sub}</span></span>
            </motion.div>
          ))}
        </div>

        <div className="mb-10">
          <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">
            <span>Total Score</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/60"
            >
              {finalScore} pts
            </motion.span>
          </div>
          <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (finalScore / 1200) * 100)}%` }}
              transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-accent via-emerald-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(45,91,255,0.4)]"
            />
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExit}
          className="w-full py-4 bg-white text-black font-black text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-white/90 transition-all"
        >
          Return to Briefing
        </motion.button>
      </motion.div>
    </motion.div>
  );
}


// ===================================================================
// DESKTOP COMPONENT — Main sandbox orchestrator
// ===================================================================
export default function Desktop({ status, onFail, onSuccess, isXRay, category, trackHover, trackSafeItemOpen, detectedThreats, totalThreats, wrongClicks, onReportSuccess, onReportFail, onDismissFeedback, onCheckCompletion, metrics, onExit, setSimulationStatus, sessionInbox: sessionInboxProp }) {
  const simData = SIMULATION_DATABASE[category || 'phishing'];
  const [toasts, setToasts] = useState([]);
  const [xpFloats, setXpFloats] = useState([]);
  const [streak, setStreak] = useState(0);
  const [screenFlash, setScreenFlash] = useState(null); // 'success' | 'fail' | null

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addXP = useCallback(() => {
    const id = Date.now();
    const x = window.innerWidth / 2 - 40 + Math.random() * 80;
    const y = window.innerHeight / 2 - 100;
    setXpFloats(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setXpFloats(prev => prev.filter(f => f.id !== id));
    }, 1500);
  }, []);

  // Wrap report handlers to add feedback
  const handleReportSuccess = useCallback((emailId) => {
    if (onReportSuccess) onReportSuccess(emailId);
    addToast('success', 'Threat Neutralized!');
    addXP();
    setStreak(prev => prev + 1);
    setScreenFlash('success');
    setTimeout(() => setScreenFlash(null), 400);
  }, [onReportSuccess, addToast, addXP]);

  const handleReportFail = useCallback(() => {
    if (onReportFail) onReportFail();
    addToast('fail', 'Wrong Target — Stay Vigilant!');
    setStreak(0);
    setScreenFlash('fail');
    setTimeout(() => setScreenFlash(null), 400);
  }, [onReportFail, addToast]);

  const handleClickTrap = useCallback(() => {
    if (onReportFail) onReportFail();
    addToast('fail', 'Compromised — Credentials Leaked!');
    setStreak(0);
    setScreenFlash('fail');
    setTimeout(() => setScreenFlash(null), 500);
  }, [onReportFail, addToast]);

  const handleDismiss = useCallback(() => {
    if (onDismissFeedback) onDismissFeedback();

    if (status === 'feedback_success') {
      setTimeout(() => {
        if (onCheckCompletion) onCheckCompletion();
      }, 100);
    }
  }, [onDismissFeedback, onCheckCompletion, status]);

  return (
    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0c0c14_0%,_#050505_100%)]" />

      {/* ===== SCREEN FLASH EFFECTS ===== */}
      <AnimatePresence>
        {screenFlash === 'success' && (
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-[90] pointer-events-none bg-emerald-500/10 border-2 border-emerald-500/20 rounded-none"
          />
        )}
        {screenFlash === 'fail' && (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[90] pointer-events-none bg-red-500/10 border-2 border-red-500/30 rounded-none"
          />
        )}
      </AnimatePresence>

      {/* ===== TOAST NOTIFICATIONS ===== */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onDone={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>

      {/* ===== FLOATING XP ===== */}
      <AnimatePresence>
        {xpFloats.map(f => (
          <FloatingXP key={f.id} x={f.x} y={f.y} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {/* ===== SUCCESS FEEDBACK POPUP ===== */}
        {status === 'feedback_success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0c0c0f] border border-emerald-500/20 rounded-2xl p-8 text-center max-w-sm shadow-[0_0_60px_rgba(34,197,94,0.15)]"
            >
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all"
              >
                <X size={16} />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/20"
              >
                <CheckCircle2 size={28} className="text-emerald-400" />
              </motion.div>

              <h3 className="text-xl font-black text-emerald-400 mb-2 tracking-tight">Threat Detected</h3>
              <p className="text-sm text-white/30 mb-4 leading-relaxed">
                Nice work! You correctly identified a phishing email.
              </p>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-[9px] font-bold text-white/15 uppercase tracking-widest mb-1.5">
                  <span>Progress</span>
                  <span>{detectedThreats?.length || 0}/{totalThreats}</span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: `${((detectedThreats?.length - 1) / totalThreats) * 100}%` }}
                    animate={{ width: `${((detectedThreats?.length) / totalThreats) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDismiss}
                className="w-full py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-[0.15em] rounded-xl hover:bg-emerald-500/20 transition-all"
              >
                Continue Scanning
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ===== FAILURE FEEDBACK POPUP ===== */}
        {status === 'feedback_fail' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0c0c0f] border border-red-500/20 rounded-2xl p-8 text-center max-w-sm shadow-[0_0_60px_rgba(239,68,68,0.15)]"
            >
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all"
              >
                <X size={16} />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-5 border border-red-500/20"
              >
                <XCircle size={28} className="text-red-400" />
              </motion.div>

              <h3 className="text-xl font-black text-red-400 mb-2 tracking-tight">Compromised</h3>
              <p className="text-sm text-white/30 mb-6 leading-relaxed">
                That was a trap! In a real scenario, your credentials could have been stolen. Stay vigilant.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDismiss}
                className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-xs uppercase tracking-[0.15em] rounded-xl hover:bg-red-500/20 transition-all"
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SCORING SCREEN ===== */}
      {status === 'completed' && (
        <ScoringScreen
          detectedThreats={detectedThreats || []}
          totalThreats={totalThreats || 0}
          wrongClicks={wrongClicks || 0}
          metrics={metrics || {}}
          onExit={onExit}
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      {category === 'phishing' ? (
        <div className="absolute inset-0 z-10">
          <FullScreenSyncMail
            onReportSuccess={handleReportSuccess}
            onReportFail={handleReportFail}
            onClickTrap={handleClickTrap}
            detectedThreats={detectedThreats || []}
            isXRay={isXRay}
            trackHover={trackHover}
            trackSafeItemOpen={trackSafeItemOpen}
            sessionInbox={sessionInboxProp}
            streak={streak}
          />
        </div>
      ) : simData.payload.type === 'audio_call' ? (
        <VishingModule payload={simData.payload} onFail={onFail} onSuccess={onSuccess} onExit={onExit} isXRay={isXRay} />
      ) : simData.payload.type === 'social_dm' ? (
        <WindowWrapper
          title={`${simData.payload.platform} Web Portal`}
          defaultSize={{ width: 900, height: 700 }}
          defaultPosition={{ x: 80, y: 60 }}
          onClose={() => {}}
          onMinimize={() => {}}
        >
          <div className="w-full h-full relative" style={{ filter: isXRay ? 'contrast(1.1) brightness(0.95)' : 'none' }}>
            {isXRay && <div className="scanline-overlay z-[60] opacity-30" />}
            <SocialModule payload={simData.payload} onFail={onFail} onSuccess={onSuccess} isXRay={isXRay} trackHover={trackHover} />
          </div>
        </WindowWrapper>
      ) : null}

      {category !== 'phishing' && category !== 'vishing' && <Taskbar />}
    </div>
  );
}
