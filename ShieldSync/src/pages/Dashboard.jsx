import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Activity, Flame, Shield } from 'lucide-react';
import CreditGauge from '../components/dashboard/CreditGauge';
import RadarChart from '../components/dashboard/RadarChart';
import Leaderboard from '../components/dashboard/Leaderboard';
import DailyMission from '../components/dashboard/DailyMission';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // <-- ADDED THIS
import MiniGame from '../components/landing/MiniGame';

// 1. UPDATED THIS FUNCTION TO USE LIVE DATABASE USER
function ProfileWidget() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  // Dynamic calculations based on live DB data
  const currentXP = currentUser?.xp || 0;
  const username = currentUser?.name || currentUser?.agentId || 'Agent';
  const level = Math.floor(currentXP / 1000) + 1;
  const nextLevelXP = 10000;
  const xpNeeded = nextLevelXP - currentXP;
  const progress = (currentXP / nextLevelXP) * 100;

  let rank = 'RECRUIT';
  if (currentXP >= 1000) rank = 'SENTINEL';
  if (currentXP >= 3000) rank = 'VANGUARD';
  if (currentXP >= 7000) rank = 'APEX SENTINEL';

  return (
    <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full group relative overflow-hidden bg-[#0A0B10] border border-white/5 shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50 dark:opacity-100 dark:from-accent/5" />

      {/* TOP SECTION: Avatar & Titles (Restored to your exact clean layout) */}
      <div className="relative z-10 flex items-start justify-between mb-10">
        <div className="flex items-center gap-6">

          {/* Avatar with LVL Badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-[20px] bg-[#12131A] border border-white/20 flex items-center justify-center shadow-lg relative overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                alt="Avatar"
                className="w-20 h-20 relative z-10"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-lg bg-[#2D5BFF] text-white text-[11px] font-black shadow-[0_0_15px_rgba(45,91,255,0.5)] tracking-wider">
              LVL {level}
            </div>
          </div>

          {/* Name, Shield Badge, Sector */}
          <div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {username}
            </h2>
            <div className="flex items-center gap-4">
              {/* Shield Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300">
                <Shield size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">{rank}</span>
              </div>
              {/* Divider */}
              <div className="w-[1px] h-4 bg-white/10" />
              {/* Sector */}
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
                Global Sector 080
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: XP Progress (Restored your large fonts and Evolution text) */}
      <div className="relative z-10 mt-auto">
        <div className="flex items-end justify-between mb-4">

          {/* Left: Total XP */}
          <div>
            <p className="text-[10px] text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] font-black mb-1">
              Total Experience
            </p>
            <p className="text-3xl font-black text-white">
              {currentXP.toLocaleString()} <span className="text-lg text-slate-500 font-bold">/ 10,000</span>
            </p>
          </div>

          {/* Right: Next Phase */}
          <div className="text-right">
            <p className="text-[10px] text-[#2D5BFF] uppercase tracking-[0.2em] font-black mb-1">
              Next Phase
            </p>
            <p className="text-sm font-black text-slate-300 uppercase tracking-widest">
              Evolution in {xpNeeded.toLocaleString()} XP
            </p>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-[#050505] overflow-hidden border border-white/5 relative shadow-inner">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#2D5BFF] to-[#7C3AED] shadow-[0_0_15px_rgba(45,91,255,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Dashboard() {
  const [showForge, setShowForge] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [hasPlayedDaily, setHasPlayedDaily] = useState(false);
  const { theme } = useTheme();
  const { currentUser } = useAuth(); // <-- PULLING FROM MONGODB

  useEffect(() => {
    const today = new Date().toDateString();
    if (localStorage.getItem('shieldsync_daily_mission') === today) {
      setHasPlayedDaily(true);
    }
  }, []);

  const handleGameComplete = () => {
    setHasPlayedDaily(true);
    localStorage.setItem('shieldsync_daily_mission', new Date().toDateString());
  };

  // Prevent crash if user data hasn't loaded yet
  if (!currentUser) return <div className="min-h-screen flex items-center justify-center font-mono text-accent">LOADING SECURE PROFILE...</div>;

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1400px] mx-auto min-h-screen relative z-10">

      {!hasPlayedDaily && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-red-500 animate-pulse" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">New Daily Threat Detected.</p>
            <p className="text-sm text-slate-600 dark:text-white/60">Would you like to analyze it now?</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={() => setShowMiniGame(true)} className="flex-1 sm:flex-none px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-red-700">Intercept Now</button>
          </div>
        </motion.div>
      )}

      {/* Top Banner */}
      <motion.div
        variants={itemVariants}
        className="mb-10 flex items-center justify-between glass-panel px-6 py-5 rounded-2xl border-black/5 dark:border-white/10 shadow-sm dark:shadow-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Activity size={20} className="text-accent animate-pulse" />
          </div>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white transition-colors">
            Command Center
          </h1>

          {/* Admin Forge Toggle */}
          <button
            onClick={() => setShowForge(!showForge)}
            className={`ml-4 px-4 py-2 text-[10px] uppercase font-bold rounded-xl border transition-all ${showForge
              ? 'bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
              : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Flame size={12} className="inline mr-2" />
            The Forge
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2 text-green-600 dark:text-[#22C55E]">
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
            SYSTEMS ONLINE
          </div>
          <span className="text-slate-200 dark:text-white/10">|</span>
          <span className="text-slate-400 dark:text-white/30 transition-colors">AGENT ID: {currentUser.agentId}</span>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Profile Card */}
        <div className="md:col-span-8 lg:col-span-7">
          <motion.div variants={itemVariants} className="h-full">
            {showForge ? (
              <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full bg-purple-50 dark:bg-[#180A2B]/40 border-purple-200 dark:border-[#7C3AED]/30 transition-all duration-500 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                    <Flame size={24} className="text-purple-600 dark:text-[#7C3AED] animate-bounce" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>AI Lure Architect</h2>
                </div>
                <div className="flex-1 font-mono text-xs text-purple-600 dark:text-[#7C3AED] space-y-3 opacity-90">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-white/30">&gt;</span>
                    <span>Initializing local LLM payload generator...</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-white/30">&gt;</span>
                    <span>Context: Financial Institution Spoof</span>
                  </p>
                  <div className="mt-6 p-6 bg-white dark:bg-black/50 rounded-2xl border border-purple-200 dark:border-[#7C3AED]/20 shadow-inner">
                    <span className="text-slate-400 dark:text-white/30 font-bold block mb-2">// Generated Phishing Copy</span>
                    <span className="text-slate-900 dark:text-[#F5F5F3] leading-relaxed italic">"Dear User, your recent transaction of $4,923.00 has been flagged. If this wasn't you, cancel immediately:"</span>
                  </div>
                </div>
              </div>
            ) : (
              <ProfileWidget />
            )}
          </motion.div>
        </div>

        {/* Credit Gauge */}
        <div className="md:col-span-4 lg:col-span-5">
          <motion.div variants={itemVariants} className="h-full glass-panel rounded-3xl p-8 relative group overflow-hidden border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 dark:from-[#22C55E]/5 to-transparent opacity-50 marker:group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              {/* LIVE DATABASE SCORE HERE */}
              <CreditGauge score={currentUser.cyberScore || 500} />
              <p className="text-center text-[10px] text-slate-500 dark:text-white/40 mt-8 max-w-[200px] uppercase tracking-[0.2em] font-bold leading-loose">
                Security Readiness <br /> Behavioral Score
              </p>
            </div>
          </motion.div>
        </div>

        {/* Radar Chart */}
        <div className="md:col-span-6 lg:col-span-4">
          <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-8 h-[420px] flex flex-col group relative overflow-hidden border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-black/5 dark:border-white/5 rounded-tr-3xl m-4 group-hover:border-accent/30 transition-colors duration-500" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <ShieldAlert size={20} className="text-accent" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white transition-colors">
                Threat Profiling
              </h3>
            </div>
            <div className="flex-1 w-full mx-auto relative z-10">
              {/* LIVE DATABASE STATS HERE */}
              <RadarChart skills={currentUser.threatStats || {}} />
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <div className="md:col-span-6 lg:col-span-4">
          <motion.div variants={itemVariants} className="h-[420px]">
            <Leaderboard />
          </motion.div>
        </div>

        {/* Daily Mission */}
        <div className="md:col-span-12 lg:col-span-4">
          <motion.div variants={itemVariants} className="h-[420px]">
            <DailyMission onPlay={() => setShowMiniGame(true)} hasPlayed={hasPlayedDaily} />
          </motion.div>
        </div>

      </div> {/* <-- This closes the Bento Grid */}

      <MiniGame
        isOpen={showMiniGame}
        onClose={() => setShowMiniGame(false)}
        onComplete={handleGameComplete}
      />

    </div>
  );
}