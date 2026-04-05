import { useState, useEffect } from 'react';
import { PhoneCall, Phone, MicOff, Grid, Volume2, ShieldAlert, Signal, Wifi, Battery } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Trophy, CheckCircle2, XCircle, AlertTriangle, Target, Clock, AlertOctagon } from 'lucide-react';

export default function VishingModule({ payload, onFail, onSuccess, onExit, isXRay }) {
  const [activeCallIndex, setActiveCallIndex] = useState(0);
  const [callState, setCallState] = useState('incoming'); // incoming, active, ended
  const [callDuration, setCallDuration] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  
  // Game states
  const [feedback, setFeedback] = useState(null);
  const [showScorecard, setShowScorecard] = useState(false);
  const [stats, setStats] = useState({ threatsFound: 0, mistakes: 0, startTime: Date.now(), endTime: null });
  const totalThreats = payload.calls.filter(c => c.isThreat).length;
  
  const currentCall = payload.calls[activeCallIndex];
  
  useEffect(() => {
    let interval;
    if (callState === 'active') {
      interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => {
      clearInterval(interval);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [callState]);

  useEffect(() => {
    if (callState === 'active' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = currentCall.audioSequence[audioIndex];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = currentCall.isThreat ? 0.7 : 1.0; 
      window.speechSynthesis.speak(utterance);
    }
  }, [audioIndex, callState, currentCall]);

  const toggleCall = () => {
    if (callState === 'incoming') setCallState('active');
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextAudio = () => {
    if (audioIndex < currentCall.audioSequence.length - 1) {
      setAudioIndex(audioIndex + 1);
    }
  };

  const triggerFeedback = (isCorrect, message, isThreatDetected) => {
    setStats(s => ({
      ...s,
      mistakes: s.mistakes + (isCorrect ? 0 : 1),
      threatsFound: s.threatsFound + (isThreatDetected ? 1 : 0)
    }));
    setFeedback({
      isCorrect,
      title: isCorrect ? (isThreatDetected ? "Threat Detected" : "Safe Action") : "Action Failed",
      message
    });
  };

  const handleCallAction = (isVulnerable) => {
    if (isVulnerable && currentCall.isThreat) {
      triggerFeedback(false, "You fell for the social engineering tactic! " + (currentCall.redFlags[0]?.hint || ""), false);
    } else if (isVulnerable && !currentCall.isThreat) {
      triggerFeedback(false, "Divulging unprompted sensitive info is against protocol.", false); 
    } else if (!isVulnerable && currentCall.isThreat) {
      triggerFeedback(true, "Nice work! You correctly hung up and neutralized the vishing attempt.", true);
    } else {
      triggerFeedback(true, "Good call. You securely handled an internal communication.", false);
    }
  };

  const declineIncoming = () => {
    if (currentCall.isThreat) {
       triggerFeedback(true, "Excellent. You proactively rejected a known malicious caller ID.", true);
    } else {
       triggerFeedback(false, "You hung up on internal communications from " + currentCall.callerName + ".", false);
    }
  };

  const closeFeedback = () => {
    setFeedback(null);
    if (activeCallIndex < payload.calls.length - 1) {
      setCallState('ended');
      setTimeout(() => {
        setActiveCallIndex(i => i + 1);
        setCallState('incoming');
        setAudioIndex(0);
        setCallDuration(0);
      }, 500);
    } else {
      setStats(s => ({ ...s, endTime: Date.now() }));
      setShowScorecard(true);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/80 font-sans p-8">
      <div className="relative w-full max-w-[360px] h-full max-h-[720px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Notch and Status Bar */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-between items-center px-6 z-50 text-[10px] font-bold text-white tracking-widest pt-1">
          <div>23:04</div>
          <div className="absolute inset-x-0 top-0 mx-auto w-32 h-6 bg-slate-800 rounded-b-xl" />
          <div className="flex items-center gap-2 opacity-80">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-16 px-6 pb-6 relative z-10 transition-colors duration-500">
           
           {/* Caller Info */}
           <div className="text-center mt-8 min-h-[140px]">
             <h2 className="text-3xl font-light text-white mb-2">{currentCall.callerName}</h2>
             <p className={`text-sm ${isXRay && currentCall.isThreat ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                {currentCall.callerNumber}
             </p>
             {isXRay && currentCall.isThreat && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] uppercase font-bold p-2 mt-4 rounded-lg inline-block">
                  Spoofed Caller ID Detected
                </div>
             )}
             <div className="mt-8 flex flex-col items-center gap-1">
               <span className="text-slate-300 font-medium tracking-wider">
                 {callState === 'incoming' ? 'Incoming Call...' : callState === 'ended' ? 'Call Ended' : formatTime(callDuration)}
               </span>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                 Simulation: Call {activeCallIndex + 1} of {payload.calls.length}
               </span>
             </div>
             
             {/* Progress indicator */}
             <div className="mt-4 flex gap-2 justify-center">
               {payload.calls.map((c, i) => (
                 <div key={c.id} className={`w-1.5 h-1.5 rounded-full ${i === activeCallIndex ? 'bg-white' : i < activeCallIndex ? 'bg-emerald-500' : 'bg-white/20'}`} />
               ))}
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
                        
                        <p>"{currentCall.audioSequence[audioIndex]}"</p>
                        
                        {isXRay && currentCall.isThreat && currentCall.redFlags?.some(f => currentCall.audioSequence[audioIndex].includes(f.text)) && (
                           <div className="mt-4 text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-900/40 p-2 rounded border border-red-500/30">
                              🚩 Red Flag Triggered
                           </div>
                        )}
                        
                        {audioIndex < currentCall.audioSequence.length - 1 && (
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
                     <button onClick={declineIncoming} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors">
                       <Phone className="rotate-[135deg]" size={28} />
                     </button>
                     <span className="text-white/50 text-xs tracking-wider">Decline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <button onClick={toggleCall} className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors animate-pulse">
                       <Phone className="rotate-0" size={28} />
                     </button>
                     <span className="text-white/50 text-xs tracking-wider">Accept</span>
                  </div>
                </div>
             ) : callState === 'active' ? (
                <div className="space-y-6 pb-6">
                   <div className="grid grid-cols-3 gap-4 px-6 text-white text-[10px] uppercase text-center font-medium">
                      <div className="flex flex-col items-center gap-2 opacity-50"><MicOff size={24} /><span>Mute</span></div>
                      <div className="flex flex-col items-center gap-2 opacity-50"><Grid size={24} /><span>Keypad</span></div>
                      <div className="flex flex-col items-center gap-2 opacity-50"><Volume2 size={24} /><span>Speaker</span></div>
                   </div>
                   
                   <div className="flex justify-center pt-8">
                      {audioIndex === currentCall.audioSequence.length - 1 ? (
                         <div className="flex gap-4 w-full px-4">
                            <button onClick={() => handleCallAction(false)} className="flex-1 py-4 rounded-xl bg-red-500/20 text-red-500 font-bold border border-red-500/30 hover:bg-red-500 hover:text-white transition-all text-[10px] uppercase tracking-widest leading-relaxed">
                               {currentCall.actionSafe}
                            </button>
                            <button onClick={() => handleCallAction(true)} className="flex-1 py-4 rounded-xl bg-blue-500 text-white font-bold border border-blue-500 hover:bg-blue-600 transition-all text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.5)] leading-relaxed">
                               {currentCall.actionThreat}
                            </button>
                         </div>
                      ) : (
                         <button onClick={() => handleCallAction(false)} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors">
                           <Phone className="rotate-[135deg]" size={28} />
                         </button>
                      )}
                   </div>
                </div>
             ) : (
                <div className="flex justify-center px-8 pb-8 opacity-50">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                    <Phone className="rotate-[135deg]" size={28} />
                  </div>
                </div>
             )}
             
             {/* Intermediate Feedback Modal overlaying phone */}
             <AnimatePresence>
               {feedback && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute inset-x-4 inset-y-16 bg-[#050505]/95 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center z-[100]"
                 >
                   <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${feedback.isCorrect ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : 'border-red-500/30 text-red-500 bg-red-500/10'}`}>
                     {feedback.isCorrect ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                   </div>
                   <h3 className={`font-mono font-bold text-lg mb-2 uppercase ${feedback.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                     {feedback.title}
                   </h3>
                   <p className="text-white/60 text-xs leading-relaxed mb-8 font-mono">
                     {feedback.message}
                   </p>
                   
                   <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono text-white/40 mb-2">
                     <span>Progress</span>
                     <span>{activeCallIndex + 1}/{payload.calls.length}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{ width: `${((activeCallIndex + 1) / payload.calls.length) * 100}%` }} />
                   </div>
                   
                   <button onClick={closeFeedback} className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 font-mono text-xs text-white uppercase tracking-widest transition-all">
                     Continue Scanning
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>
      </div>
      
      {/* End Scorecard Overriding Everything */}
      <AnimatePresence>
        {showScorecard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#050505] z-[200] overflow-y-auto custom-scrollbar font-mono">
            <div className="min-h-full flex flex-col items-center justify-center p-8">
              <div className="max-w-xl w-full">
                 <div className="flex flex-col items-center text-center mb-8">
                   <div className="w-16 h-16 rounded-[1.5rem] border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                      <Trophy size={28} />
                   </div>
                   <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Mission Complete</h1>
                   <p className="text-white/40 text-[10px] uppercase tracking-widest">
                     {stats.mistakes === 0 ? "All directives successfully resolved." : "Operations completed with infractions."}
                   </p>
                 </div>
                 
                 {/* Grade */}
                 <div className="flex flex-col items-center mb-10 relative">
                   <div className="absolute opacity-10">
                     <div className="w-3 h-3 bg-white rounded-full absolute -top-4 left-8" />
                     <div className="w-6 h-6 border border-white rounded-full absolute -right-12 top-2" />
                   </div>
                   <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mb-2">Performance Grade</span>
                   {(() => {
                     const acc = Math.round(((payload.calls.length - stats.mistakes) / payload.calls.length) * 100);
                     const grade = acc === 100 ? 'S' : acc >= 66 ? 'A' : acc >= 33 ? 'C' : 'F';
                     const colors = { 'S': 'text-emerald-400', 'A': 'text-blue-400', 'C': 'text-orange-400', 'F': 'text-red-500' };
                     return <div className={`text-[8rem] leading-none font-black ${colors[grade]}`}>{grade}</div>;
                   })()}
                 </div>
                 
                 {/* Metrics Grid */}
                 <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col">
                     <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">
                       <Target size={12} className="text-emerald-400"/> Threats Found
                     </div>
                     <div className="text-2xl font-black text-white">{stats.threatsFound}<span className="text-white/20 text-lg">/{totalThreats}</span></div>
                   </div>
                   
                   <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col">
                     <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">
                       <AlertOctagon size={12} className="text-blue-400"/> Accuracy
                     </div>
                     <div className="text-2xl font-black text-white">
                       {Math.round(((payload.calls.length - stats.mistakes) / payload.calls.length) * 100)}<span className="text-white/20 text-lg">%</span>
                     </div>
                   </div>
                   
                   <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col">
                     <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">
                       <Clock size={12} className="text-indigo-400"/> Time Elapsed
                     </div>
                     <div className="text-2xl font-black text-white">
                       {Math.floor((stats.endTime - stats.startTime) / 60000)}m {Math.floor(((stats.endTime - stats.startTime) % 60000) / 1000)}s
                     </div>
                   </div>
                   
                   <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col">
                     <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">
                       <AlertTriangle size={12} className="text-red-400"/> Mistakes
                     </div>
                     <div className="text-2xl font-black text-white">{stats.mistakes}</div>
                   </div>
                 </div>
                 
                 {/* Progress Bar overall */}
                 <div className="w-full h-1.5 bg-white/5 rounded-full mb-10 overflow-hidden flex">
                   <div className="bg-blue-500 h-full" style={{ width: '40%' }} />
                   <div className="bg-emerald-400 h-full" style={{ width: '40%' }} />
                   <div className="bg-orange-400 h-full" style={{ width: '20%' }} />
                 </div>
                 
                 <button onClick={onExit} className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-emerald-400 hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                   Return To Briefing
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
