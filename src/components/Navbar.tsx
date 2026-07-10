import { useState } from 'react';
import { Menu, X, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme?: 'light' | 'dark';
}

export default function Navbar({ currentView, onNavigate, theme }: NavbarProps) {
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

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl px-5 py-2.5 flex flex-row justify-between items-center pointer-events-auto rounded-full transition-all duration-300">
          
          {/* Logo (Left side) */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex flex-row items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-sky-500/10 flex items-center justify-center border border-sky-500/20 rounded-full group-hover:scale-105 transition-transform duration-300">
              <Terminal className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white uppercase leading-tight font-sans">
                Madhav.K
              </span>
              <span className="text-[8px] font-mono font-bold text-sky-400 uppercase tracking-widest leading-none mt-0.5">
                Dev Portfolio
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Center) */}
          <nav className="hidden lg:flex flex-row items-center gap-1 bg-slate-950/80 p-1 rounded-full border border-slate-850">
            {navLinks.map((link) => {
              const isActive = currentView === link.value;
              return (
                <button
                  key={link.label}
                  onClick={() => handleItemClick(link.value)}
                  className={`px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider relative transition-all duration-300 cursor-pointer rounded-full ${
                    isActive 
                      ? 'text-sky-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-slate-800 shadow-md rounded-full border border-slate-700 pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Contact CTA */}
            <button
              onClick={() => handleItemClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 rounded-full cursor-pointer shadow-md hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-full cursor-pointer"
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
            className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-md lg:hidden flex flex-col items-center justify-center px-6 transition-colors duration-300 text-white"
          >
            <div className="flex flex-col items-center gap-5 w-full max-w-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-2">
                // Navigation Menu
              </span>
              {navLinks.map((link) => {
                const isActive = currentView === link.value;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleItemClick(link.value)}
                    className={`w-full py-2.5 text-center text-base font-bold font-sans uppercase tracking-widest border-b border-slate-800 cursor-pointer ${
                      isActive 
                        ? 'text-sky-400' 
                        : 'text-slate-300 hover:text-sky-400'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <button
                onClick={() => handleItemClick('contact')}
                className="w-full mt-4 py-3 bg-sky-600 text-white text-sm font-mono font-bold uppercase tracking-widest hover:bg-sky-700 rounded-full cursor-pointer transition-all duration-300 shadow-md"
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
