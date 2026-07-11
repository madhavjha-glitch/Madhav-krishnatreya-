import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<'default' | 'click' | 'project' | 'text'>('default');
  const [hoverText, setHoverText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring options for smooth lagging effect
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const trailSpringConfig = { damping: 40, stiffness: 90, mass: 1.0 };

  // Smooth lagging position for the outer cursor ring and spotlight
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // An extra slow lagging ambient spotlight background for the "cursor background"
  const bgX = useSpring(mouseX, trailSpringConfig);
  const bgY = useSpring(mouseY, trailSpringConfig);

  // Keep track of trail particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile/touch
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Spawn a trail particle if we have moved enough
      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 20) {
        const id = particleIdRef.current++;
        const colors = [
          'rgba(168, 85, 247, 0.45)', // Amethyst
          'rgba(236, 72, 153, 0.4)',  // Royal Rose
          'rgba(99, 102, 241, 0.35)', // Indigo
          'rgba(139, 92, 246, 0.4)'   // Electric Purple
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        setParticles((prev) => [
          ...prev.slice(-12), // Limit particles count for max performance
          {
            id,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 4,
            color: randomColor,
          }
        ]);

        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      if (!target) return;

      // Climb up DOM tree briefly to look for interactive targets
      let isClickable = false;
      let isProjectCard = false;
      let isSocialLink = false;
      let textToDisplay = '';

      while (target && target !== document.body) {
        if (
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.classList.contains('cursor-pointer') ||
          target.getAttribute('role') === 'button'
        ) {
          isClickable = true;
          if (target.classList.contains('project-card-interactive') || target.closest('.project-card-interactive')) {
            isProjectCard = true;
            textToDisplay = 'VIEW';
          }
          if (target.id && (target.id.includes('social') || target.id.includes('footer-social'))) {
            isSocialLink = true;
          }
          break;
        }
        target = target.parentElement;
      }

      if (isProjectCard) {
        setHoverType('project');
        setHoverText(textToDisplay || 'VIEW');
      } else if (isSocialLink) {
        setHoverType('text');
        setHoverText('LINK');
      } else if (isClickable) {
        setHoverType('click');
      } else {
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY]);

  // Periodic cleanup of particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, [particles]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. Immersive Ambient Spotlight Backdrop / Moving Color Aura */}
      <motion.div
        style={{
          x: bgX,
          y: bgY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverType !== 'default' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="fixed inset-0 w-[550px] h-[550px] pointer-events-none z-0 rounded-full blur-[130px] opacity-[0.24] mix-blend-screen bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600"
      />

      {/* 2. Interactive Plasma/Fluid Particles Trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 16px ${p.color}`,
            transform: 'translate(-50%, -50%)',
          }}
          className="fixed pointer-events-none z-50 rounded-full"
        />
      ))}

      {/* 3. Small ultra-responsive core pointer dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-2.5 h-2.5 rounded-full bg-white pointer-events-none z-[9999] shadow-[0_0_10px_rgba(236,72,153,0.9)] mix-blend-difference"
      />

      {/* 4. Large outer lag-behind micro-interaction ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverType === 'project' ? 2.4 : hoverType === 'text' ? 1.8 : hoverType === 'click' ? 1.6 : 1,
          borderColor: hoverType === 'project' ? 'rgba(236, 72, 153, 0.9)' : hoverType === 'text' ? 'rgba(99, 102, 241, 0.9)' : hoverType === 'click' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: hoverType === 'project' ? 'rgba(236, 72, 153, 0.15)' : hoverType === 'text' ? 'rgba(99, 102, 241, 0.15)' : hoverType === 'click' ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.02)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="fixed w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9998] flex items-center justify-center overflow-hidden backdrop-blur-[1px]"
      >
        {(hoverType === 'project' || hoverType === 'text') && (
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] font-mono font-bold tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
