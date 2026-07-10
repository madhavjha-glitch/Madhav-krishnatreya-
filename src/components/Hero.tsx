import { motion } from 'motion/react';
import { ArrowRight, Sparkles, FileText, BarChart3, Laptop, Linkedin, Github, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import Magnetic from './Magnetic';
import madhavProfileImg from '../assets/images/regenerated_image_1783668904127.jpg';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const quickStats = [
    { label: 'Core Focus', value: 'Full Stack Dev', detail: 'TypeScript / React / Node.js' },
    { label: 'Academic Path', value: 'BBA Digital Marketing', detail: 'Strategy & Growth Engine' },
    { label: 'Synergy Catalyst', value: 'Tech + Marketing', detail: 'Automated Lead Gen Systems' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-transparent text-white overflow-hidden border-b border-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Info Block */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Tagline / Welcome Badge */}
            <motion.div
              variants={childVariants}
              className="inline-flex items-center space-x-2 px-4 py-1.5 border border-slate-800 bg-slate-900/60 rounded-full shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">
                Welcome to my portfolio
              </span>
            </motion.div>
 
            {/* Display Headline */}
            <div className="space-y-3">
              <motion.h1
                variants={childVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans text-white"
              >
                Hi, I'm <span className="text-sky-400">Madhav Krishnatreya</span>
              </motion.h1>
              
              <motion.h2
                variants={childVariants}
                className="text-sm sm:text-base md:text-lg font-bold text-slate-400 font-mono uppercase tracking-[0.2em]"
              >
                Full Stack Developer & Digital Marketer
              </motion.h2>
            </div>
 
            {/* Bio Copy */}
            <motion.p
              variants={childVariants}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              I bridge the gap between technical engineering and strategic business growth. From building complex React components and robust Express backends to creating smart lead generation funnels, automated spreadsheets, and high-impact search strategy.
            </motion.p>
 
            {/* Action Buttons */}
            <motion.div
              variants={childVariants}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
            >
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white font-mono font-bold text-xs uppercase tracking-widest cursor-pointer group shadow-md hover:bg-sky-700 transition-all duration-300 rounded-full"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
 
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 px-6 py-3 border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-200 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-full shadow-sm"
              >
                <span>Get In Touch</span>
              </button>
            </motion.div>
 
            {/* Micro Badges */}
            <motion.div
              variants={childVariants}
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4 text-xs font-mono font-bold uppercase tracking-wider text-slate-500"
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
          </motion.div>
 
          {/* Interactive Profile Card Block */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
            >
              <ThreeDCard>
                <div className="relative w-full h-full border border-slate-800 bg-slate-900/60 p-3 group overflow-hidden shadow-2xl transition-all duration-300 rounded-3xl">
                  {/* Decorative rotating accent */}
                  <div className="absolute inset-0 border border-dashed border-slate-850 group-hover:border-slate-700 transition-all duration-700 pointer-events-none rounded-3xl" />
 
                  {/* Image container */}
                  <div className="w-full h-full relative overflow-hidden bg-slate-950 rounded-2xl">
                    <img
                      src={madhavProfileImg}
                      alt="Madhav Krishnatreya Profile Picture"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
 
                  {/* Active/Available badge */}
                  <div 
                    className="absolute bottom-6 right-6 px-4 py-1.5 bg-slate-900 text-slate-200 font-mono font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 shadow-md border border-slate-800 rounded-full"
                    title="Active Portfolio"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Active Now</span>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          </div>
 
        </div>
 
        {/* Minimalist Stats Grid Section */}
        <div className="mt-20 md:mt-24 pt-12 border-t border-slate-900">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {quickStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={childVariants}
                className="p-6 bg-slate-900/60 border border-slate-850 rounded-3xl hover:border-slate-800 transition-all duration-300 shadow-md"
              >
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-white transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
 
      </div>
    </section>
  );
}
