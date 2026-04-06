import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext'; // Adjust path if needed
import { useAuth } from '../../contexts/AuthContext';   // Adjust path if needed
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Automatically close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'DASHBOARD', path: '/dashboard' },
    { name: 'ARENA', path: '/arena' }
  ];

  return (
    <nav className="fixed top-0 w-full z-[500] bg-white/80 dark:bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo - Always Visible */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <Shield className="text-[#2D5BFF] w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
            <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">ShieldSync</span>
          </Link>

          {/* Desktop Center Links - Hidden on Mobile */}
          {currentUser && (
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all ${isActive
                        ? 'bg-white dark:bg-[#2D5BFF]/10 text-[#2D5BFF] shadow-sm'
                        : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Theme Toggle - Always Visible */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {currentUser ? (
              <>
                {/* Desktop Disconnect Button - Hidden on Mobile */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-600 dark:text-red-500 hover:bg-red-500/10 transition-colors text-[10px] font-black uppercase tracking-widest"
                >
                  Disconnect <LogOut size={12} />
                </button>

                {/* Mobile Hamburger Menu - Hidden on Desktop */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </>
            ) : (
              <Link to="/login" className="px-5 py-2 bg-[#2D5BFF] text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-colors">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide-Down Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && currentUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#0A0A0B] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all ${isActive
                      ? 'bg-blue-50 dark:bg-[#2D5BFF]/10 text-[#2D5BFF]'
                      : 'text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-black/5 dark:bg-white/10 my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-red-500/30 text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors text-xs font-black uppercase tracking-widest"
              >
                Disconnect <LogOut size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}