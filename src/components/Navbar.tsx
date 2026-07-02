import { useState } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function Navbar({ currentView, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Skills', value: 'skills' },
    { label: 'Projects', value: 'projects' },
    { label: 'Experience', value: 'experience' },
    { label: 'Education', value: 'education' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleItemClick = (value: string) => {
    onNavigate(value);
    setIsMobileMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="w-full bg-white/70 dark:bg-slate-950/75 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-lg dark:shadow-slate-950/40 px-4 py-3 sm:px-6 sm:py-3.5 flex flex-row justify-between items-center pointer-events-auto rounded-none transition-colors duration-300">
          
          {/* Logo (Left side) */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex flex-row items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-sky-500/10 dark:bg-sky-500/20 flex items-center justify-center border border-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Terminal className="w-4 h-4 text-sky-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                Madhav.K
              </span>
              <span className="text-[9px] font-mono font-bold text-sky-500 uppercase tracking-widest leading-none">
                Dev Portfolio
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Center) */}
          <nav className="hidden lg:flex flex-row items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentView === link.value;
              return (
                <button
                  key={link.label}
                  onClick={() => handleItemClick(link.value)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider relative transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-sky-500 dark:text-sky-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-sky-500/5 dark:bg-sky-500/10 border-b-2 border-sky-500 pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors border border-slate-200/40 dark:border-slate-800/40 cursor-pointer"
                title="Toggle Theme Mode"
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleItemClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950/98 backdrop-blur-md lg:hidden flex flex-col items-center justify-center px-6 transition-colors duration-300"
          >
            <div className="flex flex-col items-center gap-5 w-full max-w-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                // Navigation Menu
              </span>
              {navLinks.map((link) => {
                const isActive = currentView === link.value;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleItemClick(link.value)}
                    className={`w-full py-2.5 text-center text-lg font-bold font-sans uppercase tracking-wide border-b border-slate-100 dark:border-slate-900 cursor-pointer ${
                      isActive 
                        ? 'text-sky-500 dark:text-sky-400' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-sky-500'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <button
                onClick={() => handleItemClick('contact')}
                className="w-full mt-4 py-3 bg-sky-500 text-slate-950 text-sm font-mono font-bold uppercase tracking-widest hover:bg-sky-600 cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
