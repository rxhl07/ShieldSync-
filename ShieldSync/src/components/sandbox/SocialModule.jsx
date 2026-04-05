import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldAlert, CheckCircle2, Search, MoreHorizontal, User, Send, Clock } from 'lucide-react';

export default function SocialModule({ payload, onFail, onReportSuccess, onReportFail, onSafeLink, detectedThreats, isXRay }) {
  const [activeTab, setActiveTab] = useState('chat'); // chat, profile
  const [selectedConvId, setSelectedConvId] = useState(payload.conversations?.[0]?.id);
  const [hasSeen, setHasSeen] = useState(new Set([payload.conversations?.[0]?.id]));
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const activeConv = payload.conversations?.find(c => c.id === selectedConvId) || payload.conversations?.[0] || payload;

  useEffect(() => {
    if (!hasSeen.has(selectedConvId)) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setHasSeen(prev => new Set([...prev, selectedConvId]));
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [selectedConvId]);

  useEffect(() => {
     if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
     }
  }, [selectedConvId, isTyping]);


  return (
    <div className="flex h-full bg-[#1A1A1A] text-white font-sans overflow-hidden">
       {/* Sidebar */}
       <div className="w-64 border-r border-white/10 hidden md:flex flex-col">
          <div className="h-16 border-b border-white/10 flex items-center px-6">
            <h1 className="font-bold text-lg tracking-tight">{payload.platform}</h1>
          </div>
          <div className="p-4">
             <div className="bg-white/5 rounded-xl px-4 py-2 flex items-center gap-3 text-white/40">
                <Search size={16} />
                <span className="text-sm">Search messages</span>
             </div>
          </div>
          <div className="flex-1 overflow-y-auto">
              {payload.conversations?.map((conv) => (
                 <div 
                   key={conv.id}
                   onClick={() => { setSelectedConvId(conv.id); setActiveTab('chat'); }}
                   className={`px-4 py-3 flex items-center gap-4 cursor-pointer border-b border-white/5 transition-colors relative ${selectedConvId === conv.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                 >
                    <div className="relative">
                      <img src={conv.friendAvatar} alt="avatar" className="w-12 h-12 rounded-full bg-slate-800" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A1A1A]" />
                    </div>
                    <div className="flex-1 truncate">
                       <div className="flex items-center justify-between">
                          <div className="font-bold text-sm truncate">{conv.friendHandle}</div>
                          {!hasSeen.has(conv.id) && (
                             <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                          )}
                       </div>
                       <div className="text-xs text-white/50 truncate">
                          {conv.messages[conv.messages.length - 1]?.text}
                       </div>
                    </div>
                 </div>
              ))}
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 flex flex-col bg-[#0D0D0D] relative">
          
          <div className="w-full h-full flex flex-col bg-[#1A1A1A] border-l border-white/10 overflow-hidden shadow-2xl">
             
             {/* Header */}
             <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
                <div className="flex items-center gap-4">
                   <img src={activeConv.friendAvatar} alt="avatar" className="w-10 h-10 rounded-full bg-slate-800" />
                   <div>
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-sm tracking-tight">{activeConv.friendName}</div>
                        {isXRay && !activeConv.isThreat && (
                          <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest border border-emerald-500/30">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{activeConv.friendHandle}</div>
                   </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="hidden lg:flex items-center gap-1 bg-black/40 p-1 rounded-lg shrink-0">
                      <button 
                        onClick={() => setActiveTab('chat')} 
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === 'chat' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                      >
                        Chat
                      </button>
                      <button 
                        onClick={() => setActiveTab('profile')} 
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all relative ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                      >
                        <User size={12} /> Profile
                        {isXRay && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
                      </button>
                   </div>

                   {/* Key Action Moved to Header */}
                   <div className="shrink-0">
                      {detectedThreats.includes(activeConv.id) ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest">
                           <CheckCircle2 size={14} /> Reported
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            if (activeConv.isThreat) {
                              onReportSuccess(activeConv.id);
                            } else {
                              onReportFail();
                            }
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${isXRay ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/50' : 'bg-white/10 text-white hover:bg-white/20 border-white/10'}`}
                        >
                          <ShieldAlert size={14} /> Report
                        </button>
                      )}
                   </div>
                </div>
             </div>

             {/* Content Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto relative bg-[#0D0D0D] scroll-smooth">
                 {activeTab === 'chat' ? (
                    <div className="p-6 space-y-4 flex flex-col min-h-full">
                       <div className="text-center text-[9px] text-white/10 font-black uppercase tracking-[0.4em] mb-4">
                          Encrypted Session
                       </div>
                       
                       <AnimatePresence mode='popLayout'>
                       {!isTyping ? (
                         <motion.div 
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           className="space-y-4"
                         >
                            {activeConv.messages.map((msg, i) => (
                               <motion.div 
                                 key={i} 
                                 initial={{ opacity: 0, x: msg.sender === 'friend' ? -10 : 10 }} 
                                 animate={{ opacity: 1, x: 0 }}
                                 className={`flex items-end gap-2 ${msg.sender === 'friend' ? '' : 'flex-row-reverse'}`}
                               >
                                  {msg.sender === 'friend' && <img src={activeConv.friendAvatar} alt="avatar" className="w-5 h-5 rounded-full bg-slate-800 mb-1" />}
                                  
                                  <div className="max-w-[85%]">
                                     {msg.isTrapLink ? (
                                        <div className="relative group">
                                           <button 
                                             onClick={onFail} 
                                             className={`text-left bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl rounded-bl-sm transition-all text-xs leading-relaxed underline break-all flex items-center gap-2 shadow-lg ${isXRay ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#0D0D0D]' : ''}`}
                                           >
                                              <ExternalLink size={14} />
                                              {msg.text}
                                           </button>
                                           {isXRay && (
                                             <div className="absolute top-full left-0 mt-2 w-64 bg-red-600 text-white p-3 text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl leading-relaxed">
                                                🚩 Malicious payloader hidden in link.
                                             </div>
                                           )}
                                        </div>
                                     ) : msg.text.includes('http') ? (
                                        <button 
                                          onClick={() => onSafeLink?.()}
                                          className="text-left bg-[#262626] hover:bg-[#333333] text-blue-400 px-4 py-2 rounded-xl rounded-bl-sm transition-all text-xs leading-relaxed underline break-all flex items-center gap-2"
                                        >
                                           <ExternalLink size={14} />
                                           {msg.text}
                                        </button>
                                     ) : (
                                        <div className="bg-[#262626] text-white px-4 py-2 rounded-xl rounded-bl-sm text-xs leading-relaxed border border-white/5">
                                           {msg.text}
                                        </div>
                                     )}
                                     <div className={`text-[8px] text-white/20 mt-1 font-mono ${msg.sender === 'friend' ? 'text-left' : 'text-right'}`}>
                                       {msg.time}
                                     </div>
                                  </div>
                               </motion.div>
                            ))}
                         </motion.div>
                       ) : (
                         <motion.div 
                           key="typing"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="flex items-center gap-3"
                         >
                            <img src={activeConv.friendAvatar} alt="avatar" className="w-5 h-5 rounded-full bg-slate-800" />
                            <div className="bg-[#262626] px-4 py-2 rounded-xl rounded-bl-sm flex gap-1">
                               <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                               <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                               <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                         </motion.div>
                       )}
                       </AnimatePresence>
                    </div>
                ) : (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 flex flex-col items-center">
                      <div className="relative group mb-6">
                        <img src={activeConv.friendAvatar} alt="avatar" className={`w-32 h-32 rounded-full border-4 ${isXRay ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-[#262626]'}`} />
                        {isXRay && (
                          <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-48 text-left leading-relaxed">
                             🚩 Profile picture updated 2 hours ago from foreign IP.
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold tracking-tight mb-1">{activeConv.friendName}</h2>
                      <p className="text-white/40 text-sm mb-6">{activeConv.friendHandle}</p>
                      
                      <div className="flex gap-8 mb-8 w-full max-w-xs justify-between">
                         <div className="text-center">
                           <div className="font-bold text-xl">0</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Posts</div>
                         </div>
                          <div className={`text-center relative group ${isXRay ? 'text-red-400' : ''}`}>
                           <div className="font-bold text-xl">{activeConv.profile.followers}</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Followers</div>
                           {isXRay && (
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-48 text-left leading-relaxed">
                                🚩 Bot followers detected. Zero engagement on network.
                             </div>
                           )}
                         </div>
                         <div className="text-center">
                           <div className="font-bold text-xl">{activeConv.profile.following}</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Following</div>
                         </div>
                      </div>
                      
                      <div className={`text-center max-w-sm text-sm leading-relaxed p-4 rounded-xl relative group cursor-help ${isXRay ? 'bg-red-500/10 border border-red-500/30 text-red-100' : 'bg-white/5 text-white/80'}`}>
                         {activeConv.profile.bio}
                         {isXRay && (
                           <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-64 text-left leading-relaxed">
                              🚩 Bio changed to cryptocurrency scam script. High confidence of compromise.
                           </div>
                         )}
                      </div>

                      {/* Post Feed */}
                      <div className="w-full mt-10 border-t border-white/10 pt-8">
                         <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                            <Clock size={12} /> Recent Activity
                         </h3>
                         <div className="space-y-4">
                            {activeConv.profile.feed?.map((post, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="bg-white/5 p-4 rounded-xl border border-white/5"
                               >
                                  <div className="text-[9px] text-white/20 mb-2 font-mono uppercase italic">{post.date}</div>
                                  <div className="text-xs text-white/70 leading-relaxed italic">"{post.text}"</div>
                               </motion.div>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                )}
             </div>

             {/* Message Input (visual only) */}
              {activeTab === 'chat' && (
                 <div className="p-4 bg-[#1A1A1A] border-t border-white/10">
                    <div className="bg-white/5 rounded-full flex items-center px-4 py-3">
                       <div className="flex-1 text-sm text-white/30 italic">Message...</div>
                       <Send size={18} className="text-white/20" />
                    </div>
                 </div>
              )}

          </div>
       </div>
    </div>
  );
}
