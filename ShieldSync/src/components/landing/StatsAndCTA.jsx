import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Target, Clock } from 'lucide-react';
import { ROUTES, PLATFORM_STATS } from '../../utils/constants';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(target * easeOut);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [target, duration, isInView]);

  const formatted = Number.isInteger(target)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-mono)' }}>
      {formatted}{suffix}
    </span>
  );
}

const icons = [Shield, Zap, Target, Clock];

export default function StatsAndCTA() {
  return (
    <>
      {/* Stats Section */}
      <section className="relative py-32 border-t border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0A0A0B]/50 backdrop-blur-sm transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 md:divide-x md:divide-black/5 dark:md:divide-white/10">
            {PLATFORM_STATS.map((stat, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center px-6 group"
                >
                  <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/50 shadow-sm dark:shadow-none">
                    <Icon size={24} className="text-accent drop-shadow-[0_0_10px_rgba(45,91,255,0.5)]" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] font-bold group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-48 overflow-hidden">
        {/* Intensely Glowing core background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[150px] animate-pulse-ring" />
          <div className="absolute w-[400px] h-[400px] bg-purple-500/10 dark:bg-[#7C3AED]/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-10"
          >
            <div className="h-[2px] w-8 bg-accent" />
            <span className="text-xs font-bold text-accent uppercase tracking-[0.4em] text-glow">
              Initialization Complete
            </span>
            <div className="h-[2px] w-8 bg-accent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-black tracking-[-0.04em] text-slate-950 dark:text-white leading-[0.9] mb-10 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            START YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent drop-shadow-[0_0_20px_rgba(45,91,255,0.4)]">
              DEFENSE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-600 dark:text-white/50 max-w-[620px] mx-auto mb-16 font-medium leading-relaxed"
          >
            Join thousands of defenders building real-world cyber resilience through hands-on simulation training.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link
              to={ROUTES.DASHBOARD}
              className="group relative flex items-center gap-4 px-12 py-5 bg-slate-950 dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,91,255,0.3)] hover:-translate-y-1 active:translate-y-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 transition-colors duration-300">
                Launch Dashboard
              </span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-2" />
            </Link>
            
            <Link
              to={ROUTES.ARENA}
              className="group flex items-center gap-3 px-12 py-5 glass-panel text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 border-black/5 dark:border-white/10 shadow-sm dark:shadow-none"
            >
              <span>Browse Threats</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Decorative futuristic bracket */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-32 flex items-center justify-center gap-6 opacity-30 dark:opacity-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4L4 12L9 20" className="stroke-slate-950 dark:stroke-white" strokeWidth="2" strokeLinecap="square"/>
            </svg>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-400 dark:via-white/30 to-transparent" />
            <div className="w-2.5 h-2.5 rotate-45 border border-slate-950 dark:border-white/50" />
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-400 dark:via-white/30 to-transparent" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 4L20 12L15 20" className="stroke-slate-950 dark:stroke-white" strokeWidth="2" strokeLinecap="square"/>
            </svg>
          </motion.div>
        </div>
      </section>
    </>
  );
}
