import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Activity, Flame, Shield } from 'lucide-react';
import CreditGauge from '../components/dashboard/CreditGauge';
import RadarChart from '../components/dashboard/RadarChart'; // Or DefenseEvolution if you swapped it!
import Leaderboard from '../components/dashboard/Leaderboard';
import DailyMission from '../components/dashboard/DailyMission';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import MiniGame from '../components/landing/MiniGame';

function ProfileWidget() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();

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
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden bg-white dark:bg-[#0A0B10] border border-black/5 dark:border-white/5 shadow-xl dark:shadow-2xl transition-all duration-500 min-h-[350px] sm:min-h-0">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50 dark:opacity-100 dark:from-accent/5" />

      {/* TOP SECTION: Avatar & Titles */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">

        {/* Avatar with LVL Badge */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.25rem] bg-slate-50 dark:bg-[#12131A] border border-black/5 dark:border-white/20 flex items-center justify-center shadow-sm dark:shadow-lg relative overflow-hidden">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMkQ1QkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOS41SDRiLTEuMTA0NTcgMC0yLS44OTU0LTItMlY3Yy0xLjEwNDU3IDAtMiAuODk1NC0yIDJoMTljMS4xMDQ2IDAgMi0uODk1NCAyLTJWM2MtMS4xMDQ2IDAtMiAuODk1NC0yIDJoLTcuNU05IDcuNVYzaDEuNW0wIDEuNWgwTTkgNy41SDRiLTEuMTA0NTcgMC0yIC44OTU0LTIgMk03LjUgOXY4LjVNOSAxOS41aDZtLTEuNSAwVjdjMCAxLjEwNDYtLjg5NTQgMi0yIDJzLTItLjg5NTQtMi0yVjNoNm0wIDQuNWgtNS41TTkuNzU5LDRoNC40ODIiLz48Y2lyY2xlIGN4PSIxMy41IiBjeT0iMTIuNzUiIHI9IjEuNjUiIGZpbGw9IiMyRDVCVkYiLz48L3N2Zz4="
              alt="Agent"
              className="w-12 h-12 sm:w-16 sm:h-16 relative z-10"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-lg bg-[#2D5BFF] text-white text-[10px] sm:text-[11px] font-black shadow-[0_0_15px_rgba(45,91,255,0.5)] tracking-wider">
            LVL {level}
          </div>
        </div>

        {/* Name, Shield Badge, Sector */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {username}
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300">
              <Shield size={12} className="text-slate-400 sm:w-[14px] sm:h-[14px]" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{rank}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-4 bg-black/10 dark:bg-white/10" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Global Sector 080
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: XP Progress */}
      <div className="relative z-10 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2 sm:gap-0">
          <div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] font-black mb-1">
              Total Experience
            </p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {currentXP.toLocaleString()} <span className="text-sm sm:text-lg text-slate-400 dark:text-slate-500 font-bold">/ 10,000</span>
            </p>
          </div>
          <div className="sm:text-right">
            <p className="hidden sm:block text-[10px] text-[#2D5BFF] uppercase tracking-[0.2em] font-black mb-1">
              Next Phase
            </p>
            <p className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              Evolution in {xpNeeded.toLocaleString()} XP
            </p>
          </div>
        </div>

        <div className="h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-[#050505] overflow-hidden border border-black/5 dark:border-white/5 relative shadow-inner">
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
  const { currentUser } = useAuth();

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

  if (!currentUser) return <div className="min-h-screen flex items-center justify-center font-mono text-accent text-sm sm:text-base">LOADING SECURE PROFILE...</div>;

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[1400px] mx-auto min-h-screen relative z-10">

      {!hasPlayedDaily && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3">
            <Flame size={20} className="text-red-500 animate-pulse shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">New Daily Threat Detected.</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60">Would you like to analyze it now?</p>
            </div>
          </div>
          <button onClick={() => setShowMiniGame(true)} className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors">
            Intercept Now
          </button>
        </motion.div>
      )}

      {/* Top Banner */}
      <motion.div
        variants={itemVariants}
        className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel px-5 sm:px-6 py-4 sm:py-5 rounded-2xl border-black/5 dark:border-white/10 shadow-sm dark:shadow-none"
      >
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Activity size={18} className="text-accent animate-pulse sm:w-5 sm:h-5" />
            </div>
            <h1 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              Command Center
            </h1>
          </div>

          <button
            onClick={() => setShowForge(!showForge)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold rounded-lg sm:rounded-xl border transition-all ${showForge
              ? 'bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
              : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Flame size={12} className="inline mr-1.5 sm:mr-2" />
            The Forge
          </button>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-black/5 dark:border-white/10 pt-3 sm:pt-0 mt-1 sm:mt-0">
          <div className="flex items-center gap-2 text-green-600 dark:text-[#22C55E]">
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
            SYSTEMS ONLINE
          </div>
          <span className="hidden sm:inline text-slate-200 dark:text-white/10">|</span>
          <span className="text-slate-500 dark:text-white/30 truncate max-w-[120px] sm:max-w-none">ID: {currentUser.agentId}</span>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">

        {/* Profile Card / Forge */}
        <div className="md:col-span-8 lg:col-span-7">
          <motion.div variants={itemVariants} className="h-full">
            {showForge ? (
              <div className="glass-panel rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between h-full bg-purple-50 dark:bg-[#180A2B]/40 border-purple-200 dark:border-[#7C3AED]/30 transition-all duration-500 shadow-sm dark:shadow-none min-h-[350px]">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600/10 flex items-center justify-center shrink-0">
                    <Flame size={20} className="text-purple-600 dark:text-[#7C3AED] animate-bounce sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>AI Lure Architect</h2>
                </div>
                <div className="flex-1 font-mono text-[10px] sm:text-xs text-purple-600 dark:text-[#7C3AED] space-y-3 opacity-90">
                  <p className="flex items-start sm:items-center gap-2">
                    <span className="text-slate-400 dark:text-white/30 shrink-0">&gt;</span>
                    <span>Initializing local LLM payload generator...</span>
                  </p>
                  <p className="flex items-start sm:items-center gap-2">
                    <span className="text-slate-400 dark:text-white/30 shrink-0">&gt;</span>
                    <span>Context: Financial Institution Spoof</span>
                  </p>
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white dark:bg-black/50 rounded-xl sm:rounded-2xl border border-purple-200 dark:border-[#7C3AED]/20 shadow-inner">
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
          <motion.div variants={itemVariants} className="h-full min-h-[350px] sm:min-h-0 glass-panel rounded-[2rem] p-6 sm:p-8 relative group overflow-hidden border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 dark:from-[#22C55E]/5 to-transparent opacity-50 marker:group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full pt-4 sm:pt-0">
              <CreditGauge score={currentUser.cyberScore || 500} />
              <p className="text-center text-[9px] sm:text-[10px] text-slate-500 dark:text-white/40 mt-6 sm:mt-8 max-w-[200px] uppercase tracking-[0.2em] font-bold leading-loose">
                Security Readiness <br /> Behavioral Score
              </p>
            </div>
          </motion.div>
        </div>

        {/* Radar Chart or Defense Evolution */}
        <div className="md:col-span-6 lg:col-span-4">
          <motion.div variants={itemVariants} className="glass-panel rounded-[2rem] p-6 sm:p-8 h-[380px] sm:h-[420px] flex flex-col group relative overflow-hidden border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-black/5 dark:border-white/5 rounded-tr-[2rem] m-4 group-hover:border-accent/30 transition-colors duration-500" />
            <div className="flex-1 w-full mx-auto relative z-10 flex flex-col">
              <RadarChart skills={currentUser.threatStats || {}} />
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <div className="md:col-span-6 lg:col-span-4">
          <motion.div variants={itemVariants} className="h-[380px] sm:h-[420px]">
            <Leaderboard />
          </motion.div>
        </div>

        {/* Daily Mission */}
        <div className="md:col-span-12 lg:col-span-4">
          <motion.div variants={itemVariants} className="h-[380px] sm:h-[420px]">
            <DailyMission onPlay={() => setShowMiniGame(true)} hasPlayed={hasPlayedDaily} />
          </motion.div>
        </div>

      </div>

      <MiniGame
        isOpen={showMiniGame}
        onClose={() => setShowMiniGame(false)}
        onComplete={handleGameComplete}
      />

    </div>
  );
}