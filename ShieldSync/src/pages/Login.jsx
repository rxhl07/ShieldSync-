import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, Terminal, ShieldCheck, Cpu, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../utils/constants';

const AUTH_STEPS = [
    "INITIATING SECURE HANDSHAKE...",
    "VERIFYING AGENT CLEARANCE...",
    "BYPASSING NEURAL FIREWALL...",
    "DECRYPTING ACCESS TOKEN...",
];

export default function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [authStatus, setAuthStatus] = useState('idle'); // 'idle' | 'authenticating' | 'granted' | 'error'
    const [stepIndex, setStepIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    // Form State
    const [agentId, setAgentId] = useState('');
    const [passcode, setPasscode] = useState('');

    const { login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthStatus('authenticating');
        setErrorMsg('');

        try {
            if (isLogin) {
                await login(agentId, passcode);
            } else {
                await register(agentId, passcode);
            }
            // If successful, show granted terminal
            setAuthStatus('granted');
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);
        } catch (err) {
            // If error (wrong password, username taken), show alert
            setAuthStatus('error');
            setErrorMsg(err.message || 'Authentication failed');
            setTimeout(() => setAuthStatus('idle'), 3000);
        }
    };

    // Hacker terminal loading sequence
    useEffect(() => {
        if (authStatus === 'authenticating') {
            let currentStep = 0;
            setStepIndex(0);
            const interval = setInterval(() => {
                currentStep++;
                if (currentStep < AUTH_STEPS.length) {
                    setStepIndex(currentStep);
                } else {
                    clearInterval(interval);
                }
            }, 350);
            return () => clearInterval(interval);
        }
    }, [authStatus]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative w-full pt-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 dark:opacity-40">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-[#2D5BFF]/20 rounded-full border-dashed" />
                <div className="absolute inset-20 border border-white/5 rounded-full" />
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10">
                <div className="glass-panel rounded-3xl p-8 md:p-10 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#0A0A0B]/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D5BFF] to-transparent opacity-50" />

                    <AnimatePresence mode="wait">
                        {authStatus === 'idle' || authStatus === 'error' ? (
                            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}>

                                <div className="flex flex-col items-center mb-8 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 relative overflow-hidden border border-black/5 dark:border-white/10">
                                        <Fingerprint size={32} className="text-[#2D5BFF] relative z-10" />
                                        <motion.div animate={{ top: ['-10%', '110%', '-10%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-[2px] bg-[#2D5BFF] shadow-[0_0_10px_#2D5BFF] z-20" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {isLogin ? 'RESTRICTED AREA' : 'NEW AGENT ENROLLMENT'}
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-white/40 font-mono mt-2 uppercase tracking-widest">
                                        {isLogin ? 'Identify Yourself.' : 'Establish your credentials.'}
                                    </p>
                                </div>

                                {authStatus === 'error' && (
                                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-500 text-xs font-mono">
                                        <AlertCircle size={16} />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Terminal size={16} className="text-slate-400 dark:text-white/30 group-focus-within:text-[#2D5BFF] transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={agentId}
                                            onChange={(e) => setAgentId(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-[#2D5BFF] font-mono text-sm"
                                            placeholder="AGENT ID"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock size={16} className="text-slate-400 dark:text-white/30 group-focus-within:text-[#2D5BFF] transition-colors" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={passcode}
                                            onChange={(e) => setPasscode(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-[#2D5BFF] font-mono text-sm"
                                            placeholder="PASSCODE"
                                        />
                                    </div>

                                    <button type="submit" className="w-full mt-2 py-4 bg-[#2D5BFF] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-[#1f4ae0] transition-all relative overflow-hidden group">
                                        <span className="relative z-10">{isLogin ? 'Authorize Access' : 'Create Credentials'}</span>
                                    </button>
                                </form>

                                {/* THIS IS THE MISSING TOGGLE BUTTON */}
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-slate-500 dark:text-white/50 font-mono">
                                        {isLogin ? "New to the platform? " : "Already an agent? "}
                                        <button
                                            onClick={() => setIsLogin(!isLogin)}
                                            type="button"
                                            className="text-[#2D5BFF] hover:text-white hover:shadow-[0_0_10px_rgba(45,91,255,0.8)] font-bold tracking-widest uppercase transition-all duration-300 ml-1"
                                        >
                                            {isLogin ? "Register Here" : "System Login"}
                                        </button>
                                    </p>
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 flex flex-col items-center justify-center min-h-[300px]">
                                {authStatus === 'granted' ? (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-[#22C55E]">
                                        <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-6 border border-[#22C55E]/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                            <ShieldCheck size={40} />
                                        </div>
                                        <h3 className="text-xl font-black tracking-widest uppercase mb-2">Access Granted</h3>
                                    </motion.div>
                                ) : (
                                    <div className="w-full">
                                        <div className="flex items-center justify-center mb-8">
                                            <Cpu size={32} className="text-[#2D5BFF] animate-pulse" />
                                        </div>
                                        <div className="space-y-3 font-mono text-xs">
                                            {AUTH_STEPS.map((step, idx) => (
                                                <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: idx <= stepIndex ? 1 : 0, x: idx <= stepIndex ? 0 : -10 }} className={`flex items-center gap-3 ${idx === stepIndex ? 'text-[#2D5BFF]' : 'text-slate-500 dark:text-white/40'}`}>
                                                    <span>{'>'}</span><span>{step}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}