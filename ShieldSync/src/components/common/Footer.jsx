import { Link } from 'react-router-dom';
import { Shield, Globe, Share2, MessageSquare } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-[#050505]/40 backdrop-blur-md overflow-hidden pt-24 pb-12 transition-colors duration-500">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to={ROUTES.LANDING} className="flex items-center gap-3 mb-8 group">
              <Shield size={28} className="text-accent transition-transform duration-500 group-hover:scale-110" />
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                ShieldSync
              </span>
            </Link>
            <p className="text-base text-slate-500 dark:text-white/40 max-w-sm mb-10 leading-relaxed font-medium">
              Empowering the next generation of digital defenders through immersive, 
              real-time threat simulations and actionable intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:bg-accent/20 hover:text-accent transition-all border border-black/5 dark:border-white/5">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:bg-accent/20 hover:text-accent transition-all border border-black/5 dark:border-white/5">
                <Share2 size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:bg-accent/20 hover:text-accent transition-all border border-black/5 dark:border-white/5">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-10">Platform</h4>
            <ul className="space-y-5">
              <li><Link to={ROUTES.LANDING} className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">The Frontier</Link></li>
              <li><Link to={ROUTES.DASHBOARD} className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Command Center</Link></li>
              <li><Link to={ROUTES.ARENA} className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Threat Arena</Link></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Leaderboards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-10">Resources</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Threat Intel</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">API Access</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 dark:text-white/50 hover:text-accent dark:hover:text-white transition-colors">Contact Command</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} ShieldSync Cyber Systems. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-slate-400 dark:text-white/20 hover:text-accent dark:hover:text-white uppercase tracking-[0.2em] font-bold transition-colors">Privacy Protocol</a>
            <a href="#" className="text-[10px] text-slate-400 dark:text-white/20 hover:text-accent dark:hover:text-white uppercase tracking-[0.2em] font-bold transition-colors">Service Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
