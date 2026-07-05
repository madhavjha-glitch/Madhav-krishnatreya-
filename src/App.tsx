import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Twitter, Instagram, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';
export type BaseTheme = 'slate-dark' | 'onyx-dark' | 'alabaster-light' | 'theme-4d' | 'theme-midnight' | 'theme-sunset' | 'theme-pearlescent';
export type AccentColor = 'sky' | 'emerald' | 'amber' | 'violet';
export type CanvasPattern = 'grid' | 'dots' | 'plain';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  
  // Premium Customizer states
  const [baseTheme, setBaseTheme] = useState<BaseTheme>(() => {
    const saved = localStorage.getItem('baseTheme');
    return (saved === 'slate-dark' || saved === 'onyx-dark' || saved === 'alabaster-light' || saved === 'theme-4d' || saved === 'theme-midnight' || saved === 'theme-sunset' || saved === 'theme-pearlescent') 
      ? (saved as BaseTheme) 
      : 'theme-4d';
  });

  const [accent, setAccent] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accentColor');
    return (saved === 'sky' || saved === 'emerald' || saved === 'amber' || saved === 'violet')
      ? (saved as AccentColor)
      : 'violet'; // violet is a perfect vibe for the 4D aesthetic!
  });

  const [canvas, setCanvas] = useState<CanvasPattern>(() => {
    const saved = localStorage.getItem('canvasPattern');
    return (saved === 'grid' || saved === 'dots' || saved === 'plain')
      ? (saved as CanvasPattern)
      : 'grid'; // Grid looks very futuristic and high-end tech-luxe!
  });

  const [interactiveAura, setInteractiveAura] = useState<boolean>(() => {
    const saved = localStorage.getItem('interactiveAura');
    return saved !== 'false';
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Synchronize layout theme mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-4d', 'theme-midnight', 'theme-sunset', 'theme-pearlescent');
    
    if (baseTheme === 'onyx-dark') {
      root.classList.add('dark');
      root.style.setProperty('--scrollbar-track-bg', '#000000');
      root.style.setProperty('--scrollbar-thumb-bg', '#18181b');
    } else if (baseTheme === 'alabaster-light') {
      root.style.setProperty('--scrollbar-track-bg', '#fafaf9');
      root.style.setProperty('--scrollbar-thumb-bg', '#e7e5e4');
    } else if (baseTheme === 'theme-4d') {
      root.classList.add('dark', 'theme-4d');
      root.style.setProperty('--scrollbar-track-bg', '#030206');
      root.style.setProperty('--scrollbar-thumb-bg', '#151221');
    } else if (baseTheme === 'theme-midnight') {
      root.classList.add('dark', 'theme-midnight');
      root.style.setProperty('--scrollbar-track-bg', '#020215');
      root.style.setProperty('--scrollbar-thumb-bg', '#0f0f35');
    } else if (baseTheme === 'theme-sunset') {
      root.classList.add('dark', 'theme-sunset');
      root.style.setProperty('--scrollbar-track-bg', '#0a040b');
      root.style.setProperty('--scrollbar-thumb-bg', '#220b1e');
    } else if (baseTheme === 'theme-pearlescent') {
      root.classList.add('theme-pearlescent');
      root.style.setProperty('--scrollbar-track-bg', '#faf9ff');
      root.style.setProperty('--scrollbar-thumb-bg', '#e5e1f7');
    } else {
      root.classList.add('dark');
      root.style.setProperty('--scrollbar-track-bg', '#020617');
      root.style.setProperty('--scrollbar-thumb-bg', '#1e293b');
    }
    localStorage.setItem('baseTheme', baseTheme);
  }, [baseTheme]);

  // Synchronize accent colors dynamically
  useEffect(() => {
    const root = document.documentElement;
    if (accent === 'sky') {
      root.style.setProperty('--color-accent-val', '#0ea5e9');
      root.style.setProperty('--color-accent-sec-val', '#6366f1');
      root.style.setProperty('--color-accent-glow-val', 'rgba(14, 165, 233, 0.15)');
    } else if (accent === 'emerald') {
      root.style.setProperty('--color-accent-val', '#10b981');
      root.style.setProperty('--color-accent-sec-val', '#14b8a6');
      root.style.setProperty('--color-accent-glow-val', 'rgba(16, 185, 129, 0.15)');
    } else if (accent === 'amber') {
      root.style.setProperty('--color-accent-val', '#f59e0b');
      root.style.setProperty('--color-accent-sec-val', '#f97316');
      root.style.setProperty('--color-accent-glow-val', 'rgba(245, 158, 11, 0.15)');
    } else if (accent === 'violet') {
      root.style.setProperty('--color-accent-val', '#8b5cf6');
      root.style.setProperty('--color-accent-sec-val', '#d946ef');
      root.style.setProperty('--color-accent-glow-val', 'rgba(139, 92, 246, 0.15)');
    }
    localStorage.setItem('accentColor', accent);
  }, [accent]);

  // Synchronize canvas pattern
  useEffect(() => {
    document.documentElement.setAttribute('data-canvas', canvas);
    localStorage.setItem('canvasPattern', canvas);
  }, [canvas]);

  useEffect(() => {
    localStorage.setItem('interactiveAura', String(interactiveAura));
  }, [interactiveAura]);

  // Global mouse coordinates listener for active spotlight halo
  useEffect(() => {
    if (!interactiveAura) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactiveAura]);

  const toggleTheme = () => {
    const themes: BaseTheme[] = ['theme-4d', 'theme-midnight', 'theme-sunset', 'theme-pearlescent', 'slate-dark', 'onyx-dark', 'alabaster-light'];
    setBaseTheme(prev => {
      const idx = themes.indexOf(prev);
      const nextIdx = (idx + 1) % themes.length;
      return themes[nextIdx];
    });
  };

  const getThemeClass = () => {
    if (baseTheme === 'onyx-dark') return 'dark bg-black text-zinc-100';
    if (baseTheme === 'alabaster-light') return 'bg-stone-50 text-stone-800';
    if (baseTheme === 'theme-4d') return 'dark theme-4d bg-[#030206] text-slate-100';
    if (baseTheme === 'theme-midnight') return 'dark theme-midnight bg-[#020215] text-slate-100';
    if (baseTheme === 'theme-sunset') return 'dark theme-sunset bg-[#0a040b] text-rose-50';
    if (baseTheme === 'theme-pearlescent') return 'theme-pearlescent bg-[#faf9ff] text-slate-800';
    return 'dark bg-slate-950 text-slate-100';
  };

  // Coordinates smooth scrolling and view swapping
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    
    // Smooth scroll to element if present on screen
    if (view !== 'admin') {
      setTimeout(() => {
        const element = document.getElementById(view);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased font-sans transition-colors duration-300 relative overflow-hidden ${getThemeClass()}`}>
      {/* Dynamic Animated Mesh Gradient Background & Color Grading */}
      {['theme-4d', 'theme-midnight', 'theme-sunset', 'theme-pearlescent'].includes(baseTheme) && (
        <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ${
          baseTheme === 'theme-4d' ? 'bg-[#030206]' :
          baseTheme === 'theme-midnight' ? 'bg-[#020215]' :
          baseTheme === 'theme-sunset' ? 'bg-[#0a040b]' :
          'bg-[#faf9ff]'
        }`}>
          {/* Animated Mesh Orbs for "Vibe" Color Grading */}
          <div className={`absolute top-[-15%] left-[-15%] w-[65%] h-[65%] rounded-full blur-[120px] animate-mesh-orb-1 ${
            baseTheme === 'theme-4d' ? 'bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-transparent' :
            baseTheme === 'theme-midnight' ? 'bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-transparent' :
            baseTheme === 'theme-sunset' ? 'bg-gradient-to-br from-rose-600/20 via-red-500/15 to-transparent' :
            'bg-gradient-to-br from-pink-400/10 via-sky-300/5 to-transparent'
          }`} />
          <div className={`absolute bottom-[-15%] right-[-15%] w-[65%] h-[65%] rounded-full blur-[120px] animate-mesh-orb-2 ${
            baseTheme === 'theme-4d' ? 'bg-gradient-to-tr from-cyan-500/15 via-pink-500/10 to-transparent' :
            baseTheme === 'theme-midnight' ? 'bg-gradient-to-tr from-violet-600/20 via-purple-700/10 to-transparent' :
            baseTheme === 'theme-sunset' ? 'bg-gradient-to-tr from-amber-500/20 via-orange-600/15 to-transparent' :
            'bg-gradient-to-tr from-purple-300/12 via-amber-200/5 to-transparent'
          }`} />
          <div className={`absolute top-[30%] right-[10%] w-[55%] h-[55%] rounded-full blur-[130px] animate-mesh-orb-3 ${
            baseTheme === 'theme-4d' ? 'bg-gradient-to-bl from-purple-600/15 via-emerald-500/5 to-transparent' :
            baseTheme === 'theme-midnight' ? 'bg-gradient-to-bl from-cyan-500/15 via-blue-500/5 to-transparent' :
            baseTheme === 'theme-sunset' ? 'bg-gradient-to-bl from-violet-600/18 via-pink-500/8 to-transparent' :
            'bg-gradient-to-bl from-blue-300/10 via-teal-200/5 to-transparent'
          }`} />
          <div className={`absolute bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-mesh-orb-4 ${
            baseTheme === 'theme-4d' ? 'bg-gradient-to-tr from-amber-500/8 via-rose-500/5 to-transparent' :
            baseTheme === 'theme-midnight' ? 'bg-gradient-to-tr from-indigo-400/10 via-slate-600/5 to-transparent' :
            baseTheme === 'theme-sunset' ? 'bg-gradient-to-tr from-purple-500/10 via-amber-600/5 to-transparent' :
            'bg-gradient-to-tr from-rose-300/8 via-violet-200/5 to-transparent'
          }`} />
          
          {/* High-fidelity film grain & cinematic noise shader */}
          <div className={`absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-500 ${
            baseTheme === 'theme-4d' ? 'opacity-[0.035]' :
            baseTheme === 'theme-midnight' ? 'opacity-[0.03]' :
            baseTheme === 'theme-sunset' ? 'opacity-[0.04]' :
            'opacity-[0.015]'
          }`} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          
          {/* Vignette & Contrast Overlay */}
          <div className="absolute inset-0 transition-all duration-500" style={{
            background: `radial-gradient(circle at 50% 50%, transparent 20%, ${
              baseTheme === 'theme-4d' ? '#030206' :
              baseTheme === 'theme-midnight' ? '#020215' :
              baseTheme === 'theme-sunset' ? '#0a040b' :
              '#faf9ff'
            } 90%)`
          }} />
        </div>
      )}

      {/* Global Interactive mouse spotlight tracking aura */}
      {interactiveAura && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-0 lg:opacity-100 mix-blend-screen"
          style={{
            background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, var(--color-accent-glow-val), transparent 80%)`
          }}
        />
      )}

      {/* Floating Header Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} theme={baseTheme === 'alabaster-light' ? 'light' : 'dark'} onToggleTheme={toggleTheme} />

      {/* Main Multi-Section Layout Switcher */}
      <main className="flex-grow">
        {currentView === 'admin' ? (
          <AdminPanel />
        ) : (
          <div className="flex flex-col">
            <Hero onNavigate={handleNavigate} />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <ContactForm />
          </div>
        )}
      </main>

      {/* Persistent Brand Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-slate-950 text-white py-12 border-t border-slate-900 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="font-extrabold text-white text-xl tracking-tight block">Madhav Krishnatreya</span>
              <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                Full Stack Software Developer
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <button onClick={() => handleNavigate('home')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleNavigate('about')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">About</button>
              <button onClick={() => handleNavigate('skills')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Skills</button>
              <button onClick={() => handleNavigate('projects')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Projects</button>
              <button onClick={() => handleNavigate('experience')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Experience</button>
              <button onClick={() => handleNavigate('education')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Education</button>
              <button onClick={() => handleNavigate('contact')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Contact</button>
              <button 
                onClick={() => handleNavigate(currentView === 'admin' ? 'home' : 'admin')}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold"
              >
                {currentView === 'admin' ? 'Public Site' : 'Admin Area'}
              </button>
            </div>
          </div>

          {/* Sleek Geometric Footer Connect Row */}
          <div id="footer-connect-row" className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-b border-white/10">
            <span id="footer-connect-title" className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500">
              // CONNECT / REACH OUT
            </span>
            <motion.div
              id="footer-social-icons-container"
              className="flex items-center gap-3"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/madhav-jha-bba', color: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-950/20' },
                { name: 'GitHub', icon: Github, url: 'https://github.com/madhavjha514', color: 'hover:text-slate-100 hover:border-slate-500/50 hover:bg-slate-900/40' },
                { name: 'Email', icon: Mail, url: 'mailto:madhavjha514@gmail.com', color: 'hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-950/20' },
                { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-950/20' },
                { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-950/20' }
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    id={`footer-social-${link.name.toLowerCase()}`}
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.3, y: 20 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 18
                        }
                      }
                    }}
                    className={`w-10 h-10 border border-slate-800 bg-slate-950/40 text-slate-400 flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${link.color} hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg`}
                    title={`Connect on ${link.name}`}
                  >
                    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-800 group-hover:border-sky-500 transition-colors" />
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-800 group-hover:border-sky-500 transition-colors" />
                    <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-800 group-hover:border-sky-500 transition-colors" />
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-800 group-hover:border-sky-500 transition-colors" />
                    
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© 2026 Madhav Krishnatreya. All rights reserved. Code licensed under Apache-2.0.</span>
            <span className="font-mono">Relational MongoDB Atlas Engine + Fail-Safe File Store Fallback</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
