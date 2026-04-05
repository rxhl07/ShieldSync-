import { useState, useEffect } from 'react';
import { PhoneCall, Phone, MicOff, Grid, Volume2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VishingModule({ payload, onFail, onSuccess, isXRay }) {
  const [callState, setCallState] = useState('incoming'); // incoming, active
  const [callDuration, setCallDuration] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  
  useEffect(() => {
    let interval;
    if (callState === 'active') {
      interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const toggleCall = () => {
    if (callState === 'incoming') setCallState('active');
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextAudio = () => {
    if (audioIndex < payload.audioSequence.length - 1) {
      setAudioIndex(audioIndex + 1);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/80 font-sans p-8">
      <div className="relative w-full max-w-[360px] h-full max-h-[720px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-1/3 h-full bg-slate-800 rounded-b-2xl" />
        </div>

        <div className="flex-1 flex flex-col pt-16 px-6 pb-6 relative z-10 transition-colors duration-500">
           
           {/* Caller Info */}
           <div className="text-center mt-8">
             <h2 className="text-3xl font-light text-white mb-2">{payload.callerName}</h2>
             <p className={`text-sm ${isXRay ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                {payload.callerNumber}
             </p>
             {isXRay && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] uppercase font-bold p-2 mt-4 rounded-lg inline-block">
                  Spoofed Caller ID Detected
                </div>
             )}
             <div className="mt-8 text-slate-300 font-medium">
               {callState === 'incoming' ? 'Incoming Call...' : formatTime(callDuration)}
             </div>
           </div>

           {/* Call Simulation Content */}
           <div className="flex-1 flex flex-col justify-center items-center">
             <AnimatePresence>
               {callState === 'active' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full relative">
                     <div className={`p-5 rounded-2xl border text-sm text-center leading-relaxed ${isXRay ? 'bg-red-500/10 border-red-500/50 text-red-100' : 'bg-slate-800/50 border-slate-700/50 text-slate-200'}`}>
                        {/* Audio visualizer fake */}
                        <div className="flex items-center justify-center gap-1 mb-4 h-6">
                           {[1,2,3,4,5,4,3,2].map((h, i) => (
                             <motion.div 
                               key={i} 
                               animate={{ height: ['40%', '100%', '40%'] }} 
                               transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                               className={`w-1 rounded-full ${isXRay ? 'bg-red-500' : 'bg-blue-400'}`} 
                             />
                           ))}
                        </div>
                        
                        <p>"{payload.audioSequence[audioIndex]}"</p>
                        
                        {isXRay && payload.redFlags.some(f => payload.audioSequence[audioIndex].includes(f.text)) && (
                           <div className="mt-4 text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-900/40 p-2 rounded border border-red-500/30">
                              🚩 Red Flag Triggered
                           </div>
                        )}
                        
                        {audioIndex < payload.audioSequence.length - 1 && (
                          <button onClick={handleNextAudio} className="mt-4 text-[10px] uppercase bg-slate-700 text-white px-3 py-1.5 rounded-full hover:bg-slate-600">
                             Simulate Listen &gt;
                          </button>
                        )}
                     </div>
                  </motion.div>
               )}
             </AnimatePresence>
           </div>

           {/* Call Actions */}
           <div className="mt-auto pt-8">
             {callState === 'incoming' ? (
                <div className="flex justify-between px-8 pb-8">
                  <div className="flex flex-col items-center gap-2">
                     <button onClick={onSuccess} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors">
                       <Phone className="rotate-[135deg]" size={28} />
                     </button>
                     <span className="text-white/50 text-xs">Decline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <button onClick={toggleCall} className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors animate-pulse">
                       <Phone className="rotate-0" size={28} />
                     </button>
                     <span className="text-white/50 text-xs">Accept</span>
                  </div>
                </div>
             ) : (
                <div className="space-y-6 pb-6">
                   <div className="grid grid-cols-3 gap-4 px-6 text-white text-[10px] uppercase text-center font-medium">
                      <div className="flex flex-col items-center gap-2 opacity-50"><MicOff size={24} /><span>Mute</span></div>
                      <div className="flex flex-col items-center gap-2 opacity-50"><Grid size={24} /><span>Keypad</span></div>
                      <div className="flex flex-col items-center gap-2 opacity-50"><Volume2 size={24} /><span>Speaker</span></div>
                   </div>
                   
                   <div className="flex justify-center pt-8">
                      {audioIndex === payload.audioSequence.length - 1 ? (
                         <div className="flex gap-4 w-full px-6">
                            <button onClick={onSuccess} className="flex-1 py-4 rounded-xl bg-red-500/20 text-red-500 font-bold border border-red-500/30 hover:bg-red-500 hover:text-white transition-all text-xs uppercase tracking-widest">
                               Hang Up
                            </button>
                            <button onClick={onFail} className="flex-1 py-4 rounded-xl bg-blue-500 text-white font-bold border border-blue-500 hover:bg-blue-600 transition-all text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                               Provide Code
                            </button>
                         </div>
                      ) : (
                         <button onClick={onSuccess} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors">
                           <Phone className="rotate-[135deg]" size={28} />
                         </button>
                      )}
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
