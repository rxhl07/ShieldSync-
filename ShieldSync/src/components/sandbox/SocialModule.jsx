import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldAlert, CheckCircle2, Search, MoreHorizontal, User, Send } from 'lucide-react';

export default function SocialModule({ payload, onFail, onSuccess, isXRay }) {
  const [activeTab, setActiveTab] = useState('chat'); // chat, profile

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
             <div className="px-4 py-3 bg-white/5 flex items-center gap-4 cursor-pointer">
                <div className="relative">
                  <img src={payload.friendAvatar} alt="avatar" className="w-12 h-12 rounded-full bg-slate-800" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A1A1A]" />
                </div>
                <div className="flex-1 truncate">
                   <div className="font-bold text-sm truncate">{payload.friendHandle}</div>
                   <div className="text-xs text-white/50 truncate">http://bit.ly/retreat_photo_a...</div>
                </div>
             </div>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0D0D0D]">
          
          <div className="w-full max-w-2xl h-full flex flex-col bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
             
             {/* Header */}
             <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                <div className="flex items-center gap-4">
                   <img src={payload.friendAvatar} alt="avatar" className="w-8 h-8 rounded-full bg-slate-800" />
                   <div>
                     <div className="font-bold text-sm tracking-tight">{payload.friendName}</div>
                     <div className="text-[10px] text-white/40 uppercase tracking-widest">{payload.friendHandle}</div>
                   </div>
                </div>
                
                <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg">
                   <button 
                     onClick={() => setActiveTab('chat')} 
                     className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'chat' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                   >
                     Messages
                   </button>
                   <button 
                     onClick={() => setActiveTab('profile')} 
                     className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all relative ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                   >
                     <User size={14} /> Profile
                     {isXRay && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
                   </button>
                </div>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto relative bg-[#0D0D0D]">
                {activeTab === 'chat' ? (
                   <div className="p-6 space-y-6">
                      <div className="text-center text-xs text-white/30 font-bold uppercase tracking-widest mb-8">
                         Today
                      </div>
                      
                      {payload.messages.map((msg, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ opacity: 0, y: 10 }} 
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.5 + 0.5 }}
                           className={`flex items-end gap-3 ${msg.sender === 'friend' ? '' : 'flex-row-reverse'}`}
                         >
                            {msg.sender === 'friend' && <img src={payload.friendAvatar} alt="avatar" className="w-6 h-6 rounded-full bg-slate-800 mb-1" />}
                            
                            <div className="max-w-[75%]">
                               {msg.isTrapLink ? (
                                  <div className="relative group">
                                     <button 
                                       onClick={onFail} 
                                       className={`text-left bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl rounded-bl-sm transition-all text-sm leading-relaxed underline break-all flex items-center gap-2 shadow-lg ${isXRay ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#0D0D0D]' : ''}`}
                                     >
                                        <ExternalLink size={16} />
                                        {msg.text}
                                     </button>
                                     {isXRay && (
                                       <div className="absolute top-full left-0 mt-3 w-64 bg-red-600 text-white p-4 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl leading-relaxed">
                                          <span className="font-black uppercase block mb-1">Malicious URL</span>
                                          🚩 Hidden payload session hijacker located in bit.ly shortcut.
                                       </div>
                                     )}
                                  </div>
                               ) : (
                                  <div className="bg-[#262626] text-white px-5 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed">
                                     {msg.text}
                                  </div>
                               )}
                               <div className={`text-[10px] text-white/30 mt-1 font-mono ${msg.sender === 'friend' ? 'text-left' : 'text-right'}`}>
                                 {msg.time}
                               </div>
                            </div>
                         </motion.div>
                      ))}
                      
                      {/* Defender specific action */}
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 2.5 }}
                        className="flex justify-center mt-12"
                      >
                         <button 
                           onClick={onSuccess} 
                           className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${isXRay ? 'bg-green-500/10 text-green-500 border-green-500/50' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'}`}
                         >
                           <CheckCircle2 size={16} /> Block & Report Account
                         </button>
                      </motion.div>
                   </div>
                ) : (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 flex flex-col items-center">
                      <div className="relative group mb-6">
                        <img src={payload.friendAvatar} alt="avatar" className={`w-32 h-32 rounded-full border-4 ${isXRay ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-[#262626]'}`} />
                        {isXRay && (
                          <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-48 text-left leading-relaxed">
                             🚩 Profile picture updated 2 hours ago from foreign IP.
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold tracking-tight mb-1">{payload.friendName}</h2>
                      <p className="text-white/40 text-sm mb-6">{payload.friendHandle}</p>
                      
                      <div className="flex gap-8 mb-8 w-full max-w-xs justify-between">
                         <div className="text-center">
                           <div className="font-bold text-xl">0</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Posts</div>
                         </div>
                         <div className={`text-center relative group ${isXRay ? 'text-red-400' : ''}`}>
                           <div className="font-bold text-xl">{payload.profile.followers}</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Followers</div>
                           {isXRay && (
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-48 text-left leading-relaxed">
                                🚩 Bot followers detected. Zero engagement on network.
                             </div>
                           )}
                         </div>
                         <div className="text-center">
                           <div className="font-bold text-xl">{payload.profile.following}</div>
                           <div className="text-xs text-white/40 uppercase tracking-widest">Following</div>
                         </div>
                      </div>
                      
                      <div className={`text-center max-w-sm text-sm leading-relaxed p-4 rounded-xl relative group cursor-help ${isXRay ? 'bg-red-500/10 border border-red-500/30 text-red-100' : 'bg-white/5 text-white/80'}`}>
                         {payload.profile.bio}
                         {isXRay && (
                           <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-red-600 text-white p-3 text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl w-64 text-left leading-relaxed">
                              🚩 Bio changed to cryptocurrency scam script. High confidence of compromise.
                           </div>
                         )}
                      </div>
                   </motion.div>
                )}
             </div>

             {/* Message Input (visual only) */}
             {activeTab === 'chat' && (
                <div className="p-4 bg-[#1A1A1A] border-t border-white/10">
                   <div className="bg-white/5 rounded-full flex items-center px-4 py-3">
                      <div className="flex-1 text-sm text-white/30">Message...</div>
                      <Send size={18} className="text-white/20" />
                   </div>
                </div>
             )}

          </div>
       </div>
    </div>
  );
}
