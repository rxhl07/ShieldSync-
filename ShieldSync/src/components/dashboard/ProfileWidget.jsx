import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ProfileWidget({ user, rankInfo }) {
    // Calculate progress to next level (Assuming 10,000 XP per tier for now)
    const nextLevelXP = 10000;
    const currentXP = user?.xp || 0;
    const progress = (currentXP / nextLevelXP) * 100;
    const currentLevel = Math.floor(currentXP / 1000) + 1;

    return (
        <div className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">

            {/* TOP ROW: Avatar, Name, Rank, and Streak */}
            <div className="flex justify-between items-start">

                {/* Left Side: Avatar & Identity */}
                <div className="flex items-center gap-5">
                    {/* Compact Avatar */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D5BFF] to-[#7C3AED] p-[2px]">
                            <div className="w-full h-full rounded-[14px] bg-[#0A0A0B] flex items-center justify-center overflow-hidden">
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMkQ1QkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOS41SDRiLTEuMTA0NTcgMC0yLS44OTU0LTItMlY3Yy0xLjEwNDU3IDAtMiAuODk1NC0yIDJoMTljMS4xMDQ2IDAgMi0uODk1NCAyLTJWM2MtMS4xMDQ2IDAtMiAuODk1NC0yIDJoLTcuNU05IDcuNVYzaDEuNW0wIDEuNWgwTTkgNy41SDRiLTEuMTA0NTcgMC0yIC44OTU0LTIgMk03LjUgOXY4LjVNOSAxOS41aDZtLTEuNSAwVjdjMCAxLjEwNDYtLjg5NTQgMi0yIDJzLTItLjg5NTQtMi0yVjNoNm0wIDQuNWgtNS41TTkuNzU5LDRoNC40ODIiLz48Y2lyY2xlIGN4PSIxMy41IiBjeT0iMTIuNzUiIHI9IjEuNjUiIGZpbGw9IiMyRDVCVkYiLz48L3N2Zz4="
                                    alt="agent"
                                    className="w-14 h-14"
                                />
                            </div>
                        </div>
                        {/* Level Badge overlapping */}
                        <div className="absolute -bottom-2 -right-2 bg-[#2D5BFF] text-white text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-[#0A0A0B]">
                            LVL {currentLevel}
                        </div>
                    </div>

                    {/* Name & Dynamic Rank */}
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            {user?.name || user?.agentId || 'Agent'}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${rankInfo?.color || 'text-slate-400'}`}>
                                {rankInfo?.title || 'RECRUIT'}
                            </span>
                            <span className="text-white/20 text-[10px]">•</span>
                            <span className="text-white/40 text-[10px] font-mono tracking-widest">SECTOR 080</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Streak Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                        {user?.streak || 0} DAY STREAK
                    </span>
                </div>
            </div>

            {/* BOTTOM ROW: XP Progress Bar */}
            <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Total Experience</p>
                    <p className="text-xs font-mono font-bold text-white">
                        {currentXP.toLocaleString()} <span className="text-white/30 font-normal">/ {nextLevelXP.toLocaleString()}</span>
                    </p>
                </div>

                {/* Slim Progress Track */}
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2D5BFF] to-[#A855F7] shadow-[0_0_10px_rgba(45,91,255,0.5)]"
                    />
                </div>
            </div>

        </div>
    );
}