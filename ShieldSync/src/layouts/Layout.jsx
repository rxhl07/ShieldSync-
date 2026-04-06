import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';

import CustomCursor from '../components/common/Cursor';
import { ROUTES } from '../utils/constants';
import { useTheme } from '../contexts/ThemeContext';
import ParticleNetwork from '../components/common/ParticleNetwork';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Layout() {
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen relative transition-colors duration-500 bg-[#F8F9FA] dark:bg-transparent">
      <CustomCursor />
      <ParticleNetwork />
      <div className="cyber-grid" />
      <div className="cyber-noise" />

      {/* Dynamic Background Orbs */}
      <div className="glow-orb-primary opacity-50 dark:opacity-100 transition-opacity duration-1000" />
      <div className="glow-orb-secondary opacity-30 dark:opacity-100 transition-opacity duration-1000" />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>


    </div>
  );
}
