import { useState } from 'react';
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
import ThreeDBackground from './components/ThreeDBackground';
import CustomCursor from './components/CustomCursor';
import OpeningIntro from './components/OpeningIntro';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [showOpening, setShowOpening] = useState<boolean>(true);

  const getThemeClass = () => {
    return 'mesh-gradient-bg text-slate-100';
  };

  // Coordinates smooth scrolling and view swapping
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    
    // Smooth scroll to element if present on screen
    setTimeout(() => {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased font-sans transition-colors duration-300 relative overflow-hidden ${getThemeClass()}`}>
      {/* Immersive Preloader & Launch Portal */}
      {showOpening && <OpeningIntro onComplete={() => setShowOpening(false)} />}

      {/* Premium Dynamic Interactive Cursor & Trail */}
      <CustomCursor />

      {/* Immersive Interactive 3D Background */}
      <ThreeDBackground />

      {/* Floating Header Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} theme="dark" />

      {/* Main Multi-Section Layout Switcher */}
      <main className="flex-grow">
        <div className="flex flex-col">
          <Hero onNavigate={handleNavigate} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <ContactForm />
        </div>
      </main>

      {/* Persistent Brand Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
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
              animate="visible"
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
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
