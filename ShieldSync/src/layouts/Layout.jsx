import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';

import CustomCursor from '../components/common/Cursor';
import ParticleNetwork from '../components/common/ParticleNetwork'; // 1. Imported the Network
import { useTheme } from '../contexts/ThemeContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Layout() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    // 2. Changed bg-[#F8F9FA] to bg-transparent so the canvas shows through!
    <div className="min-h-screen relative transition-colors duration-500 bg-transparent">

      {/* 3. Dropped the network component right here at the back */}
      <ParticleNetwork />

      {/* Keeping the subtle CSS grid overlay for extra texture */}
      <div className="cyber-grid-global" />

      <CustomCursor />
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