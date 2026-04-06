import React, { useState, useEffect, Component } from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 bg-red-900/20 p-4 border border-red-500 rounded p-12 overflow-auto text-xs z-[9999] absolute top-0 left-0 right-0 bottom-0">
          <h1 className="font-bold text-lg mb-2">CRASH INTERCEPTED IN HACKER TERMINAL</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre className="mt-4">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


const LOG_SEQUENCES = {
  phishing: (config) => [
    `> Crafting SMTP headers for [${config.template || 'Netflix'}] template...`,
    `> Obfuscating malicious URL: http://short.url/ax2...`,
    `> Injecting selected payload type: [${config.payloadType || 'Link'}]...`,
    `> Bypassing SPF/DKIM filters... [SUCCESS]`,
    `> Packet Sent. Awaiting user interaction.`
  ],
  vishing: (config) => [
    `> Establishing VoIP Tunnel...`,
    `> Spoofing Caller ID to trusted source...`,
    `> Synthesizing Voice Script using [${config.voiceProfile || 'Male'}] profile...`,
    `> Integrating [${config.backgroundNoise || 'Office'}] background noise... [READY]`,
    `> Call Initialized. Monitoring for OTP input.`
  ],
  'soc-eng': (config) => [
    `> Scraping OSINT data for target: [${config.targetPersona || 'Junior Dev'}]...`,
    `> Found Interests: [Gym, Crypto, Tech]...`,
    `> Constructing customized lure leveraging [${config.attackAngle || 'Authority'}] angle...`,
    `> Bypassing platform spam filters... [SUCCESS]`,
    `> Message Delivered. Monitoring Session Hijack.`
  ]
};

export default function HackerTerminal({ vector, config, status, onInitialize, onLogsComplete }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let timeoutId;
    let interval;
    if (status === 'initializing') {
      const sequence = LOG_SEQUENCES[vector](config);
      setLogs([]); // Clear logs on start
      
      let currentStep = 0;
      interval = setInterval(() => {
        if (currentStep < sequence.length) {
          setLogs(prev => [...prev, sequence[currentStep]]);
          currentStep++;
        } else {
          clearInterval(interval);
          timeoutId = setTimeout(() => {
            if (onLogsComplete) onLogsComplete();
          }, 1000); // 1s delay before completing to let user read the final log
        }
      }, 1200); // 1.2s per log line
      
    } else if (status === 'idle') {
       setLogs([`> System Idle. Awaiting configuration for ${vector} vector.`]);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, vector, config]);

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full gap-6">
        {/* Terminal View */}
        <div className="flex-1 flex flex-col font-mono text-red-500 overflow-hidden relative">
          <div className="flex items-center gap-4 mb-6 opacity-60 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Terminal size={20} />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">root@enclave:~# ./stage --vec={vector}</span>
          </div>
          
          <div className="flex-1 border border-red-500/20 bg-red-500/5 p-6 rounded-2xl overflow-y-auto custom-scrollbar shadow-[inset_0_0_30px_rgba(239,68,68,0.05)]">
             <AnimatePresence>
               {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-4 text-sm font-bold flex items-start gap-3"
                  >
                    <span className="text-red-500/40 shrink-0">&gt;</span>
                    <span className="leading-relaxed">{log ? log.replace('>', '').trim() : ''}</span>
                  </motion.div>
               ))}
             </AnimatePresence>
             {status === 'initializing' && (
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-4 bg-red-500 ml-6 mt-1"
                />
             )}
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
           <button
              onClick={onInitialize}
              disabled={status !== 'idle'}
              className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all relative overflow-hidden group
                ${status === 'idle' 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                  : status === 'initializing'
                    ? 'bg-red-500 text-black border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                    : 'bg-green-500 text-black border border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                }`}
           >
              {status === 'initializing' && (
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <ShieldAlert size={18} className={status === 'initializing' ? 'animate-pulse' : ''} />
              {status === 'idle' ? 'Initialize Attack Packet' 
                : status === 'initializing' ? 'Transmitting Payload...' 
                : 'Packet Active. Waiting for Defender.'}
           </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
