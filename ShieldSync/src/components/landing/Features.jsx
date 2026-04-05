import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Terminal, ShieldCheck, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const features = [
  {
    icon: BookOpen,
    title: 'LEARN',
    subtitle: 'Threat Intelligence',
    description: 'Understand the anatomy of real-world cyber attacks. Our curated briefings break down each threat type with clear "Red Flag" indicators, hacker methodologies, and defense strategies.',
    details: [
      'Interactive threat briefings with real-world case studies',
      'Red Flag identification patterns for each threat type',
      '"Hacker\'s POV" toggle to understand attacker methodology',
      'Video walkthroughs and expert analysis modules',
    ],
    color: '#2D5BFF',
  },
  {
    icon: Terminal,
    title: 'SIMULATE',
    subtitle: 'Sandbox Training',
    description: 'Enter the Virtual Desktop sandbox — a safe environment that replicates real attack scenarios. Practice identifying phishing emails, vishing calls, and social engineering attempts.',
    details: [
      'Gmail-clone with realistic phishing email simulations',
      'Voice call modules for vishing detection training',
      'DM chat interface for social engineering scenarios',
      'Real-time behavioral tracking and performance metrics',
    ],
    color: '#7C3AED',
  },
  {
    icon: ShieldCheck,
    title: 'DEFEND',
    subtitle: 'Behavioral Mastery',
    description: 'Review your performance through the X-Ray analysis. See exactly where threats were hiding, measure your detection speed, and build lasting cyber-defense reflexes.',
    details: [
      'Post-simulation X-Ray review with annotated red flags',
      'Time-to-detect analytics and behavioral scoring',
      'Cyber-Credit Score tracking your defense proficiency',
      'Personalized improvement recommendations',
    ],
    color: '#22C55E',
  },
];

function FeatureCard({ feature, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Glow Behind Card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: `radial-gradient(circle at center, ${feature.color}33 0%, transparent 70%)` }}
      />

      <div className="glass-panel rounded-2xl h-full flex flex-col transition-transform duration-500 hover:-translate-y-2">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:shadow-[0_0_15px_currentColor]"
          style={{ backgroundColor: feature.color, color: feature.color }}
        />

        <div className="p-8 flex-1 flex flex-col">
          {/* Icon + Number */}
          <div className="flex items-start justify-between mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative"
              style={{ backgroundColor: `${feature.color}15` }}
            >
              <Icon size={24} style={{ color: feature.color }} className="relative z-10" />
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{ boxShadow: `0 0 20px ${feature.color}40` }}
              />
            </div>
            <span
              className="text-sm font-mono font-bold tracking-wider"
              style={{ color: feature.color }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl lg:text-3xl font-black tracking-[-0.02em] text-slate-900 dark:text-white mb-2 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {feature.title}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] mb-6">
            {feature.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed mb-8 flex-1 font-medium">
            {feature.description}
          </p>

          {/* Expandable details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors duration-300 uppercase tracking-widest mt-auto group/btn"
          >
            <span className="relative">
              {expanded ? 'Hide Details' : 'View Details'}
              <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent group-hover/btn:w-full transition-all duration-300" />
            </span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.4, type: "spring" }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 space-y-4">
                  {feature.details.map((detail, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-slate-600 dark:text-white/70 font-medium"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: feature.color, color: feature.color }}
                      />
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-10 bg-accent" />
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] text-glow">
                The Defense Loop
              </p>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-[-0.03em] text-slate-900 dark:text-white transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LEARN → SIMULATE → DEFEND
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to={ROUTES.ARENA}
              className="group relative inline-flex items-center gap-4 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest hover:text-accent dark:hover:text-accent transition-all px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10"
            >
              <span className="relative z-10">Explore all modules</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom Connection Line */}
        <div className="hidden md:flex items-center justify-center mt-20 relative">
          <div className="absolute w-[800px] h-1 bg-[#2D5BFF]/20 blur-xl rounded-full" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] w-full max-w-[800px] bg-gradient-to-r from-transparent via-[#2D5BFF]/50 to-transparent relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
