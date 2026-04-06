import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

const PREVIEW_EMAILS = [
  { sender: 'IT HelpDesk', subject: '🔒 Mandatory Password Reset', senderEmail: 'helpdesk@1t-corp.net', isThreat: true },
  { sender: 'Alice Chen', subject: 'Final design assets for v2', senderEmail: 'alice@company.io', isThreat: false },
  { sender: 'PayPal Support', subject: '⚠️ Account Limited — Verify Now', senderEmail: 'noreply@paypa1-alerts.com', isThreat: true },
];

export default function PhishingAnimation() {
  const [scanPhase, setScanPhase] = useState('idle'); // idle | scanning | revealed
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    let active = true;
    (async () => {
      while (active) {
        setScanPhase('idle');
        setActiveLine(-1);
        await new Promise(r => setTimeout(r, 600));
        if (!active) break;
        setScanPhase('scanning');
        await new Promise(r => setTimeout(r, 400));
        if (!active) break;
        setActiveLine(0);
        await new Promise(r => setTimeout(r, 700));
        if (!active) break;
        setActiveLine(1);
        await new Promise(r => setTimeout(r, 700));
        if (!active) break;
        setActiveLine(2);
        await new Promise(r => setTimeout(r, 800));
        if (!active) break;
        setScanPhase('revealed');
        await new Promise(r => setTimeout(r, 3000));
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center bg-[#0B0E14]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Background Glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 bg-accent/10 rounded-full blur-[80px]"
      />

      {/* Email Client Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-72 glass-panel border border-white/10 rounded-2xl overflow-hidden bg-black/60 shadow-2xl backdrop-blur-md"
      >
        {/* Title Bar */}
        <div className="h-8 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between px-3 relative">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[8px] font-black text-accent/80 uppercase tracking-[0.25em] flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2"
          >
            <ShieldAlert size={8} />
            {scanPhase === 'revealed' ? 'Scan Complete' : 'Scanning Inbox...'}
          </motion.span>
        </div>

        {/* Email Rows */}
        <div className="p-2 relative">
          {PREVIEW_EMAILS.map((email, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.15, x: -6 }}
              animate={{
                opacity: activeLine >= i ? 1 : 0.15,
                x: activeLine >= i ? 0 : -6,
              }}
              transition={{ duration: 0.35 }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 border transition-all duration-500 ${scanPhase === 'revealed' && email.isThreat
                  ? 'bg-red-500/[0.07] border-red-500/25'
                  : scanPhase === 'revealed' && !email.isThreat
                    ? 'bg-emerald-500/[0.04] border-emerald-500/10'
                    : 'bg-white/[0.02] border-transparent'
                }`}
            >
              {/* Sender Avatar */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black transition-colors duration-500 ${scanPhase === 'revealed' && email.isThreat ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/30'
                }`}>
                {email.sender[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-white/70 truncate">{email.sender}</span>
                </div>
                <div className={`text-[8px] truncate transition-colors duration-500 ${scanPhase === 'revealed' && email.isThreat ? 'text-red-400/80 font-bold' : 'text-white/25'
                  }`}>
                  {scanPhase === 'revealed' && email.isThreat ? email.senderEmail : email.subject}
                </div>
              </div>

              {/* Status Icon */}
              <AnimatePresence>
                {scanPhase === 'revealed' && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, delay: i * 0.08 }}
                  >
                    {email.isThreat
                      ? <AlertTriangle size={11} className="text-red-400 shrink-0" />
                      : <CheckCircle2 size={11} className="text-emerald-400/70 shrink-0" />
                    }
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Scan Beam */}
          {scanPhase === 'scanning' && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                initial={{ top: '10%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 2.8, ease: 'linear' }}
                className="absolute left-0 right-0 h-[1px] bg-accent shadow-[0_0_12px_rgba(45,91,255,0.7)]"
              />
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <AnimatePresence>
          {scanPhase === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2.5 border-t border-white/[0.06] flex items-center justify-between"
            >
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Scan Complete</span>
              <span className="text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                2 Threats Found
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
