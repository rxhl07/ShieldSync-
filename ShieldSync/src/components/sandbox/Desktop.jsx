import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, AlertTriangle, ArrowLeft, MoreVertical, Paperclip, CheckCircle2, ShieldAlert, XCircle } from 'lucide-react';
import WindowWrapper from './WindowWrapper';
import Taskbar from './Taskbar';
import { MINI_GAME_EMAIL } from '../../utils/constants';

function SyncMail({ onFail, onSuccess, isXRay }) {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const inbox = [
    { id: 1, sender: "Netflix Protocol", subject: "Immediate action: Payment authentication required", read: false },
    { id: 2, sender: MINI_GAME_EMAIL.senderDisplay, subject: MINI_GAME_EMAIL.subject, read: false, isPhish: true },
    { id: 3, sender: "LinkNet Security", subject: "New login detected from 192.168.1.104", read: true },
    { id: 4, sender: "Alice [Admin]", subject: "Final project assets for v2 launch", read: true },
  ];

  return (
    <div className="flex h-full bg-white dark:bg-[#050505] text-slate-800 dark:text-white/80 transition-colors duration-500 font-sans">
      {/* Sidebar */}
      <div className="w-56 bg-slate-50 dark:bg-white/5 border-r border-slate-200 dark:border-white/10 p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Mail size={16} className="text-white" />
          </div>
          <span className="font-black tracking-tight text-slate-900 dark:text-white text-lg">SyncMail</span>
        </div>
        
        <button className="bg-accent text-white px-5 py-3.5 rounded-2xl w-full flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest mb-8 hover:shadow-[0_10px_20px_rgba(45,91,255,0.3)] transition-all active:scale-95">
          Compose
        </button>
        
        <div className="space-y-2 flex-1">
          {['Inbox', 'Priority', 'Drafts', 'Archives', 'Spam'].map((item, i) => (
            <div key={item} className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer transition-all ${i === 0 ? 'bg-accent/10 text-accent' : 'text-slate-400 dark:text-white/30 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Mail Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Search Bar */}
        <div className="h-20 border-b border-slate-200 dark:border-white/10 flex items-center px-8 shrink-0 bg-white dark:bg-[#050505]">
          <div className="bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center px-6 py-3 w-full max-w-2xl border border-transparent focus-within:border-accent/30 transition-all">
            <Search size={18} className="text-slate-400 mr-4" />
            <input type="text" placeholder="Search secure communications..." className="bg-transparent outline-none flex-1 text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-white/20" />
          </div>
        </div>

        {!selectedEmail ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {inbox.map((email) => (
              <motion.div 
                key={email.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedEmail(email)}
                className={`flex items-center px-6 py-4 rounded-2xl cursor-pointer transition-all border ${
                  !email.read 
                    ? 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 shadow-sm' 
                    : 'bg-transparent border-transparent text-slate-400 dark:text-white/30 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-56 truncate flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${!email.read ? 'bg-accent shadow-[0_0_8px_#2D5BFF]' : 'bg-transparent'}`} />
                  <span className={`text-sm tracking-tight ${!email.read ? 'font-black text-slate-900 dark:text-white' : 'font-medium'}`}>{email.sender}</span>
                </div>
                <div className={`flex-1 truncate text-sm px-4 ${!email.read ? 'font-bold text-slate-700 dark:text-white/80' : 'font-medium'}`}>
                  {email.subject}
                </div>
                <div className="text-[10px] font-mono font-bold opacity-30">12:44 PM</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white dark:bg-[#050505] overflow-y-auto">
            <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md z-10">
              <button 
                onClick={() => setSelectedEmail(null)} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-500 dark:text-white/40"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => selectedEmail.isPhish ? onSuccess() : onFail()} 
                  className={`flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                    isXRay && selectedEmail.isPhish 
                      ? 'bg-red-500 text-white border-red-500 shadow-[0_10px_20px_rgba(239,68,68,0.3)]' 
                      : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <ShieldAlert size={14} /> Report Threat
                </button>
              </div>
            </div>

            <div className="p-10 max-w-4xl mx-auto w-full">
              <h1 className="text-3xl font-black text-slate-950 dark:text-white mb-8 tracking-tight transition-colors">{selectedEmail.subject}</h1>
              
              <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent/20 ${selectedEmail.isPhish ? 'bg-amber-600' : 'bg-accent'}`}>
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 dark:text-white text-sm">{selectedEmail.sender}</span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${isXRay && selectedEmail.isPhish ? 'bg-red-500/10 text-red-500 border border-red-500/30 relative group cursor-help' : 'text-slate-400 dark:text-white/30'}`}>
                        &lt;{selectedEmail.isPhish ? MINI_GAME_EMAIL.sender : 'internal@linknet.com'}&gt;
                        {isXRay && selectedEmail.isPhish && (
                          <div className="absolute bottom-full left-0 mb-3 w-64 bg-red-600 text-white p-4 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl leading-relaxed">
                            <span className="font-black uppercase block mb-1">Vector Detected</span>
                            🚩 Unverified external domain spoofing LinkNet protocols.
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 italic">to: confidential.user@frontier.io</div>
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-300">OCT 14, 2026 (2h ago)</div>
              </div>

              {selectedEmail.isPhish ? (
                <div className="text-base text-slate-700 dark:text-white/80 font-medium space-y-6 max-w-2xl leading-relaxed transition-colors">
                  {MINI_GAME_EMAIL.body.split('\n').map((line, i) => {
                    const isTrapLink = line.includes('Verify Your Account');
                    const flag = isXRay ? MINI_GAME_EMAIL.redFlags.find(f => line.includes(f.text)) : null;

                    if (isTrapLink) {
                      return (
                         <div key={i} className="my-10">
                            <button 
                              onClick={() => selectedEmail.isPhish ? onFail() : onSuccess()}
                              className={`px-10 py-5 bg-accent text-white font-black uppercase tracking-[0.2em] rounded-2xl text-xs hover:shadow-[0_20px_40px_rgba(45,91,255,0.3)] transition-all relative group ${
                                isXRay ? 'ring-4 ring-red-500 ring-offset-4 dark:ring-offset-[#050505]' : ''
                              }`}
                            >
                              {line.replace('→ ', '')}
                              {isXRay && (
                                <div className="absolute top-full left-0 mt-4 w-64 bg-red-600 text-white p-4 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl leading-relaxed">
                                  <span className="font-black uppercase block mb-1">Exploit Trigger</span>
                                  🚩 Malicious payload delivery hidden behind generic CTA text.
                                </div>
                              )}
                            </button>
                         </div>
                      );
                    }

                    return (
                      <p key={i}>
                        {flag ? (
                          <span className="relative group cursor-help inline-block bg-red-500/5 text-red-600 dark:text-red-400 border-b-2 border-red-500 py-0.5 px-1 rounded-sm">
                             {line}
                             <div className="absolute bottom-full left-0 mb-3 w-64 bg-red-600 text-white p-4 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl leading-relaxed">
                               <span className="font-black uppercase block mb-1">Intelligence Hint</span>
                               🚩 {flag.hint}
                             </div>
                          </span>
                        ) : (
                          line
                        )}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <div className="text-base text-slate-700 dark:text-white/80 font-medium">
                  <p>Protocol identified as safe. No malicious payloads detected in this communication stream.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Desktop({ status, onFail, onSuccess, isXRay }) {
  return (
    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
      {/* OS Wallpaper with depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#121218_0%,_#050505_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <AnimatePresence>
        {/* Failure Overlay */}
        {status === 'failed' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-red-950/40"
          >
            <div className="scanline-overlay" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative p-12 bg-black/90 border border-red-500/50 rounded-[2.5rem] shadow-[0_0_100px_rgba(239,68,68,0.4)] text-center max-w-lg"
            >
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                <XCircle size={48} className="text-red-500 animate-pulse" />
              </div>
              <h2 className="text-5xl font-black text-red-500 mb-6 tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                SYSTEMS <br/> COMPROMISED
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-6" />
              <p className="text-red-400 font-mono text-sm leading-relaxed uppercase tracking-widest">
                Phishing payload successfully deployed. <br/> 
                <span className="opacity-60">Credentials leaked to external enclave.</span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Success Overlay */}
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-emerald-950/40"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative p-12 bg-black/90 border border-emerald-500/50 rounded-[2.5rem] shadow-[0_0_100px_rgba(34,197,94,0.3)] text-center max-w-lg"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-4xl font-black text-emerald-500 mb-6 tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                DIRECTIVE <br/> SECURED
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-6" />
              <p className="text-white/60 font-mono text-sm uppercase tracking-widest leading-relaxed">
                Threat neutralized effectively. <br/> 
                <span className="text-emerald-400">X-Ray analysis mode now active.</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sandbox Windows */}
      <WindowWrapper
        title="SyncMail Enterprise Enclave"
        defaultSize={{ width: 1000, height: 750 }}
        defaultPosition={{ x: 50, y: 50 }}
        onClose={() => {}}
        onMinimize={() => {}}
      >
         <div className="w-full h-full relative" style={{ filter: isXRay ? 'contrast(1.1) brightness(0.95)' : 'none' }}>
           {isXRay && <div className="scanline-overlay z-[60] opacity-30" />}
           <SyncMail onFail={onFail} onSuccess={onSuccess} isXRay={isXRay} />
         </div>
      </WindowWrapper>

      <Taskbar />
    </div>
  );
}
