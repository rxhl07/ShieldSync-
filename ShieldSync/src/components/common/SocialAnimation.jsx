import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldAlert, User } from 'lucide-react';

const MESSAGES = [
  { sender: 'friend', text: "Hey! It's been a while 👋", time: '10:42 AM', delay: 800 },
  { sender: 'friend', text: "I found this old photo of us from the retreat 😂", time: '10:43 AM', delay: 1800 },
  { sender: 'friend', text: "http://bit.ly/retreat_photo_archive", time: '10:43 AM', delay: 2800, isTrap: true },
];

export default function SocialAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      while (active) {
        setVisibleCount(0);
        setShowWarning(false);
        for (let i = 0; i < MESSAGES.length; i++) {
          await new Promise(r => setTimeout(r, i === 0 ? 800 : 1000));
          if (!active) return;
          setVisibleCount(i + 1);
        }
        await new Promise(r => setTimeout(r, 1000));
        if (!active) return;
        setShowWarning(true);
        await new Promise(r => setTimeout(r, 3500));
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center bg-[#0B0E14]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-[80px]"
      />

      {/* Chat Window */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-72 glass-panel border border-white/10 rounded-2xl overflow-hidden bg-black/60 shadow-2xl backdrop-blur-md"
      >
        {/* Header */}
        <div className="h-12 bg-white/[0.04] border-b border-white/[0.07] flex items-center gap-3 px-4">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              className="w-7 h-7 rounded-full bg-slate-800"
              alt="avatar"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black text-white truncate">Sarah Jenkins</div>
            <div className="text-[8px] text-white/30 font-mono">@sarah.j.dev</div>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <ShieldAlert size={12} className="text-red-500" />
          </motion.div>
        </div>

        {/* Messages */}
        <div className="p-3 space-y-2.5 min-h-[120px] bg-[#0D0D0D]">
          <AnimatePresence>
            {MESSAGES.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-end gap-2"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  className="w-4 h-4 rounded-full bg-slate-800 shrink-0 mb-0.5"
                  alt="avatar"
                />
                {msg.isTrap ? (
                  <motion.div
                    animate={showWarning ? {
                      boxShadow: ['0 0 0px rgba(239,68,68,0)', '0 0 16px rgba(239,68,68,0.5)', '0 0 0px rgba(239,68,68,0)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`px-3 py-1.5 rounded-xl rounded-bl-none text-[9px] leading-relaxed flex items-center gap-1.5 underline break-all transition-all duration-500 ${showWarning
                        ? 'bg-red-600/80 text-white border border-red-500/60'
                        : 'bg-blue-600/80 text-white'
                      }`}
                  >
                    <ExternalLink size={9} />
                    {msg.text}
                  </motion.div>
                ) : (
                  <div className="bg-[#262626] text-white/80 px-3 py-1.5 rounded-xl rounded-bl-none text-[9px] leading-relaxed border border-white/5">
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Warning badge */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2.5 border-t border-red-500/20 bg-red-500/[0.06] flex items-center justify-between"
            >
              <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Malicious URL Detected</span>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-red-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Compromised Profile Badge */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
              <User size={9} className="text-red-400" />
              <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Account Hijacked</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <ShieldAlert size={9} className="text-amber-400" />
              <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest">Session Steal Risk</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
