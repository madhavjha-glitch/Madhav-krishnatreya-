import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Activity, Zap, Shield, Cpu } from 'lucide-react';

interface OpeningIntroProps {
  onComplete: () => void;
}

export default function OpeningIntro({ onComplete }: OpeningIntroProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS...');
  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Cycle technical logs as loading happens
  useEffect(() => {
    if (progress < 25) {
      setStatusText('INITIALIZING HARDWARE ENGINES...');
    } else if (progress < 50) {
      setStatusText('FETCHING CREATIVE ARTIFACTS & BLUEPRINTS...');
    } else if (progress < 75) {
      setStatusText('SYNTHESIZING IMMERSIVE 3D CURSOR & CANVAS...');
    } else if (progress < 95) {
      setStatusText('SECURING ENCRYPTED ROUTERS & TRANSMISSION...');
    } else {
      setStatusText('SYSTEM READY. PORTAL ESTABLISHED.');
    }
  }, [progress]);

  // Handle smooth loader incremental steps
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        // Random incremental jumps for realistic feel
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    setIsLaunching(true);
    // Let the epic swipe animation play before fully completing
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isLaunching && (
        <motion.div
          id="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 w-full h-full bg-slate-950 z-[99999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cyberpunk Grid Wallpaper Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

          {/* Glowing Ambient Core Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-600/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Futuristic Scanline Effect */}
          <motion.div
            id="intro-scanline"
            animate={{
              top: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute left-0 w-full h-[2px] bg-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.3)] pointer-events-none"
          />

          {/* Decorative Corner Framing elements */}
          <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] text-slate-500 tracking-widest pointer-events-none">
            <Cpu className="w-3.5 h-3.5 text-sky-500/70 animate-spin" />
            <span>SYS_BOOT: ACTIVE</span>
          </div>
          <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-[10px] text-slate-500 tracking-widest pointer-events-none">
            <Terminal className="w-3.5 h-3.5 text-purple-500/70" />
            <span>MADHAV_KRISHNATREYA_V2.0</span>
          </div>
          <div className="absolute bottom-8 left-8 flex items-center gap-2 font-mono text-[10px] text-slate-600 tracking-widest pointer-events-none">
            <Activity className="w-3.5 h-3.5 text-rose-500/70" />
            <span>FPS_60 // LATENCY_OK</span>
          </div>
          <div className="absolute bottom-8 right-8 flex items-center gap-2 font-mono text-[10px] text-slate-600 tracking-widest pointer-events-none">
            <Shield className="w-3.5 h-3.5 text-emerald-500/70" />
            <span>SSL_ENCRYPTED</span>
          </div>

          {/* Central Loader / Launch Module */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-6 text-center">
            
            <AnimatePresence mode="wait">
              {!isReady ? (
                /* 1. PROGRESS VIEW */
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center space-y-8"
                >
                  {/* Outer spinning neon circle HUD */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="64"
                        className="stroke-slate-900 fill-none"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="72"
                        cy="72"
                        r="64"
                        className="stroke-sky-400 fill-none"
                        strokeWidth="4"
                        strokeDasharray={402}
                        strokeDashoffset={402 - (402 * progress) / 100}
                        strokeLinecap="round"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))',
                        }}
                      />
                    </svg>

                    {/* Digital Percentage display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-4xl font-extrabold text-white tracking-tighter">
                        {progress}%
                      </span>
                      <span className="font-mono text-[8px] text-slate-500 tracking-widest font-bold">
                        COMPILING
                      </span>
                    </div>

                    {/* Pulse satellite orbit dot */}
                    <motion.div
                      style={{
                        transform: `rotate(${(progress / 100) * 360}deg)`,
                        transformOrigin: '72px 72px'
                      }}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    >
                      <div className="absolute top-[4px] left-[68px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                    </motion.div>
                  </div>

                  {/* Technical Status Logs */}
                  <div className="space-y-2 h-14">
                    <div className="flex items-center justify-center gap-2 font-mono text-xs font-semibold text-sky-400 tracking-wider">
                      <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                      <span>{statusText}</span>
                    </div>
                    <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                      Secure connection initialized via cloud proxy
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* 2. SYSTEM READY & LAUNCH CONTROL MODULE */
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 140,
                    damping: 18,
                  }}
                  className="flex flex-col items-center space-y-8"
                >
                  {/* Decorative glowing digital shield */}
                  <div className="relative w-28 h-28 flex items-center justify-center rounded-full border border-sky-500/40 bg-sky-950/20 shadow-[0_0_40px_rgba(14,165,233,0.15)] animate-pulse">
                    <Sparkles className="w-10 h-10 text-sky-400" />
                    <span className="absolute -inset-1 rounded-full border border-purple-500/20 animate-ping opacity-70" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight leading-none uppercase">
                      MADHAV KRISHNATREYA
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                      FULL STACK PORTFOLIO // V2.0
                    </p>
                  </div>

                  {/* Premium Action Launch Button */}
                  <button
                    onClick={handleLaunch}
                    className="relative group px-10 py-5 bg-gradient-to-r from-sky-500 via-purple-600 to-indigo-600 text-white rounded-full font-mono text-xs uppercase tracking-[0.2em] font-extrabold cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(14,165,233,0.35)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] border border-white/20"
                  >
                    {/* Gloss sweep shine */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    
                    <span className="relative z-10 flex items-center gap-3">
                      LAUNCH EXPERIENCE
                    </span>
                  </button>

                  <p className="font-mono text-[9px] text-slate-500 tracking-wider">
                    Click to initialize immersive shaders & canvas environment
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}

      {/* Wipe Slide Reveal Masks (For beautiful theater transition effect) */}
      {isLaunching && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[999999] flex flex-col justify-between">
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: '50%' }}
            exit={{ height: '0%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="w-full bg-slate-900 border-b border-sky-500/20 relative flex items-end justify-center"
          >
            {/* Horizontal laser scanning glow line */}
            <div className="w-full h-[2px] bg-sky-400 shadow-[0_2px_15px_rgba(14,165,233,0.8)]" />
          </motion.div>
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: '50%' }}
            exit={{ height: '0%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="w-full bg-slate-900 border-t border-sky-500/20 relative flex items-start justify-center"
          >
            {/* Horizontal laser scanning glow line */}
            <div className="w-full h-[2px] bg-sky-400 shadow-[0_-2px_15px_rgba(14,165,233,0.8)]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
