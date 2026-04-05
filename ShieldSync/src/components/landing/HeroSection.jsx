import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

// --- Terminal Decipher Effect ---
const DecipherText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789';

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text.split('')
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    }, delay * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText || ' '}</span>;
};

function MagneticButton({ children, className, to }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Link to={to} className={className}>{children}</Link>
    </motion.div>
  );
}

function AnimatedShield() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.div
      style={{ y: y1, opacity }}
      className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-[#2D5BFF]/10 dark:border-[#2D5BFF]/30"
          animate={{
            scale: [1 + i * 0.15, 1 + i * 0.15 + 0.05, 1 + i * 0.15],
            opacity: [0.5, 0.2, 0.5],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox="0 0 24 24"
          className="w-[140px] h-[140px] md:w-[180px] md:h-[180px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.path
            d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
            className="text-slate-900 dark:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-colors"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5 }}
          />
          <motion.path
            d="M9 12l2 2 4-4"
            className="text-[#2D5BFF]"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.svg>
      </div>
      <div className="absolute inset-0 bg-[#2D5BFF]/5 dark:bg-[#2D5BFF]/10 blur-[60px] rounded-full" />
    </motion.div>
  );
}

const words = ['PHISHING', 'VISHING', 'RANSOMWARE', 'SOCIAL ENGINEERING'];

function TypewriterText() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1));
        if (displayText.length === word.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setDisplayText(word.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 30 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord]);

  return <span className="text-[#2D5BFF] text-glow font-bold">{displayText}<span className="inline-block w-[3px] h-[1em] bg-[#2D5BFF] ml-1 align-middle animate-pulse" /></span>;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
      {/* Light Mode subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50 dark:hidden z-[1]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md mb-8"
            >
              <div className="w-2 h-2 bg-[#2D5BFF] rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-600 dark:text-white/70 uppercase tracking-[0.2em]">Elite Defense Platform</span>
            </motion.div>

            <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[7.5rem] font-black leading-[0.9] tracking-[-0.04em] mb-8 text-slate-900 dark:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              <div><DecipherText text="MASTER" delay={0.2} /></div>
              <div className="text-slate-400 dark:text-white/30 transition-colors"><DecipherText text="THE ART OF" delay={0.6} /></div>
              <div className="relative inline-block text-[#2D5BFF]">
                <DecipherText text="CYBER" delay={1} />
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[4px] bg-[#2D5BFF] shadow-[0_0_20px_rgba(45,91,255,0.6)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              <br />
              <div><DecipherText text="DEFENSE" delay={1.4} /></div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-white/60 max-w-[480px] mb-12 leading-relaxed font-medium transition-colors"
            >
              Train against real-world threats in an immersive sandbox environment. Defend against <br /> <TypewriterText />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="flex items-center gap-8"
            >
              <MagneticButton to={ROUTES.DASHBOARD} className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 transition-colors">Deploy Forces</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-2" />
              </MagneticButton>
              <Link to={ROUTES.ARENA} className="group inline-flex items-center gap-3 text-slate-500 dark:text-white/60 text-sm font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-all">
                <span>View Arsenal</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <AnimatedShield />
          </div>
        </div>
      </div>
    </section>
  );
}