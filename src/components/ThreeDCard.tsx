import React, { useState, useRef } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function ThreeDCard({ children, className = '', glowColor = 'rgba(168, 85, 247, 0.22)' }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max rotation of 12 degrees for an extra polished 3D feel
    const maxRotate = 12;
    const rotateY = ((x - xc) / xc) * maxRotate;
    const rotateX = -((y - yc) / yc) * maxRotate;
    
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    
    setCoords({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`w-full h-full relative select-none rounded-3xl ${className}`}
    >
      {/* 3D Child Wrapper */}
      <div 
        style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
        className="w-full h-full relative z-10"
      >
        {children}
      </div>

      {/* Shine overlay layer */}
      {isHovered && (
        <div
          style={{
            background: `radial-gradient(circle at ${coords.shineX}% ${coords.shineY}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`,
            transform: 'translateZ(40px)',
          }}
          className="absolute inset-0 pointer-events-none z-20 rounded-3xl mix-blend-overlay"
        />
      )}

      {/* Ambient Glow shadow layer */}
      {isHovered && (
        <div
          style={{
            background: `radial-gradient(circle at ${coords.shineX}% ${coords.shineY}%, ${glowColor} 0%, transparent 70%)`,
            transform: 'translateZ(-15px)',
            filter: 'blur(20px)',
          }}
          className="absolute -inset-3 pointer-events-none z-0 rounded-[2.5rem] opacity-75"
        />
      )}
    </div>
  );
}
