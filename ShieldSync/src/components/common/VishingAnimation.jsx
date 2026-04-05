import { motion } from 'framer-motion';
import { Phone, ShieldAlert, Cpu } from 'lucide-react';

export default function VishingAnimation() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center bg-[#0B0E14]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Background Pulse */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-[80px]"
      />

      {/* The Spoofed Phone UI */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-64 glass-panel border border-white/10 rounded-[2rem] p-6 flex flex-col items-center bg-black/60 shadow-2xl backdrop-blur-md"
      >
        <motion.div 
          animate={{ opacity: [1, 0.5, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em] mb-4 flex items-center gap-2"
        >
          <ShieldAlert size={12} /> Incoming Threat
        </motion.div>

        {/* Glitching Caller ID */}
        <div className="relative h-12 flex items-center justify-center mb-6">
          <motion.div
            animate={{ 
              opacity: [1, 1, 0, 1, 1],
              scale: [1, 1, 1.05, 1, 1],
              x: [0, -2, 2, 0, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <Cpu className="text-white/40 mb-2" size={24} />
            <span className="font-bold text-white tracking-widest uppercase">Bank Support</span>
          </motion.div>
          
          <motion.div
            animate={{ 
              opacity: [0, 0, 1, 0, 0],
              color: ['#FF003C', '#FF003C', '#FF003C', '#FF003C', '#FF003C']
            }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center font-mono text-xl"
          >
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Spoofed ID</span>
          </motion.div>
        </div>

        <p className="text-xs text-white/40 font-mono mb-8">AI Voice Clone Active</p>

        {/* Fake Audio Waves */}
        <div className="flex gap-1.5 items-center justify-center h-12 mb-8">
          {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((bar, i) => (
            <motion.div
              key={i}
              animate={{ height: ['10px', `${10 + bar * 6}px`, '10px'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className="w-1.5 rounded-full bg-[#00F2FF]"
            />
          ))}
        </div>

        {/* Call Buttons */}
        <div className="flex gap-6 w-full justify-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0px #FF003C', '0 0 20px #FF003C', '0 0 0px #FF003C'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50 text-red-500"
          >
            <Phone size={18} className="rotate-[135deg]" />
          </motion.div>
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 text-green-500">
            <Phone size={18} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
