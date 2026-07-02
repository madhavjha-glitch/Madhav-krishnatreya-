import { motion } from 'motion/react';
import { ArrowRight, Sparkles, FileText, BarChart3, Laptop, Linkedin, Github, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import Magnetic from './Magnetic';
import madhavProfileImg from '../assets/images/madhav_actual.jpg';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const quickStats = [
    { label: 'Core Focus', value: 'Full Stack Dev', detail: 'TypeScript / React / Node.js' },
    { label: 'Academic Path', value: 'BBA Digital Marketing', detail: 'Strategy & Growth Engine' },
    { label: 'Synergy Catalyst', value: 'Tech + Marketing', detail: 'Automated Lead Gen Systems' },
  ];

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50 overflow-hidden border-b border-slate-200 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Info Block */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline / Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-950/20 rounded-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Display Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans"
              >
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">Madhav Krishnatreya</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-400 font-sans uppercase tracking-wider"
              >
                Full Stack Developer & Digital Marketer
              </motion.h2>
            </div>

            {/* Bio Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              I bridge the gap between technical engineering and strategic business growth. From building complex React components and robust Express backends to creating smart lead generation funnels, automated spreadsheets, and high-impact search strategy.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
            >
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-slate-950 font-mono font-black text-xs uppercase tracking-widest cursor-pointer group shadow-lg shadow-sky-500/10 transition-colors"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors"
              >
                <span>Get In Touch</span>
              </button>
            </motion.div>

            {/* Micro Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
            >
              <span>TypeScript</span>
              <span>•</span>
              <span>React</span>
              <span>•</span>
              <span>Node.js</span>
              <span>•</span>
              <span>Excel Automation</span>
              <span>•</span>
              <span>Lead Generation</span>
            </motion.div>
          </div>

          {/* Interactive Profile Card Block */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
            >
              <ThreeDCard glowColor="rgba(14, 165, 233, 0.15)">
                <div className="relative w-full h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 group overflow-hidden shadow-2xl transition-colors duration-300">
                  {/* Decorative rotating accent */}
                  <div className="absolute inset-0 border border-dashed border-sky-500/20 group-hover:border-sky-500/40 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />

                  {/* Image container */}
                  <div className="w-full h-full relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={madhavProfileImg}
                      alt="Madhav Krishnatreya Profile Picture"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Active/Available badge */}
                  <div 
                    className="absolute bottom-6 right-6 px-3 py-1 bg-emerald-500 text-white font-mono font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 shadow-md border border-emerald-400"
                    title="Active Portfolio"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Active Now</span>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          </div>

        </div>

        {/* Minimalist Stats Grid Section */}
        <div className="mt-20 md:mt-24 pt-12 border-t border-slate-200 dark:border-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="p-6 bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/30 hover:border-sky-500/30 transition-all duration-300"
              >
                <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
