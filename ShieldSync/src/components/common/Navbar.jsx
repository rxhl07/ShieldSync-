import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Sun, Moon, LogOut } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext'; // Import our Auth Context
import { motion } from 'framer-motion';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth(); // Grab auth state
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/'); // Send them back to the landing page on disconnect
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${scrolled
        ? 'py-4 bg-white/80 dark:bg-[#040914]/80 backdrop-blur-md border-black/5 dark:border-white/5 shadow-xl'
        : 'py-6 bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to={ROUTES.LANDING} className="flex items-center gap-3 group">
          <div className="relative">
            <Shield
              size={28}
              className="text-[#2D5BFF] transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 bg-[#2D5BFF] blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            ShieldSync
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full border-black/5 dark:border-white/10">
          {[
            { name: 'Home', path: ROUTES.LANDING },
            { name: 'Dashboard', path: ROUTES.DASHBOARD },
            { name: 'Arena', path: ROUTES.ARENA },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors relative py-1 ${location.pathname === item.path
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#2D5BFF] shadow-[0_0_10px_rgba(45,91,255,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action + Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-[#2D5BFF] dark:hover:text-[#2D5BFF] transition-all hover:scale-110 active:scale-95"
            title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Dynamic Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-500/30 text-red-600 dark:text-red-500 text-xs font-bold uppercase tracking-widest transition-all hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 bg-red-500/5"
            >
              <span>Disconnect</span>
              <LogOut size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <Link
              to="/login"
              className="group relative px-6 py-2.5 overflow-hidden rounded-xl bg-[#2D5BFF] text-white text-xs font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(45,91,255,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 transition-colors">Start Training</span>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}